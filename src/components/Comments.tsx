import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@config";
import { useEffect, useState } from "react";

interface CommentsProps {
    lightTheme?: Theme;
    darkTheme?: Theme;
}

export default function Comments({
    lightTheme = "noborder_light",
    darkTheme = "noborder_dark",
}: CommentsProps) {
    const [theme, setTheme] = useState(() => {
        const currentTheme = localStorage.getItem("theme");
        const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

        return currentTheme || browserTheme;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = ({ matches }: MediaQueryListEvent) => {
            console.log("theme changed, adjust giscus, is dark mode:" + matches)
            setTheme(matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        const themeButton = document.querySelector("#theme-btn");
        const handleClick = () => {
            console.log("theme changed, adjust giscus")
            setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
        };

        themeButton?.addEventListener("click", handleClick);

        return () => themeButton?.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="mt-8">
        <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
        </div>
    );
}
