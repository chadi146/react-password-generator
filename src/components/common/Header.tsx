import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Link from "next/link";

type HeaderType = {
  title: string;
  withBackButton?: boolean;
};

const Header = ({ title, withBackButton = false }: HeaderType) => {
  return (
    <div className="header bg-light">
      {withBackButton && (
        <Link className="back-arrow" href={"/"}>
          <BsFillArrowLeftCircleFill />
        </Link>
      )}

      <h1 className="color-light fs-md text-center">{title}</h1>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
