import { Grid, GridSize } from '@mui/material';
import React, { useMemo } from 'react';
import { GroupLayout } from './group-layout';
import { GroupItems } from './group-items';
import { TextGroupCard } from './TextGroupCard';
import { ChartGroupCard } from './ChartGroupCard';
import { isTextGroup } from './text-group';
import { isChartGroup } from './chart-group';
import './group-container.css';

interface GroupContainerProps {
  groupLayout: GroupLayout;
  groupItems: GroupItems;
}

export const GroupContainer: React.FC<GroupContainerProps> = ({ groupLayout, groupItems }) => {
  /* Memos */
  const gridSize: GridSize = useMemo(() => {
    switch (groupLayout) {
      case GroupLayout.OneColumn:
        return 12;
      case GroupLayout.TwoColumns:
        return 6;
      case GroupLayout.ThreeColumns:
        return 4;
    }
    return 12;
  }, [groupLayout]);

  /* Renderer */
  return (
    <div className="group-container-root">
      <Grid container>
        {groupItems.items.map((groupItem, index) => {
          return (
            <Grid key={`${groupItem.title}-${index}`} item xs={gridSize} padding="10px">
              {isTextGroup(groupItem) ? (
                <TextGroupCard data={groupItem} />
              ) : isChartGroup(groupItem) ? (
                <ChartGroupCard data={groupItem} />
              ) : (
                <></>
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
