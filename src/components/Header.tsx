import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

type HeaderType = {
  title: string;
};

const Header = ({ title }: HeaderType) => {
  return (
    <div className="header">
      <h1 className="color-light fs-md text-center">{title}</h1>
      <ThemeSwitcher />
    </div>
  );
};

export default Header;
