import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	InputNumber,
	HeaderButtonBar,
	Button,
	Modal,
	LabelContent,
	Form,
	Row,
	Col,
	FormItem,
	Select,
	Input,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import LotteryOddTable from './lottery-odd-table';
import { connect } from '../../../../../ljit-store-connecter';
import { LoadingStatusEnum } from '../../../../lib/enums';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { getPKCount, } from './utils';

const { Message } = PageModal;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const propTypes = {
	isEditing: PropTypes.bool,
	onChangeEditing: PropTypes.func,
	onSelectTableRow: PropTypes.func,
	platformBonus: PropTypes.number.isRequired,
	selectedLotteryClassId: PropTypes.number.isRequired,
	lotteryClassOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	playsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		status: PropTypes.string,
		platform: PropTypes.shape({
			bonus: PropTypes.shape({
				min: PropTypes.number,
			}),
		}),
		updatedAt: PropTypes.string,
	})),
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryPlaysStatusLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	onChangeLotteryClass: PropTypes.func,
};
const defaultProps = {
	isEditing: false,
	onChangeEditing: () => {},
	onSelectTableRow: () => {},
	onChangeLotteryClass: () => {},
};
const initialState = {
	selectedTableRows: [],
	isConfirmMessageVisible: false,
	isBatchEditModalVisible: false,
	isEditPKCountsModalVisible: false,
	bonus: null,
};

class LotteryOddSetting extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			savedData: [],
			inputPKCounts: null,
			selectedPlay: {},
			...initialState
		};

		this._handleChangeInputNumber = this._handleChangeInputNumber.bind(this);
		this._handleSubmitSave = this._handleSubmitSave.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handleSubmitBatchEdit = this._handleSubmitBatchEdit.bind(this);
		this._handleCancelBatchEdit = this._handleCancelBatchEdit.bind(this);
		this._handleClickTitleCheckBox = this._handleClickTitleCheckBox.bind(this);
		this._handleClickContentCheckBox = this._handleClickContentCheckBox.bind(this);
		this._handleClickEditPKCounts = this._handleClickEditPKCounts.bind(this);
		this._handleSubmitEditPKCounts = this._handleSubmitEditPKCounts.bind(this);
		this._handleCancelEditPKCounts = this._handleCancelEditPKCounts.bind(this);
		this._renderEditingHeader = this._renderEditingHeader.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderSearchForm = this._renderSearchForm.bind(this);
		this._renderEditBonusButton = this._renderEditBonusButton.bind(this);
		this._renderNormalHeader = this._renderNormalHeader.bind(this);
	}
	_handleChangeInputNumber(number, record, dataIndex) {
		const { data } = this.state;
		const { id } = record;
		const updatedData = data.map(item => {
			if (item.id === id) {
				return Object.assign({}, item, {
					[dataIndex]: number
				});
			}
			return Object.assign({}, item);
		});

		this.setState({ data: updatedData, });
	}
	_handleSubmitSave() {
		// TODO send save api
		const { data } = this.state;
		const {
			onChangeEditing,
			onSelectTableRow,
		} = this.props;

		onChangeEditing(false);
		onSelectTableRow(0);
		this.setState({
			savedData: data.slice(),
			...initialState,
		});
	}
	_handleClickCancel() {
		const { savedData } = this.state;
		const {
			onChangeEditing,
			onSelectTableRow,
		} = this.props;

		onChangeEditing(false);
		onSelectTableRow(0);
		this.setState({
			data: savedData.slice(),
			...initialState,
		});
	}
	_handleSubmitBatchEdit() {
		const { onSelectTableRow, } = this.props;
		const { bonus, data, selectedTableRows, } = this.state;

		const updatedData = data.map(item => {
			if (selectedTableRows.indexOf(item.id) !== -1) {
				return Object.assign({}, item, {
					bonus,
				});
			} else {
				return Object.assign({}, item);
			}
		});

		onSelectTableRow(0);
		this.setState({
			data: updatedData,
			...initialState,
		});
	}
	_handleCancelBatchEdit() {
		const { onSelectTableRow, } = this.props;

		onSelectTableRow(0);
		this.setState(initialState);
	}
	_handleClickTitleCheckBox() {
		const { onSelectTableRow } = this.props;
		const { data, selectedTableRows, } = this.state;
		const numberOfData = data.length;
		const isSelectedAll = (selectedTableRows.length === numberOfData);
		const updatedSelectedTableRows = isSelectedAll ? [] : data.map((item) => item.id);
		const numberOfSelectedTableRows = isSelectedAll ? 0 : numberOfData;

		onSelectTableRow(numberOfSelectedTableRows);
		this.setState({ selectedTableRows: updatedSelectedTableRows, });
	}
	_handleClickContentCheckBox(selectedRowKey) {
		const { onSelectTableRow } = this.props;
		const { selectedTableRows } = this.state;
		const isSelected = (selectedTableRows.indexOf(selectedRowKey) !== -1);

		let updatedSelectedTableRows;

		if (isSelected) {
			updatedSelectedTableRows = selectedTableRows.filter(key => key !== selectedRowKey);
		} else {
			updatedSelectedTableRows = [...selectedTableRows, selectedRowKey];
		}
		onSelectTableRow(updatedSelectedTableRows.length);
		this.setState({ selectedTableRows: updatedSelectedTableRows, });
	}
	_handleClickEditPKCounts(playId) {
		this.setState((prevState) => {
			const {
				data,
			} = prevState;
			const selectedPlay = data.filter(play => play.id === playId);

			if (selectedPlay) {
				return {
					isEditPKCountsModalVisible: true,
					selectedPlay: selectedPlay[0],
					inputPKCounts: getPKCount(selectedPlay[0]),
				};
			} else {
				return {
					isEditPKCountsModalVisible: true,
					selectedPlay: {},
					inputPKCounts: 0,
				};
			}
		});
	}
	_handleSubmitEditPKCounts() {
		//TODO: change to updatePKCountsAction
		const {
			data,
			selectedPlay,
			inputPKCounts,
		} = this.state;
		const updatedData = data.map(item => {
			if (item.id === selectedPlay.id) {
				const updateItem = cloneDeep(item);

				set(updateItem, ['awards', '中奖', 'pk', 'count'], inputPKCounts);
				return updateItem;
			}
			return Object.assign({}, item);
		});

		this.setState({
			data: updatedData,
			isEditPKCountsModalVisible: false,
		});
	}
	_handleCancelEditPKCounts() {
		this.setState({
			isEditPKCountsModalVisible: false,
		});
	}
	_renderEditingHeader() {
		const { platformBonus, } = this.props;
		const { selectedTableRows, } = this.state;
		const isTableRowSelected = selectedTableRows.length > 0;

		return (
			<HeaderButtonBar
				className={cx('lottery-odds-edit-buttons', { ['margin-bottom--large']: isTableRowSelected })}
				left={(
					<span style={{ color: '#f5222d', }}>
						*计算方式依照平台最高奖金号: {platformBonus}
					</span>
				)}
				right={(
					<React.Fragment>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							onClick={() => this.setState({ isBatchEditModalVisible: true })}
							style={{ marginRight: 20 }}
							disabled={!isTableRowSelected}
						>
							批量修改
						</Button>
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={() => this.setState({ isConfirmMessageVisible: true, })}
						>
							储存
						</Button>
					</React.Fragment>
				)}
			/>
		);
	}
	_handleSearch() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				// TODO dispatch search action.
			}
		});
	}
	_handleReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_renderSearchForm() {
		const {
			_handleSearch,
			_handleReset,
		} = this;

		return (
			<div className={`lottery-odds-search-form`}>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								className="lottery-odds-search-form__form-item"
								itemName="playConditionId"
								label="分类"
								labelColon
							>
								<Select
									className="lottery-odds-search-form__form-input"
									options={[]}
									placeholder="请选择分类"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								className="lottery-odds-search-form__form-item"
								itemName="award"
								label="奖项"
								labelColon
							>
								<Select
									className="lottery-odds-search-form__form-input"
									options={[]}
									placeholder="请选择奖项名称"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								className="lottery-odds-search-form__form-item"
								itemName="keyword"
								label="关键字"
								labelColon
							>
								<Input
									className="lottery-odds-search-form__form-input"
									placeholder="请输入关键字"
								/>
							</FormItem>
						</Col>
					</Row>
					<HeaderButtonBar
						className="lottery-odds-search-form__form-buttons"
						right={
							<Fragment>
								<Button
									onClick={() => _handleSearch()}
									outline={Button.OutlineEnums.SOLID}
								>
									查询
								</Button>
								<Button
									onClick={() => _handleReset()}
									outline={Button.OutlineEnums.HOLLOW}
								>
									重置
								</Button>
							</Fragment>
						}
					/>
				</Form>
			</div>
		);
	}
	_renderEditBonusButton() {
		const { onChangeEditing, } = this.props;

		return (
			<HeaderButtonBar
				className="lottery-odds-edit-buttons"
				right={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={() => onChangeEditing(true)}
					>
						奖金号修改
					</Button>
				)}
			/>
		);
	}
	_renderNormalHeader() {
		const {
			_renderSearchForm,
			_renderEditBonusButton,
		} = this;

		return (
			<Fragment>
				{_renderSearchForm()}
				{_renderEditBonusButton()}
			</Fragment>
		);
	}

	render() {
		const {
			isEditing,
			platformBonus,
			loadingStatus,
			updateLotteryPlaysStatusLoadingStatus,
		} = this.props;
		const {
			data,
			isBatchEditModalVisible,
			bonus,
			isConfirmMessageVisible,
			isEditPKCountsModalVisible,
			selectedTableRows,
			inputPKCounts,
		} = this.state;
		const {
			_handleClickTitleCheckBox,
			_handleClickContentCheckBox,
			_handleChangeInputNumber,
			_handleSubmitSave,
			_handleClickCancel,
			_handleCancelBatchEdit,
			_handleSubmitBatchEdit,
			_handleClickEditPKCounts,
			_handleSubmitEditPKCounts,
			_handleCancelEditPKCounts,
			_renderNormalHeader,
			_renderEditingHeader,
		} = this;

		return (
			<div>
				{isEditing ? _renderEditingHeader() : _renderNormalHeader() }
				<LotteryOddTable
					isLoading={loadingStatus === LOADING || updateLotteryPlaysStatusLoadingStatus === LOADING}
					playsData={data}
					onChangeInputNumber={_handleChangeInputNumber}
					onClickTitleCheckBox={_handleClickTitleCheckBox}
					onClickContentCheckBox={_handleClickContentCheckBox}
					onClickEditPKCounts={_handleClickEditPKCounts}
					isEditing={isEditing}
					selectedTableRows={selectedTableRows}
					platformBonus={platformBonus}
				/>
				<PageModal
					className="lottery-odds-setting__page-modal"
					modalSize={Modal.ModalSizeEnum.SMALL}
					visible={isBatchEditModalVisible}
					title="批量修改"
					onClickCancel={_handleCancelBatchEdit}
					onClickOk={_handleSubmitBatchEdit}
				>
					<LabelContent
						label="奖金号"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
					>
						<InputNumber
							value={bonus}
							onChange={(value) => this.setState({ bonus: value, })}
							placeholder="请输入奖金号"
						/>
					</LabelContent>
				</PageModal>
				<PageModal
					className="lottery-odds-setting__page-modal"
					modalSize={PageModal.ModalSizeEnum.SMALL}
					visible={isEditPKCountsModalVisible}
					title="修改"
					onClickCancel={_handleCancelEditPKCounts}
					onClickOk={_handleSubmitEditPKCounts}
				>
					<LabelContent
						label="最低注数"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
					>
						<InputNumber
							value={inputPKCounts}
							onChange={(value) => this.setState({ inputPKCounts: value, })}
							placeholder="请输入最低注数"
							min={1}
						/>
					</LabelContent>
				</PageModal>
				<Message
					title="提示"
					message="确定變更項目？"
					visible={isConfirmMessageVisible}
					modalSize="small"
					onClickOk={_handleSubmitSave}
					onClickCancel={_handleClickCancel}
				/>
			</div>
		);
	}
	componentDidUpdate(prevProps) {
		const { playsData, loadingStatus, } = this.props;
		const isLotteryPlaysLoaded = loadingStatus === SUCCESS && prevProps.loadingStatus === LOADING;

		if (isLotteryPlaysLoaded) {
			this.setState({
				data: playsData,
				savedData: playsData,
			});
		}
	}
}

LotteryOddSetting.propTypes = propTypes;
LotteryOddSetting.defaultProps = defaultProps;

function mapStateToProp(state) {
	return {
		playsData: state.lotteryPlays.get('plays').toArray(),
		loadingStatus: state.lotteryPlayBonusStandardManagementPage.get('playsLoadingStatus'),
		updateLotteryPlaysStatusLoadingStatus: state.lotteryPlays.get('updateLotteryPlaysStatusLoadingStatus'),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		// TODO update plays
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(LotteryOddSetting);
