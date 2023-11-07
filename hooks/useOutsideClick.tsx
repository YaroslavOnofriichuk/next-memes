import { useRef, useEffect, RefObject } from "react";

export const useOutsideClick = (callback: any) => {
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            //@ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [callback, ref]);

    return ref;
};