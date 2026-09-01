"use client";
import React from "react";
import { MagicWandRoom, MagicWandRoomProps } from "./MagicWandRoom";

export const Exterior: React.FC<Pick<MagicWandRoomProps, "selectedColorHex" | "selectedColorName">> = (props) => (
  <MagicWandRoom imageSrc="/visualiser/exterior-new.jpg" {...props} />
);
