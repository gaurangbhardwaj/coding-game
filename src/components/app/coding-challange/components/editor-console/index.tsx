import React, { memo, useEffect, useMemo } from "react";
import { Button, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchChallenges,
  appendAnswer,
  answerTested,
  executeCode,
  selectIsExecutingCode,
  selectIndex,
  selectQuestionBank,
  selectOutput,
  selectAnswerSheet,
} from "src/redux/slices";

import CodeEditor from "src/components/shared/codeEditor";

import "./editorConsole.scss";
import { Challenge, Examples } from "src/models";

const EditorConsole: React.FC = () => {
  const dispatch = useDispatch<any>();
  const selectedQueIdx = useSelector(selectIndex);
  const questionBank = useSelector(selectQuestionBank);
  const codeOuput = useSelector(selectOutput);
  const executingCode = useSelector(selectIsExecutingCode);
  const answerSheet = useSelector(selectAnswerSheet);

  useEffect(() => {
    if (!questionBank?.length) dispatch(fetchChallenges());
  }, [dispatch, questionBank]);

  const selectedQuestion: Challenge | any = useMemo(() => {
    if (!questionBank?.length || selectedQueIdx < 0) return "";
    return questionBank[selectedQueIdx];
  }, [selectedQueIdx, questionBank]);

  const appendCodeForTestCases = useMemo(() => {
    if (!selectedQuestion || !Object.keys(selectedQuestion)?.length) return;
    let appendedCode: string =
      answerSheet[selectedQueIdx]?.answer +
      " " +
      (selectedQuestion?.test_function?.join(" ") || "") +
      " ";
    selectedQuestion?.testcase?.forEach((testcase: Examples) => {
      appendedCode +=
        (testcase?.input || "") + " " + (testcase?.output || "") + " ";
    });

    return appendedCode;
  }, [answerSheet, selectedQueIdx, selectedQuestion]);

  const runOutput = () => {
    const codeData = {
      script: appendCodeForTestCases,
      language: "nodejs",
      versionIndex: "0",
    };
    dispatch(executeCode(codeData));
  };

  const updateAnswerSheet = (answer: string) => {
    if (
      !answerSheet[selectedQueIdx]?.tested &&
      !answerSheet[selectedQueIdx]?.output
    )
      dispatch(appendAnswer({ id: selectedQueIdx, answer }));
  };

  useEffect(() => {
    if (
      codeOuput?.output &&
      !answerSheet[selectedQueIdx]?.output &&
      !answerSheet[selectedQueIdx]?.tested
    ) {
      const testedResult: [] = codeOuput.output.split(`\n`);
      const totalTestCases = selectedQuestion?.testcase?.length;
      const totalPassedCases = testedResult.reduce((acc: number, curr: any) => {
        if (curr?.includes("Passed")) ++acc;
        return acc;
      }, 0);
      if (totalTestCases === totalPassedCases) {
        toast.success("Congratulations! All test cases passed");
        dispatch(
          answerTested({ id: selectedQueIdx, output: codeOuput?.output })
        );
      } else {
        toast.error(
          `${totalPassedCases} of ${totalTestCases} test cases passed`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeOuput]);

  return (
    <div className="editor-console-container">
      <CodeEditor
        height="50vh"
        width="37vw"
        code={answerSheet[selectedQueIdx]?.answer || ""}
        onChange={updateAnswerSheet}
        options={{ readOnly: answerSheet[selectedQueIdx]?.tested }}
      />

      <div>
        <div className="editor-console-container__title">
          Run test for all examples:
        </div>
        <textarea
          className="editor-console-container__output-textarea"
          disabled
          readOnly
          value={
            answerSheet[selectedQueIdx]?.tested
              ? answerSheet[selectedQueIdx]?.output
              : codeOuput?.output || ""
          }
        />
        {answerSheet[selectedQueIdx]?.tested ? (
          <Alert severity="success">
            Congratulations! All test cases passed
          </Alert>
        ) : (
          <Button
            fullWidth={false}
            variant="contained"
            color="success"
            onClick={runOutput}
            disabled={!answerSheet[selectedQueIdx]?.answer?.length}
          >
            {executingCode ? (
              <CircularProgress color="inherit" size={25} />
            ) : (
              "Run"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(EditorConsole);
