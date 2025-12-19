export async function getDynamicContent(lang: string) {
  try {
    const res = await fetch(`http://localhost:9000/api/data?lang=${lang}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch dynamic content: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching dynamic content:", error);
    return { message: "Error loading data" };
  }
}
