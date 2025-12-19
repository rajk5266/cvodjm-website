// // lib/server-translations.ts
// import { getTranslations, createTranslationFunction } from './translations';

// export async function useServerTranslations(locale: string, namespace: string) {
//   const translations = await getTranslations(locale, namespace);
//   const t = createTranslationFunction(translations);
  
//   return {
//     t,
//     translations,
//   };
// }