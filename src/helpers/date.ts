function getMonthName(date: Date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthNumber = date.getMonth();

  return monthNames[monthNumber];
}

export default getMonthName;
