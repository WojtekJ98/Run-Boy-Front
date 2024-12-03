export default function totalCartPrice(items) {
  const priceTab = items.map((item) => item.price);

  const sum = priceTab.reduce((a, b) => a + b, 0);

  return sum;
}
