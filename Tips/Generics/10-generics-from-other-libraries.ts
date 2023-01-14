import { z } from 'zod';

const makeZodSafeFetch = <TData>(
  url: string,
  schema: z.Schema<TData>,
): Promise<TData> => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => schema.parse(res));
};

const result = makeZodSafeFetch(
  '/api/endpoint',
  z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
).then((res) => {
  console.log(res);
  //           ^?
});

export {};
