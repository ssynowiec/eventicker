import { useEffect, useState } from 'react';

interface LocalStorageProps<T> {
	key: string;
	initialValue: T;
}

export const useLocalStorage = <T,>({
	key,
	initialValue,
}: LocalStorageProps<T>) => {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as const;
};
