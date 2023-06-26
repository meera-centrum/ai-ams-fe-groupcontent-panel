import React, { FC } from 'react';
import { Expand, FormatListBulleted, VerticalAlignCenter } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { ContentAdjustment } from './content-adjustment';

interface ContentAdjustmentPopoverProps {
  anchorElement: HTMLButtonElement | null;
  contentAdjustment: ContentAdjustment;
  onClose: () => void;
  onSelect: (contentAdjustment: ContentAdjustment) => void;
}

export const ContentAdjustmentPopover: FC<ContentAdjustmentPopoverProps> = ({
  anchorElement,
  contentAdjustment,
  onClose,
  onSelect,
}) => {
  /* Callbacks */
  const handleClosePopover = () => {
    onClose();
  };
  //
  const handleShortenContentAdjustmentClick = () => {
    onSelect(ContentAdjustment.Shorten);
    handleClosePopover();
  };
  //
  const handleElaborateContentAdjustmentClick = () => {
    onSelect(ContentAdjustment.Elaborate);
    handleClosePopover();
  };
  //
  const handleBulletizeContentAdjustmentClick = () => {
    onSelect(ContentAdjustment.Bulletize);
    handleClosePopover();
  };

  /* Memos */
  const isPopoverOpen = Boolean(anchorElement);

  /* Renderer */
  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorEl={anchorElement}
      open={isPopoverOpen}
      onClose={handleClosePopover}
    >
      <div style={{ border: 'solid 1px #bbbbbb', borderRadius: '5px' }}>
        <MenuItem
          onClick={handleShortenContentAdjustmentClick}
          style={{
            color: contentAdjustment === ContentAdjustment.Shorten ? '#2D3137' : '#77819A',
          }}
        >
          <VerticalAlignCenter fontSize="small" />
          Shorten
        </MenuItem>
        <MenuItem
          onClick={handleElaborateContentAdjustmentClick}
          style={{
            color: contentAdjustment === ContentAdjustment.Elaborate ? '#2D3137' : '#77819A',
          }}
        >
          <Expand fontSize="small" />
          Elaborate
        </MenuItem>
        <MenuItem
          onClick={handleBulletizeContentAdjustmentClick}
          style={{
            color: contentAdjustment === ContentAdjustment.Bulletize ? '#2D3137' : '#77819A',
          }}
        >
          <FormatListBulleted fontSize="small" />
          Bulletize
        </MenuItem>
      </div>
    </Menu>
  );
};
