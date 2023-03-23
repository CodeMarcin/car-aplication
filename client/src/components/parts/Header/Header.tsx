interface IHeaderProps {
  text: string;
}
function Header({ text }: IHeaderProps) {
  return (
    <div className="flex w-full items-center sm:mt-[42px] justify-center border-b-2 border-secondaryDark py-8 sm:py-16 text-7xl font-extralight uppercase decoration-4 shadow-md sm:text-8xl">
      {text}
    </div>
  );
}

export default Header;
