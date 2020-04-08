import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	EllipsisText,
} from 'ljit-react-components';
import {
	DETAIL_LABEL_PREFIX_CLASS,
} from './utils';

const propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	children: PropTypes.any,
	isEllipsis: PropTypes.bool,
	numberOfLines: PropTypes.number,
	className: PropTypes.string,
	editButton: PropTypes.element,
};
const defaultProps = {
	isEllipsis: false,
	numberOfLines: 2,
	className: '',
};

const UserDetailLabel = ({
	label,
	children,
	isEllipsis,
	numberOfLines,
	className,
	editButton,
}) => {
	let content = children;

	if (isEllipsis) {
		content = (
			<EllipsisText
				className={`${DETAIL_LABEL_PREFIX_CLASS}__ellipsis`}
				numberOfLines={numberOfLines}
				text={children}
				isShowingButton={false}
			/>
		);
	}

	return (
		<div className={cx(DETAIL_LABEL_PREFIX_CLASS, className)}>
			<label className={`${DETAIL_LABEL_PREFIX_CLASS}__label`}>
				{label}
			</label>
			<div className={`${DETAIL_LABEL_PREFIX_CLASS}__content`}>
				{content}
			</div>
			<div className={`${DETAIL_LABEL_PREFIX_CLASS}__button`}>
				{editButton}
			</div>
		</div>
	);
};

UserDetailLabel.propTypes = propTypes;
UserDetailLabel.defaultProps = defaultProps;

export default UserDetailLabel;
