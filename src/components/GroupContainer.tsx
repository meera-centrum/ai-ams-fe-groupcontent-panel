import { Grid, GridSize } from '@mui/material';
import React, { useMemo } from 'react';
import { GroupLayout } from './group-layout';
import { TextGroupCard } from './TextGroupCard';
import { ControlGroupCard } from './ControlGroupCard';
import { MessageData } from 'types/global-types';
import { MESSAGE } from 'constants/global-constants';

import './group-container.css';
interface GroupContainerProps {
  groupLayout: GroupLayout;
  messageData: MessageData[];
  handleKeepItChanged: (traceId: string) => void;
  handleTryAgainClick: (traceId: string) => void;
  handleDeleteClick: (traceId: string) => void;
}

export const GroupContainer: React.FC<GroupContainerProps> = ({
  groupLayout,
  messageData,
  handleKeepItChanged,
  handleTryAgainClick,
  handleDeleteClick,
}) => {
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
        {messageData.map((item, index) => {
          return (
            <Grid key={`messageData-${index}`} item xs={gridSize} padding="10px">
              {item.type === MESSAGE ? (
                <TextGroupCard
                  contentControl={item.contentControl}
                  dateAndTime={item.createdAt}
                  isLoadingTryAgain={Boolean(item.isTryAgain)}
                  isKeepItOn={item.keepIt}
                  handleKeepItClick={() => handleKeepItChanged(item.traceId)}
                  handleDeleteClick={() => handleDeleteClick(item.traceId)}
                  handleTryAgainClick={() => handleTryAgainClick(item.traceId)}
                />
              ) : (
                <ControlGroupCard
                  contentControl={item.contentControl}
                  dateAndTime={item.createdAt}
                  isLoadingTryAgain={Boolean(item.isTryAgain)}
                  isKeepItOn={item.keepIt}
                  handleKeepItClick={() => handleKeepItChanged(item.traceId)}
                  handleDeleteClick={() => handleDeleteClick(item.traceId)}
                  handleTryAgainClick={() => handleTryAgainClick(item.traceId)}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
