import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash } from "lucide-react";
import React from "react";

import { Error } from "../Error";
import { Width } from "../Width";
export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
          type="number"
          className="pl-10"
          {...register(name, { required })}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <Hash className="w-4 h-4" />
        </div>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
