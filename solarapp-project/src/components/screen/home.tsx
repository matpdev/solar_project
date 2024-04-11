import { IResponseAPI } from "@/types/requestsTypes";
import Locations from "../locations";
import MapComponent from "../map";
import Insights from "../insignts";
import { Card } from "@mui/material";

export default function HomeComponent() {
  return (
    <div className="w-full max-w-6xl my-5 flex flex-col gap-4 transition-all">
      <div className="flex gap-2 items-center px-2">
        <div className="rounded-full bg-slate-400 w-8 h-8"></div>
        <p>Solar Info</p>
      </div>
      <div className="flex items-center h-[600px] gap-4 w-full">
        <Card
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: "16px",
            height: "600px",
            width: "100%",
          }}
        >
          <MapComponent></MapComponent>
          <Locations></Locations>
        </Card>
        <Insights></Insights>
      </div>
    </div>
  );
}
