function getCurrentDate() {
  const date = new Date();

  const year = date.getFullYear();
  const monthNum = date.getMonth();
  const month =
    monthNum > 9
      ? monthNum + 1
      : monthNum === 9
      ? monthNum + 1
      : "0" + monthNum;
  const dayNum = date.getDate();
  const day = dayNum > 9 ? dayNum : "0" + dayNum;
  const hoursNum = date.getHours();
  const hours = hoursNum > 9 ? hoursNum : "0" + hoursNum;
  const minutesNum = date.getMinutes();
  const minutes = minutesNum > 9 ? minutesNum : "0" + minutesNum;
  const curDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return curDate;
}

export default getCurrentDate
