import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText as ConvertRichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/utilities/ui";
import { jsxConverters } from "./converters";

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText({ className, enableGutter = true, ...rest }: Props) {
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        "payload-richtext",
        enableGutter ? "container" : "max-w-none",
        className
      )}
      {...rest}
    />
  );
}
