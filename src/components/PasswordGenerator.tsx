import { evalStrength, generatePassword, listItems } from "@/utils/helpers";
import React, { useCallback, useState } from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import CharacterRangeInput from "./parts/CharacterRangeInput";
import CheckList from "./parts/CheckList";
import PasswordPlaceholder from "./parts/PasswordPlaceholder";
import StrengthMeter from "./parts/StrengthMeter";
import ProgressBar from "./parts/ProgressBar";
import QuantityRangeInput from "./parts/QuantityRangeInput";

const PasswordGenerator = () => {
  const [checkItems, setCheckedItems] = useState<string[]>([]);
  const [length, setLength] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(1);
  const [strength, setStrength] = useState<number>(2);
  const [copyBtnActive, setCopyBtnActive] = useState<boolean>(false);
  const [exportTextFile, setExportTextFile] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLength(value);
    setStrength(evalStrength(value, checkItems));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const ItemsCheckedHandler = useCallback(
    (checkItemList: string[]) => {
      setCheckedItems(checkItemList);
      setStrength(evalStrength(length, checkItemList));
    },
    [length]
  );

  const setPasswordWrapper = useCallback(() => {
    setPassword(generatePassword(length, checkItems));
    setCopyBtnActive(false);
  }, [length, checkItems]);

  return (
    <main className="main-grid | grid container">
      <div className="main-grid | grid">
        <PasswordPlaceholder
          setCopyBtnActive={setCopyBtnActive}
          exportTextFile={exportTextFile}
          setExportTextFile={setExportTextFile}
          copyBtnActive={copyBtnActive}
          password={password}
        />

        <ProgressBar keyIndex="p-s" className="password-strength" />
        <StrengthMeter strength={strength} />
        <ProgressBar keyIndex="s-s" className="strength-settings" />
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
        <CheckList
          listItems={listItems}
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
