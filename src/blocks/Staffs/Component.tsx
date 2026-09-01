import type { StaffsBlock as StaffsBlockProps, Staff } from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import RichText from "@/components/RichText";

import { StaffCard } from "@/components/StaffCard";

export const StaffsBlock: React.FC<
  StaffsBlockProps & {
    id?: string;
  }
> = async (props) => {
  const { id, introContent, staffsSelection, departments } = props;

  const payload = await getPayload({ config: configPromise });

  // Fetch staffs
  const fetchedStaffs = await payload.find({
    collection: "staffs",
    depth: 1,
    limit: 1000,
    where: {
      isActive: {
        equals: true,
      },
      showOnWebsite: {
        equals: true,
      },
      ...(staffsSelection === "department" && departments && departments.length > 0
        ? {
            department: {
              in: departments,
            },
          }
        : {}),
    },
    sort: "displayOrder",
  });

  const staffs = fetchedStaffs.docs;

  // Hierarchical Role Mapping Structure
  const roleHierarchy = [
    { value: "chief_consultant", label: "Chief Consultants" },
    { value: "consultant", label: "Consultants" },
    { value: "manager", label: "Managers" },
    { value: "administrator", label: "Administration" },
    { value: "nurse", label: "Nurses" },
    { value: "support_staff", label: "Support Staffs" },
  ];

  const groupedStaffs = staffs.reduce(
    (acc, staff) => {
      const role = staff.roleType || "support_staff";
      if (!acc[role]) acc[role] = [];
      acc[role].push(staff);
      return acc;
    },
    {} as Record<string, Staff[]>
  );

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-12">
          <RichText className="ms-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}

      <div className="container space-y-16">
        {roleHierarchy.map(({ value, label }) => {
          const roleStaffs = groupedStaffs[value];
          if (!roleStaffs || roleStaffs.length === 0) return null;

          return (
            <div key={value} className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight border-b pb-2">{label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {roleStaffs.map((staff) => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
