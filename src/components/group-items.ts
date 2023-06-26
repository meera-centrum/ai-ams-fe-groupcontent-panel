import { TextGroup } from './text-group';
import { ChartGroup } from './chart-group';

export type GroupItems = {
  items: (TextGroup | ChartGroup)[];
};
