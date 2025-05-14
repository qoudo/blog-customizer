import { useRef, useState, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useModalToggle } from 'src/hooks/useModalToggle';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleState,
	ArticleStateKey,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

interface IArticleParamsFrom {
	onApplyFormOptions: (options: ArticleState) => void;
}

export const ArticleParamsForm = ({
	onApplyFormOptions,
}: IArticleParamsFrom) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [formOptions, setFormOptions] = useState(defaultArticleState);

	const { isOpen, onToggleModal } = useModalToggle(modalRef);

	/**
	 * Обработчик изменения значения полей формы.
	 * @param options Новое значение опции.
	 * @param optionName Ключ поля в объекте состояния.
	 */
	const onChange = (options: OptionType, optionName: ArticleStateKey) =>
		setFormOptions((prevState) => ({
			...prevState,
			[optionName]: options,
		}));

	/**
	 * Сбрасывает все настройки к значениям по умолчанию.
	 * Обновляет как локальное состояние формы, так и применяет изменения
	 * к глобальному состоянию.
	 */
	const onReset = () => {
		setFormOptions(defaultArticleState);
		onApplyFormOptions(defaultArticleState);
	};

	/**
	 * Обработчик отправки формы.
	 * Предотвращает стандартное поведение формы и применяет текущие настройки.
	 * @param e Событие отправки формы.
	 */
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onApplyFormOptions(formOptions);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggleModal} />
			<aside
				ref={modalRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onReset={onReset} onSubmit={onSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={formOptions.fontFamilyOption}
						onChange={(options) => onChange(options, 'fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formOptions.fontSizeOption}
						name='radio'
						onChange={(options) => onChange(options, 'fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formOptions.fontColor}
						onChange={(options) => onChange(options, 'fontColor')}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formOptions.backgroundColor}
						onChange={(options) => onChange(options, 'backgroundColor')}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formOptions.contentWidth}
						onChange={(options) => onChange(options, 'contentWidth')}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
