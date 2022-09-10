export enum Currencies {
  BS = 'Bs',
  USD = '$',
}

export const formatNumber = (n: number, currency = Currencies.USD): string => {
  const nSplited = n.toString().split('.');
  if (nSplited.length > 1) {
    return `${parseFloat(String(n)).toFixed(2).toString() + currency}`;
  }
  return `${n.toString() + currency}`;
};
