const getDifferenceInMinutes = (startDate: Date, endDate: Date) => {
  const msInMinute = 60 * 1000;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / msInMinute
  );
};

export { getDifferenceInMinutes };
