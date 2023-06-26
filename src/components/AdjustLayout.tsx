import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { GroupLayout } from './group-layout';
import classNames from 'classnames';
import './adjust-layout.css';

interface AdjustLayoutProps {
  groupLayout: GroupLayout;
  onCancel: () => void;
  onSelect: (groupLayout: GroupLayout) => void;
}

export const AdjustLayout: React.FC<AdjustLayoutProps> = ({ groupLayout, onCancel, onSelect }) => {
  /* States */
  const [selectedLayout, setSelectedLayout] = useState<GroupLayout>(groupLayout);

  /* Callbacks */
  const onCancelButtonClick = () => {
    onCancel();
  };
  //
  const onSelectButtonClick = useCallback(() => {
    onSelect(selectedLayout);
  }, [onSelect, selectedLayout]);
  //
  const onOneColumnClick = useCallback(() => {
    setSelectedLayout(GroupLayout.OneColumn);
  }, [setSelectedLayout]);
  //
  const onTwoColumnsClick = useCallback(() => {
    setSelectedLayout(GroupLayout.TwoColumns);
  }, [setSelectedLayout]);
  //
  const onThreeColumnsClick = useCallback(() => {
    setSelectedLayout(GroupLayout.ThreeColumns);
  }, [setSelectedLayout]);

  /* Renderer */
  return (
    <div className="adjust-layout-root">
      {/* Header */}
      <div>
        <span className="adjust-layout-title">Adjust Layout</span>
      </div>
      {/* Layout Options */}
      <div className="adjust-layout-content">
        <div
          className={classNames('adjust-layout-content-item', 'layout-item-border', {
            selected: selectedLayout === GroupLayout.OneColumn,
          })}
          onClick={onOneColumnClick}
        >
          <div className="adjust-layout-content-item-content one-column" />
        </div>
        <div
          className={classNames('adjust-layout-content-item', 'flex-row-layout', 'layout-item-border', {
            selected: selectedLayout === GroupLayout.TwoColumns,
          })}
          onClick={onTwoColumnsClick}
        >
          <div className="adjust-layout-content-item-content two-columns" />
          <div className="adjust-layout-content-item-content two-columns" />
        </div>
        <div
          className={classNames('adjust-layout-content-item', 'flex-row-layout', 'layout-item-border', {
            selected: selectedLayout === GroupLayout.ThreeColumns,
          })}
          onClick={onThreeColumnsClick}
        >
          <div className="adjust-layout-content-item-content three-columns" />
          <div className="adjust-layout-content-item-content three-columns" />
          <div className="adjust-layout-content-item-content three-columns" />
        </div>
      </div>
      {/* Footer */}
      <div className="adjust-layout-footer-content">
        <Button
          variant="contained"
          style={{
            backgroundColor: '#f4f6f8',
            color: '#737d97',
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={onCancelButtonClick}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#E4EFFF',
            color: '#3381FE',
            marginRight: '15px',
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={onSelectButtonClick}
        >
          Select
        </Button>
      </div>
    </div>
  );
};
