import React from "react";
import clsx from "clsx";

export default function LocationItem({
  title,
  street,
  onClick,
  isSelected,
}: {
  title: string;
  street: string;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full my-2 p-2 bg-slate-200 transition-all rounded-xl",
        "hover:cursor-pointer hover:border-2 hover:p-2 hover:bg-slate-400 hover:border-slate-500",
        isSelected ? "border-2 bg-blue-400 border-blue-700" : ""
      )}
      onClick={onClick}
    >
      <h2 className="font-semibold">{title}</h2>
      <p>{street}</p>
    </div>
  );
}
