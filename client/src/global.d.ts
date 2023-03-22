export {};
declare global {
  type TColors = "primary" | "secondary";
  type TVariant = "fulfilled" | "outline" | "text";
  type TStatus = "Available" | "Inaccessible" | "On the road";
  type TActionResulStatus = "Success" | "Error" | "Information";

  interface ISlotBasic {
    children: React.ReactNode;
  }

  interface ISvgCustomIcon {
    width?: string;
    height?: string;
    className?: string;
  }
}
