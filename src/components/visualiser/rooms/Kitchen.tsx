"use client";

import React from "react";
import { MagicWandRoom, MagicWandRoomProps } from "./MagicWandRoom";

export const Kitchen: React.FC<Pick<MagicWandRoomProps, "selectedColorHex" | "selectedColorName">> = (props) => (
  <MagicWandRoom imageSrc="/visualiser/kitchen.jpg" {...props} />
);
