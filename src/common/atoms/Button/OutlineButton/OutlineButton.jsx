export const OutlineButton = ({
  disabled = false,
  buttonText,
  fullWidth = false,
  clickHandler = () => {},
}) => {
  return (
    <button
      className="button--sm button__outline button__outline--green button__rounded--md  bold--typography"
      style={fullWidth && { width: "100%" }}
      onClick={clickHandler}
      disabled={disabled}
    >
      <span className="subtitle1__typography typography--green">
        {buttonText}
      </span>
    </button>
  );
};
