import Insights from "@/components/insignts";
import MapComponent from "@/components/map";
import {
  getAllPositions,
  getAllPositionsRandom,
} from "@/repo/serverActionsRepo";

export default async function StartPage() {
  let data = await getAllPositionsRandom();

  return <MapComponent locationsData={data}></MapComponent>;
}
