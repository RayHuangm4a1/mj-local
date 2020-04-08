import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CheckBox from '../checkbox';
import Icon from '../icon';
import './style.styl';

const CLASS_PREFIX = 'ljit-betting-weizhi-block';

const CheckboxStyleEnum = {
	SOLID: 'solid',
	HOLLOW: 'hollow',
};

const {
	SOLID,
	HOLLOW,
} = CheckboxStyleEnum;

const propTypes = {
	className: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		isSelected: PropTypes.bool,
	})).isRequired,
	onPressCheckbox: PropTypes.func,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
	]),
	checkboxStyle: PropTypes.oneOf([
		SOLID,
		HOLLOW,
	]),
};

const defaultProps = {
	options: [],
	description: '',
	onPressCheckbox: () => {},
	checkboxStyle: SOLID,
};

class BettingWeizhiBlock extends Component {
	constructor() {
		super();

		this._renderOptions = this._renderOptions.bind(this);
		this._renderDescription = this._renderDescription.bind(this);
	}
	_renderOptions() {
		const { options, onPressCheckbox, } = this.props;
		const checkBoxes = options.map((option, index) => {
			return (
				<CheckBox
					key={option.name}
					value={option.isSelected}
					onChange={() => onPressCheckbox(index)}
				>
					{option.name}
				</CheckBox>
			);
		});

		return checkBoxes;
	}
	_renderDescription() {
		const { description, } = this.props;

		return (
			<div className={`${CLASS_PREFIX}__description`}>
				<Icon 
					type={Icon.IconTypeEnums.INFO_FILL}
					color={Icon.ColorEnums.PRIMARY}
					size={Icon.SizeEnums.SMALL}
				/>
				<span>
					{description}
				</span>
			</div>
		);
	}
	render() {
		const {
			className,
			description,
			checkboxStyle,
		} = this.props;
		const {
			_renderOptions,
			_renderDescription,
		} = this;

		return (
			<div className={cx(CLASS_PREFIX, {
				[`${CLASS_PREFIX}--solid`]: checkboxStyle === SOLID,
				[`${CLASS_PREFIX}--hollow`]: checkboxStyle === HOLLOW,
			}, className)}>
				{_renderOptions()}
				{description ? _renderDescription() : null}
			</div>
		);
	}
}

BettingWeizhiBlock.propTypes = propTypes;
BettingWeizhiBlock.defaultProps = defaultProps;

BettingWeizhiBlock.CheckboxStyleEnum = CheckboxStyleEnum;

export default BettingWeizhiBlock;
