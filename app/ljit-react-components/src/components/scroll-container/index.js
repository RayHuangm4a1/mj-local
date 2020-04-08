import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../button';
import './style.styl';

const propTypes = {
	children: PropTypes.node,
	buttonText: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.object,
	isButtonDisabled: PropTypes.bool,
	onClick: PropTypes.func,
};
const defaultProps = {
	buttonText: '更多',
	isButtonDisabled: false,
	onClick: () => {},
};

const PREFIX_CLASS = 'ljit-scroll-container';

class ScrollContainer extends Component {
	render() {
		const {
			children,
			buttonText,
			className,
			style,
			onClick,
			isButtonDisabled,
		} = this.props;

		return (
			<div
				className={cx(PREFIX_CLASS, className)}
				style={style}
			>
				<div className={`${PREFIX_CLASS}__body`}>
					{children}
				</div>
				<Button 
					icon={Button.IconEnums.DOWN}
					outline={Button.OutlineEnums.TEXT}
					className={`${PREFIX_CLASS}__button`}
					onClick={() => onClick()}
					disabled={isButtonDisabled}
					isFullWidth
				>
					{buttonText}
				</Button>
			</div>
		);
	}
}

ScrollContainer.propTypes = propTypes;
ScrollContainer.defaultProps = defaultProps;

export default ScrollContainer;
