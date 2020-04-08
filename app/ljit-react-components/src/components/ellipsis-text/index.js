import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	text: PropTypes.string,
	isShowingButton: PropTypes.bool,
	className: PropTypes.string,
	ButtonText: PropTypes.string,
	numberOfLines: PropTypes.number,
	onClickButton: PropTypes.func,
	style: PropTypes.object,
	buttonStyle: PropTypes.object,
};

const defaultProps = {
	isShowingButton: true,
	ButtonText: `···`,
	numberOfLines: 1,
	onClickButton: () => {},
};

class EllipsisText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingEllipsis: false,
			lineHeight: 0,
		};

		this._toggleEllipsisState = this._toggleEllipsisState.bind(this);
		this._updateLineHeight = this._updateLineHeight.bind(this);
		this._renderButton = this._renderButton.bind(this);
		this._forceUpdate = this._forceUpdate.bind(this);
	}

	_toggleEllipsisState() {
		const { isShowingEllipsis, } = this.state;

		this.setState({
			isShowingEllipsis: !isShowingEllipsis,
		});
	}

	_updateLineHeight(lineHeight) {
		this.setState({
			lineHeight,
		});
	}

	_forceUpdate() {
		this.forceUpdate();
	}

	_renderButton() {
		const { onClickButton, ButtonText, buttonStyle, } = this.props;

		return (
			<div
				className='ljit-ellipsis__button'
				onClick={onClickButton}
				style={{
					...buttonStyle,
				}}
			>
				{ButtonText}
			</div>
		);
	}

	render() {
		const {
			text,
			className,
			numberOfLines,
			isShowingButton,
			style,
		} = this.props;
		const {
			isShowingEllipsis,
			lineHeight,
		} = this.state;
		const { _renderButton, } = this;

		let button = null;

		if (isShowingButton) {
			button = _renderButton();
		}

		return (
			<div
				className={cx('ljit-ellipsis', className)}
				style={style}
			>
				<div
					className={cx('ljit-ellipsis__text', { 'ljit-ellipsis__dot': isShowingEllipsis, })}
					ref={ref => this.refTextContent = ref}
					style={{ maxHeight: numberOfLines * lineHeight, }}
				>
					{text}
				</div>
				{button}
			</div>
		);
	}

	componentDidMount() {
		const { _forceUpdate, _updateLineHeight, refTextContent, } = this;
		const presentLineHeight = getLineHeight(refTextContent);

		window.addEventListener('resize', _forceUpdate);
		_updateLineHeight(presentLineHeight);
	}
	componentDidUpdate() {
		const { isShowingEllipsis, lineHeight, } = this.state;
		const {
			_toggleEllipsisState,
			_updateLineHeight,
			refTextContent,
		} = this;
		const presentLineHeight = getLineHeight(refTextContent);

		if (shouldToggleEllipsis(isShowingEllipsis, refTextContent)) {
			_toggleEllipsisState();
		}

		if (lineHeight !== presentLineHeight) {
			_updateLineHeight(presentLineHeight);
		}
	}
	componentWillUnmount() {
		const { _forceUpdate, } = this;

		window.removeEventListener('resize', _forceUpdate);
	}
}

EllipsisText.propTypes = propTypes;
EllipsisText.defaultProps = defaultProps;

export default EllipsisText;

export function shouldToggleEllipsis(isShowingEllipsis, refTextContent) {
	const { offsetWidth, scrollWidth, offsetHeight, scrollHeight, } = refTextContent;

	let shouldShowEllipsis = false;

	if (offsetWidth < scrollWidth || offsetHeight < scrollHeight) {
		shouldShowEllipsis = true;
	}
	return (isShowingEllipsis !== shouldShowEllipsis);
}

export function getLineHeight(e = {}) {
	const lineHeight = parseFloat(getComputedStyle(e).getPropertyValue('line-height'));

	return lineHeight;
}
