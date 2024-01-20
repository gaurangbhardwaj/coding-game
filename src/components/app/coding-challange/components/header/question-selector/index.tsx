import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionBank,
  selectIndex,
  selectQuestion,
  eraseOutput,
} from "src/redux/slices";

import "./questionSelector.scss";

const QuestionSelector = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const questionBank = useSelector(selectQuestionBank);
  const questionIndex = useSelector(selectIndex);

  const selectQuestionIdx = (id: number) => {
    if (id === questionIndex) return;
    dispatch(selectQuestion(id));
    dispatch(eraseOutput());
  };

  return (
    <div className="question-selector-container">
      <Button
        sx={{ height: 40 }}
        variant="outlined"
        disabled={questionIndex <= 0}
        onClick={() => selectQuestionIdx(questionIndex - 1)}
      >
        Previous
      </Button>
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Question List
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={questionIndex}
          onChange={(e) =>
            selectQuestionIdx(
              !isNaN(Number(e.target.value)) ? Number(e.target.value) : 0
            )
          }
          autoWidth
          label="Question List"
        >
          {questionBank?.map(({ title, id }) => (
            <MenuItem key={id} value={id}>
              {title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {questionIndex >= questionBank?.length - 1 ? (
        <Button
          sx={{ height: 40 }}
          variant="contained"
          onClick={() => navigate("/score-card")}
        >
          Finish
        </Button>
      ) : (
        <Button
          sx={{ height: 40 }}
          variant="contained"
          onClick={() => selectQuestionIdx(questionIndex + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default QuestionSelector;
