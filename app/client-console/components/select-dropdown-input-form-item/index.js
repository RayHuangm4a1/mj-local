import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { FormItem, Input, } from 'ljit-react-components';
import SelectDropdown from '../select-dropdown';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]).isRequired,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
	})),
};
const defaultProps = {
	className: '',
};

const PREFIX_CLASS = 'ljit-select-dropdown-form-item';

class SelectDropdownInputFormItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formItemName: props.options[0].value,
			formItemLabel: props.options[0].label,
		};
		this._handleChangeSelectDropdown = this._handleChangeSelectDropdown.bind(this);
	}

	_handleChangeSelectDropdown(value) {
		const { options, } = this.props;
		const formItemLabel = options.find(option => option.value === value).label;

		this.setState({
			formItemName: value,
			formItemLabel,
		});
	}

	render() {
		const {
			options,
		} = this.props;
		const {
			className,
			formItemName,
			formItemLabel,
		} = this.state;
		const { _handleChangeSelectDropdown, } = this;

		return (
			<div className = {cx(PREFIX_CLASS, className)}>
				<div className={`${PREFIX_CLASS}__container`}>
					<SelectDropdown
						value={formItemName}
						options={options}
						className={`${PREFIX_CLASS}__select-dropdown`}
						onChange={_handleChangeSelectDropdown}
						dropdownClassName={`${PREFIX_CLASS}__select-dropdown-menu`}
					/>
					<FormItem
						className={`${PREFIX_CLASS}__form-item`}
						itemName={formItemName}
						labelColon={false}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
							placeholder={`输入${formItemLabel}`}
						/>
					</FormItem>
				</div>
			</div>
		);
	}
	componentDidUpdate(prevProps) {
		const { options, } = this.props;

		if (prevProps.options !== options) {
			this.setState({
				formItemName: options[0].value,
				formItemLabel: options[0].label,
			});
		}
	}
}

SelectDropdownInputFormItem.propTypes = propTypes;
SelectDropdownInputFormItem.defaultProps = defaultProps;

export default SelectDropdownInputFormItem;
