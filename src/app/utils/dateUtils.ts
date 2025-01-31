export const calculateDaysToToday = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const differenceInTime = date.getTime() - today.getTime();
  return Math.round(differenceInTime / (1000 * 60 * 60 * 24));
};

// export const calculateDaysToStart = (dateString: string) => {
//   const date = new Date(dateString);
//   const today = new Date();
//   const differenceInTime = today.getTime() - date.getTime();
//   return Math.round(differenceInTime / (1000 * 60 * 60 * 24));
// };
