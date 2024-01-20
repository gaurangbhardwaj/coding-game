import React, { memo, useEffect } from "react";

import QuestionText from "./components/question";
import ExampleList from "./components/example-list";
import EditorConsole from "./components/editor-console";

import "./codingChallange.scss";
import Header from "./components/header";

import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges, selectQuestionBank } from "src/redux/slices";

const CodingChallange: React.FC = () => {
  const dispatch = useDispatch<any>();
  const questionBank = useSelector(selectQuestionBank);

  useEffect(() => {
    if (!questionBank?.length) dispatch(fetchChallenges());
  }, [dispatch, questionBank?.length]);

  if (!questionBank?.length) return <div>No Test Found</div>;
  return (
    <div className="coding-challange-container">
      <Header />
      <div className="coding-challange-container__page-container">
        <div className="coding-challange-container__page-container__items-container">
          <QuestionText />
          <ExampleList />
        </div>
        <div className="coding-challange-container__page-container__items-container">
          <EditorConsole />
        </div>
      </div>
    </div>
  );
};

export default memo(CodingChallange);
