import React, { FC, useCallback, useState } from 'react';
import { ChartGroup } from './chart-group';
import { ContentAdjustment } from './content-adjustment';
import { EChartsOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { mockChartData } from './mock-chart-data';
import { GroupCardActions } from './GroupCardActions';
import './group-card.css';

interface ChartGroupCardProps {
  data: ChartGroup;
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
  //
  const chartOptions: EChartsOption = {
    title: {
      text: '',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      name: 'Date',
    },
    yAxis: {
      name: 'Production',
    },
    series: [
      {
        data: mockChartData,
        type: 'line',
        showSymbol: false,
        encode: {
          x: 'Date',
          y: 'Production',
          itemName: 'Date',
          tooltip: ['Production'],
        },
      },
    ],
  };

  /* Renderer */
  return (
    <div className="group-card-root">
      <div className="group-card-header">
        <span>{data.title}</span>
      </div>
      <div className="group-card-separator" />
      <div className="group-card-content">
        <ReactEcharts option={chartOptions} />
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
