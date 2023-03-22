interface ICardProps {
  children: React.ReactNode;
  center?: boolean;
  fullWidth?: boolean;
}

function Card({ children, center = false, fullWidth = false }: ICardProps) {
  return (
    <div className={`flex flex-col gap-y-5 h-fit ring-zinc-100 shadow-md p-4 rounded-xl ring-1 ${center ? "items-center" : ""} ${fullWidth ? "w-full" : "min-w-[300px]"}`}>{children}</div>
  );
}

export default Card;
