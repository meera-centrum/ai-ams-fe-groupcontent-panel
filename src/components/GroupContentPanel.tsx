import React, { useCallback, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { GroupContentOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { AdjustLayoutButton } from './AdjustLayoutButton';
import { GroupContainer } from './GroupContainer';
import { GroupLayout } from './group-layout';

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
  /** Styles */
  const styles = useStyles2(getStyles);
  //
  const rows = data.series.flatMap((d) => d.fields.flatMap((item) => item.values));
  const groupItem = rows.map((item) => ({ title: 'Have no Title', text: item }));

  /* States */
  const [selectedGroupLayout, setSelectedGroupLayout] = useState<GroupLayout>(DEFAULT_GROUP_LAYOUT);

  /* Callbacks */
  const handleSelectGroupLayout = useCallback(
    (groupLayout: GroupLayout) => {
      setSelectedGroupLayout(groupLayout);
    },
    [setSelectedGroupLayout]
  );

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
      <GroupContainer groupLayout={selectedGroupLayout} groupItems={groupItem} />
    </div>
  );
};
