import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import * as _ from 'lodash';
// @ts-ignore
import * as Plotly from 'plotly.js-dist';

interface PlotProps {
  query: string;
  script: string;
  url: string;
}

const Plot = ({ query: queryBuf, script: scriptBuf, url }: PlotProps) => {
  /** Variables */
  let query = '';
  let script = '';

  /** State and Ref */
  const ref = useRef(null);
  const [errorMsg, setError] = useState<ReactNode>(null);

  /** Change Script */
  script = `const data = originalData;

  // begin
  
  const departmentNames = data.map(d => d.DepartmentName);
  const headcounts = data.map(d => d.NumEmployees);
  
  const trace = {
    x: departmentNames,
    y: headcounts,
    type: 'bar'
  };
  
  const layout = {
    title: 'Departments and Headcounts',
    xaxis: {
      title: 'Department Name'
    },
    yaxis: {
      title: 'Headcount'
    }
  };
  const config = {responsive: false}
  
  Plotly.react(node, [trace], layout,config);`;

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

  /** Renderer */
  return (
    <Fragment>
      <div className="plotly" style={{ width: '100%', height: '350px' }} ref={ref} />
      {errorMsg}
    </Fragment>
  );
};

export default Plot;
