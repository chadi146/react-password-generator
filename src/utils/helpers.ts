import { CheckItemEnum } from "@/components/parts/CheckList";

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

export type PasswordAnalysis = {
  id: string;
  password: string;
  strength: number;
  valid: boolean;
};

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

export const calculatePasswordStrength = (
  options: PasswordOptions = {}
): number => {
  let strength = 0;

  // Increase strength based on password length
  const passwordLength = options?.minLength || 8;
  const idealLength = 12;
  if (passwordLength >= idealLength) {
    strength += 1;
    if (passwordLength >= idealLength + 4) {
      strength += 1;
    }
  }

  // Increase strength for including different character types
  const includedCharacterTypes = [
    options?.includeSymbols ? 1 : 0,
    options?.includeNumbers ? 1 : 0,
    options?.includeLowercase ? 1 : 0,
    options?.includeUppercase ? 1 : 0,
  ].filter((type) => type === 1).length;
  strength += includedCharacterTypes;

  // Increase strength for additional criteria (e.g., exclusion of similar characters, sequential characters, etc.)
  const exclusionCriteriaCount =
    (options?.excludeSimilar ? 1 : 0) +
    (options?.excludeDuplicates ? 1 : 0) +
    (options?.excludeSequential ? 1 : 0) +
    (options?.beginWithLetter ? 1 : 0);
  strength += exclusionCriteriaCount;

  // Assign the strength value from 1 to 4
  if (strength < 1) {
    strength = 1;
  } else if (strength > 4) {
    strength = 4;
  }

  return strength;
};

export const generatePassword = (options: PasswordOptions = {}): string => {
  // Define default character sets and minimum counts
  const defaultSymbols = "!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  const defaultNumbers = "1234567890";
  const defaultLowercaseChars = "abcdefghijkmnopqrstuvwxyz";
  const defaultUppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const defaultSimilarChars = "il1Lo0O";
  const defaultAmbiguousChars = "{}[]()/\\'\"`~,;:.<>";

  // Merge user-defined options with default options
  const mergedOptions: PasswordOptions = {
    includeSymbols: false,
    includeNumbers: false,
    includeLowercase: false,
    includeUppercase: false,
    excludeSimilar: false,
    excludeAmbiguous: false,
    excludeDuplicates: false,
    excludeSequential: false,
    beginWithLetter: false,
    minLength: 10,
    maxLength: 10,
    ...options,
  };

  // Create a pool of characters based on the selected options
  let pool = "";
  if (mergedOptions.includeSymbols) {
    pool += mergedOptions.symbols || defaultSymbols;
  }

  if (mergedOptions.includeNumbers) {
    pool += mergedOptions.numbers || defaultNumbers;
  }

  if (mergedOptions.includeLowercase) {
    pool += mergedOptions.lowercaseChars || defaultLowercaseChars;
  }

  if (mergedOptions.includeUppercase) {
    pool += mergedOptions.uppercaseChars || defaultUppercaseChars;
  }

  if (mergedOptions.excludeSimilar) {
    const similarChars = mergedOptions.similarChars || defaultSimilarChars;
    pool = pool
      .split("")
      .filter((char) => !similarChars.includes(char))
      .join("");
  }

  if (mergedOptions.excludeAmbiguous) {
    const ambiguousChars =
      mergedOptions.ambiguousChars || defaultAmbiguousChars;
    pool = pool
      .split("")
      .filter((char) => !ambiguousChars.includes(char))
      .join("");
  }

  // Generate password
  let password = "";
  const poolLength = pool.length;
  const minLength: number = mergedOptions.minLength!;
  const maxLength: number = mergedOptions.maxLength!;
  const passwordLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let previousChar = "";

  const usedChars = new Set<string>();

  for (let i = 0; i < passwordLength; i++) {
    let randomIndex =
      crypto.getRandomValues(new Uint32Array(1))[0] % poolLength;
    let currentChar = pool.charAt(randomIndex);

    if (mergedOptions.excludeDuplicates && usedChars.has(currentChar)) {
      // If duplicate characters are excluded, generate a new character
      i--;
      continue;
    }

    if (mergedOptions.excludeSequential && i > 0) {
      let prevCharCode = previousChar.charCodeAt(0);
      let currCharCode = currentChar.charCodeAt(0);

      if (
        currCharCode - prevCharCode === 1 ||
        prevCharCode - currCharCode === 1
      ) {
        // If sequential characters are excluded, generate a new character
        i--;
        continue;
      }
    }

    if (mergedOptions.beginWithLetter && i === 0) {
      if (!mergedOptions.includeLowercase && !mergedOptions.includeUppercase) {
        // If the password should begin with a letter, generate a new character
        i--;
        continue;
      }
    }

    password += currentChar;
    previousChar = currentChar;
    usedChars.add(currentChar);
  }

  return password;
};

// Function to generate passwords in batches
export const generatePasswordsBatch = (
  count: number,
  options: PasswordOptions = {}
): string[] => {
  const passwords: string[] = [];

  for (let i = 0; i < count; i++) {
    const password = generatePassword(options);
    passwords.push(password);
  }

  return passwords;
};

const convertToCSV = (array: string[]): string => {
  const header = "Id,Value";
  const csvContent = array
    .map((value, index) => `${index + 1},${value.replace(/"/g, '""')}`)
    .join("\n");
  const csvData = `${header}\n${csvContent}`;
  return `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
};

export const exportPasswords = (passwords: string[]): void => {
  const exportedData = convertToCSV(passwords);

  // Create a download link for the exported data
  const downloadLink = document.createElement("a");
  downloadLink.href = exportedData;
  downloadLink.download = `password.csv`;
  downloadLink.click();

  // Remove the download link from the DOM
  downloadLink.remove();
};

export const analyzePasswords = (
  passwords: PasswordAnalysis[],
  options: PasswordOptions
): PasswordAnalysis[] => {
  const passwordAnalysis: PasswordAnalysis[] = [];

  passwords.forEach((item, index) => {
    const { password } = item;

    const analysis: PasswordAnalysis = {
      id: index.toString(),
      password,
      strength: 0,
      valid: true,
    };

    // Validate password against the provided options
    if (options.includeSymbols && !containsAny(password, options.symbols)) {
      analysis.valid = false;
    } else if (
      options.includeNumbers &&
      !containsAny(password, options.numbers)
    ) {
      analysis.valid = false;
    } else if (
      options.includeLowercase &&
      !containsAny(password, options.lowercaseChars)
    ) {
      analysis.valid = false;
    } else if (
      options.includeUppercase &&
      !containsAny(password, options.uppercaseChars)
    ) {
      analysis.valid = false;
    } else if (
      options.excludeSimilar &&
      containsAny(password, options.similarChars)
    ) {
      analysis.valid = false;
    } else if (
      options.excludeAmbiguous &&
      containsAny(password, options.ambiguousChars)
    ) {
      analysis.valid = false;
    } else if (options.excludeDuplicates && hasDuplicates(password)) {
      analysis.valid = false;
    } else if (options.excludeSequential && hasSequentialChars(password)) {
      analysis.valid = false;
    } else if (options.beginWithLetter && !startsWithLetter(password)) {
      analysis.valid = false;
    }

    // Calculate password strength if valid
    if (analysis.valid) {
      analysis.strength = calculatePasswordStrength(options);
    }

    passwordAnalysis.push(analysis);
  });

  return passwordAnalysis;
};

export const importPasswordsFromCSV = (
  file: File
): Promise<PasswordAnalysis[]> => {
  return new Promise((resolve, reject) => {
    const passwordEntries: PasswordAnalysis[] = [];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const csvData = event.target?.result;
      if (typeof csvData === "string") {
        const lines = csvData.split("\n");
        const headers = lines[0].split(",").map((header) => header.trim());

        const idIndex = headers.indexOf("Id");
        const passwordIndex = headers.indexOf("Value");

        if (idIndex === -1 || passwordIndex === -1) {
          reject(
            new Error(
              "Invalid CSV file format. Headers 'Id' and 'Value' are missing."
            )
          );
        }

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line) {
            const values = line.split(",").map((value) => value.trim());
            const id = values[idIndex];
            const password = values[passwordIndex];
            const passwordEntry: PasswordAnalysis = {
              id,
              password,
              strength: 0,
              valid: false,
            };
            passwordEntries.push(passwordEntry);
          }
        }
        resolve(passwordEntries);
      } else {
        reject(new Error("Invalid file format."));
      }
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      reject(event.target?.error);
    };

    reader.readAsText(file);
  });
};

// Utility function to check if a password contains any of the specified characters
const containsAny = (password: string, characters?: string): boolean => {
  if (!characters) {
    return true;
  }
  return characters.split("").some((char) => password.includes(char));
};

// Utility function to check if a password has any duplicate characters
const hasDuplicates = (password: string): boolean => {
  return new Set(password).size !== password.length;
};

// Utility function to check if a password has sequential characters
const hasSequentialChars = (password: string): boolean => {
  for (let i = 0; i < password.length - 2; i++) {
    const char1 = password.charCodeAt(i);
    const char2 = password.charCodeAt(i + 1);
    const char3 = password.charCodeAt(i + 2);
    if (char1 === char2 - 1 && char2 === char3 - 1) {
      return true;
    }
  }
  return false;
};

// Utility function to check if a password starts with a letter
const startsWithLetter = (password: string): boolean => {
  const firstChar = password.charCodeAt(0);
  return (
    (firstChar >= 65 && firstChar <= 90) ||
    (firstChar >= 97 && firstChar <= 122)
  );
};
