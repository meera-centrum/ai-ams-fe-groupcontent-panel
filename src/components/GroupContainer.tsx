import { Grid, GridSize } from '@mui/material';
import React, { useMemo } from 'react';
import { GroupLayout } from './group-layout';
import { TextGroupCard } from './TextGroupCard';
import { isMessageText } from '../utils/message-utils';
import { ControlGroupCard } from './ControlGroupCard';
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
            <Grid key={`groupItem-${index}`} item xs={gridSize} padding="10px">
              {isMessageText(groupItem.text) ? (
                <TextGroupCard data={groupItem} />
              ) : (
                <ControlGroupCard data={groupItem} />
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
