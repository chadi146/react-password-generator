import React, { useEffect, useState } from "react";

export enum CheckItemEnum {
  uppercase = "uppercase",
  lowercase = "lowercase",
  numbers = "numbers",
  symbols = "symbols",
}

interface ListItem {
  id: CheckItemEnum;
  text: string;
}

interface ChecklistProps {
  listItems: ListItem[];
  checkedItems?: CheckItemEnum[];
  onCheckedItemsChange: (checkedItems: string[]) => void;
}

const CheckList = ({
  listItems,
  checkedItems = [],
  onCheckedItemsChange,
}: ChecklistProps) => {
  const [checked, setChecked] = useState<string[]>(checkedItems);

  const checkItem = (id: string) => {
    const newChecked = checked.includes(id)
      ? checked.filter((c) => c !== id)
      : [...checked, id];
    setChecked(newChecked);
    onCheckedItemsChange(newChecked);
  };

  return (
    <>
      <div className="flex flex-row line-height-1">
        <label>Settings</label>
        <p className="length-display | color-green fs-lg">{checked.length}</p>
      </div>

      <div
        className="grid line-height-1"
        style={{ "--gap": "var(--spacing-sm)" } as any}
      >
        {listItems.map((item) => (
          <React.Fragment key={item.id}>
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
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CheckList;
