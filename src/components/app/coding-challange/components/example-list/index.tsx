import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectIndex, selectQuestionBank } from "src/redux/slices";

import "./exampleList.scss";

const ExampleList: React.FC = () => {
  const selectedQueIdx = useSelector(selectIndex);
  const questionBank = useSelector(selectQuestionBank);

  const currentQuestion = useMemo(() => {
    if (!questionBank?.length || selectedQueIdx < 0) return null;
    return questionBank[selectedQueIdx];
  }, [selectedQueIdx, questionBank]);

  return (
    <div className="example-container">
      {currentQuestion?.examples?.map(({ id, input, output }, idx) => (
        <React.Fragment key={id}>
          <div className="example-container__title">Example {idx + 1}</div>
          <div className="example-container__example-tab">
            <div>
              Input: <code>{input}</code>
            </div>
            <div>
              Output: <code>{output}</code>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default memo(ExampleList);
