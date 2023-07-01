import { PasswordAnalysis } from "@/models/password.model";

/**
 * Helper class for importing and exporting passwords to/from CSV format.
 */
export class CSVHelper {
  /**
   * Imports passwords from a CSV file.
   * @param file - The CSV file to import passwords from.
   * @returns A Promise that resolves to an array of PasswordAnalysis objects.
   */
  static importPasswordsFromCSV(file: File): Promise<PasswordAnalysis[]> {
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
  }

  /**
   * Exports passwords to a CSV file and triggers a download.
   * @param passwords - An array of passwords to export.
   */
  static exportPasswords(passwords: string[]): void {
    const exportedData = this.convertToCSV(passwords);

    // Create a download link for the exported data
    const downloadLink = document.createElement("a");
    downloadLink.href = exportedData;
    downloadLink.download = `password.csv`;
    downloadLink.click();

    // Remove the download link from the DOM
    downloadLink.remove();
  }

  /**
   * Converts an array of strings to a CSV string.
   * @param array - The array of strings to convert.
   * @returns The CSV data as a string.
   */
  private static convertToCSV(array: string[]): string {
    const header = "Id,Value";
    const csvContent = array
      .map((value, index) => `${index + 1},${value.replace(/"/g, '""')}`)
      .join("\n");
    const csvData = `${header}\n${csvContent}`;
    return `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
  }
}
