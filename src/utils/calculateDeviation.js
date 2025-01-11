function calculateStandardDeviation(numbers) {
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const variance =
    numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
  return Math.sqrt(variance);
}

module.exports = calculateStandardDeviation;