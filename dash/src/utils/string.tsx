/** @jsx h */

export const arrayToCoolString = (array: string[]): string | undefined => {
  if (!array.length) return undefined;

  if (array.length === 1) return array[0];

  const formatter = new Intl.ListFormat("en-US", { style: "long", type: "conjunction" });

  return formatter.format(array);
};

export const getHtmlDate = (date: string) => {
  const [start, end] = new Date(date).toISOString().split("T");

  return `${start}T${end?.slice(0, 5)}`;
};
