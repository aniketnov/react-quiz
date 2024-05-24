function Welcome({ questionsNum, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questionsNum} Questions to test your Skill</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let start
      </button>
    </div>
  );
}

export default Welcome;
