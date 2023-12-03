"use client";
import {useEffect, useState} from "react";

export default function ThemeSwitcher() {
    const [colorMode, setColorMode] = useState<"light" | "dark">("light")

    useEffect(() => {
        const htmlElement = document.querySelector('html') as HTMLHtmlElement
        if (colorMode === 'light') {
            htmlElement.classList.remove("dark")
        } else if (colorMode === 'dark') {
            htmlElement.classList.add("dark")
        }
    }, [colorMode]);

    return  <select name="color-mode" id="color-mode" value={colorMode} onChange={(e) => {
        setColorMode(e.target.value as "light" | "dark")
    }}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
    </select>
}