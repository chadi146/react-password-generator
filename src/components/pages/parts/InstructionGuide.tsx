import React from "react";

const InstructionGuide = () => {
  return (
    <div
      className="guide-wrapper flex flex-column bg-light"
      style={{ "--gap": "0.5rem", height: "100%", padding: "20px", maxWidth: '1000px' } as any}
    >
      <label className="fs-lg uppercase text-center">How to guide 💡</label>

      <ul className="grid">
        <li>Increase the quantity to generate multiple passwords</li>
        <li>
          Toggle different options from the settings section to adjust the
          password strength
        </li>
        <li>Play with the length to increase the strength as well</li>
        <li>
          When generating multiple passwords you will be able to export them to
          csv
        </li>
        <li>
          Whenever the generation is complete you can as well copy the
          password(s) to the clipboard
        </li>
      </ul>

      <label className="fs-lg uppercase text-center">Some tips 🏆</label>

      <ul className="grid">
        <li>
          Do not use the same password, security question and answer for
          multiple important accounts.
        </li>
        <li>
          Use a password that has at least 16 characters, use at least one
          number, one uppercase letter, one lowercase letter and one special
          symbol.
        </li>
        <li>
          Do not let your Web browsers to store your passwords, since all passwords saved in
          Web browsers can be revealed easily.
        </li>
      </ul>
    </div>
  );
};

export default InstructionGuide;
