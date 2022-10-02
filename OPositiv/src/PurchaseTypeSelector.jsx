import React from "react";
import "./FloVitamins.css";

export default function PurchaseTypeSelector({
  purchaseTypeData,
  purchaseType,
  setPurchaseType,
  quantity,
}) {
  function handlePurchaseChange(el) {
    setPurchaseType(el.name);
  }

  const handlePurchaseType = purchaseTypeData.map((el, i) => {
    return (
      <div
        key={i}
        className={`custom-checkbox ${
          el.id === "subscribe" ? "box-5" : "box-7"
        }`}
      >
        <input
          type="radio"
          id={el.id}
          className="container"
          checked={purchaseType === el.name}
          onChange={() => {
            handlePurchaseChange(el);
          }}
        />

        <label htmlFor={el.id}>
          <strong>{el.name}</strong>
        </label>
        {el.text}
      </div>
    );
  });

  const handlePurchasePrice = purchaseTypeData.map((el, i) => {
    return (
      <div key={i} className={`${el.id === "subscribe" ? "box-6" : "box-8"}`}>
        <p>
          <strong>{el.pricing[quantity - 1]}</strong>
        </p>
        <p className="subHeader">/BOTTLE</p>
      </div>
    );
  });

  return (
    <div className="purchase-type-section">
      <div className="title box-4">
        <h4>2. Purchase Type:</h4>
      </div>
      {handlePurchaseType}
      {handlePurchasePrice}
    </div>
  );
}
