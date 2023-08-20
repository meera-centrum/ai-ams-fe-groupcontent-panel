import { PanelPlugin } from '@grafana/data';
import { GroupContentOptions } from './types';
import { GroupContentPanel } from './components/GroupContentPanel';

export const plugin = new PanelPlugin<GroupContentOptions>(GroupContentPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: 'Default value of text input option',
    })
    .addBooleanSwitch({
      path: 'showSeriesCount',
      name: 'Show series counter',
      defaultValue: false,
    })
    .addTextInput({
      path: 'chatId',
      name: 'Chat Id',
      description: 'chat id',
      defaultValue: 'chatId',
    })
    .addRadio({
      path: 'seriesCountSize',
      defaultValue: 'sm',
      name: 'Series counter size',
      settings: {
        options: [
          {
            value: 'sm',
            label: 'Small',
          },
          {
            value: 'md',
            label: 'Medium',
          },
          {
            value: 'lg',
            label: 'Large',
          },
        ],
      },
      showIf: (config) => config.showSeriesCount,
    });
});
