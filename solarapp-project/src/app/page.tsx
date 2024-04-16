import Insights from "@/components/insignts";
import MapComponent from "@/components/map";
import { getAllPositions } from "@/repo/serverActionsRepo";

export default async function StartPage() {
  let data = await getAllPositions();

  return <MapComponent locationsData={data}></MapComponent>;
}
