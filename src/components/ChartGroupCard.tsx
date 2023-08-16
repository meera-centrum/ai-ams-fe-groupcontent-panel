import React, { FC, useCallback, useState } from 'react';
import { ContentAdjustment } from './content-adjustment';
import { GroupCardActions } from './GroupCardActions';
import Plot from 'react-plotly.js';
import './group-card.css';

interface ChartGroupCardProps {
  data: any;
}

export const ChartGroupCard: FC<ChartGroupCardProps> = ({ data }) => {
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

  /* Renderer */
  return (
    <div className="group-card-root">
      <div className="group-card-header">
        <span>Plot Chart</span>
      </div>
      <div className="group-card-separator" />
      <div className="group-card-content">
        <Plot
          data={[
            {
              type: 'bar',

              x: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                29,
              ],
              y: [
                88, 20, 151, 151, 3, 212, 221, 234, 25, 5, 246, 205, 6, 33, 209, 12, 240, 33, 239, 108, 24, 7, 138, 119,
                182, 76, 54, 0, 126,
              ],
            },
          ]}
          layout={{ showlegend: false }}
          useResizeHandler={true}
          style={{ width: '100%', height: '300px' }}
          config={{ displayModeBar: false }}
        />
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
