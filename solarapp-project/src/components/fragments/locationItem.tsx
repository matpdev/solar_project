import React from "react";
import clsx from "clsx";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";

export default function LocationItem({
  title,
  street,
  lat,
  lng,
  onClick,
  isSelected,
}: {
  title: string;
  street: string;
  lat: number;
  lng: number;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div onClick={onClick}>
      <Card
        className={clsx(
          "flex flex-col w-full my-2 p-2 transition-all rounded-xl",
          "hover:cursor-pointer hover:border-2 hover:p-2 hover:bg-slate-200 hover:border-slate-300",
          isSelected ? "border-2 bg-blue-400 border-blue-700" : ""
        )}
      >
        <CardHeader>
          <p className="font-semibold text-xl">{title}</p>
        </CardHeader>
        <Divider></Divider>
        <CardBody>
          <p>Endereço: {street}</p>
        </CardBody>
        <Divider></Divider>
        <CardFooter>
          <p>
            Latitude: {lat} | Longitude: {lng}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
