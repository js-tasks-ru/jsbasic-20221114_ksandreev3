function getMinMax(str) {
  let numbersOnly = str
    .split(",")
    .join(" ")
    .split(" ")
    .filter((num) => isFinite(num));

  return {
    min: Math.min(...numbersOnly),
    max: Math.max(...numbersOnly),
  };
}
