"use client";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    SetStateAction,
    Dispatch,
} from "react";

interface ContextType {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<ContextType>({} as ContextType);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<string>("");

    const value: ContextType = {
        state,
        setState,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};
