import { CSSProperties, useState } from 'react';
import { ArticleState, defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from 'components/article-params-form';
import { Article } from 'components/article';

import styles from './App.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleState>(defaultArticleState);

	/**
	 * Применяет переданные настройки, обновляя глобальное состояние.
	 * @param options Объект, содержащий полный набор настроек.
	 */
	const onApplyFormOptions = (options: ArticleState) =>
		setArticleStyles(options);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApplyFormOptions={onApplyFormOptions} />
			<Article />
		</main>
	);
};
