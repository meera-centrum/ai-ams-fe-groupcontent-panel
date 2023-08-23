import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { PanelProps } from '@grafana/data';
import { GroupContentOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { AdjustLayoutButton } from './AdjustLayoutButton';
import { GroupContainer } from './GroupContainer';
import { GroupLayout } from './group-layout';
import { isMessageText } from 'utils/message-utils';
import { COMPONENT, MESSAGE } from 'constants/global-constants';
import { MessageData } from 'types/global-types';
import { chatListFetcher, generateMessage } from 'api/api';
import './group-content-panel.css';

interface Props extends PanelProps<GroupContentOptions> {}

const DEFAULT_GROUP_LAYOUT: GroupLayout = GroupLayout.OneColumn;

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};
/** Functions */
function getKeepItTraceIdFromLocalStorage() {
  const value = localStorage.getItem('keepItTraceId');
  if (value) {
    return JSON.parse(value);
  } else {
    return [];
  }
}
//
function getNotKeepItDataFromLocalStorage() {
  const value = localStorage.getItem('notKeepItData');
  if (value) {
    return JSON.parse(value);
  } else {
    return [];
  }
}
//
function setLocalStorageData(keepItTraceId: string[], notKeepItData: MessageData[]) {
  localStorage.setItem('keepItTraceId', JSON.stringify(keepItTraceId));
  localStorage.setItem('notKeepItData', JSON.stringify(notKeepItData));
}
//

export const GroupContentPanel: React.FC<Props> = ({ options, data, width, height, replaceVariables }) => {
  /** Constants */
  const CONTENT = 'content';
  const TRACE_ID = 'traceId';
  const CREATED_AT = 'createdAt';
  //
  const { chatId, cookie, url } = options;
  const chatIdQueryParameter = replaceVariables(`$${chatId}`);
  const cookieQueryParameter = replaceVariables(`$${cookie}`);
  const urlQueryParameter = replaceVariables(`$${url}`);

  /** Styles */
  const styles = useStyles2(getStyles);
  //
  const contents = data.series
    .map((d) => d.fields.find((f) => f.name === CONTENT))
    .map((f) => f?.values)
    .at(-1)
    ?.toArray();
  //
  const traceIds: any = data.series
    .map((d) => d.fields.find((f) => f.name === TRACE_ID))
    .map((f) => f?.values)
    .at(-1)
    ?.toArray();
  //
  const listOfCreatedAt: any = data.series
    .map((d) => d.fields.find((f) => f.name === CREATED_AT))
    .map((f) => f?.values)
    .at(-1)
    ?.toArray();

  /* States */
  const [selectedGroupLayout, setSelectedGroupLayout] = useState<GroupLayout>(DEFAULT_GROUP_LAYOUT);
  const [keepItTraceId, setKeepItTraceId] = useState<string[]>(getKeepItTraceIdFromLocalStorage);
  const [notKeepItData, setNotKeepItData] = useState<MessageData[]>(getNotKeepItDataFromLocalStorage);
  const [tryAgainTraceId, setTryAgainTraceId] = useState<string[]>([]);

  /** SWR */
  const { data: queryResult } = useSWR(
    () => `${urlQueryParameter}/api/messages?chatId=${chatIdQueryParameter}`,
    chatListFetcher
  );

  /** useMemos */
  const typeofLastMessageData = useMemo(() => {
    return isMessageText(contents![contents!.length - 1]) ? MESSAGE : COMPONENT;
  }, [contents]);
  //
  const convertDate = (timestamp: number) => {
    const date = new Date(timestamp).toLocaleString('en-US');
    return date;
  };
  //
  const getLastData = (): MessageData | null => {
    const lastContent = contents![contents!.length - 1];
    const lastTraceId = traceIds![traceIds!.length - 1];
    const lastCeratedAt = listOfCreatedAt![listOfCreatedAt.length - 1];
    const date = convertDate(lastCeratedAt);

    if (!lastContent || !lastTraceId || !date || keepItTraceId.includes(lastTraceId)) {
      return null;
    }
    const newItem: MessageData = {
      title: 'have no title',
      contentControl: lastContent,
      createdAt: date,
      keepIt: false,
      type: typeofLastMessageData,
      traceId: lastTraceId,
    };
    return newItem;
  };

  /** useEffects */
  useEffect(() => {
    const lastData = getLastData();
    if (!lastData) {
      return;
    }

    let isModified = false;
    setNotKeepItData((prevState) => {
      return [
        ...prevState.map((item) => {
          if (item.type === lastData.type) {
            isModified = true;
            return lastData;
          }
          return item;
        }),
      ];
    });
    if (!isModified) {
      setNotKeepItData((prevState) => [...prevState, lastData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  //
  useEffect(() => {
    setLocalStorageData(keepItTraceId, notKeepItData);
  }, [keepItTraceId, notKeepItData]);

  /* Callbacks */
  const handleSelectGroupLayout = useCallback(
    (groupLayout: GroupLayout) => {
      setSelectedGroupLayout(groupLayout);
    },
    [setSelectedGroupLayout]
  );
  //
  const handleKeepItOption = (id: string) => {
    setKeepItTraceId((prevState) => {
      return [...prevState, id];
    });
    setNotKeepItData((prevState) => prevState.filter((item) => item.traceId !== id));
  };
  //
  const findKeepItContents = () => {
    if (!contents || !traceIds) {
      return [];
    }
    const indexes: number[] = [];
    (traceIds as string[]).forEach((item, index) => {
      if (keepItTraceId.includes(item)) {
        indexes.push(index);
      }
    });
    return indexes.map((index) => {
      return {
        title: 'have no title',
        contentControl: contents[index],
        createdAt: convertDate(listOfCreatedAt[index]),
        keepIt: true,
        type: isMessageText(contents[index]) ? MESSAGE : COMPONENT,
        traceId: traceIds[index],
      };
    });
  };
  //
  const handleDelete = (traceId: string) => {
    console.log(`On delete button click with traceId: ${traceId}`);
  };
  //
  const handleTryAgain = async (traceId: string) => {
    const foundContent = queryResult.find((item: any) => item.traceId === traceId && item.role === 'user').content;
    if (foundContent) {
      setTryAgainTraceId((prevState) => [...prevState, traceId]);
      await generateMessage(chatIdQueryParameter, urlQueryParameter, cookieQueryParameter, foundContent, traceId).then(
        (res) => {
          if (res.ok) {
            setTryAgainTraceId((prevState) => prevState.filter((item) => item !== traceId));
            return res.json();
          }
          return res
            .text()
            .then((text) => Promise.reject(text))
            .catch(() => Promise.reject(res.statusText));
        }
      );
    } else {
      return;
    }
  };
  //
  const messageData = [...findKeepItContents(), ...notKeepItData].map((item) => {
    if (tryAgainTraceId.includes(item.traceId)) {
      return { ...item, isTryAgain: true };
    }
    return item;
  });
  console.log('-----------------------------------');
  console.log('keepItContent', keepItTraceId);
  console.log('notKeepItContent', notKeepItData);
  console.log('final data', messageData);
  console.log('-----------------------------------');
  /** Renderer */
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div
        style={{
          height: '44px',
          margin: '5px 15px 5px 5px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <AdjustLayoutButton groupLayout={selectedGroupLayout} onSelectGroupLayout={handleSelectGroupLayout} />
      </div>
      <GroupContainer
        groupLayout={selectedGroupLayout}
        messageData={messageData}
        url={urlQueryParameter}
        handleKeepItChanged={handleKeepItOption}
        handleDeleteClick={handleDelete}
        handleTryAgainClick={handleTryAgain}
      />
    </div>
  );
};
