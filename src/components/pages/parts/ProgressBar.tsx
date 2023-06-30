import React, { memo } from "react";

type ProgressBarType = {
  className?: string;
  keyIndex?: string;
};

const ProgressBar = ({ className, keyIndex = undefined }: ProgressBarType) => {
  return (
    <div className={`progress-bar ${className}`} key={keyIndex}>
      <span></span>
    </div>
  );
};

export default memo(ProgressBar);
