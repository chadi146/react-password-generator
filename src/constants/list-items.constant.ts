import { CheckItemEnum } from "@/components/pages/parts/CheckList";

/* Settings Options list */
export const listItems = [
  {
    id: CheckItemEnum.uppercase,
    text: "Include Uppercase Characters",
    advanced: false,
  },
  {
    id: CheckItemEnum.lowercase,
    text: "Include Lowercase Characters",
    advanced: false,
  },
  {
    id: CheckItemEnum.numbers,
    text: "Include Numbers",
    advanced: false,
  },
  {
    id: CheckItemEnum.symbols,
    text: "Include Symbols",
    advanced: false,
  },
  {
    id: CheckItemEnum.similar,
    text: "Exclude Similar Characters",
    advanced: true,
  },
  {
    id: CheckItemEnum.ambiguous,
    text: "Exclude Ambiguous Characters",
    advanced: true,
  },
  {
    id: CheckItemEnum.duplicates,
    text: "Exclude Duplicates Characters",
    advanced: true,
  },
  {
    id: CheckItemEnum.sequential,
    text: "Exclude Sequential Characters",
    advanced: true,
  },
  {
    id: CheckItemEnum.beginWithLetter,
    text: "Begin with a letter",
    advanced: true,
  },
];
