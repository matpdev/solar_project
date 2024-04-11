"use server";

export async function getAllPositions() {
  try {
    let data = await (
      await fetch("http://localhost:8000", {
        next: {
          revalidate: 0,
        },
      })
    ).json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function getAllPositionsRandom() {
  try {
    let data = await (
      await fetch("http://localhost:8000/random", {
        next: {
          revalidate: 0,
        },
      })
    ).json();

    return data;
  } catch (error) {
    return [];
  }
}
