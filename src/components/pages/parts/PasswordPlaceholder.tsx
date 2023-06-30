import { CSVHelper } from "@/helpers";
import React, { memo, useCallback } from "react";
import { BiExport, BiSolidCopy } from "react-icons/bi";

type PasswordPlaceholderType = {
  setCopyBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
  copyBtnActive: boolean;
  exportTextFile: boolean;
  passwords: string[];
};

const PasswordPlaceholder = ({
  setCopyBtnActive,
  copyBtnActive,
  exportTextFile,
  passwords,
}: PasswordPlaceholderType) => {
  const handleCopyClick = useCallback(() => {
    setCopyBtnActive(true);
    if (navigator.clipboard) {
      const text =
        passwords.length > 1 ? JSON.stringify(passwords) : passwords[0];
      navigator.clipboard.writeText(text);
    }
  }, [setCopyBtnActive, passwords]);

  const handleExportPasswordsFile = useCallback(() => {
    CSVHelper.exportPasswords(passwords);
  }, [passwords]);

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
        value={
          passwords.length > 1 ? `${passwords.length} passwords` : passwords
        }
        disabled
      />
      {exportTextFile && (
        <button
          className={`export-btn | button-icon`}
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
        className={`copy-btn | button-icon ${copyBtnActive ? "active" : ""}`}
        data-type="copy"
        onClick={handleCopyClick}
      >
        <span className="visually-hidden">copy password to clipboard</span>
        <BiSolidCopy />
      </button>
    </div>
  );
};

export default memo(PasswordPlaceholder);
