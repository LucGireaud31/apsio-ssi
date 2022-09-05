import { useEffect, useState } from "react";

interface useLocalApiProps {
  promise(): Promise<any>;
  disableFirstFetch?: boolean;
}

export function useLocalApi<T>(props: useLocalApiProps) {
  const { promise, disableFirstFetch } = props;

  async function refetch() {
    setIsLoading(true);
    setData(await promise());
    setIsLoading(false);
  }

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(disableFirstFetch ? false : true);

  useEffect(() => {
    if (!disableFirstFetch) {
      (async () => {
        setData(await promise());
        setIsLoading(false);
      })();
    }
  }, []);

  return { data, isLoading, refetch };
}
