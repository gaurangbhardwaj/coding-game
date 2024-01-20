import React, { memo, useMemo } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useSelector } from "react-redux";
import { selectQuestionBank, selectScore } from "src/redux/slices";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Progress: React.FC = () => {
  const score = useSelector(selectScore);
  const questions = useSelector(selectQuestionBank);
  const progress: number = useMemo(() => {
    return Number(((score / questions.length) * 100).toFixed(2));
  }, [questions.length, score]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 4,
          padding: 5,
        }}
      >
        <EmojiEventsIcon /> {score} / {questions.length}
      </div>
      <BorderLinearProgress variant="determinate" value={progress} />
    </>
  );
};

export default memo(Progress);
