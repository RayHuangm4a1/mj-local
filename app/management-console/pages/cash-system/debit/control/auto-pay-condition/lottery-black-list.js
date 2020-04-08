import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	Button,
	CheckBox,
	HeaderButtonBar,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import PageModal from '../../../../../components/page-modal';

const propTypes = {
	lotteryBlackListData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		lottery: PropTypes.string,
		play: PropTypes.string,
		issues: PropTypes.arrayOf(PropTypes.number),
	})),
	onSubmitLotteryBlackList: PropTypes.func,
	onDeleteLotteryBlackList: PropTypes.func,
};

const BLACK_LIST_BLOCK_CLASS = 'black-list-block';
const rowKey = 'id';

class LotteryBlackList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedRowKeys: [],
			isDeleteModalShow: false,
		};

		this._handleShowDeleteModal = this._handleShowDeleteModal.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this._checkIsSelectAll = this._checkIsSelectAll.bind(this);
		this._handleClickContentCheckBox = this._handleClickContentCheckBox.bind(this);
		this._handleClickTitleCheckBox = this._handleClickTitleCheckBox.bind(this);
		this._renderTitleCheckBox = this._renderTitleCheckBox.bind(this);
		this._renderSelectionColumn = this._renderSelectionColumn.bind(this);
	}

	_handleShowDeleteModal() {
		this.setState({
			isDeleteModalShow: true,
		});
	}

	_handleDelete() {
		const { onDeleteLotteryBlackList, } = this.props;
		const { selectedRowKeys, } = this.state;
		
		this.setState({
			selectedRowKeys: [],
			isDeleteModalShow: false,
		});
		onDeleteLotteryBlackList(selectedRowKeys);
	}

	_checkIsSelectAll() {
		const { lotteryBlackListData, } = this.props;
		const { selectedRowKeys, } = this.state;
		const numberOfData = lotteryBlackListData.length;
		const numberOfSelected = selectedRowKeys.length;
		const isSelectedAll = numberOfSelected === numberOfData && numberOfData > 0;

		return isSelectedAll;
	}

	_handleClickContentCheckBox(record) {
		const { selectedRowKeys, } = this.state;
		const selectedRowKey = record[rowKey];

		let updatedSelectedRowKeys = [];

		if (selectedRowKeys.indexOf(selectedRowKey) !== -1) {
			updatedSelectedRowKeys = selectedRowKeys.filter(item => item !== selectedRowKey);
		} else {
			updatedSelectedRowKeys = [...selectedRowKeys, selectedRowKey];
		}

		this.setState({ selectedRowKeys: updatedSelectedRowKeys, });
	}

	_handleClickTitleCheckBox() {
		const { lotteryBlackListData, } = this.props;
		const { _checkIsSelectAll } = this;
		const allSelectedTableRows = getDataRowKeys(lotteryBlackListData);
		const isSelectedAll = _checkIsSelectAll();
		const updatedSelectedRowKeys = isSelectedAll ? [] : allSelectedTableRows;

		this.setState({ selectedRowKeys: updatedSelectedRowKeys, });
	}

	_renderTitleCheckBox() {
		const { _handleClickTitleCheckBox, _checkIsSelectAll, } = this;

		return (
			<CheckBox
				value={_checkIsSelectAll()}
				onChange={_handleClickTitleCheckBox}
			/>
		);
	}

	_renderSelectionColumn() {
		const { _renderTitleCheckBox, _handleClickContentCheckBox, } = this;
		const { selectedRowKeys, } = this.state;

		return {
			title: _renderTitleCheckBox,
			dataIndex: 'selectedRowKey',
			render: (value, record) => {
				const recordRowKey = record[rowKey];
				const isSelected = selectedRowKeys.indexOf(recordRowKey) !== -1;

				return (
					<CheckBox
						value={isSelected}
						onChange={() => _handleClickContentCheckBox(record)}
					/>
				);
			}
		};
	}

	render() {
		const { lotteryBlackListData, onSubmitLotteryBlackList, } = this.props;
		const {
			isDeleteModalShow,
		} = this.state;
		const {
			_handleShowDeleteModal,
			_handleDelete,
			_renderSelectionColumn,
		} = this;
		const columns = [
			{
				title: '彩种',
				dataIndex: 'lottery',
				key: 'lottery',
			},{
				title: '玩法',
				dataIndex: 'play',
				key: 'play',
			},{
				title: '彩种期号',
				dataIndex: 'issues',
				key: 'issues',
				render: (issues) => {
					if (issues.length > 0) {
						return (
							<span>{issues[0]} 期 ~ {issues[1]} 期</span>
						);
					}
					return <span>无</span>;
				},
			},
			_renderSelectionColumn(),
		];

		return (
			<PageBlock className={`${BLACK_LIST_BLOCK_CLASS}__page-block`}>
				<HeaderButtonBar
					left={<PageBlock.Title text="彩种黑名单"/>}
					right={
						<Fragment>
							<Button
								className={`${BLACK_LIST_BLOCK_CLASS}__add-button`}
								outline={Button.OutlineEnums.SOLID}
								icon={Button.IconEnums.PLUS}
								onClick={onSubmitLotteryBlackList}
							>
								新增彩种黑名单
							</Button>
							<Button
								className={`${BLACK_LIST_BLOCK_CLASS}__delete-button`}
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleShowDeleteModal}
							>
								删除
							</Button>
						</Fragment>
					}
				/>
				<PageModal.Message
					visible={isDeleteModalShow}
					message="是否确定删除彩种黑名单？"
					onClickOk={_handleDelete}
					onClickCancel={() => this.setState({ isDeleteModalShow: false, })}
				/>
				<Table
					className={`${BLACK_LIST_BLOCK_CLASS}__black-list-table`}
					dataSource={lotteryBlackListData}
					columns={columns}
					rowKey={rowKey}
				/>
			</PageBlock>
		);
	}
}

LotteryBlackList.propTypes = propTypes;

export default LotteryBlackList;

function getDataRowKeys(data = []) {
	return data.map(record => record[rowKey]);
}
