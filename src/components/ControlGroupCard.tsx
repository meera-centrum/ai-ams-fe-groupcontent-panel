import React, { FC, useCallback, useState } from 'react';
import { ContentAdjustment } from './content-adjustment';
import { GroupCardActions } from './GroupCardActions';
import Markdown from 'markdown-to-jsx';
import Plot from './Plot';
import TableList from './TableList';
import Error from './Error';
import './group-card.css';

interface ControlGroupCardProps {
  data: any;
}

export const ControlGroupCard: FC<ControlGroupCardProps> = ({ data }) => {
  /* States */
  const [isKeepItOn, setKeepItOn] = useState<boolean>(false);
  const [contentAdjustment, setContentAdjustment] = useState<ContentAdjustment>(ContentAdjustment.Shorten);

  /* Callbacks */
  const handleKeepItChanged = useCallback(
    (keepIt: boolean) => {
      setKeepItOn(keepIt);
    },
    [setKeepItOn]
  );
  //
  const handleContentAdjustmentChanged = useCallback(
    (contentAdjustment: ContentAdjustment) => {
      setContentAdjustment(contentAdjustment);
    },
    [setContentAdjustment]
  );
  //

  /* Renderer */
  return (
    <div className="group-card-root">
      <div className="group-card-header">
        <span>Control Group Card</span>
      </div>
      <div className="group-card-separator" />
      <div className="group-card-content">
        <Markdown
          options={{
            overrides: {
              PlotlyPlot: {
                component: Plot,
              },
              Error: {
                component: Error,
              },
              TableList: {
                component: TableList,
              },
            },
          }}
        >
          {data.text}
        </Markdown>
      </div>
      <div className="group-card-footer">
        <GroupCardActions
          keepIt={isKeepItOn}
          contentAdjustment={contentAdjustment}
          keepItChanged={handleKeepItChanged}
          contentAdjustmentChanged={handleContentAdjustmentChanged}
        />
      </div>
    </div>
  );
};
