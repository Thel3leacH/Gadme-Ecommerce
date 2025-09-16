// เครื่องมือ format เงิน
export const formatTHB = (n) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
  }).format(n);

export const formatFromSatang = (satang) => formatTHB(Math.round(satang) / 100);
