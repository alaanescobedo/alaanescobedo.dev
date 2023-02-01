export const getDayOfWeek = (
  day: number,
  month: number,
  year: number,
  locale: string
) => {
  return new Date(year, month, day).toLocaleString(locale, {
    weekday: "long",
  });
};
