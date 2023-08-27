import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import * as _ from 'lodash';
// @ts-ignore
import * as Plotly from 'plotly.js-dist';
import { GroupLayout } from './group-layout';

interface PlotProps {
  query: string;
  script: string;
  url: string;
  groupLayout: GroupLayout;
}

const Plot = ({ query: queryBuf, script: scriptBuf, url, groupLayout }: PlotProps) => {
  /** Variables */
  let query = '';
  let script = '';

  /** State and Ref */
  const ref = useRef(null);
  const [errorMsg, setError] = useState<ReactNode>(null);

  //
  try {
    query = atob(decodeURIComponent(queryBuf));
    script = atob(decodeURIComponent(scriptBuf));
  } catch (e: any) {
    console.log('Plot Catch Error', e);
  }

  /** SWR */
  const { data: queryResult } = useSWR(
    () => (!!query && !!script ? `${url}/api/ds?query=${encodeURIComponent(query)}` : null),
    fetcher,
    {}
  );

  /** useEffect */
  useEffect(() => {
    if (ref.current && queryResult) {
      const node = ref.current;
      const { data } = queryResult;
      try {
        let fn: Function;
        if (script.includes('originalData')) {
          fn = new Function('Plotly', 'node', 'originalData', '_', script);
        } else {
          fn = new Function('Plotly', 'node', 'data', '_', script);
        }
        fn(Plotly, node, data, _);
      } catch (e: any) {
        console.log(script);
        console.log(queryResult);
        console.log(e);
        setError(e.message);
      }
    }
  }, [query, queryResult, script]);
  //
  useEffect(() => {
    if (ref.current && queryResult) {
      const refreshScript = 'Plotly.Plots.resize(node);';
      const node = ref.current;
      try {
        let fn: Function;
        fn = new Function('Plotly', 'node', refreshScript);
        console.log('groupLayout', groupLayout);
        fn(Plotly, node);
      } catch (e: any) {
        console.log(e);
        setError(e.message);
      }
    }
  }, [groupLayout, queryResult]);

  /** Renderer */
  return (
    <Fragment>
      <div className="plotly" style={{ height: '350px' }} ref={ref} />
      {errorMsg}
    </Fragment>
  );
};

export default Plot;
