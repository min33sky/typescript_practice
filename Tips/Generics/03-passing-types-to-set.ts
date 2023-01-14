// You can pass these type parameters to
// other parts of JS, like SET and Map

const set = new Set<number>();
//     ^?

set.add(1);

// We want the to error!
// set.add('abc');

export {};
