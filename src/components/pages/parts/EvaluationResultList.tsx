import React, { memo } from "react";
import StrengthMeter from "./StrengthMeter";
import { RiLockPasswordLine } from "react-icons/ri";
import { PasswordAnalysis } from "@/models";

type EvaluationResultListType = {
  passwords: PasswordAnalysis[];
};

const EvaluationResultList = ({ passwords }: EvaluationResultListType) => {
  return (
    <>
      <label className="fs-md text-center">Evaluation Results</label>
      {passwords && passwords.length > 0 ? (
        <details open>
          <summary>
            <p className="settings">Passwords</p>
          </summary>
          <div
            style={{
              maxHeight: "400px",
              overflowX: "auto",
            }}
          >
            {passwords.map((item) => (
              <React.Fragment key={item.id}>
                <StrengthMeter
                  strength={item.strength}
                  passwordToEvaluate={item.password}
                />
              </React.Fragment>
            ))}
          </div>
        </details>
      ) : (
        <div className="evaluation-none">
          <RiLockPasswordLine size={60} />
          <label className="fs-sm text-center">No passwords to evaluate</label>
        </div>
      )}
    </>
  );
};

export default memo(EvaluationResultList);
