export const formatCurrency = (value: number, currency: string = "KRW") => {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (value: string | number | Date) => {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
