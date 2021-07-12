import { useEffect, useRef } from 'react';

const useClickOutside = (elRef: any, callback: any) => {
    const callbackRef = useRef<any>();

    callbackRef.current = callback;

    useEffect(() => {
        const handleOutClick = (e: any) => {
            if (!elRef?.current?.contains(e.target) && callbackRef.current) {
                callbackRef.current(e);
            }
        };

        document.addEventListener('click', handleOutClick, true);

        return () => {
            document.removeEventListener('click', handleOutClick, true);
        };
    }, [callbackRef, elRef]);
};

export default useClickOutside;
