import React from "react";
import Progress from "./progress";
import QuestionSelector from "./question-selector";

import "./header.scss";

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <div className="header-container__section-container">
        <Progress />
        <QuestionSelector />
      </div>
    </div>
  );
};

export default Header;
