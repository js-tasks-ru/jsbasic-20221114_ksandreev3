function getMinMax(str) {
  let numbersOnly = str
    .split(",")
    .join(" ")
    .split(" ")
    .filter((num) => isFinite(num));

  let result = {
    min: Math.min(...numbersOnly),
    max: Math.max(...numbersOnly),
  };
  return result;
}
