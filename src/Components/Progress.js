function Progress({ index, questionsNum, point, totalPoint }) {
  return (
    <header className="progress">
      <progress max={questionsNum} value={index} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsNum}
      </p>
      <p>
        <strong>{point}</strong> / {totalPoint} Ponits
      </p>
    </header>
  );
}

export default Progress;
