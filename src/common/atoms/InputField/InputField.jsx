import React from "react";

export const InputField = ({ name, type, value, changeHandler, label }) => {
  return (
    <div className="inputbox__container">
      <div className="inputbox__container">
        <input
          name={name}
          type={type}
          autoComplete="off"
          className="input--white"
          required
          value={value}
          onChange={changeHandler}
        />
        <label className="inputbox__label--name label__name--white inputbox__label--green">
          <span className="inputbox__label--content">{label}</span>
        </label>
      </div>
    </div>
  );
};
