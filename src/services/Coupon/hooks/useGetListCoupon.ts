import { useEffect, useState, useCallback, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import { flatten, isArray } from "lodash";
import { useSave } from "@/stores/useStores";
import { showError } from "@/helpers/toast";
import { IRequestParams } from "@/interfaces/common.interface";
import { IResponseGetListCouponRoute } from "../coupon.interface";
import couponServices from "../coupon.services";
import { CouponListModel } from "@/models/coupons/CouponListModel";

/********************************************************
 * SNIPPET GENERATED
 * GUIDE
 * Snippet for infinite scroll with page + rowsPerPage
 * Maybe you should check function:
 * - interface Request / Response
 * - parseRequest
 * - checkConditionPass
 * - fetch
 * - refetch
 ********************************************************/

//* Check parse body request
const parseRequest = (filters: IRequestParams): IRequestParams => {
  return cloneDeep({
    page: filters.page,
    pageSize: filters.pageSize,
    user_id: filters.user_id,
  });
};

const requestAPI = (params: IRequestParams) => couponServices.getListCoupons({ params });

const useGetListCoupon = (
  filters: IRequestParams,
  options: { isTrigger?: boolean; refetchKey?: string } = {
    isTrigger: true,
    refetchKey: "",
  },
) => {
  //! State
  const { isTrigger = true, refetchKey = "" } = options;
  const signal = useRef(new AbortController());
  const save = useSave();
  const [data, setData] = useState<CouponListModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<IResponseGetListCouponRoute> | undefined = useCallback(() => {
    if (!isTrigger) {
      return;
    }

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const nextFilters = parseRequest(filters);
          const response = await requestAPI(nextFilters);
          resolve(response);
        } catch (error) {
          setError(error);
          reject(error);
        }
      })();
    });
  }, [filters, isTrigger]);

  const checkConditionPass = useCallback(
    (response: IResponseGetListCouponRoute, options: { isLoadmore?: boolean } = {}) => {
      const { isLoadmore = true } = options;
      //* Check condition of response here to set data
      if (isArray(response?.data?.data?.data)) {
        const newResult = response?.data?.data?.data.map((elm) => new CouponListModel(elm));
        if (isLoadmore) {
          setData((prev) => {
            let nextPages = cloneDeep(prev);
            nextPages = [...(nextPages || []), ...newResult];
            return nextPages;
          });
        } else {
          setData(newResult);
        }
        const hasMore = (filters?.page || 1) < response.data.data.totalPage;
        setHasMore(hasMore);
      }
    },
    [],
  );

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      if (signal.current) {
        signal.current.abort();
        signal.current = new AbortController();
      }

      setRefetching(true);
      const page = filters?.page || 1;

      let listRequest: Promise<IResponseGetListCouponRoute>[] = [];
      for (let eachPage = 0; eachPage < page; eachPage++) {
        const nextFilters = parseRequest(filters);
        nextFilters.page = eachPage;

        const request = requestAPI(nextFilters);

        listRequest = [...listRequest, request];
      }

      const responses = await Promise.allSettled(listRequest);
      const allData = responses.map((el) => {
        if (el.status === "fulfilled") {
          return isArray(el?.value?.data) ? el?.value?.data : [];
        }

        return [];
      });
      setData(flatten(allData));
      setRefetching(false);
    } catch (error: any) {
      if (!error.isCanceled) {
        showError(error);
      }
    }
  }, [filters]);

  useEffect(() => {
    save(refetchKey, refetch);
  }, [save, refetchKey, refetch]);

  useEffect(() => {
    signal.current = new AbortController();
    if (!filters?.user_id) return;
    //* Fetch initial API
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const response = await fetch();
        if (response) {
          checkConditionPass(response);
          setLoading(false);
        }
      } catch (error) {
        showError(error);
      } finally {
        setLoading(false);
      }
    };

    //* Fetch more API
    const fetchMore = async () => {
      try {
        setLoadingMore(true);
        const response = await fetch();
        if (response) {
          checkConditionPass(response, { isLoadmore: true });
        }
      } catch (error) {
        showError(error);
      } finally {
        setLoadingMore(false);
      }
    };

    if (filters.page !== undefined && filters.page <= 0) {
      fetchAPI();
    } else {
      //* If page / offset > 0 -> fetch more
      fetchMore();
    }

    return () => {
      if (signal.current) {
        signal.current.abort();
      }
    };
  }, [filters.page, fetch, checkConditionPass]);

  return {
    data,
    loading,
    error,
    refetch,
    refetching,
    loadingMore,
    hasMore,
    setData,
  };
};

export default useGetListCoupon;
