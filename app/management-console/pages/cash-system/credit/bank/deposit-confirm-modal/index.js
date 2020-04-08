import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Modal,
	RemindText,
	Divider,
	Row,
	Col,
	LabelContent,
	Input,
	Button,
	Table,
	DecimalNumber,
	TextButton,
} from 'ljit-react-components';
import copyToClipboard from 'copy-to-clipboard';
import {
	isDateValid,
	formatDate,
} from '../../../../../lib/moment-utils';
import {
	DEPOSIT_MODAL_PREFIX_CLASS,
} from '../../utils';
import { depositOrderTableColumns, } from '../utils';

const propTypes = {
	isVisible: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
	order: PropTypes.object,
};
const defaultProps = {
	isVisible: false,
	onClickCancel: () => {},
	onClickOk: () => {},
	order: {},
};

const initialState = {
	hasSearched: false,
	searchedOrderId: '',
	matchedIdOrderTableData: [],
	isDepositable: false,
};

class DepositConfirmModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...initialState,
		};
		this._handleSearchedOrderIdInput = this._handleSearchedOrderIdInput.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleDeposit = this._handleDeposit.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._renderTable = this._renderTable.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
	}
	_handleSearchedOrderIdInput(e) {
		this.setState({ searchedOrderId: e.target.value, });
	}
	_handleSearch() {
		const { order, } = this.props;
		const { searchedOrderId, } = this.state;
		const matchedIdOrderTableData = order.orderId === searchedOrderId ? [order] : [];

		this.setState({
			hasSearched: true,
			matchedIdOrderTableData,
		});
	}
	_handleDeposit() {
		const {
			hasSearched,
			matchedIdOrderTableData,
		} = this.state;

		if (hasSearched) {
			this.props.onClickOk(matchedIdOrderTableData[0]);
			this.setState({ ...initialState, });
		}
	}
	_handleClickCancel() {
		this.props.onClickCancel();
		this.setState({ ...initialState, });
	}
	_renderTable() {
		const {
			hasSearched,
			matchedIdOrderTableData,
		} = this.state;
		const rowSelection = {
			type: 'radio',
			onChange: () => this.setState({ isDepositable: true, }),
		};

		if (hasSearched) {
			return (
				<Table
					rowKey="orderId"
					className="withdrawal-bank-table"
					columns={depositOrderTableColumns}
					dataSource={matchedIdOrderTableData}
					rowSelection={rowSelection}
				/>
			);
		}
		return null;
	}
	_renderFooter() {
		const {
			state,
			_handleDeposit,
			_handleClickCancel,
		} = this;

		return (
			<Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleClickCancel}
				>
					取消
				</Button>
				<Button
					disabled={!state.isDepositable}
					onClick={_handleDeposit}
				>
					确认入款
				</Button>
			</Fragment>
		);
	}
	render() {
		const {
			props,
			state,
			_handleSearchedOrderIdInput,
			_handleSearch,
			_handleClickCancel,
			_renderTable,
			_renderFooter,
		} = this;
		const {
			order,
			isVisible,
		} = props;
		const {
			transactedAt = '',
			depositedAccount = '',
			comment = '',
			amount = 0,
			payer = ''
		} = order;
		const modalFooter = _renderFooter();
		const formatedTransactedAt = isDateValid(transactedAt) ? formatDate(transactedAt) : '';

		return (
			<Modal
				title="确认入款"
				okText="确认入款"
				className={DEPOSIT_MODAL_PREFIX_CLASS}
				visible={isVisible}
				modalSize={Modal.ModalSizeEnum.LARGE}
				onClickCancel={_handleClickCancel}
				footer={modalFooter}
			>
				<Row>
					<div className="title">银行交易纪录</div>
					<Col span={12}>
						<div className="attr">
							<div className="attr-label"><span>银行交易时间</span></div>
							<div className="attr-value"><span>{formatedTransactedAt}</span></div>
						</div>
						<div className="attr">
							<div className="attr-label"><span>存入银行帐号</span></div>
							<div className="attr-value"><span>{depositedAccount}</span></div>
						</div>
						<div className="attr">
							<div className="attr-label"><span>银行备注</span></div>
							<div className="attr-value"><span>{comment}</span></div>
						</div>
					</Col>
					<Col span={12}>
						<div className="attr">
							<div className="attr-label"><span>存款金额</span></div>
							<div className="attr-value"><DecimalNumber data={amount} hasSeparator/></div>
						</div>
						<div className="attr">
							<div className="attr-label"><span>存款人姓名</span></div>
							<div className="attr-value"><span>{payer}</span></div>
						</div>
					</Col>
				</Row>
				<Divider />
				<div className="title">符合金額入款单</div>
				<Table
					columns={[
						{
							dataIndex: 'operation',
							render: (value, record) => {
								return (
									<TextButton
										text="复制单号"
										onClick={() => copyToClipboard(record.orderId)}
									/>
								);
							}
						},
						...depositOrderTableColumns
					]}
					dataSource={[order]}
				/>

				<Divider />
				<div className="title">指定入款单</div>
				<Row className="input-row">
					<LabelContent label="订单编号" labelColon={false} className="input-form">
						<div>
							<Input
								value={state.searchedOrderId}
								onChange={_handleSearchedOrderIdInput}
							/>
							<Button
								className="input-button"
								onClick={_handleSearch}
							>
								确定
							</Button>
						</div>
					</LabelContent>
				</Row>
				{_renderTable()}
				<RemindText
					styleType={RemindText.StyleTypeEnums.ERROR}
					text={(
						<Fragment>
							<div>1. 只能查询未处理的入款单</div>
							<div>2. 若银行交易纪录金额、姓名与入款单申请金额、姓名不相同，会以银行交易纪录为主，并修改入款单的申请金额、姓名</div>
							<div>3. 需输入完整入款单号才能查询</div>
						</Fragment>
					)}
				/>
			</Modal>
		);
	}
}

// TODO (1) 將符合金額入款單資料放入 符合金額入款單 的表單內, (2) 搜尋的比對機制
DepositConfirmModal.propTypes = propTypes;
DepositConfirmModal.defaultProps = defaultProps;

export default DepositConfirmModal;
