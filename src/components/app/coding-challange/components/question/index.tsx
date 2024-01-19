import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectIndex, selectQuestionBank } from "src/redux/slices";

import "./question.scss";

const QuestionText: React.FC = () => {
  const selectedQueIdx = useSelector(selectIndex);
  const questionBank = useSelector(selectQuestionBank);

  const currentQuestion = useMemo(() => {
    if (!questionBank?.length || selectedQueIdx < 0) return null;
    return questionBank[selectedQueIdx];
  }, [selectedQueIdx, questionBank]);

  return (
    <div className="question-container">
      <div className="question-container__title">{currentQuestion?.title}</div>

      {currentQuestion?.description.map((text, index) => (
        <div key={index}>{text}</div>
      ))}

      <div className="question-container__note">
        <div>Note:</div>
        <ul>
          {currentQuestion?.notes?.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(QuestionText);
