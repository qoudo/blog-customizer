import { useEffect, useState, RefObject } from 'react';

/**
 * Хук, управления состоянием модального окна.
 * @param modalRef Ссылка на модальное окно.
 * @return Свойства для управления состоянием.
 */
export function useModalToggle(modalRef: RefObject<HTMLDivElement | null>) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleEsc = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		const handleClickOutside = (event: MouseEvent): void => {
			if (
				modalRef.current &&
				!modalRef.current?.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return {
		isOpen,
		onToggleModal: () => setIsOpen((prevState) => !prevState),
	};
}
