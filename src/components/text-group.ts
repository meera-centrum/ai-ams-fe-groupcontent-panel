export type TextGroup = {
  title: string;
  text: string;
};

export const isTextGroup = (object: any): object is TextGroup => {
  return 'title' in object && 'text' in object;
};
