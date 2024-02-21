// src/hooks/useNavigation.ts
import { useHistory } from 'react-router-dom';

export function useNavigation() {
    const history = useHistory();

    function navigateTo(path: string) {
        history.push(path);
    }

    return navigateTo;
}
