export async function fetchCharacterData() {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();
    return data;
  }
  