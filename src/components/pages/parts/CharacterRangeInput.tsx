import React, { memo } from "react";

type CharacterRangeInputType = {
  handleLengthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  length: number;
};

const CharacterRangeInput = ({
  handleLengthChange,
  length,
}: CharacterRangeInputType) => {
  return (
    <>
      <div className="flex flex-row line-height-1">
        <label htmlFor="length-range">Length</label>
        <p className="length-display | color-green fs-lg">{length}</p>
      </div>
      <div className="range">
        <input
          type="range"
          name="length"
          id="length-range"
          min="4"
          max="16"
          value={length}
          onChange={handleLengthChange}
        />
        <div
          className="range__bar"
          style={{ "--width": `${((length - 4) / (16 - 4)) * 100}%` } as any}
        ></div>
      </div>
    </>
  );
};

export default memo(CharacterRangeInput);
