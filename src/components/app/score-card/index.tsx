import { useState, useEffect } from "react";
import { CircularProgress, Typography, Box, Button } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionBank,
  selectScore,
  resetAnswers,
  eraseOutput,
  selectQuestion,
} from "src/redux/slices";

const ScoreCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const totalScore = useSelector(selectScore);
  const questionBank = useSelector(selectQuestionBank);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!questionBank?.length) return;
    const targetScore = (totalScore / questionBank?.length) * 100;
    const interval = setInterval(() => {
      setScore((prevScore) =>
        prevScore < targetScore ? prevScore + 1 : targetScore
      );
    }, 50);
    return () => clearInterval(interval);
  }, [totalScore, questionBank?.length, score]);

  const resetTest = () => {
    dispatch(resetAnswers(questionBank));
    dispatch(eraseOutput());
    dispatch(selectQuestion(0));
    navigate("/codingchallenge");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Your Score
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={score}
            size={300}
            sx={{
              color: (theme) =>
                score >= 50
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">{`${score}%`}</Typography>
          </Box>
        </Box>
      </div>

      <Box
        sx={{
          gap: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={resetTest} variant="outlined" color="primary">
          Restart Test
        </Button>
        <Link to="/">
          <Button variant="contained" color="primary">
            Home page
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default ScoreCard;
