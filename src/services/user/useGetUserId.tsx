import { useCallback, useEffect, useState } from "react";
import registerServices from "../Register/register.services";

export const useGetUserId = (id: string, channel_id: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>("");

  const callApi = useCallback(() => {
    return registerServices.getUser(id, channel_id);
  }, [id, channel_id]);

  const transformResponse = useCallback((response: any) => {
    if (response) {
      setData(response?.data?.data);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const response = await callApi();
      transformResponse(response);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (!id || !channel_id) return;
    let shouldSetData = true;

    (async () => {
      try {
        setLoading(true);
        const response = await callApi();
        if (shouldSetData) {
          setLoading(false);
          transformResponse(response);
        }
        // emitShowAppLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        // emitShowAppLoading(false);
      }
    })();

    return () => {
      shouldSetData = false;
    };
  }, [id, channel_id]);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
