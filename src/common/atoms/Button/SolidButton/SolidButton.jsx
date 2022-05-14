export const SolidButton = ({
  disabled = false,
  buttonText,
  fullWidth = false,
  clickHandler = () => {},
}) => {
  return (
    <button
      className="button--sm button__solid button--green button__rounded--md bold--typography"
      style={fullWidth && { width: "100%" }}
      type="submit"
      disabled={disabled}
      onClick={clickHandler}
    >
      <span className="subtitle1__typography typography--white bold--typography">
        {buttonText}
      </span>
    </button>
  );
};
