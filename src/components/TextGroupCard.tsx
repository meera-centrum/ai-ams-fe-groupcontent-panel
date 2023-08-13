import React, { FC, useCallback, useState } from 'react';
import { ContentAdjustment } from './content-adjustment';
import { GroupCardActions } from './GroupCardActions';
import './group-card.css';

interface TextGroupCardProps {
  data: any;
}

export const TextGroupCard: FC<TextGroupCardProps> = ({ data }) => {
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
        <span>{data.title}</span>
      </div>
      <div className="group-card-separator" />
      <div className="group-card-content">
        <span>{data.text}</span>
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
