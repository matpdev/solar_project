"use server";

export async function getAllPositions() {
  try {
    let data = await (
      await fetch(`${process.env.NEXT_PUBLIC_URL}`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}random`, {
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
