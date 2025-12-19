// import enHome from "@/locales/en/home.json";
// import hiHome from "@/locales/gu/home.json";
// import enAbout from "@/locales/en/about/about.json";
// import hiAbout from "@/locales/gu/about/about.json";
// ...import all here

const dictionaries = {
  en: {
    // about: enAbout,
  },
  gu: {
    // about: hiAbout,
  },
};

export function getDictionary(lang: keyof typeof dictionaries, page: keyof typeof dictionaries["en"]) {
  return dictionaries[lang][page];
}
