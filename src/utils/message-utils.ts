const MESSAGE_TAG_NAME_PATTERN = /<([^br][A-Za-z0-9]+) (.*)\/>/g;
const PLOTLY_PLOT_TAG_NAME = 'PlotlyPlot';
const ERROR_TAG_NAME = 'Error';
const TABLE_LIST_TAG_NAME = 'TableList';
//
function getMatches(string: string, regex: any, index: number): string[] {
  index || (index = 1); // default to the first capturing group
  let matches = [];
  let match;
  while ((match = regex.exec(string))) {
    matches.push(match[index]);
  }
  console.log('matches', matches);
  return matches;
}

export const isMessageText = (message: string) => {
  const regexp = new RegExp(MESSAGE_TAG_NAME_PATTERN);
  return !regexp.test(message);
};

export const isTagNameMatched = (message: string, tagName: string) => {
  const temp = getMatches(message, MESSAGE_TAG_NAME_PATTERN, 0);
  console.log('temp', temp, tagName);
  if (temp !== null && temp.length > 0 && temp[0] === tagName) {
    return true;
  }
  return false;
};

export const isMessagePlot = (message: string) => {
  return isTagNameMatched(message, PLOTLY_PLOT_TAG_NAME);
};

export const isMessageError = (message: string) => {
  return isTagNameMatched(message, ERROR_TAG_NAME);
};

export const isMessageTableList = (message: string) => {
  return isTagNameMatched(message, TABLE_LIST_TAG_NAME);
};
