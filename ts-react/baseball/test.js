const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const item = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1,
    )[0];
    array.push(item);
  }

  return array;
};

console.log(getNumbers());
