import React, { FC } from 'react';
import { GroupCardActions } from './GroupCardActions';
import Markdown from 'markdown-to-jsx';
import Plot from './Plot';
import TableList from './TableList';
import Error from './Error';
import { TRY_AGAIN_LOADING_TEXT } from 'constants/global-constants';
import './group-card.css';

interface ControlGroupCardProps {
  contentControl: string;
  dateAndTime: string;
  url: string;
  isLoadingTryAgain: boolean;
  isKeepItOn: boolean;
  handleDeleteClick: () => void;
  handleTryAgainClick: () => void;
  handleKeepItClick: () => void;
}

export const ControlGroupCard: FC<ControlGroupCardProps> = ({
  contentControl,
  dateAndTime,
  url,
  isLoadingTryAgain,
  isKeepItOn,
  handleKeepItClick,
  handleDeleteClick,
  handleTryAgainClick,
}) => {
  /* Renderer */
  return (
    <div className="group-card-root">
      <div className="group-card-header">
        <span className="group-card-title">Control Group Card</span>
        <span className="group-card-date">{dateAndTime}</span>
      </div>
      <div className="group-card-separator" />
      <div className="group-card-content">
        {isLoadingTryAgain ? (
          TRY_AGAIN_LOADING_TEXT
        ) : (
          <Markdown
            options={{
              overrides: {
                PlotlyPlot: {
                  component: Plot,
                  props: {
                    url: url,
                  },
                },
                Error: {
                  component: Error,
                },
                TableList: {
                  component: TableList,
                  props: {
                    url: url,
                  },
                },
              },
            }}
          >
            {contentControl}
          </Markdown>
        )}
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
