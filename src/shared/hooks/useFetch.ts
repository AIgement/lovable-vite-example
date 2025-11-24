import { useEffect, useState } from "react";

interface UseFetchState<T> {
  data?: T;
  loading: boolean;
  error?: string;
}

export const useFetch = <T>(fetcher: () => Promise<T>, deps: unknown[] = []) => {
  const [state, setState] = useState<UseFetchState<T>>({ loading: true });

  useEffect(() => {
    let active = true;

    const run = async () => {
      setState({ loading: true });
      try {
        const data = await fetcher();
        if (!active) return;
        setState({ data, loading: false });
      } catch (error) {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Unknown error";
        setState({ loading: false, error: message });
      }
    };

    run();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};
