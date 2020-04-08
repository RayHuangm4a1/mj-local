import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Button,
	Form,
	FormItem,
	CheckBoxGroup,
	InputNumber,
	CheckBox,
	HeaderButtonBar,
	Divider,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import { PREFIX_CLASS, } from './utils';

// TODO Remove after get levelOptions from api
const levelOptions = [
	{ label: '新人层', value: '1', },
	{ label: '第二层', value: '2', },
	{ label: '第三层', value: '3', },
	{ label: '第四层', value: '4', },
	{ label: '第五层', value: '5', },
	{ label: '第六层', value: '6', },
	{ label: '第七层', value: '7', },
	{ label: '第八层', value: '8', },
	{ label: '第九层', value: '9', },
	{ label: '第十层', value: '10', },
	{ label: '自动加入层', value: '11', },
	{ label: '特殊层A', value: '12', },
	{ label: '特殊层B', value: '13', },
	{ label: '特殊层C', value: '14', },
	{ label: '特殊层D', value: '15', },
	{ label: '特殊层E', value: '16', },
	{ label: '特殊层F', value: '17', },
	{ label: '特殊层G', value: '18', },
	{ label: '特殊层H', value: '19', },
	{ label: '特殊层I', value: '20', },
];

const propTypes = {
	initialValues: PropTypes.shape({
		bannedStatuses: PropTypes.arrayOf(PropTypes.string),
		acessLevel: PropTypes.arrayOf(PropTypes.string),
		lessThanDays: PropTypes.number,
		dayOver: PropTypes.number,
		monthOver: PropTypes.number,
		electricOver: PropTypes.number,
		chessOver: PropTypes.number,
		sportOver: PropTypes.number,
		percentOver: PropTypes.number,
		rebateOver: PropTypes.number,
		transferOver: PropTypes.number,
		maxTransfer: PropTypes.number,
	}),
	onSubmit: PropTypes.func,
};

const defaultProps = {
	initialValues: {
		bannedStatuses: ['2'],
		acessLevel: ['2', '4', '7', '9', '12', '14', '17', '19'],
		lessThanDays: 20,
		dayOver: 100000,
		monthOver: 0,
		electricOver: 0,
		chessOver: 0,
		sportOver: 0,
		percentOver: 0,
		rebateOver: 0,
		transferOver: 0,
	},
	onSubmit: () => {},
};

class SettingForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isCheckLessThanDays: true,
			isCheckDay: true,
			isCheckMonth: true,
			isCheckElectric: true,
			isCheckChess: true,
			isCheckSport: true,
			isCheckPercent: true,
			isCheckRebate: true,
			isCheckTransfer: true,
			isCheckMaxTransfer: true,
		};

		this._handleFormItemCheckedChange = this._handleFormItemCheckedChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleFormItemCheckedChange(event ,state) {
		this.setState({
			[state]: event.target.checked,
		});
	}

	_handleSubmit(event) {
		event.preventDefault();
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		return form.validateFields((error, data) => {
			if (!error) {
				onSubmit(data);
			}
		});
	}

	render() {
		const {
			initialValues,
		} = this.props;
		const { _handleFormItemCheckedChange, _handleSubmit, } = this;
		const {
			isCheckLessThanDays,
			isCheckDay,
			isCheckMonth,
			isCheckElectric,
			isCheckChess,
			isCheckSport,
			isCheckPercent,
			isCheckRebate,
			isCheckTransfer,
			isCheckMaxTransfer,
		} = this.state;
		const readOnlyClassName = `${PREFIX_CLASS}__input-number--read-only`;

		return (
			<Form
				ref={formRef => this.formInstance = formRef}
				onChange={() => {}}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="bannedStatuses"
					itemConfig={{
						initialValue: initialValues.bannedStatuses,
					}}
					label="禁止自动出款状态"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<CheckBoxGroup
						options={[
							{ label: '第一次出款', value: '1', },
							{ label: '警示帐号', value: '2', },
							{ label: '未达码量', value: '3', },
						]}
					/>
				</FormItem>
				<Divider className={`${PREFIX_CLASS}__divider`}/>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="acessLevel"
					itemConfig={{
						initialValue: initialValues.acessLevel,
					}}
					label="允許出款层级"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<CheckBoxGroup
						className={`${PREFIX_CLASS}__level-group`}
						options={levelOptions}
					/>
				</FormItem>
				<Divider className={`${PREFIX_CLASS}__divider`}/>
				<HeaderButtonBar left={<PageBlock.Title text="禁止出款條件"/>}/>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="lessThanDays"
					itemConfig={{
						initialValue: initialValues.lessThanDays,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckLessThanDays')}
							value={isCheckLessThanDays}
						>
							注册未满天数
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckLessThanDays, })}
						readOnly={!isCheckLessThanDays}
						min={0}
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="dayOver"
					itemConfig={{
						initialValue: initialValues.dayOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckDay')}
							value={isCheckDay}
						>
							彩票当日营利金额超过
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckDay, })}
						readOnly={!isCheckDay}
						placeholder="100000"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="monthOver"
					itemConfig={{
						initialValue: initialValues.monthOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckMonth')}
							value={isCheckMonth}
						>
							彩票当月营利金额超过
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckMonth, })}
						readOnly={!isCheckMonth}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="electricOver"
					itemConfig={{
						initialValue: initialValues.electricOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckElectric')}
							value={isCheckElectric}
						>
							真人电子当日营利金额超过
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckElectric, })}
						readOnly={!isCheckElectric}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="chessOver"
					itemConfig={{
						initialValue: initialValues.chessOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => this._handleFormItemCheckedChange(event, 'isCheckChess')}
							value={isCheckChess}
						>
							棋牌当日营利金额超过
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckChess, })}
						readOnly={!isCheckChess}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="sportOver"
					itemConfig={{
						initialValue: initialValues.sportOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckSport')}
							value={isCheckSport}
						>
							体育当日营利金额超过
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckSport, })}
						readOnly={!isCheckSport}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="percentOver"
					itemConfig={{
						initialValue: initialValues.percentOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckPercent')}
							value={isCheckPercent}
						>
							注单投注几成以上
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckPercent, })}
						readOnly={!isCheckPercent}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="rebateOver"
					itemConfig={{
						initialValue: initialValues.rebateOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckRebate')}
							value={isCheckRebate}
						>
							警示返点/总投注
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckRebate, })}
						readOnly={!isCheckRebate}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="transferOver"
					itemConfig={{
						initialValue: initialValues.transferOver,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckTransfer')}
							value={isCheckTransfer}
						>
							转点金额
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckTransfer, })}
						readOnly={!isCheckTransfer}
						placeholder="0"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					itemName="maxTransfer"
					itemConfig={{
						initialValue: initialValues.maxTransfer,
					}}
					label={
						<CheckBox
							className={`${PREFIX_CLASS}__setting-label-checkbox`}
							onChange={(event) => _handleFormItemCheckedChange(event, 'isCheckMaxTransfer')}
							value={isCheckMaxTransfer}
						>
							最高出款金额
						</CheckBox>
					}
					labelColon={false}
					columnType={FormItem.ColumnTypeEnums.LARGE}
				>
					<InputNumber
						className={cx(`${PREFIX_CLASS}__input-number`, { [readOnlyClassName]: !isCheckMaxTransfer, })}
						readOnly={!isCheckMaxTransfer}
						placeholder="0"
					/>
				</FormItem>
				<div className={`${PREFIX_CLASS}__button-row`}>
					<Button
						className={`${PREFIX_CLASS}__save-button`}
						outline={Button.OutlineEnums.SOLID}
						onClick={_handleSubmit}
					>
						储存设置
					</Button>
				</div>
			</Form>
		);
	}
}

SettingForm.propTypes = propTypes;
SettingForm.defaultProps = defaultProps;

export default SettingForm;
