export type ChartGroup = {
  title: string;
  chartData: any;
};

export const isChartGroup = (object: any): object is ChartGroup => {
  return 'title' in object && 'chartData' in object;
};
