import axios from "axios";

export async function getInsights(lat: number, lng: number) {
  let data = await axios.get(
    window.location.origin + "/api/" + lat + "/" + lng + "/"
  );

  if (!("error" in data.data)) return data.data;

  return null;
}
