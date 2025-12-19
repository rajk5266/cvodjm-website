export function transliterateToGujarati(text: string): string {
  const transliterationMap: Record<string, string> = {
    a: "અ", aa: "આ", i: "ઇ", ee: "ઈ", u: "ઉ", oo: "ઊ",
    e: "એ", ai: "ઐ", o: "ઓ", au: "ઔ",
    k: "ક", kh: "ખ", g: "ગ", gh: "ઘ",
    ch: "ચ", j: "જ", t: "ટ", d: "ડ", 
    n: "ણ", p: "પ", ph: "ફ", b: "બ", bh: "ભ",
    m: "મ", y: "ય", r: "ર", l: "લ", v: "વ",
    sh: "શ", s: "સ", h: "હ",
  };

  let gujaratiText = "";
  let buffer = "";

  for (const char of text.toLowerCase()) {
    buffer += char;
    if (transliterationMap[buffer]) {
      gujaratiText += transliterationMap[buffer];
      buffer = "";
    } else if (!Object.keys(transliterationMap).some(k => k.startsWith(buffer))) {
      // No match found → flush first character
      gujaratiText += transliterationMap[buffer[0]] || buffer[0];
      buffer = buffer.slice(1);
    }
  }

  if (buffer) {
    gujaratiText += transliterationMap[buffer] || buffer;
  }

  return gujaratiText;
}
