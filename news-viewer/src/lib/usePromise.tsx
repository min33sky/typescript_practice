import { useState, useEffect } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { NewsItemType } from '../components/NewsItem';

type readonlyArray = [
  boolean,
  AxiosResponse<ResponseType> | null,
  AxiosError | null,
];

type ResponseType = {
  articles: NewsItemType[];
};

export default function usePromise(
  promiseCreator: any,
  deps: any,
): readonlyArray {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState<AxiosResponse<ResponseType> | null>(
    null,
  );
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);
      try {
        const res = await promiseCreator();
        setResolved(res);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
  }, deps);

  return [loading, resolved, error];
}
