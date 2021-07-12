import { useEffect } from 'react';

const useKey = ({ key, callback }: { key: string; callback: any }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === key) {
                callback();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [callback, key]);
};

export default useKey;
