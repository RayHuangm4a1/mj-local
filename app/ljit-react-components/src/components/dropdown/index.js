import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Dropdown as AntdDropdown, } from 'antd';
import cx from 'classnames';
import './style.styl';

const PlacementEnums = {
	BOTTOM_LEFT: 'bottomLeft',
	BOTTOM_CENTER: 'bottomCenter',
	BOTTOM_RIGHT: 'bottomRight',
	TOP_LEFT: 'topLeft',
	TOP_CENTER: 'topCenter',
	TOP_RIGHT: 'topRight',
};
const TriggerEnums = {
	CLICK: 'click',
	HOVER: 'hover',
};
const {
	BOTTOM_LEFT,
	BOTTOM_CENTER,
	BOTTOM_RIGHT,
	TOP_LEFT,
	TOP_CENTER,
	TOP_RIGHT,
} = PlacementEnums;
const propTypes = {
	children: PropTypes.node.isRequired,
	dropdownContent: PropTypes.node.isRequired,
	placement: PropTypes.oneOf([
		BOTTOM_LEFT,
		BOTTOM_CENTER,
		BOTTOM_RIGHT,
		TOP_LEFT,
		TOP_CENTER,
		TOP_RIGHT,
	]),
	trigger: PropTypes.arrayOf(PropTypes.oneOf([
		TriggerEnums.CLICK, TriggerEnums.HOVER,
	])),
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	onVisibleChange: PropTypes.func,
	isShowingArrow: PropTypes.bool,
	isKeepMenuOpen: PropTypes.bool,
};

const defaultProps = {
	placement: BOTTOM_LEFT,
	trigger: [TriggerEnums.HOVER,],
	isDisabled: false,
	onVisibleChange: () => {},
	isShowingArrow: false,
	isKeepMenuOpen: false,
};

class Dropdown extends Component {
	constructor() {
		super();
		this.state = {
			arrowLeftPosition: 0,
			isVisible: false,
		};

		this._handleVisibleChange = this._handleVisibleChange.bind(this);
		this._handleRepositionArrow = this._handleRepositionArrow.bind(this);
		this._renderDropdownContent = this._renderDropdownContent.bind(this);
	}

	_handleRepositionArrow() {
		const { childrenRef, listDropdownRef, } = this;
		const { arrowLeftPosition, } = this.state;
		const childrenRefLeft = childrenRef.getBoundingClientRect().left;
		const childrenRefWidth = childrenRef.getBoundingClientRect().width;
		const listDropdownLeft = listDropdownRef.getBoundingClientRect().left;

		const updateArrowLeftPosition = childrenRefLeft - listDropdownLeft + (childrenRefWidth / 2) - 10;

		if (arrowLeftPosition !== updateArrowLeftPosition) {
			this.setState({ arrowLeftPosition: updateArrowLeftPosition, });
		}
	}
	_handleVisibleChange(visible) {
		const { _handleRepositionArrow, } = this;
		const { onVisibleChange, } = this.props;
		const { isShowingArrow, isKeepMenuOpen, } = this.props;

		if (isShowingArrow) {
			setTimeout(_handleRepositionArrow, 0);
		}
		if (isKeepMenuOpen) {
			this.setState({
				isVisible: visible,
			});
		}

		onVisibleChange(visible);
	}
	_renderDropdownContent() {
		const { dropdownContent, placement, } = this.props;
		const { arrowLeftPosition, } = this.state;
		const isDropdownonTop = (placement.indexOf('top') !== -1);

		return (
			<div
				className={cx('ljit-dropdown--with-arrow', {
					['ljit-dropdown--with-arrow--on-top']: !isDropdownonTop,
					['ljit-dropdown--with-arrow--on-bottom']: isDropdownonTop,
				})}
				ref={(listDropdownRef) => this.listDropdownRef = listDropdownRef}
			>
				{dropdownContent}
				<div
					className={cx('ljit-dropdown__arrow', {
						['ljit-dropdown__arrow--on-top']: !isDropdownonTop,
						['ljit-dropdown__arrow--on-bottom']: isDropdownonTop,
					})}
					style={{ left: `${arrowLeftPosition}px`, }}
				/>
			</div>
		);
	}

	render() {
		const {
			dropdownContent,
			placement,
			trigger,
			className,
			isDisabled,
			isShowingArrow,
			isKeepMenuOpen,
		} = this.props;
		const { _renderDropdownContent, _handleVisibleChange, } = this;
		const children = React.cloneElement(this.props.children, {
			ref: (childrenRef) => this.childrenRef = childrenRef,
		});
		const { isVisible, } = this.state;
		const keepOpen = isKeepMenuOpen ? { visible: isVisible, } : {};


		return (
			<AntdDropdown
				overlay={isShowingArrow ? _renderDropdownContent() : dropdownContent}
				placement={placement}
				trigger={trigger}
				overlayClassName={cx('ljit-dropdown', className)}
				disabled={isDisabled}
				onVisibleChange={_handleVisibleChange}
				{...keepOpen}
			>
				{children}
			</AntdDropdown>
		);
	}
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

Dropdown.PlacementEnums = PlacementEnums;
Dropdown.TriggerEnums = TriggerEnums;

export default Dropdown;
