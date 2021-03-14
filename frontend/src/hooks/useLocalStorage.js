import { useEffect, useReducer } from 'react';

const PREFIX = 'eservis-';

export default function useLocalStorage(key, reducer, initialValue) {
    const prefixedKey = PREFIX + key;
    const [value, dispatch] = useReducer(reducer, {}, () => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, dispatch];
}