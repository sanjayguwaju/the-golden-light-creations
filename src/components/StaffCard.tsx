import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utilities/ui";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Staff, Media } from "@/payload-types";

// Helper to resolve title prefix
export const getTitlePrefixLabel = (val: string | null | undefined) => {
  const map: Record<string, string> = {
    dr: "Dr.",
    mr: "Mr.",
    ms: "Ms.",
    mrs: "Mrs.",
    prof: "Prof.",
  };
  return val && map[val] ? map[val] : "";
};

// Helper to resolve department label
export const getDeptLabel = (val: string | null | undefined) => {
  const map: Record<string, string> = {
    anaesthesiology: "Anaesthesiology",
    orthopedics: "Orthopedics",
    obs_gynae: "Obstetrics & Gynaecology",
    general_surgery: "General Surgery",
    general_medicine: "General Medicine",
    ophthalmology: "Ophthalmology",
    ent: "ENT",
    paediatrics: "Paediatrics",
    nursing_admin: "Nursing Administration",
    internal_medicine: "Internal Medicine",
  };
  return val && map[val] ? map[val] : val || "";
};

export interface StaffCardProps {
  staff: Staff;
}

export const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  const photoUrl =
    staff.profilePhoto && typeof staff.profilePhoto === "object"
      ? (staff.profilePhoto as Media).url
      : null;
  const photoAlt =
    staff.profilePhoto && typeof staff.profilePhoto === "object"
      ? (staff.profilePhoto as Media).alt || staff.fullName
      : staff.fullName;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-card">
      <div className="aspect-square relative bg-muted flex items-center justify-center overflow-hidden">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={photoAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-4xl text-muted-foreground font-light">
            {staff.fullName.charAt(0)}
          </div>
        )}
      </div>
      <CardHeader className="p-4 grow">
        <CardTitle className="line-clamp-1 text-lg">
          <span className="text-muted-foreground font-normal text-sm mr-1">
            {getTitlePrefixLabel(staff.titlePrefix)}
          </span>
          {staff.fullName}
        </CardTitle>
        <CardDescription className="line-clamp-1 h-5">{staff.designation}</CardDescription>
        <div className="pt-2">
          <Badge variant="secondary" className="font-normal text-xs hover:bg-secondary">
            {getDeptLabel(staff.department)}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Link
          href={`/staffs/${staff.slug}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}
        >
          See full details
        </Link>
      </CardFooter>
    </Card>
  );
};
