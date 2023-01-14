type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

type Result = GetPromiseReturnType<
  // ^?
  () => Promise<{
    firstName: string;
    lastName: string;
    id: number;
  }>
>;

// type ErrorLine = GetPromiseReturnType<string>; // Error
