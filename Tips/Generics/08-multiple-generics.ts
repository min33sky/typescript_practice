const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  if (key === 'bad') {
    throw new Error(`Don't access the bad key`);
  }
  return obj[key];
};

const result = getValue(
  {
    a: 1,
    b: 'some-string',
    c: true,
  },
  'b',
);

console.log(result);
//          ^?

export {};
