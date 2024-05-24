function NextQuestion({ dispatch, answer, index, questionsNum }) {
  if (answer === null) return null;
  if (index < questionsNum - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === questionsNum - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finshed" })}
      >
        Finish
      </button>
    );
}

export default NextQuestion;
