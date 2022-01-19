import {useRef} from "react";


export default function useIsMountedRef () {
    const isComponentMounted = useRef(false);

    const setIsMounted = (isMounted: boolean) => {
        isComponentMounted.current = isMounted
    }

    return [isComponentMounted, setIsMounted] as const
}