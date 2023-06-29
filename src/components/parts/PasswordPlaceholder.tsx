import React from "react";
import { BiSolidCopy, BiExport } from "react-icons/bi";

type PasswordPlaceholderType = {
  setCopyBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
  copyBtnActive: boolean;
  exportTextFile: boolean;
  setExportTextFile: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
};

const PasswordPlaceholder = ({
  setCopyBtnActive,
  copyBtnActive,
  exportTextFile,
  setExportTextFile,
  password,
}: PasswordPlaceholderType) => {
  const handleCopyClick = () => {
    setCopyBtnActive(true);
    if (navigator.clipboard) {
      const text = password;
      navigator.clipboard.writeText(text);
    }
  };

  const handleExportPasswordsFile = () => {
    const element = document.createElement("a");
    const file = new Blob([password], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myPasswords.txt";
    document.body.appendChild(element);
    element.click();

    // remove element after action is done
    element.remove();

    setExportTextFile(false);
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
      {exportTextFile && (
        <button
          className={`copy-btn | button`}
          data-type="export"
          onClick={handleExportPasswordsFile}
        >
          <span className="visually-hidden">
            Export all passwords to a file
          </span>
          <BiExport />
        </button>
      )}

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
