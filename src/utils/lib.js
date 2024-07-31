export const getValidData = (data) => {
  return data === "-" || data == null ? "" : data;
};
