export const getDayOfWeek = (day: number, month: number, year: number) => {
  return new Date(year, month, day).toLocaleString("es-MX", {
    weekday: "long",
  });
};
