import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderButtonBar,
} from 'ljit-react-components';

const propTypes = {
	onClickButton: PropTypes.func,
	buttonText: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.node,
	isButtonDisabled: PropTypes.bool,
};
const defaultProps = {
	onClickButton: () => {},
	buttonText: '',
	isButtonDisabled: false,
};

const PREFIX_CLASS = 'lottery-drawing-modify__block-container';

function BlockContainer({
	title,
	onClickButton,
	buttonText,
	children,
	isButtonDisabled,
}) {
	const isShowButton = !!buttonText;

	let buttonContent = null;

	if (isShowButton) {
		buttonContent = (
			<Button
				key="button"
				onClick={onClickButton}
				disabled={isButtonDisabled}
			>
				{buttonText}
			</Button>
		);
	}

	return (
		<div className={PREFIX_CLASS}>
			<HeaderButtonBar
				className={`${PREFIX_CLASS}__title`}
				left={[ <div key="header">{title}</div>, ]}
				right={[ buttonContent, ]}
			/>
			{children}
		</div>
	);
}

BlockContainer.propTypes = propTypes;
BlockContainer.defaultProps = defaultProps;

export default BlockContainer;
