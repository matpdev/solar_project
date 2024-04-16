import Insights from "@/components/insignts";
import MapComponent from "@/components/map";
import HomeComponent from "@/components/screen/home";
import { getAllPositions } from "@/repo/serverActionsRepo";

export default async function StartPage() {
  let data = await getAllPositions();

  return <MapComponent locationsData={data}></MapComponent>;
}
