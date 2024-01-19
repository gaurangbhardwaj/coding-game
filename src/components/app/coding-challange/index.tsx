import React, { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges } from "../../../redux/slices";
import { selectIndex, selectQuestionBank } from "../../../redux/slices/index";

import CodeEditor from "./components/codeEditor";
import "./codingChallange.scss";

const CodingChallange: React.FC = () => {
  const dispatch = useDispatch<any>();
  const selectedQueIdx = useSelector(selectIndex);
  const questionBank = useSelector(selectQuestionBank);

  const deafultCode = useMemo(() => {
    if (!questionBank?.length || selectedQueIdx < 0) return "";
    return questionBank[selectedQueIdx]?.default_code;
  }, [selectedQueIdx, questionBank]);

  useEffect(() => {
    if (!questionBank?.length) dispatch(fetchChallenges());
  }, [dispatch, questionBank]);

  return (
    <div className="coding-challange-container">
      <div className="coding-challange-container__page-container">
        <div className="coding-challange-container__page-container__items-containe">
          1
        </div>
        <div className="coding-challange-container__page-container__items-containe">
          <CodeEditor height="50vh" code={deafultCode} />
        </div>
      </div>
    </div>
  );
};

export default memo(CodingChallange);
