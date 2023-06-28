import { useTheme } from "next-themes";
import { memo, useCallback, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../styles/themeSwitcher.css";

const ThemeSwitcher = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setToggled(currentTheme === "dark" ? true : false);
  }, [currentTheme]);

  const onThemeChange = useCallback(() => {
    if (currentTheme === "dark") {
      setTheme("light");
      setToggled(false);
    } else {
      setTheme("dark");
      setToggled(true);
    }
  }, [currentTheme, setTheme]);

  const onChange = (evt: any) => {
    setToggled(evt.target.checked);
  };

  return (
    <div className="theme-switcher-wrapper">
      <button aria-label="Toggle Theme" onClick={onThemeChange}>
        {!toggled ? (
          <FaSun style={{ height: "25px", width: "25px" }} />
        ) : (
          <FaMoon style={{ height: "25px", width: "25px" }} />
        )}
      </button>
    </div>
  );
};

export default memo(ThemeSwitcher);
