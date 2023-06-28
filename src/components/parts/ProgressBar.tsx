import React from "react";

type ProgressBarType = {
  className?: string;
  key?: string;
};

const ProgressBar = ({ className, key = undefined }: ProgressBarType) => {
  return (
    <div className={`progress-bar ${className}`} key={key}>
      <span></span>
    </div>
  );
};

export default ProgressBar;
