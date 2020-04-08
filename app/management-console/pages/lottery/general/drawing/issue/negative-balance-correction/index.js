import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Table,
	TextButton,
	InputSearch,
	FormItem,
	InputNumber,
} from 'ljit-react-components';
import PageBlock from '../../../../../../components/page-block';
import EditFormModalButton from '../../../../../../components/modal-buttons/edit-form-modal-button';

const propTypes = {
	onBack: PropTypes.func.isRequired,
};
const defaultProps = {};

const PREFIX_CLASS = 'negative-balance-correction';

class LotteryGeneralDrawingIssueNegativeBalanceCorrectionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			pagination: {},
		};
		this._handleChangeSearch = this._handleChangeSearch.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleCancelWithdraw = this._handleCancelWithdraw.bind(this);
		this._handleTakeBackWallets = this._handleTakeBackWallets.bind(this);
		this._handleManualAdditionSubmit = this._handleManualAdditionSubmit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderManualAdditionButton = this._renderManualAdditionButton.bind(this);
	}
	_handleChangeSearch(e) {
		this.setState({
			searchValue: e.target.value,
		});
	}
	_handleSearch() {
		// TODO: 串接 API 來處理搜尋
	}
	_handleCancelWithdraw() {
		// TODO: 串接 API 來處理 取消提款單
	}
	_handleTakeBackWallets() {
		// TODO: 串接 API 來處理 回收外接錢包
	}
	_handleManualAdditionSubmit(value) {
		// TODO: 串接 API 來處理 人工補正
	}
	_handleChangeTable(pagination) {
		this.setState({ pagination, });
	}
	_renderManualAdditionButton() {
		const formBody = (
			<FormItem
				label="补入金额"
				itemName="amount"
			>
				<InputNumber
					min={0}
					step={0.1}
					style={{ width: '201px', }}
					placeholder="请输入金额"
				/>
			</FormItem>
		);

		return (
			<div>
				<EditFormModalButton
					formTitle="人工补入"
					buttonText="人工补入"
					onSubmitForm={this._handleManualAdditionSubmit}
					formBody={formBody}
				/>
			</div>
		);
	}
	render() {
		const {
			props,
			state,
			_handleChangeSearch,
			_handleSearch,
			_handleChangeTable,
			_handleCancelWithdraw,
			_handleTakeBackWallets,
			_renderManualAdditionButton,
		} = this;
		const { onBack, } = props;
		const { pagination, } = state;
		// TODO: 先用假資料串接，等API完成再串接
		const dataSource = createFakeNegativeBalanceData();

		const tableColumns = [
			{
				title: '帐号',
				dataIndex: 'account',
				key: 'account',
			},
			{
				title: '余额',
				dataIndex: 'balance',
				key: 'balance',
			},
			{
				title: '操作',
				dataIndex: '',
				key: '',
				render: function() {
					return (
						<div>
							{_renderManualAdditionButton()}
							<div>
								<TextButton
									onClick={_handleTakeBackWallets}
									text="回收外接钱包"
								/>
							</div>
							<div>
								<TextButton
									onClick={_handleCancelWithdraw}
									text="取消提款单"
								/>
							</div>
						</div>
					);
				}
			},
		];

		return (
			<div className={PREFIX_CLASS}>
				<Button
					className={`${PREFIX_CLASS}__onback-button`}
					outline={Button.OutlineEnums.HOLLOW}
					onClick={onBack}
				>
					返回上一层
				</Button>
				<PageBlock>
					<div className={`${PREFIX_CLASS}__input-search`} >
						<div>
							<InputSearch
								value={state.searchValue}
								onChange={_handleChangeSearch}
								onSearch={_handleSearch}
							/>
						</div>
					</div>
					<Table
						className={`${PREFIX_CLASS}__correction`}
						dataSource={dataSource}
						hasPagination
						paginationProps={{ ...pagination }}
						onTableChange={_handleChangeTable}
						columns={tableColumns}
					/>
				</PageBlock>
			</div>
		);
	}
}

function createFakeNegativeBalanceData() {
	const output = [];

	for (let i = 0 ; i < 100 ; i++) {
		output.push({
			account: `test-${i}`,
			balance: -(i+1),
			key: `test-${i}`,
		});
	}
	return output;
}

LotteryGeneralDrawingIssueNegativeBalanceCorrectionPage.propTypes = propTypes;
LotteryGeneralDrawingIssueNegativeBalanceCorrectionPage.defaultProps = defaultProps;

export default LotteryGeneralDrawingIssueNegativeBalanceCorrectionPage;
