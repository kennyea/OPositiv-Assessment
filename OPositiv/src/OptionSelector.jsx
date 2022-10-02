import React from "react";
import "./FloVitamins.css";

export default function OptionSelector({
  optionTypeData,
  setProductAlertText,
  productType,
  setProductType,
}) {
  function handleOptionChange(el) {
    setProductType(el.name);
  }

  const handleOptionType = optionTypeData.map((el, i) => {
    return (
      <div
        key={i}
        className={`custom-checkbox ${
          el.name === "Gummies" ? "box-2" : "box-3"
        }`}
      >
        <input
          type="radio"
          id={el.name}
          value={el.name}
          className="container"
          checked={productType === el.name}
          onChange={() => {
            handleOptionChange(el);
          }}
        />
        <label htmlFor={el.name}>
          <strong>{el.name}</strong>
        </label>
        <p className="option-flavor">{el.flavor}</p>
      </div>
    );
  });

  return (
    <div className="option-section">
      <div className="title box-1">
        <h4>1. Select Option</h4>
      </div>
      {handleOptionType}
    </div>
  );
}
