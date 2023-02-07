export const sum = (a: number, b: number) => {
  console.log('Quack!');
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
