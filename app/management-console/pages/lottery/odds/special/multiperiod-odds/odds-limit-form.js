import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import {
	Button,
	Form,
	FormItem,
	Select,
	LabelContent,
	Row,
	InputNumber,
	CheckBox,
} from 'ljit-react-components';
import InputRangeTable from '../../../../../components/input-range-table';

const FormTypeEnums = {
	CREATE: 'create',
	EDIT: 'edit',
};

const { CREATE, EDIT, } = FormTypeEnums;

const propTypes = {
	formType: PropTypes.oneOf([CREATE, EDIT]),
	initialValues: PropTypes.shape({
		lotteryClass: PropTypes.string,
		lottery: PropTypes.string,
		play: PropTypes.string,
		reward: PropTypes.string,
		odds: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string,
			isLargestIssue: PropTypes.bool,
			failIssuesFrom: PropTypes.number,
			failIssuesTo: PropTypes.number,
			rewardCode: PropTypes.number,
		})),
	}),
	platform: PropTypes.shape({
		bonus: PropTypes.shape({
			max: PropTypes.number,
		})
	}),
	lotteryClassOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	lotteryOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	playOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	rewardOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onDelete: PropTypes.func,
	onSave: PropTypes.func,
};
const defaultProps = {
	initialValues: {
		odds: [{
			key: uuid(),
			failIssuesFrom: 0,
			failIssuesTo: 0,
		}],
	},
	lotteryClassOptions: [],
	lotteryOptions: [],
	playOptions: [],
	rewardOptions: [{
		label: '1', value: '1',
	}],
	onDelete: () => {},
	onSave: () => {},
};

const TABLE_NAME = 'oddsRules';
const PREFIX_CLASS = 'odds-limit-form';

const selectStyle = {
	width: 160,
};

const inputNumberStyle = {
	width: 98,
};

class OddsLimitForm extends Component {
	constructor() {
		super();

		this.state = {
			tableData: [],
		};
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._handleSave = this._handleSave.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this._renderButtons = this._renderButtons.bind(this);
	}

	_handleChangeTable(value) {
		let updateValue = [...value];

		updateValue.map((item, index) => {
			if (index + 1 < value.length) {
				item.isLargestIssue = false;
			}
			return item;
		});

		this.setState({
			tableData: updateValue,
		});
	}

	_handleSave() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				//TODO block submit while table form validate fail
				this.props.onSave(form);
			}
		});
	}

	_handleDelete() {
		const form = this.formInstance.getForm();

		this.props.onDelete(form);
	}

	_renderButtons() {
		const { formType, } = this.props;
		const { _handleSave, _handleDelete, } = this;

		if (formType === CREATE) {
			return (
				<Button
					className={`${PREFIX_CLASS}__button`}
					outline={Button.OutlineEnums.SOLID}
					onClick={_handleSave}
				>
					新增
				</Button>
			);
		}
		if (formType === EDIT) {
			return (
				<Fragment>
					<Button
						className={`${PREFIX_CLASS}__button`}
						outline={Button.OutlineEnums.HOLLOW}
						onClick={_handleDelete}
					>
						删除
					</Button>
					<Button
						className={`${PREFIX_CLASS}__button`}
						outline={Button.OutlineEnums.SOLID}
						onClick={_handleSave}
					>
						储存
					</Button>
				</Fragment>
			);
		}
		return null;
	}

	render() {
		const {
			initialValues,
			platform,
			lotteryClassOptions,
			lotteryOptions,
			playOptions,
			rewardOptions,
		} = this.props;
		const { tableData, } =this.state;
		const { _renderButtons, } = this;

		return (
			<Form
				ref={(refForm) => this.formInstance = refForm }
				submitButtonDisabled
				cancelButtonDisabled
			>
				<div className={`${PREFIX_CLASS}__button-wrapper`}>
					{_renderButtons()}
				</div>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label="彩类"
					itemName="lotteryClass"
					itemConfig={{
						initialValue: initialValues.lotteryClass,
					}}
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<Select
						style={selectStyle}
						options={lotteryClassOptions}
						placeholder="请选择彩类"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label="彩种"
					itemName="lottery"
					itemConfig={{
						initialValue: initialValues.lottery,
					}}
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<Select
						style={selectStyle}
						options={lotteryOptions}
						placeholder="请选择彩种"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label="玩法"
					itemName="play"
					itemConfig={{
						initialValue: initialValues.play,
					}}
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<Select
						style={selectStyle}
						options={playOptions}
						placeholder="请选择玩法"
					/>
				</FormItem>
				<FormItem
					className={`${PREFIX_CLASS}__form-item`}
					label="奖项"
					itemName="reward"
					itemConfig={{
						initialValue: initialValues.reward,
					}}
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<Select
						style={selectStyle}
						options={rewardOptions}
						placeholder="请选择奖项"
					/>
				</FormItem>
				<div className={`${PREFIX_CLASS}__table-title`}>赔率变动规则</div>
				<FormItem
					key={TABLE_NAME}
					itemName={TABLE_NAME}
					itemConfig={{
						initialValue: tableData,
					}}
				>
					<InputRangeTable
						className={`${PREFIX_CLASS}__table-form`}
						isShowOnlyLastRemovingButton
						selectedKey="isLargestIssue"
						rangeConfig={{
							minKey: 'failIssuesFrom',
							maxKey: 'failIssuesTo',
							offset: 1,
						}}
						columns={[
							{
								title: '最高期数',
								dataIndex: 'isLargestIssue',
								key: 'isLargestIssue',
								renderField: (record, rowIndex, onChange) => {
									if (rowIndex + 1 < tableData.length) {
										return null;
									} else {
										return (
											<LabelContent
												className={`${PREFIX_CLASS}__table-form-item`}
												validateStatus={record.isLargestIssue ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
												helpMessage={record.isLargestIssue ? null : 'IP 为必填'}
											>
												<CheckBox
													checked={record.isLargestIssue}
													onChange={(e) => onChange('isLargestIssue', e.target.checked, rowIndex)}
												/>
											</LabelContent>
										);
									}
								},
							},
							{
								title: '连续不开期数',
								dataIndex: '',
								key: 'failIssues',
								renderField: (record, rowIndex, onChange) => {
									let inputField = <div style={inputNumberStyle}/>;
									const failIssuesFrom = record.failIssuesFrom;
									const failIssuesTo = record.failIssuesTo;

									if (!record.isLargestIssue) {
										inputField = (
											<LabelContent
												className={`${PREFIX_CLASS}__table-form-item`}
												validateStatus={record.failIssuesTo ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
												helpMessage={record.failIssuesTo ? null : 'IP 为必填'}
											>
												<InputNumber
													value={failIssuesTo}
													min={failIssuesFrom}
													style={inputNumberStyle}
													onChange={(e) => onChange('failIssuesTo', e, rowIndex)}
												/>
											</LabelContent>
										);
									}
									return <Row type={Row.TypeEnums.FLEX} flexLayout={Row.FlexJustifyEnums.CENTER}>
										<div className={`${PREFIX_CLASS}__static-text`}>{failIssuesFrom}</div>
										<div className={`${PREFIX_CLASS}__separator`}>-</div>
										{inputField}
									</Row>;
								},
							},
							{
								title: '变动后奖金号',
								dataIndex: 'rewardCode',
								key: 'rewardCode',
								renderField: (record, rowIndex, onChange) => {
									let showCode;
									let showRate;

									if (record.hasOwnProperty('rewardCode')) {
										showCode = record.rewardCode;
										showRate = <div className={`${PREFIX_CLASS}__change-percent`}>{(record.rewardCode - platform.bonus.max) / 20}%</div>;
									}
									return (
										<Row type={Row.TypeEnums.FLEX} flexLayout={Row.FlexJustifyEnums.CENTER}>
											<LabelContent
												className={`${PREFIX_CLASS}__table-form-item`}
												validateStatus={record.rewardCode ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
												helpMessage={record.rewardCode ? null : 'IP 为必填'}
											>
												<Select
													value={showCode}
													options={[
														{ label: '1940', value: 1940, },
														{ label: '1920', value: 1920, },
													]}
													style={inputNumberStyle}
													placeholder="无"
													onChange={(e) => onChange('rewardCode', e, rowIndex)}
												/>
											</LabelContent>
											{showRate}
										</Row>
									);
								},
							},
						]}
						onChange={(value) => this._handleChangeTable(value)}
					/>
				</FormItem>
			</Form>
		);
	}

	componentDidMount() {
		const { initialValues, } = this.props;

		this.setState({
			tableData: initialValues.odds,
		});
	}

	componentDidUpdate(prevState) {
		const { initialValues, } = this.props;

		if (prevState.initialValues !== initialValues) {
			this.setState({
				tableData: initialValues.odds,
			});
		}
	}
}

OddsLimitForm.propTypes = propTypes;
OddsLimitForm.defaultProps = defaultProps;
OddsLimitForm.FormTypeEnums = FormTypeEnums;

export default OddsLimitForm;

