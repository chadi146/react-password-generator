import { PasswordOptions } from "@/utils/helpers";
import React, { useState } from "react";

export enum CheckItemEnum {
  uppercase = "uppercase",
  lowercase = "lowercase",
  numbers = "numbers",
  symbols = "symbols",
  similar = "similar",
  ambiguous = "ambiguous",
  duplicates = "duplicates",
  sequential = "sequential",
  beginWithLetter = "begin-with-letter",
}

interface ListItem {
  id: CheckItemEnum;
  text: string;
  advanced: boolean;
}

interface ChecklistProps {
  listItems: ListItem[];
  checkedItems?: CheckItemEnum[];
  withAdvanced?: boolean;
  onCheckedItemsChange: (checkedItems: PasswordOptions) => void;
}

const CheckList = ({
  listItems,
  checkedItems = [],
  onCheckedItemsChange,
  withAdvanced = false,
}: ChecklistProps) => {
  const [checked, setChecked] = useState<string[]>(checkedItems);

  const checkItem = (id: string) => {
    const newChecked = checked.includes(id)
      ? checked.filter((c) => c !== id)
      : [...checked, id];
    setChecked(newChecked);

    const passwordOptions: PasswordOptions = {
      includeLowercase: false,
      includeUppercase: false,
      includeSymbols: false,
      excludeAmbiguous: false,
      beginWithLetter: false,
      excludeDuplicates: false,
      includeNumbers: false,
      excludeSequential: false,
      excludeSimilar: false,
    };

    newChecked.forEach((item) => {
      switch (item) {
        case CheckItemEnum.lowercase:
          passwordOptions.includeLowercase = true;
          break;
        case CheckItemEnum.uppercase:
          passwordOptions.includeUppercase = true;
          break;
        case CheckItemEnum.symbols:
          passwordOptions.includeSymbols = true;
          break;
        case CheckItemEnum.ambiguous:
          passwordOptions.excludeAmbiguous = true;
          break;
        case CheckItemEnum.beginWithLetter:
          passwordOptions.beginWithLetter = true;
          break;
        case CheckItemEnum.duplicates:
          passwordOptions.excludeDuplicates = true;
          break;
        case CheckItemEnum.numbers:
          passwordOptions.includeNumbers = true;
          break;
        case CheckItemEnum.sequential:
          passwordOptions.excludeSequential = true;
          break;
        case CheckItemEnum.similar:
          passwordOptions.excludeSimilar = true;
          break;
        default:
          // Handle any unknown entries (if necessary)
          break;
      }
    });

    onCheckedItemsChange(passwordOptions);
  };

  return (
    <details>
      <summary>
        <div className="settings flex-row line-height-1">
          <label>Settings</label>
          <p className="length-display | color-green fs-lg">{checked.length}</p>
        </div>
      </summary>

      <div
        className="grid line-height-1"
        style={{ "--gap": "var(--spacing-sm)" } as any}
      >
        {listItems.map((item) => {
          const itemToRender = (
            <label className="checkbox" htmlFor={item.id}>
              <input
                type="checkbox"
                name={item.id}
                id={item.id}
                checked={checked.includes(item.id)}
                onChange={() => checkItem(item.id)}
              />
              <span className="checkbox__box"></span>
              {item.text}
            </label>
          );

          return (
            <React.Fragment key={item.id}>
              {!withAdvanced && !item.advanced
                ? itemToRender
                : withAdvanced
                ? itemToRender
                : null}
            </React.Fragment>
          );
        })}
      </div>
    </details>
  );
};

export default CheckList;
