import { useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { useContext } from 'react';

const useBlocker = (blocker, when = true) => {
    const { navigator } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                }
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker, when]);
}

const usePrompt = (message, when = true) => {
    const blocker = (tx) => {
        if (window.confirm(message)) tx.retry();
    };

    useBlocker(blocker, when);
}

export default usePrompt;
