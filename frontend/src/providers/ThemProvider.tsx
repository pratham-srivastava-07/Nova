import { createContext, useState, useContext, ReactNode, useEffect } from "react";

type Theme = 'light' | 'dark';

interface ThemeType {
    theme: Theme,
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        document.body.className = theme === 'light' ? '' : 'dark-mode';
    }, [theme]);


    function toggleTheme() {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }

    return <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if(context === undefined) {
        throw new Error("Theme must  be defined")
    }
    return context;
}