import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Row from '../row';
import Col from  '../col';
import HeaderButtonBar from '../header-button-bar';
import Icon from '../icon';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	topLeft: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	topRight: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	left: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	right: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	bottom: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	isShowingCloseButton: PropTypes.bool,
	onClose: PropTypes.func,
};
const defaultProps = {
	className: '',
	isShowingCloseButton: false,
	onClose: () => {},
};

class InfoCard extends Component {
	constructor() {
		super();

		this._renderHeader = this._renderHeader.bind(this);
		this._renderContent = this._renderContent.bind(this);
		this._renderCloseButton = this._renderCloseButton.bind(this);
	}
	_renderHeader() {
		const { topLeft, topRight, } = this.props;

		return (
			<HeaderButtonBar
				left={topLeft}
				right={topRight}
			/>
		);
	}
	_renderContent() {
		const { left, right, } = this.props;

		return (
			<Row gutter={6}>
				<Col span={12}>
					{left}
				</Col>
				<Col span={12}>
					{right}
				</Col>
			</Row>
		);
	}
	_renderCloseButton() {
		const { onClose, } = this.props;

		return (
			<span
				className="ljit-info-card__close-button"
				onClick={onClose}
			>
				<Icon type="close"/>
			</span>
		);
	}

	render() {
		const {
			topLeft,
			topRight,
			left,
			right,
			bottom,
			className,
			isShowingCloseButton,
		} = this.props;
		const {
			_renderHeader,
			_renderContent,
			_renderCloseButton,
		} = this;

		return (
			<div className={cx('ljit-info-card', className)}>
				{topLeft || topRight ? _renderHeader() : null}
				{left || right ? _renderContent() : null}
				{bottom ? bottom : null}
				{isShowingCloseButton ? _renderCloseButton() : null}
			</div>
		);
	}
}

InfoCard.propTypes = propTypes;
InfoCard.defaultProps = defaultProps;

export default InfoCard;
