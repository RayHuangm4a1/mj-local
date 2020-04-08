import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	headerTitle: PropTypes.string,
	headerRight: PropTypes.node,
	content: PropTypes.node,
	footer: PropTypes.node,
};

const PREFIX_CLASS = 'ljit-panel';

const Panel = ({ className, headerTitle, headerRight, content, footer, }) => {
	const _renderHeader = (title, right) => {
		if (title) {
			return (
				<div className={`${PREFIX_CLASS}__header`}>
					<span className={`${PREFIX_CLASS}__title`}>{title}</span>
					<div className={`${PREFIX_CLASS}__right`}>{right}</div>
				</div>
			);
		}
	};

	return (
		<div className={cx(PREFIX_CLASS, className)}>
			{_renderHeader(headerTitle, headerRight)}
			<div className={`${PREFIX_CLASS}__content`}>
				{content}
			</div>
			<div className={`${PREFIX_CLASS}__footer`}>
				{footer}
			</div>
		</div>
	);
};

Panel.propTypes = propTypes;

export default Panel;
