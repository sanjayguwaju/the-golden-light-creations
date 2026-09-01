"use client";
import React from "react";
import { MagicWandRoom, MagicWandRoomProps } from "./MagicWandRoom";

export const LivingRoom: React.FC<Pick<MagicWandRoomProps, "selectedColorHex" | "selectedColorName">> = (props) => (
  <MagicWandRoom imageSrc="/visualiser/living-room-new.jpg" {...props} />
);
