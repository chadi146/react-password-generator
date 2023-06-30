import { PasswordAnalysis, PasswordOptions } from "@/models/password.model";

export class AnalyzerHelper {
  static analyzePasswords(
    passwords: PasswordAnalysis[],
    options: PasswordOptions
  ): PasswordAnalysis[] {
    const passwordAnalysis: PasswordAnalysis[] = [];

    passwords.forEach((item, index) => {
      const { password } = item;

      const analysis: PasswordAnalysis = {
        id: index.toString(),
        password,
        strength: 0,
      };

      // Validate password against the provided options
      if (
        options.includeSymbols &&
        this.containsAny(password, options.symbols)
      ) {
        analysis.strength += 1;
      }
      if (
        options.includeNumbers &&
        this.containsAny(password, options.numbers)
      ) {
        analysis.strength += 1;
      }
      if (
        options.includeLowercase &&
        this.containsAny(password, options.lowercaseChars)
      ) {
        analysis.strength += 1;
      }
      if (
        options.includeUppercase &&
        this.containsAny(password, options.uppercaseChars)
      ) {
        analysis.strength += 1;
      }
      if (
        options.excludeSimilar &&
        !this.containsAny(password, options.similarChars)
      ) {
        analysis.strength += 1;
      }
      if (
        options.excludeAmbiguous &&
        !this.containsAny(password, options.ambiguousChars)
      ) {
        analysis.strength += 1;
      }
      if (options.excludeDuplicates && !this.hasDuplicates(password)) {
        analysis.strength += 1;
      }
      if (options.excludeSequential && !this.hasSequentialChars(password)) {
        analysis.strength += 1;
      }
      if (options.beginWithLetter && this.startsWithLetter(password)) {
        analysis.strength += 1;
      }

      passwordAnalysis.push(analysis);
    });

    return passwordAnalysis;
  }

  // Utility function to check if a password contains any of the specified characters
  private static containsAny(password: string, characters?: string): boolean {
    if (!characters) {
      return true;
    }
    return characters.split("").some((char) => password.includes(char));
  }

  // Utility function to check if a password has any duplicate characters
  private static hasDuplicates(password: string): boolean {
    return new Set(password).size !== password.length;
  }

  // Utility function to check if a password has sequential characters
  private static hasSequentialChars(password: string): boolean {
    for (let i = 0; i < password.length - 2; i++) {
      const char1 = password.charCodeAt(i);
      const char2 = password.charCodeAt(i + 1);
      const char3 = password.charCodeAt(i + 2);
      if (char1 === char2 - 1 && char2 === char3 - 1) {
        return true;
      }
    }
    return false;
  }

  // Utility function to check if a password starts with a letter
  private static startsWithLetter(password: string): boolean {
    const firstChar = password.charCodeAt(0);
    return (
      (firstChar >= 65 && firstChar <= 90) ||
      (firstChar >= 97 && firstChar <= 122)
    );
  }
}
