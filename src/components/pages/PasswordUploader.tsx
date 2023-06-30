import React, { ChangeEvent, useCallback, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { toast } from "react-toastify";
import CharacterRangeInput from "./parts/CharacterRangeInput";
import CheckList from "./parts/CheckList";
import StrengthMeter from "./parts/StrengthMeter";
import { listItems } from "@/constants";
import { PasswordAnalysis, PasswordOptions } from "@/models";
import { AnalyzerHelper, CSVHelper } from "@/helpers";

const PasswordUploader = () => {
  const [passwords, setPasswords] = useState<PasswordAnalysis[]>([]);
  const [checkItems, setCheckedItems] = useState<PasswordOptions>({});
  const [resetUpload, setResetUpload] = useState<boolean>(false);
  const [length, setLength] = useState<number>(10);

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        CSVHelper.importPasswordsFromCSV(file)
          .then((importedPasswords) => {
            setPasswords(
              AnalyzerHelper.analyzePasswords(importedPasswords, checkItems)
            );
          })
          .catch((error) => {
            event.target.value = null as any;
            toast(
              "Failed to upload csv file. Something is wrong in the format. Kindly re-check :)",
              {
                hideProgressBar: true,
                autoClose: 3000,
                type: "error",
                position: "top-center",
              }
            );
            console.error(error);
          });
      }

      if (resetUpload) {
        event.target.value = null as any;
        setResetUpload(false);
      }
    },
    [resetUpload, checkItems]
  );

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLength(value);
    setCheckedItems((prev) => {
      return {
        ...prev,
        minLength: value,
        maxLength: value,
      };
    });
  };

  const ItemsCheckedHandler = useCallback(
    (checkItemList: PasswordOptions) => {
      setCheckedItems((prev) => {
        return {
          ...prev,
          ...checkItemList,
          minLength: length,
          maxLength: length,
        };
      });
    },
    [length]
  );

  return (
    <main className="main-grid | grid container">
      <div className="wrapper-upload">
        <input
          type="file"
          accept=".csv"
          data-type="upload"
          onChange={handleFileUpload}
        />
        <GrPowerReset
          onClick={() => {
            setResetUpload(true);
          }}
        />
      </div>
      <div className="grid bg-light padding-md">
        <CharacterRangeInput
          length={length}
          handleLengthChange={handleLengthChange}
        />

        <CheckList
          listItems={listItems}
          withAdvanced={true}
          onCheckedItemsChange={ItemsCheckedHandler}
        />
      </div>
      {passwords && passwords.length > 0 && (
        <details open>
          <summary>
            <p className="settings">Evaluated Passwords</p>
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
      )}
    </main>
  );
};

export default PasswordUploader;
