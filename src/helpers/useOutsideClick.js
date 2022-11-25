import { useEffect } from "react";

const useOutsideClick = (ref, hanldleClickOut) => {
    useEffect(() => {
        const onClick = ({target}) => !ref.contains(target) && hanldleClickOut?.();
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
};

export default useOutsideClick;