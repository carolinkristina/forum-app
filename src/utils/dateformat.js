const countDaysFromDate = (date) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  let difference = 0;
  let tmpMinute = 0;
  let tmpHour = 0;

  difference = currentDate.getTime() - postDate.getTime();
  const day = Math.floor(difference / (1000 * 3600 * 24));

  if (day > 0) {
    tmpHour = difference % (1000 * 3600 * 24);
  } else {
    tmpHour = difference;
  }

  const hour = Math.floor(tmpHour / (1000 * 3600));

  if (hour > 0) {
    tmpMinute = difference % (1000 * 3600);
  } else {
    tmpMinute = difference;
  }

  const minute = Math.floor(tmpMinute / (1000 * 60));

  if (day > 0) {
    return `${day} days ago`;
  }
  if (hour > 0) {
    return `${hour} hours ago`;
  }
  return `${minute} minutes ago`;
};

export { countDaysFromDate };
