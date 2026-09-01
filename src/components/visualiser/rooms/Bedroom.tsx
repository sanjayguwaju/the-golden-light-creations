"use client";
import React from "react";
import { MagicWandRoom, MagicWandRoomProps } from "./MagicWandRoom";

export const Bedroom: React.FC<Pick<MagicWandRoomProps, "selectedColorHex" | "selectedColorName">> = (props) => (
  <MagicWandRoom imageSrc="/visualiser/bedroom-new.jpg" {...props} />
);
