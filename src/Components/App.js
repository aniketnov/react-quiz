import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Welcome from "./Welcome";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // loading , error , ready , active, finished
  status: "Loading",
  index: 0,
  answer: null,
  point: 0,
  highScore: 0,
  secondRemaining: null,
};

const SEC_PER_QUE = 30;
function reducer(state = initialState, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SEC_PER_QUE,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finshed":
      return {
        ...state,
        status: "finished",
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  // console.log(dispatch);
  const {
    questions,
    status,
    index,
    answer,
    point,
    highScore,
    secondRemaining,
  } = state;

  const totalPoint = questions
    .map((question) => question.points)
    .reduce((acc, curr) => acc + curr, 0);

  const questionsNum = questions.length;

  useEffect(function () {
    async function fetchquestions() {
      try {
        const response = await fetch(`http://localhost:8000/questions`);
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchquestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <Welcome questionsNum={questionsNum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionsNum={questionsNum}
              point={point}
              totalPoint={totalPoint}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                questionsNum={questionsNum}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            point={point}
            totalPoint={totalPoint}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
