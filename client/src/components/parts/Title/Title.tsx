interface ITitleProps {
  children: React.ReactNode;
}

function Title({ children }: ITitleProps) {
  return <p className="flex gap-x-2 font-medium font-sm">{children}</p>;
}

export default Title;
