function FinishScreen({ point, totalPoint, highScore, dispatch }) {
  const percentage = Math.ceil(point / totalPoint) * 100;
  return (
    <>
      <p className="result">
        your score {point} out of {totalPoint} ({percentage} %)
      </p>
      <p className="highscore">HighScore : {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
