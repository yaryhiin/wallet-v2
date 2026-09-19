export async function fetchCurrencies() {
  try {
    const res = await fetch(`https://api.frankfurter.dev/v2/currencies`);
    const data = await res.json();
    if (!data.length || data === undefined) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
    return {};
  }
}
