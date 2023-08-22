import React, { FC } from 'react';
import { Check, DeleteOutline, Replay } from '@mui/icons-material';
import { Button } from '@mui/material';

interface GroupCardActionsProps {
  isKeepItOn: boolean;
  handleKeepItClick: () => void;
  handleDeleteClick: () => void;
  handleTryAgainClick?: () => void;
}

export const GroupCardActions: FC<GroupCardActionsProps> = ({
  isKeepItOn,
  handleKeepItClick,
  handleDeleteClick,
  handleTryAgainClick,
}) => {
  /* Renderer */
  return (
    <>
      <Button
        size="small"
        startIcon={<Check />}
        style={{
          // backgroundColor: keepIt ? '#F2F7FF' : '',
          textTransform: 'none',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
        disabled={isKeepItOn}
        onClick={handleKeepItClick}
      >
        Keep It
      </Button>
      <Button
        size="small"
        startIcon={<Replay />}
        style={{
          textTransform: 'none',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
        onClick={handleTryAgainClick}
      >
        Try Again
      </Button>
      <Button
        size="small"
        startIcon={<DeleteOutline />}
        style={{
          textTransform: 'none',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
        }}
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
      {/* <ContentAdjustmentButton
        contentAdjustment={contentAdjustment}
        onSelectContentAdjustment={handleSelectContentAdjustment}
      /> */}
    </>
  );
};
