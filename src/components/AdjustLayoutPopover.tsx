import React from 'react';
import { Popover } from '@mui/material';
import { AdjustLayout } from './AdjustLayout';
import { GroupLayout } from './group-layout';

interface AdjustLayoutPopoverProps {
  anchorElement: HTMLButtonElement | null;
  groupLayout: GroupLayout;
  onClose: () => void;
  onSelect: (groupLayout: GroupLayout) => void;
}

export const AdjustLayoutPopover: React.FC<AdjustLayoutPopoverProps> = ({
  anchorElement,
  groupLayout,
  onClose,
  onSelect,
}) => {
  /* Callbacks */
  const handleCloseAdjustPopover = () => {
    onClose();
  };
  //
  const handleCancelButtonClick = () => {
    handleCloseAdjustPopover();
  };
  //
  const handleSelectButtonClick = (groupLayout: GroupLayout) => {
    onSelect(groupLayout);
    handleCloseAdjustPopover();
  };

  /* Memos */
  const isAdjustPopupOpen = Boolean(anchorElement);

  /* Renderer */
  return (
    <Popover
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isAdjustPopupOpen}
      onClose={handleCloseAdjustPopover}
    >
      <AdjustLayout groupLayout={groupLayout} onCancel={handleCancelButtonClick} onSelect={handleSelectButtonClick} />
    </Popover>
  );
};
