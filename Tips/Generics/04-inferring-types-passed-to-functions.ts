// You don't always have to pass the types to a generic
// function!

const addIdToObject = <T>(obj: T) => {
  return {
    ...obj,
    id: '1557',
  };
};

const result = addIdToObject({
  firstName: 'John',
  lastName: 'Doe',
});

console.log(result);
//          ^?

export {};
