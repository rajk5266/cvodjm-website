// // utils/loadTranslations.ts
// export function loadLocaleMessages(locale: string) {
//   const context = require.context(`../locales/${locale}`, true, /\.json$/);

//   const messages: Record<string, any> = {};
//   context.keys().forEach((fileName) => {
//     const key = fileName.replace('./', '').replace('.json', '');
//     messages[key] = context(fileName);
//   });

//   return messages;
// }
