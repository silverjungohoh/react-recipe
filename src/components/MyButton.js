function MyButton({ text, type, onClick }) {
  return (
    <button className={`my-button ${type}`} onClick={onClick}>
      {text}
    </button>
  );
}

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
