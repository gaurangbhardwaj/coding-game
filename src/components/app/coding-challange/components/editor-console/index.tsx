import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges, answerOutput } from "src/redux/slices";
import { selectIndex, selectQuestionBank } from "src/redux/slices/index";
import SockJS from "sockjs-client";
import Webstomp from "webstomp-client";

import CodeEditor from "src/components/shared/codeEditor";

import "./editorConsole.scss";

enum ConnectionEnum {
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
}

const EditorConsole: React.FC = () => {
  const dispatch = useDispatch<any>();
  const selectedQueIdx = useSelector(selectIndex);
  const questionBank = useSelector(selectQuestionBank);

  const [codeInput, setCodeInput] = useState("");

  const deafultCode = useMemo(() => {
    if (!questionBank?.length || selectedQueIdx < 0) return "";
    return questionBank[selectedQueIdx]?.default_code;
  }, [selectedQueIdx, questionBank]);

  useEffect(() => {
    if (!questionBank?.length) dispatch(fetchChallenges());
  }, [dispatch, questionBank]);

  const connectionState = useRef<ConnectionEnum>(ConnectionEnum.DISCONNECTED);
  const socketClient = useRef<any>();

  function runOutput() {
    const data = JSON.stringify({
      script: codeInput,
      language: "nodejs",
      versionIndex: 4,
    });

    socketClient.current?.send('/app/execute-ws-api-token', data, {
      message_type: 'execute',
      // token: editorStore.token,
    })
  }

  function onWsConnection() {
    connectionState.current = ConnectionEnum.CONNECTED;
    socketClient.current?.subscribe("/user/queue/execute-i", (message: any) => {
      try {
        const data: string = message.body || "";
        dispatch(
          answerOutput({
            id: selectedQueIdx,
            output: data,
          })
        );
      } catch (e) {
        connectionState.current = ConnectionEnum.DISCONNECTED;
      }
    });
  }

  function onWsConnectionFailed() {}

  useEffect(() => {
    socketClient.current = Webstomp.over(new SockJS("/v1/stomp"), {
      heartbeat: false,
      debug: true,
    });
    connectionState.current = ConnectionEnum.CONNECTING;
    socketClient.current?.connect({}, onWsConnection, onWsConnectionFailed);
  }, []);

  return (
    <div className="editor-console-container">
      {deafultCode && (
        <CodeEditor
          height="50vh"
          width="37vw"
          code={deafultCode}
          onChange={setCodeInput}
        />
      )}
      <div>
        <div className="editor-console-container__title">Ouput:</div>
        <textarea
          className="editor-console-container__output-textarea"
          disabled
          readOnly
          value={""}
        />
        <Button fullWidth={false} variant="contained" color="success">
          Run
        </Button>
      </div>
    </div>
  );
};

export default memo(EditorConsole);
