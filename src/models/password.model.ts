/**
 * Options for analyzed password object.
 */
export type PasswordAnalysis = {
  id: string;
  password: string;
  strength: number;
};

/**
 * Options for password generation.
 */
export type PasswordOptions = {
  includeSymbols?: boolean;
  includeNumbers?: boolean;
  includeLowercase?: boolean;
  includeUppercase?: boolean;
  excludeSimilar?: boolean;
  excludeAmbiguous?: boolean;
  excludeDuplicates?: boolean;
  excludeSequential?: boolean;
  beginWithLetter?: boolean;
  minLength?: number;
  maxLength?: number;
  symbols?: string;
  numbers?: string;
  lowercaseChars?: string;
  uppercaseChars?: string;
  similarChars?: string;
  ambiguousChars?: string;
};
