import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArticleState, defaultArticleState } from 'src/constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [state, setState] = useState<ArticleState>(defaultArticleState);

	/**
	 * Применяет переданные настройки, обновляя глобальное состояние.
	 * @param options Объект, содержащий полный набор настроек.
	 */
	const onApplyFormData = (options: ArticleState) => setState(options);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApplyFormData={onApplyFormData} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
