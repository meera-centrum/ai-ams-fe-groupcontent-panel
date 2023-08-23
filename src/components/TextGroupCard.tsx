import React, { FC } from 'react';
import { GroupCardActions } from './GroupCardActions';

import './group-card.css';
import { TRY_AGAIN_LOADING_TEXT } from 'constants/global-constants';

interface TextGroupCardProps {
  contentControl: string;
  dateAndTime: string;
  isLoadingTryAgain: boolean;
  isKeepItOn: boolean;
  handleDeleteClick: () => void;
  handleTryAgainClick?: () => void;
  handleKeepItClick: () => void;
}

export const TextGroupCard: FC<TextGroupCardProps> = ({
  contentControl,
  dateAndTime,
  isLoadingTryAgain,
  isKeepItOn,
  handleDeleteClick,
  handleTryAgainClick,
  handleKeepItClick,
}) => {
  /* Renderer */
  return (
    <div className="group-card-root">
      <div className="group-card-header">
        <span className="group-card-title">Text Group Card</span>
        <span className="group-card-date">{dateAndTime}</span>
      </div>
      <div className="group-card-separator" />
      <div className="group-card-content">
        <span>{isLoadingTryAgain ? <span>{TRY_AGAIN_LOADING_TEXT}</span> : contentControl}</span>
      </div>
      <div className="group-card-footer">
        <GroupCardActions
          isKeepItOn={isKeepItOn}
          handleKeepItClick={handleKeepItClick}
          handleDeleteClick={handleDeleteClick}
          handleTryAgainClick={handleTryAgainClick}
        />
      </div>
    </div>
  );
};
