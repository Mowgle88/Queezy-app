const TIME_OF_DAY = ['Night', 'Morning', 'Day', 'Evening'];

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return TIME_OF_DAY[Math.floor(hours / 6)]
}

export default getTimeOfDay;