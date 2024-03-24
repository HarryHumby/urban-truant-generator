export const deleteElementByIndexFromList = <T>(idx: number, data: T[]): T[] => {
  const currData = [...data];
  if (idx >= 0) {
    currData.splice(idx, 1);
  }
  return currData;
};
export function isEmpty(str: string) {
  return !str || str.length === 0 || str === '' || str === ' ';
}
