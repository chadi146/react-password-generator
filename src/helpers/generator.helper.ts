import { PasswordOptions } from "@/models/password.model";

export class GeneratorHelper {
  static generatePasswordsBatch(
    count: number,
    options: PasswordOptions = {}
  ): string[] {
    const passwords: string[] = [];

    for (let i = 0; i < count; i++) {
      const password = this.generatePassword(options);
      passwords.push(password);
    }

    return passwords;
  }

  private static generatePassword(options: PasswordOptions = {}): string {
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
        if (
          !mergedOptions.includeLowercase &&
          !mergedOptions.includeUppercase
        ) {
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
  }
}
