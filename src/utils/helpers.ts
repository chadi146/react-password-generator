import { CheckItemEnum } from "@/components/parts/CheckList";

export const listItems = [
  {
    id: CheckItemEnum.uppercase,
    text: "Include Uppercase Letters",
  },
  {
    id: CheckItemEnum.lowercase,
    text: "Include Lowercase Letters",
  },
  {
    id: CheckItemEnum.numbers,
    text: "Include Numbers",
  },
  {
    id: CheckItemEnum.symbols,
    text: "Include Symbols",
  },
];

export const evalStrength = (length: number, checkItems: string[]) => {
  let passwordStrength = (length / 10) * 2;

  if (checkItems.includes("uppercase")) {
    passwordStrength *= 1.2;
  }

  if (checkItems.includes("lowercase")) {
    passwordStrength *= 1.2;
  }

  if (checkItems.includes("numbers")) {
    passwordStrength *= 1.1;
  }

  if (checkItems.includes("symbols")) {
    passwordStrength *= 1.3;
  }

  return Math.min(Math.max(passwordStrength, 1), 4);
};

export const generatePassword = (length: number, checkItems: string[]) => {
  let chars: string[] = [];
  let generatedPassword = "";

  const charSets: { [key: string]: string[] } = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
    numbers: "0123456789".split(""),
    symbols: "`~!@#$%^&*()-_=+[{]};:'\",.?/".split(""),
  };

  for (const item of checkItems) {
    if (charSets[item]) {
      chars.push(...charSets[item]);
    }
  }

  if (chars.length > 0) {
    for (let i = 0; i < length; i++) {
      generatedPassword += chars[Math.floor(Math.random() * chars.length)];
    }
  }

  return generatedPassword;
};
