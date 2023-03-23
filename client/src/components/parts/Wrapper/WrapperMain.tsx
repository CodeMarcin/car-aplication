import { IWrapperProps } from "./Wrapper";

type IWrapperMainProps = Omit<IWrapperProps, "type">;

function WrapperMain({ children }: IWrapperMainProps) {
  return <div className="container mb-[90px] sm:mb-0 flex flex-col sm:flex-row gap-10 px-6 mx-auto my-10">{children}</div>;
}

export default WrapperMain;
