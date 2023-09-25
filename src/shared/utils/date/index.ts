const TIME_OF_DAY = ["Night", "Morning", "Day", "Evening"];

export const getTimeOfDay = () => {
  const date = new Date();
  const hours = date.getHours();
  return TIME_OF_DAY[Math.floor(hours / 6)];
};
