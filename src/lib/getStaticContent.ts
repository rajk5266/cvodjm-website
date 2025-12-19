
// import fs from "fs";
// import path from "path";

// export function getStaticContent(lang: string, namespace = "common") {
//   const filePath = path.join(process.cwd(), "locales", lang, `${namespace}.json`);

//   try {
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File does not exist: ${filePath}`);
//     }

//     const fileData = fs.readFileSync(filePath, "utf-8");
//     return JSON.parse(fileData);
//   } catch (err) {
//     console.warn(`Could not load ${lang}/${namespace}.json, falling back to English`);

//     const fallbackPath = path.join(process.cwd(), "locales", "en", `${namespace}.json`);

//     if (!fs.existsSync(fallbackPath)) {
//       console.error(`Fallback file does not exist: ${fallbackPath}`);
//       return {};
//     }

//     const fallbackData = fs.readFileSync(fallbackPath, "utf-8");
//     return JSON.parse(fallbackData);
//   }
// }



import fs from "fs";
import path from "path";

export function getStaticContent(lang: string, namespace: string = "common") {
  const basePath = path.join(process.cwd(), "locales");

  const primaryPath = path.join(basePath, lang, `${namespace}.json`);
  const fallbackPath = path.join(basePath, "en", `${namespace}.json`);

  try {
    if (!fs.existsSync(primaryPath)) {
      throw new Error(`File not found: ${primaryPath}`);
    }

    const fileData = fs.readFileSync(primaryPath, "utf-8");
    return JSON.parse(fileData);
  } catch {
    console.warn(
      `Could not load ${lang}/${namespace}.json, falling back to en/${namespace}.json`
    );

    try {
      if (!fs.existsSync(fallbackPath)) {
        throw new Error(`Fallback file not found: ${fallbackPath}`);
      }

      const fallbackData = fs.readFileSync(fallbackPath, "utf-8");
      return JSON.parse(fallbackData);
    } catch {
      console.error(
        `Failed to load fallback en/${namespace}.json. Returning empty object.`
      );
      return {};
    }
  }
}
