"use client";

import { useState, useEffect } from "react";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(fetcher: () => Promise<T>, dependencies: any[] = []): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    setState((prev) => ({ ...prev, loading: true }));

    fetcher()
      .then((data) => {
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}
