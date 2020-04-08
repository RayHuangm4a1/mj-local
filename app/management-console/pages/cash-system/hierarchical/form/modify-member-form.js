import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	LabelContent,
	Select,
	RadioGroup,
	DatePicker,
	Button,
} from 'ljit-react-components';
import moment from 'moment';
import {
	FinanceLevelTypeEnum,
} from '../../../../lib/enums';
import {
	FinanceLevelOptionsDataPropTypes,
} from '../../../../lib/prop-types-utils';

const {
	NORMAL,
	SPECIAL,
} = FinanceLevelTypeEnum;

const financeLevelTypeOptions = [
	{ label: '一般层', value: NORMAL, },
	{ label: '特殊层', value: SPECIAL, },
];

const propTypes = {
	levelId: PropTypes.number,
	levelName: PropTypes.string,
	levelType: PropTypes.number,
	levelExpiredAt: PropTypes.string,
	normalLevelOptions: FinanceLevelOptionsDataPropTypes,
	specialLevelOptions: FinanceLevelOptionsDataPropTypes,
	isDisabled: PropTypes.bool,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	normalLevelOptions: [],
	specialLevelOptions: [],
	onSubmit: () => {},
};

class ModifyMemberForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			levelType: props.levelType,
		};

		this._getFormInstance = this._getFormInstance.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleChangeLevelOptions = this._handleChangeLevelOptions.bind(this);
		this._renderGeneralLevelFormItem = this._renderGeneralLevelFormItem.bind(this);
		this._renderSpecialLevelFormItem = this._renderSpecialLevelFormItem.bind(this);
	}

	_getFormInstance() {
		return this.formInstance.getForm();
	}

	_handleSubmit() {
		const { onSubmit, } = this.props;
		const form = this._getFormInstance();

		form.validateFields((error, { levelId, levelExpiredAt, }) => {
			if (!error) {
				onSubmit({
					levelId,
					levelExpiredAt,
				});
			}
		});
	}

	_handleChangeLevelOptions(event) {
		const {
			normalLevelOptions,
			specialLevelOptions,
		} = this.props;
		const form = this._getFormInstance();
		const levelType = event.target.value;

		let options = [];

		if (levelType === NORMAL) {
			options = normalLevelOptions;
		} else if (levelType === SPECIAL) {
			options = specialLevelOptions;
		}

		const defaultOption = getDefaultOption(options);

		form.setFieldsValue({
			levelType,
			levelId: getOptionValue(defaultOption),
		});
		this.setState({
			levelType,
		});
	}

	_renderGeneralLevelFormItem() {
		const {
			levelExpiredAt,
			normalLevelOptions,
		} = this.props;
		const initialLevelExpiredAt = getInitialLevelExpiredAt(levelExpiredAt);
		const defaultOption = getDefaultOption(normalLevelOptions);

		return (
			<div className="modify-member-form__general-level-form-item">
				<FormItem
					itemName="levelId"
					label="新的层级："
					itemConfig={{ initialValue: getOptionValue(defaultOption), }}
				>
					<Select
						options={normalLevelOptions}
					></Select>
				</FormItem>
				<FormItem
					itemName="levelExpiredAt"
					label="锁定到期日："
					itemConfig={{ initialValue: initialLevelExpiredAt || moment().add(3, 'day'), }}
				>
					<DatePicker
						format="YYYY/MM/DD"
					/>
				</FormItem>
			</div>
		);
	}
	_renderSpecialLevelFormItem() {
		const {
			specialLevelOptions,
		} = this.props;
		const defaultOption = getDefaultOption(specialLevelOptions);

		return (
			<FormItem
				itemName="levelId"
				label="新的层级："
				itemConfig={{ initialValue: getOptionValue(defaultOption), }}
			>
				<Select
					options={specialLevelOptions}
				/>
			</FormItem>
		);
	}

	render() {
		const {
			_handleSubmit,
			_handleChangeLevelOptions,
			_renderGeneralLevelFormItem,
			_renderSpecialLevelFormItem,
		} = this;
		const {
			levelName,
			isDisabled,
		} = this.props;
		const {
			levelType,
		} = this.state;

		return (
			<div className="modify-member-form">
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<LabelContent label="目前层级">
						{levelName}
					</LabelContent>
					<FormItem
						itemName="levelType"
						itemConfig={{ initialValue: levelType, }}
						label="层级类型："
					>
						<RadioGroup
							options={financeLevelTypeOptions}
							onChange={_handleChangeLevelOptions}
						/>
					</FormItem>
					{ levelType === SPECIAL ? _renderSpecialLevelFormItem() : _renderGeneralLevelFormItem() }
					<div className="modify-member-form__button">
						<Button
							disabled={isDisabled}
							onClick={_handleSubmit}
						>
							确定
						</Button>
					</div>
				</Form>
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			levelId,
			levelType,
			levelExpiredAt,
		} = this.props;
		const form = this._getFormInstance();

		if (prevProps.levelId !== levelId) {
			form.setFieldsValue({
				levelId,
				levelType,
				levelExpiredAt: getInitialLevelExpiredAt(levelExpiredAt),
			});
			this.setState({
				levelType,
			});
		}
	}
}

ModifyMemberForm.propTypes = propTypes;
ModifyMemberForm.defaultProps = defaultProps;

function getDefaultOption(options = []) {
	return options.slice().shift();
}
function getOptionValue(option) {
	return (option && option.value) ? option.value : null;
}
function getInitialLevelExpiredAt(levelExpiredAt) {
	return levelExpiredAt ? moment(levelExpiredAt, 'YYYY/MM/DD') : null;
}

export default ModifyMemberForm;
