import Image from "next/image";

export const CustomLogo = () => {
  return (
    <Image
      src="/light-logo.webp"
      alt="The Golden Light Creations Logo"
      width={400}
      height={400}
      style={{
        objectFit: "contain",
        display: "block",
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export const CustomIcon = () => {
  return (
    <Image
      src="/light-logo.webp"
      alt="The Golden Light Creations Logo"
      width={80}
      height={60}
      style={{ objectFit: "contain" }}
    />
  );
};
