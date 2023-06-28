import React from "react";
import { BiSolidCopy } from "react-icons/bi";

type PasswordPlaceholderType = {
  setCopyBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
  copyBtnActive: boolean;
  password: string;
};

const PasswordPlaceholder = ({
  setCopyBtnActive,
  copyBtnActive,
  password,
}: PasswordPlaceholderType) => {
  const handleCopyClick = () => {
    setCopyBtnActive(true);
    if (navigator.clipboard) {
      const text = password;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div
      className="flex flex-row bg-light padding-left-md"
      style={{ "--gap": "0.5rem" } as any}
    >
      <label htmlFor="output" className="visually-hidden"></label>
      <input
        type="text"
        id="output"
        className="output | fs-lg"
        placeholder="P4$5W0rD!"
        value={password}
        disabled
      />
      <button
        className={`copy-btn | button ${copyBtnActive ? "active" : ""}`}
        data-type="copy"
        onClick={handleCopyClick}
      >
        <span className="visually-hidden">copy password to clipboard</span>
        <BiSolidCopy />
      </button>
    </div>
  );
};

export default PasswordPlaceholder;
