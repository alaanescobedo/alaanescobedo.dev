export const formatDate = (date: Date, locale: string) => {
  const month = date.toLocaleString(locale, { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
