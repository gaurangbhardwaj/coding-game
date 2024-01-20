import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges } from "src/redux/slices";
import {
  selectIndex,
  selectQuestionBank,
  selectAuthToken,
  fetchToken,
} from "src/redux/slices/index";
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
  const authToken = useSelector(selectAuthToken);

  const [codeInput, setCodeInput] = useState("");

  const deafultCode = useMemo(() => {
    if (!questionBank?.length || selectedQueIdx < 0) return "";
    return questionBank[selectedQueIdx]?.default_code;
  }, [selectedQueIdx, questionBank]);

  useEffect(() => {
    if (!questionBank?.length) dispatch(fetchChallenges());
    if (!authToken) dispatch(fetchToken());
  }, [authToken, dispatch, questionBank]);

  const connectionState = useRef<ConnectionEnum>(ConnectionEnum.DISCONNECTED);
  const socketClient = useRef<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runOutput = async (tokenExpired = false) => {
    if (tokenExpired) {
      await dispatch(fetchToken());
    }
    const data = JSON.stringify({
      script: codeInput,
      language: "nodejs",
      versionIndex: 4,
    });
    socketClient.current?.send("/app/execute-ws-api-token", data, {
      message_type: "execute",
      token: authToken,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onWsConnection = () => {
    connectionState.current = ConnectionEnum.CONNECTED;
    socketClient.current?.subscribe(
      "/user/queue/execute-i",
      async (message: any) => {
        try {
          const statusCode: number = parseInt(message.headers.statusCode);
          if (statusCode === 400) {
            runOutput(true);
            return;
          }

          const data: string = message.body || "";
          // dispatch(
          //   answerOutput({
          //     id: selectedQueIdx,
          //     output: data,
          //   })
          // );
        } catch (e) {
          connectionState.current = ConnectionEnum.DISCONNECTED;
        }
      }
    );
  };

  function onWsConnectionFailed() {
    connectionState.current = ConnectionEnum.DISCONNECTED;
  }

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
        <Button
          fullWidth={false}
          variant="contained"
          color="success"
          onClick={() => runOutput()}
        >
          Run
        </Button>
      </div>
    </div>
  );
};

export default memo(EditorConsole);
