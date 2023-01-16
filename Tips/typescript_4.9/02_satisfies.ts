type RGB = [number, number, number];

// const palette: Record<'red' | 'green' | 'blue', string | RGB> = {
//   red: [255, 0, 0],
//   green: '#00ff00',
//   blue: [0, 0, 255],
// };

// palette.red.lastIndexOf(0);
// palette.green.toUpperCase();

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<'red' | 'green' | 'blue', string | RGB>;

palette.red.lastIndexOf(0);
palette.green.toUpperCase();
