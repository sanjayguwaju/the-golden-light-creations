import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Building2, MapPin, Type } from "lucide-react";
import React from "react";

import { Error } from "../Error";
import { Width } from "../Width";

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const lowerName = name.toLowerCase();
  let Icon = Type;
  if (lowerName.includes("name")) Icon = User;
  else if (lowerName.includes("phone") || lowerName.includes("contact")) Icon = Phone;
  else if (lowerName.includes("company") || lowerName.includes("business")) Icon = Building2;
  else if (
    lowerName.includes("address") ||
    lowerName.includes("city") ||
    lowerName.includes("state") ||
    lowerName.includes("zip") ||
    lowerName.includes("location")
  ) {
    Icon = MapPin;
  }

  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <div className="relative">
        <Input
          defaultValue={defaultValue}
          id={name}
          type="text"
          className="pl-10"
          {...register(name, { required })}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
