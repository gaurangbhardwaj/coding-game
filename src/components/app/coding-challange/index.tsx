import React, { memo } from "react";

import QuestionText from "./components/question";
import ExampleList from "./components/example-list";
import EditorConsole from "./components/editor-console";

import "./codingChallange.scss";

const CodingChallange: React.FC = () => {
  return (
    <div className="coding-challange-container">
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
