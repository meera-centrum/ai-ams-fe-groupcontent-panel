import { Grid, GridSize } from '@mui/material';
import React, { useMemo } from 'react';
import { GroupLayout } from './group-layout';
import { TextGroupCard } from './TextGroupCard';
import { ChartGroupCard } from './ChartGroupCard';
import './group-container.css';

interface GroupContainerProps {
  groupLayout: GroupLayout;
  groupItems: any;
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
        {groupItems.map((groupItem: any, index: any) => {
          return (
            <Grid key={`${groupItem}-${index}`} item xs={gridSize} padding="10px">
              <TextGroupCard data={groupItem} />
              <ChartGroupCard data={groupItem} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

// import { ChartGroupCard } from './ChartGroupCard';
// import { isTextGroup } from './text-group';
// import { isChartGroup } from './chart-group';
// isTextGroup(groupItem) ? (
//   <TextGroupCard data={groupItem} />
// ) : isChartGroup(groupItem) ? (
//   <ChartGroupCard data={groupItem} />
// ) : (
//   <></>
// )
