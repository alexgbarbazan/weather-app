export function getInitialStartDate(dayOfWeek: number) {
  const day = new Date();
  const diff = dayOfWeek - day.getDay();
  day.setDate(day.getDate() + diff);
  day.setHours(0, 0, 0, 0);
  return day.getTime() / 1000;
}

export function updateStartDate(params: {
  startDate: number;
  multiplier: 1 | -1;
  offsetDays: number;
}) {
  const { startDate, multiplier, offsetDays = 7 } = params;

  const newStartDate = new Date(startDate * 1000);
  newStartDate.setDate(newStartDate.getDate() + multiplier * offsetDays);
  newStartDate.setHours(0, 0, 0, 0);
  return newStartDate.getTime() / 1000;
}