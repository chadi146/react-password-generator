import { PasswordOptions } from "@/models/password.model";

export class CalculatorHelper {
  static calculatePasswordStrength(options: PasswordOptions = {}): number {
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
  }
}
