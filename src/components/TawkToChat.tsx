"use client";

import Script from "next/script";

type Props = {
  propertyId?: string | null;
  widgetId?: string | null;
  isEnabled?: boolean | null;
};

export function TawkToChat({ propertyId, widgetId, isEnabled }: Props) {
  // If explicitly disabled in CMS, or if propertyId is missing, do not render
  if (!isEnabled || !propertyId) {
    return null;
  }

  const activeWidgetId = widgetId || "default";

  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          Tawk_API.customStyle = {
            visibility: {
              desktop: { position: 'bl', xOffset: '15px', yOffset: '15px' },
              mobile: { position: 'bl', xOffset: '15px', yOffset: '15px' },
              bubble: { position: 'bl', xOffset: '15px', yOffset: '15px' }
            }
          };
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/${propertyId}/${activeWidgetId}';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
