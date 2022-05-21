export const SolidButton = ({
  disabled = false,
  buttonText,
  fullWidth = false,
  clickHandler = () => {},
}) => {
  return (
    <button
      className="button--sm button__solid button--green button__rounded--lg bold--typography"
      style={
        fullWidth
          ? { width: "100%", height: "fit-content" }
          : { width: "fit-content", height: "fit-content" }
      }
      type="submit"
      disabled={disabled}
      onClick={clickHandler}
    >
      <span className="h6__typography typography--white bold--typography">
        {buttonText}
      </span>
    </button>
  );
};
