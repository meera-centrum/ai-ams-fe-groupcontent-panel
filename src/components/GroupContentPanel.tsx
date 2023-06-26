import React, { useCallback, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { GroupContentOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { AdjustLayoutButton } from './AdjustLayoutButton';
import { GroupContainer } from './GroupContainer';
import { GroupLayout } from './group-layout';
import { GroupItems } from './group-items';

interface Props extends PanelProps<GroupContentOptions> {}

const DEFAULT_GROUP_LAYOUT: GroupLayout = GroupLayout.OneColumn;

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const GroupContentPanel: React.FC<Props> = ({ options, data, width, height }) => {
  /* States */
  const [selectedGroupLayout, setSelectedGroupLayout] = useState<GroupLayout>(DEFAULT_GROUP_LAYOUT);
  const [groupItems] = useState<GroupItems>({
    items: [
      {
        title: 'Text A',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id neque aliquam vestibulum morbi blandit. Amet porttitor eget dolor morbi non arcu risus. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Tortor consequat id porta nibh venenatis cras sed. In arcu cursus euismod quis viverra nibh cras. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Amet commodo nulla facilisi nullam vehicula ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Diam vulputate ut pharetra sit amet. Aliquam faucibus purus in massa tempor nec. Neque sodales ut etiam sit amet nisl purus in. Magna fermentum iaculis eu non diam phasellus. Dui sapien eget mi proin sed. Feugiat in ante metus dictum at tempor commodo ullamcorper. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Risus nec feugiat in fermentum posuere urna.',
      },
      {
        title: 'Text B',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id neque aliquam vestibulum morbi blandit. Amet porttitor eget dolor morbi non arcu risus. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Tortor consequat id porta nibh venenatis cras sed. In arcu cursus euismod quis viverra nibh cras. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Amet commodo nulla facilisi nullam vehicula ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Diam vulputate ut pharetra sit amet. Aliquam faucibus purus in massa tempor nec. Neque sodales ut etiam sit amet nisl purus in. Magna fermentum iaculis eu non diam phasellus. Dui sapien eget mi proin sed. Feugiat in ante metus dictum at tempor commodo ullamcorper. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Risus nec feugiat in fermentum posuere urna.',
      },
      { title: 'Chart C', chartData: '' },
      {
        title: 'Text D',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id neque aliquam vestibulum morbi blandit. Amet porttitor eget dolor morbi non arcu risus. Fringilla urna porttitor rhoncus dolor purus non enim praesent elementum. Tortor consequat id porta nibh venenatis cras sed. In arcu cursus euismod quis viverra nibh cras. Quam adipiscing vitae proin sagittis nisl rhoncus mattis. Amet commodo nulla facilisi nullam vehicula ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Diam vulputate ut pharetra sit amet. Aliquam faucibus purus in massa tempor nec. Neque sodales ut etiam sit amet nisl purus in. Magna fermentum iaculis eu non diam phasellus. Dui sapien eget mi proin sed. Feugiat in ante metus dictum at tempor commodo ullamcorper. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Risus nec feugiat in fermentum posuere urna.',
      },
      { title: 'Chart E', chartData: '' },
    ],
  });

  /* Callbacks */
  const handleSelectGroupLayout = useCallback(
    (groupLayout: GroupLayout) => {
      setSelectedGroupLayout(groupLayout);
    },
    [setSelectedGroupLayout]
  );

  // const theme = useTheme2();
  const styles = useStyles2(getStyles);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div
        style={{
          height: '44px',
          margin: '5px 15px 5px 5px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <AdjustLayoutButton groupLayout={selectedGroupLayout} onSelectGroupLayout={handleSelectGroupLayout} />
      </div>
      <GroupContainer groupLayout={selectedGroupLayout} groupItems={groupItems} />
    </div>
  );
};
