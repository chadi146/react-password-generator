import { listItems } from "@/constants";
import { CalculatorHelper, GeneratorHelper } from "@/helpers";
import { PasswordOptions } from "@/models";
import React, { useCallback, useState } from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import CharacterRangeInput from "./parts/CharacterRangeInput";
import CheckList from "./parts/CheckList";
import PasswordPlaceholder from "./parts/PasswordPlaceholder";
import ProgressBar from "./parts/ProgressBar";
import QuantityRangeInput from "./parts/QuantityRangeInput";
import StrengthMeter from "./parts/StrengthMeter";
import InstructionGuide from "./parts/InstructionGuide";

const PasswordGenerator = () => {
  const [checkItems, setCheckedItems] = useState<PasswordOptions>({});
  const [length, setLength] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(1);
  const [strength, setStrength] = useState<number>(2);
  const [copyBtnActive, setCopyBtnActive] = useState<boolean>(false);
  const [exportTextFile, setExportTextFile] = useState<boolean>(false);
  const [withAdvancedFields, setWithAdvancedFields] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<string[]>([]);

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
    setStrength(CalculatorHelper.calculatePasswordStrength(checkItems));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
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
      setStrength(CalculatorHelper.calculatePasswordStrength(checkItemList));
    },
    [length]
  );

  const setPasswordWrapper = useCallback(() => {
    setExportTextFile(quantity > 1 ? true : false);
    setPasswords(GeneratorHelper.generatePasswordsBatch(quantity, checkItems));
    setCopyBtnActive(false);
  }, [checkItems, quantity]);

  return (
    <main className="main-grid grid container">
      <div className="main-grid grid container-section">
        <PasswordPlaceholder
          setCopyBtnActive={setCopyBtnActive}
          exportTextFile={exportTextFile}
          copyBtnActive={copyBtnActive}
          passwords={passwords}
        />

        <ProgressBar keyIndex="p-s" className="password-strength" />
        <StrengthMeter strength={strength} />
        <ProgressBar keyIndex="s-s" className="strength-settings" />

        <InstructionGuide />
      </div>

      <div className="grid bg-light padding-md">
        <QuantityRangeInput
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
        />

        <CharacterRangeInput
          length={length}
          handleLengthChange={handleLengthChange}
        />

        <button
          className="generate-btn | button"
          data-type="toggle"
          onClick={() => {
            setWithAdvancedFields((prev) => !prev);
          }}
        >
          {withAdvancedFields ? "Hide" : "Show"} Advanced Fields
        </button>

        <CheckList
          listItems={listItems}
          withAdvanced={withAdvancedFields}
          onCheckedItemsChange={ItemsCheckedHandler}
        />
        <button
          className="generate-btn | button"
          data-type="action"
          onClick={setPasswordWrapper}
        >
          Generate
          <BsFillArrowRightSquareFill />
        </button>
      </div>
    </main>
  );
};

export default PasswordGenerator;
