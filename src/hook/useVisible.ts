import { useCallback, useState } from 'react';

const useVisble = (value = false) => {
    const [visible, setVisible] = useState<boolean>(value);

    const toggle = useCallback(() => setVisible(!visible), [visible]);

    return {
        toggle,
        visible,
        setVisible,
    };
};

export default useVisble;
