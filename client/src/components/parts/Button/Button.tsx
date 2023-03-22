import LoaderSvg from "../../../assets/svg/LoaderSvg";

interface IButtonBasic {
  variant?: TVariant;
  color?: TColors;
  children: React.ReactNode;
  loading?: boolean;
}

interface IButtonSubmit extends IButtonBasic {
  type?: 'submit',
  onClick?: never,
}

interface IButtonNormal extends IButtonBasic {
  type?: never;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => Promise<void>);
}

type IButonProps = IButtonSubmit | IButtonNormal;


function Button({ variant = "text", color = "primary", children, onClick, loading = false, type }: IButonProps) {
  const generateClassName = () => {
    let className =
      "flex items-center gap-x-2 rounded-md px-4 py-2 cursor-pointer font-medium text-sm transition duration-500 tracking-widest disabled:cursor-not-allowed ";

    if (variant === "fulfilled") {
      if (color === "primary") className += "bg-primary text-white hover:bg-primaryLight";
      else if (color === "secondary") className += "bg-secondary text-white hover:bg-secondaryLight";
    } else if (variant === "outline") {
      className += "border ";
      if (color === "primary") className += "border-primary text-primary hover:border-secondary";
      else if (color === "secondary") className += "border-secondary";
    } else if (variant === "text") {
      className += "hover:bg-zinc-50 ";
      if (color === "primary") className += "text-primary hover:text-secondary";
      else if (color === "secondary") className += "text-secondary hover:text-primary";
    }
    return className;
  };

  return (
    <button onClick={onClick} disabled={loading} className={generateClassName()} type={type === 'submit' ? 'submit' : 'button'}>
      { children} {loading && <LoaderSvg />}
    </button>
  );
}

export default Button;
