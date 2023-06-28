import { useCallback, useEffect, useState } from "react";

type StrengthMeterProps = {
  strength: number;
};

const StrengthMeter = ({ strength }: StrengthMeterProps) => {
  const [strengthText, setStrengthText] = useState<string>("");

  useEffect(() => {
    setStrengthText(getStrengthText(strength));
  }, [strength]);

  const getStrengthText = (strength: number) => {
    if (strength <= 1) {
      return "Too weak!";
    } else if (strength <= 2) {
      return "Weak";
    } else if (strength <= 3) {
      return "Medium";
    } else {
      return "Strong";
    }
  };

  const renderScaleBars = () => {
    const bars = [];

    for (let i = 1; i <= 4; i++) {
      const ceiledStrength = Math.ceil(strength);
      const isActive = i <= ceiledStrength;
      const barStyle = {
        "--color": isActive ? getBarColor(ceiledStrength) : undefined,
      } as any;
      bars.push(<span key={i} className="scale__bar" style={barStyle}></span>);
    }

    return bars;
  };

  const getBarColor = (barIndex: number) => {
    switch (barIndex) {
      case 1:
        return "var(--red)";
      case 2:
        return "var(--orange)";
      case 3:
        return "var(--yellow)";
      case 4:
        return "var(--green)";
      default:
        return undefined;
    }
  };

  return (
    <div className="flex flex-row padding-block-sm padding-inline-md bg-dark uppercase line-height-1">
      <p className="color-light">Strength</p>
      <div className="flex flex-row">
        <span className="strength | fs-md">{strengthText}</span>
        <div className="scale" data-value={strength}>
          {renderScaleBars()}
        </div>
      </div>
    </div>
  );
};

export default StrengthMeter;
