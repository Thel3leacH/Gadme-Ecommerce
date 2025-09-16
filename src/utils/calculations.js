export function calculateSubtotalSatang(items) {
  return items.reduce((sum, it) => sum + it.unitPriceSatang * it.quantity, 0);
}
