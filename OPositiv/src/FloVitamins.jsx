import React, { useEffect, useState, useRef } from "react";
import "./FloVitamins.css";
import Disco from "./Disco.png";
import OptionSelector from "./OptionSelector";
import PurchaseTypeSelector from "./PurchaseTypeSelector";

export default function FloVitamins() {
  const [productType, setProductType] = useState("Capsule");

  const [purchaseType, setPurchaseType] = useState("Subscribe & Save");
  const [subscribePrice, setSubscribePrice] = useState(
    <p>
      $26.99<br></br>/BOTTLE
    </p>
  );
  const [oneTimePrice, setOneTimePrice] = useState(
    <p>
      $31.99 <br></br> /BOTTLE
    </p>
  );

  const [quantity, setQuantity] = useState(1);
  const [quantityText, setQuantityText] = useState(
    "1 bottle ships every 1 month"
  );

  const [frequentlyBoughtWith, setFrequentlyBoughtWith] = useState(false);

  const [cart, setCart] = useState(["Item Name | Type | Count"]);
  const [price, setPrice] = useState(26.99);
  const [preDiscount, setPreDiscount] = useState(31.99);

  const isMounted = useRef(false);

  const optionTypeData = [
    {
      name: "Gummies",
      flavor: "Strawberry",
    },
    {
      name: "Capsule",
      flavor: "Sugar-Free",
    },
  ];

  const purchaseTypeData = [
    {
      name: "Subscribe & Save",
      id: "subscribe",
      text: (
        <p className="purchase-text">
          Easy to cancel, anytime <br></br> <span>Free Shipping Always</span>
        </p>
      ),
      pricing: ["$26.99", "$24.99", "$24"],
    },
    {
      name: "One Time",
      id: "one-time",
      text: <p className="purchase-text">One Time Purchase</p>,
      pricing: ["$31.99", "$26.99", "$26"],
    },
  ];

  function handleQuantity(num) {
    setQuantity(num);
    setQuantityText("1 bottle ships every 1 month");
    if (num === 1) {
      setQuantityText("1 bottle ships every 1 month");
      setSubscribePrice(
        <p>
          $26.99<br></br>/BOTTLE
        </p>
      );
      setOneTimePrice(
        <p>
          $31.99 <br></br> /BOTTLE
        </p>
      );
    }
    if (num === 2) {
      setQuantityText("2 bottles ship every 2 months");
      setSubscribePrice(
        <p>
          $24.99<br></br>/BOTTLE
        </p>
      );
      setOneTimePrice(
        <p>
          $26.99 <br></br> /BOTTLE
        </p>
      );
    }
    if (num === 3) {
      setQuantityText(
        <p>
          Congrats, you've selected our best value! <br></br> 3 bottles ship
          every 3 month
        </p>
      );
      setSubscribePrice(
        <p>
          $24<br></br>/BOTTLE
        </p>
      );
      setOneTimePrice(
        <p>
          $26 <br></br> /BOTTLE
        </p>
      );
    }
  }

  function handleFrequently() {
    const base = 26.99;
    const basePre = 31.99;
    if (!frequentlyBoughtWith) {
      const newPrice = Number((price + base).toFixed(2));
      const newPreDiscount = Number((preDiscount + basePre).toFixed(2));
      setFrequentlyBoughtWith(true);
      setPrice(newPrice);
      setPreDiscount(newPreDiscount);
    } else {
      const newPrice = Number((price - base).toFixed(2));
      const newPreDiscount = Number((preDiscount - basePre).toFixed(2));
      setFrequentlyBoughtWith(false);
      setPrice(newPrice);
      setPreDiscount(newPreDiscount);
    }
  }

  function handleAddToCart() {
    const newCart = [...cart];
    const prodDetails = (productType, purchaseType, quantity) => {
      let prodString = "";
      if (purchaseType === "One Time" || quantity === 1) {
        if (productType === "Capsule") {
          prodString += "FLO - PMS Vitamin Capsule";
          return prodString;
        } else {
          prodString += "FLO - PMS Gummy Vitamins";
          return prodString;
        }
      } else {
        prodString += `FLO ${productType} - ${quantity} Bottle Subscription`;
      }
      return prodString;
    };

    const subDetails = (purchaseType, quantity) => {
      let subString = "";
      if (purchaseType === "Subscribe & Save") {
        subString += "Subscription";
        if (quantity === 1) {
          subString += " (every month)";
          return subString;
        } else {
          subString += ` (every ${quantity} months)`;
          return subString;
        }
      } else subString += "One time";
      return subString;
    };

    newCart.push(
      `\n${prodDetails(productType, purchaseType, quantity)} | ${subDetails(
        purchaseType,
        quantity
      )} | ${purchaseType === "Subscribe & Save" ? 1 : quantity}`
    );
    if (frequentlyBoughtWith) {
      newCart.push("\nDISCO multivitamin | Subscription (every month) | 1");
    }
    setCart(newCart);
    setProductType("Capsule");
    setPurchaseType("Subscribe & Save");
    setQuantity(1);
    setPrice(26.99);
    setPreDiscount(31.99);
    setFrequentlyBoughtWith(false);
  }

  useEffect(() => {
    if (isMounted.current) {
      alert(cart.join(" "));
    } else {
      isMounted.current = true;
    }
  }, [cart]);

  useEffect(() => {
    const basePrice = 26.99 * quantity;
    const basePreDiscount = 31.99 * quantity;
    if (purchaseType === "Subscribe & Save") {
      setPrice(basePrice);
      setPreDiscount(basePreDiscount);
    } else if (purchaseType === "One Time") {
      setPrice(basePreDiscount);
      setPreDiscount(0);
    }
  }, [quantity, purchaseType]);

  return (
    <div>
      <div className="flovitamins">
        <OptionSelector
          optionTypeData={optionTypeData}
          productType={productType}
          setProductType={setProductType}
        />
        <PurchaseTypeSelector
          purchaseTypeData={purchaseTypeData}
          purchaseType={purchaseType}
          setPurchaseType={setPurchaseType}
          quantity={quantity}
        />
        <div className="quantity-section">
          <div className="title box-9" id="quantity">
            <h4>3. Quantity</h4>
          </div>
          <div className="box-10">
            <button
              className={quantity === 1 ? "selected-button" : "quantity-button"}
              onClick={() => handleQuantity(1)}
            >
              1
            </button>
            <button
              className={quantity === 2 ? "selected-button" : "quantity-button"}
              onClick={() => handleQuantity(2)}
            >
              2
            </button>
            <button
              className={quantity === 3 ? "selected-button" : "quantity-button"}
              onClick={() => handleQuantity(3)}
            >
              3
            </button>
          </div>
          <p className="subHeader box-11 quantity-text">
            {purchaseType === "Subscribe & Save" ? quantityText : ""}
          </p>
        </div>
        <div className="frequently-bought-with">
          <div className="title">
            <h4>4. Frequently Bought With:</h4>
          </div>
          <div>
            <input
              type="checkbox"
              id="fbw"
              className="square"
              checked={frequentlyBoughtWith}
              onChange={handleFrequently}
            ></input>
            <img alt="disco multivitamin" src={Disco} className="disco"></img>
            <label htmlFor="fbw"></label>
            <div id="disco-detail">
              <p>DISCO Multivitamin</p>
              <p className="pink">
                <del>$31.99</del> $26.99
              </p>
              <button
                onClick={() => alert("learn more button clicked!")}
                className="learn-more-link"
              >
                <span id="pink">&#9432;</span>
                <u id="grey">Learn More</u>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">
        <button className="add-to-cart" onClick={handleAddToCart}>
          ADD TO CART {preDiscount > 0 && <del>${preDiscount}</del>} ${price}
        </button>
        <p id="footer">60-day happiness guaranteed</p>
      </div>
    </div>
  );
}
