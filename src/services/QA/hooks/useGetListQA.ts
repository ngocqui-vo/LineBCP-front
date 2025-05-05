import { useEffect, useState, useCallback, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import { flatten, isArray } from "lodash";
import { useSave } from "@/stores/useStores";
// import { Todo } from "../interfaces/todo";
// import todoService, { FiltersGetTodos, RequestGetTodos, ResponseToDoList } from "../todoService";
import { showError } from "@/helpers/toast";
import { IParamsGetListQA, IResponseGetListQA, IResponseGetListRoute } from "../qa.interface";
import qaServices from "../qa.services";
// import { CommonResponseAPIList } from "@/interfaces/common.interface";

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
const parseRequest = (filters: IParamsGetListQA): IParamsGetListQA => {
  return cloneDeep({
    page: filters.page,
    pageSize: filters.pageSize,
  });
};

const requestAPI = qaServices.getListQA;

const useGetListQA = (
  filters: IParamsGetListQA,
  options: { isTrigger?: boolean; refetchKey?: string } = {
    isTrigger: true,
    refetchKey: "",
  },
) => {
  //! State
  const { isTrigger = true, refetchKey = "" } = options;
  const signal = useRef(new AbortController());
  const save = useSave();
  const [data, setData] = useState<IResponseGetListQA[]>([]);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasMore, setHasMore] = useState(false);

  //! Function
  const fetch: () => Promise<IResponseGetListRoute> | undefined = useCallback(() => {
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

  const checkConditionPass = useCallback((response: IResponseGetListRoute, options: { isLoadmore?: boolean } = {}) => {
    const { isLoadmore = true } = options;

    //* Check condition of response here to set data
    if (isArray(response?.data?.data?.data)) {
      if (isLoadmore) {
        setData((prev) => {
          let nextPages = cloneDeep(prev);
          nextPages = [...(nextPages || []), ...(response?.data?.data?.data || [])];
          return nextPages;
        });
      } else {
        setData(response?.data?.data?.data);
      }
      const hasMore = (filters?.page || 1) < response.data.data.totalPage;

      setHasMore(hasMore);
    }
  }, []);

  //* Refetch implicity (without changing loading state)
  const refetch = useCallback(async () => {
    try {
      if (signal.current) {
        signal.current.abort();
        signal.current = new AbortController();
      }

      setRefetching(true);
      const page = filters?.page || 1;

      let listRequest: Promise<IResponseGetListRoute>[] = [];
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

export default useGetListQA;
