import WrapperMain from "./WrapperMain";

export interface IWrapperProps {
  type?: "main";
  children: React.ReactNode;
}

function Wrapper({ type = "main", children }: IWrapperProps) {
  switch (type) {
    case "main":
      return <WrapperMain>{children}</WrapperMain>;
  }
}

export default Wrapper;
