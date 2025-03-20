import Image from "next/image";
import Link from "next/link";

import Menu from "./menu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 w-full flex justify-between items-center">
        <div className="flex justify-start items-center">
          <Link href="/" className="flex">
            <Image
              priority={true}
              src="/images/survey-icon.png"
              width={48}
              height={48}
              alt={`AI Survey App logo`}
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              AI Survey App
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
