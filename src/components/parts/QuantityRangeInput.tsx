import React from "react";

type QuantityRangeInputType = {
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
};

const QuantityRangeInput = ({
  handleQuantityChange,
  quantity,
}: QuantityRangeInputType) => {
  return (
    <>
      <div className="flex flex-row line-height-1">
        <label htmlFor="quantity-range">Quantity</label>
        <p className="quantity-display | color-green fs-lg">{quantity}</p>
      </div>
      <div className="range">
        <input
          type="range"
          name="quantity"
          id="quantity-range"
          min="1"
          max="50"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <div
          className="range__bar"
          style={{ "--width": `${((quantity - 1) / (50 - 1)) * 100}%` } as any}
        ></div>
      </div>
    </>
  );
};

export default QuantityRangeInput;
