import { memo } from "react";

interface IChipStatus {
  status: TStatus;
}

const ChipStatus = memo(function ChipStatus({ status }: IChipStatus) {
  const generateClassName = () => {
    let className = "flex rounded-full w-fit px-4 py-1 text-xs text-white whitespace-nowrap ";
    switch (status) {
      case "Available":
        className += "bg-success";
        break;
      case "Inaccessible":
        className += "bg-error";
        break;
      case "On the road":
        className += "bg-info";
        break;
    }
    return className;
  };
  return <div className={generateClassName()}>{status}</div>;
});

export default ChipStatus;
