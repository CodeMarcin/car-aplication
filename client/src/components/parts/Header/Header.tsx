interface IHeaderProps {
  text: string;
}
function Header({ text }: IHeaderProps) {
  return (
    <div className="relative py-16 flex w-full justify-center  items-center font-extralight text-7xl decoration-4 sm:text-8xl uppercase border-b-2 border-secondaryDark shadow-md">
      {text}
    </div>
  );
}

export default Header;
