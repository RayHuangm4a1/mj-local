import React, { Component, } from 'react';
import {
	Table,
	TableEllipsisText,
	TextButton,
} from 'ljit-react-components';
import { convertDateStringToTimestamp, formatDate, } from '../../../../lib/moment-utils';
import PageBlock from '../../../../components/page-block';
import SettingFormModal from './setting-form-modal';
import SearchForm from './search-form';
import './style.styl';

export const PREFIX_CLASS = 'ljit-client-game-explain';

const propTypes = {};
const defaultProps = {};

class SystemSettingClientGameExplainPage extends Component {
	constructor() {
		super();
		this.state = {
			tableData: gamePlayDescription,
			isModifyModalShow: false,
			modalKeyValue: null,
			modalNameValue: '',
			modalPlayDescriptionValue: '',
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleShowEditModal = this._handleShowEditModal.bind(this);
		this._renderPlayDescriptionTable = this._renderPlayDescriptionTable.bind(this);
		this._handleSubmitModifyPlayDescription = this._handleSubmitModifyPlayDescription.bind(this);
	}

	_handleSearch(value) {
		//TODO post search api
		console.log(value);
	}

	_handleShowEditModal({ key, playName, description }) {
		this.setState({
			isModifyModalShow: true,
			modalKeyValue: key,
			modalNameValue: playName,
			modalPlayDescriptionValue: description,
		});
	}

	_renderPlayDescriptionTable() {
		const { _handleShowEditModal, } = this;
		const columns = [{
			title: '彩种',
			dataIndex: 'lotteryName',
			key: 'lotteryName',
		},{
			title: '玩法名称',
			dataIndex: 'playName',
			key: 'playName',
		},{
			title: '说明',
			dataIndex: 'description',
			key: 'description',
			render: (record) =>
				<TableEllipsisText
					className="description-text"
					text={record}
					tooltipPosition={TableEllipsisText.TooltipPositionEnums.TOP}
					tooltipWidth={330}
				/>,
		},{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},{
			title: '修改时间',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
		},{
			title: '操作',
			render: (record) => (
				<TextButton
					text="修改"
					onClick={() => _handleShowEditModal(record)}
					className={`${PREFIX_CLASS}__operation`}
				>
				</TextButton>
			),
		},];

		const sorters = [{
			dataIndex: 'createdAt',
			sorter: (prev, next) =>
				convertDateStringToTimestamp(prev.createdAt) - convertDateStringToTimestamp(next.createdAt),
		},{
			dataIndex: 'updatedAt',
			sorter: (prev, next) =>
				convertDateStringToTimestamp(prev.updatedAt) - convertDateStringToTimestamp(next.updatedAt),
		}];

		const { tableData } = this.state;

		return (
			<Table
				className="game-description-table"
				rowKey="key"
				dataSource={tableData}
				columns={columns}
				sorters={sorters}
			/>
		);
	}

	_handleSubmitModifyPlayDescription(data) {
		// TODO update description to server
		const { name, description, } = data;
		const { tableData, modalKeyValue, } = this.state;
		const newData = tableData.map((item) => {
			if (item.key === modalKeyValue) {
				return Object.assign(item, {
					name,
					description,
					updatedAt: formatDate(),
				});
			}
			return item;
		});

		this.setState({
			tableData: newData,
			isModifyModalShow: false,
		});
	}
	render() {
		const {
			isModifyModalShow,
			modalNameValue,
			modalPlayDescriptionValue,
		} = this.state;
		const {
			_handleSearch,
			_renderPlayDescriptionTable,
			_handleSubmitModifyPlayDescription,
		} = this;

		return (
			<React.Fragment>
				<PageBlock
					className={PREFIX_CLASS}
					noMinHeight
				>
					<SearchForm
						onSearch={_handleSearch}
						// TODO get options from api
						lotteryOptions={[
							{
								value: 1,
								label: '重慶時時彩'
							},
							{
								value: 2,
								label: '分分彩'
							}
						]}
					/>
					{_renderPlayDescriptionTable()}
				</PageBlock>
				<SettingFormModal
					isVisible={isModifyModalShow}
					title="修改玩法"
					isNameInputDisabled
					initialValues={{
						name: modalNameValue,
						description: modalPlayDescriptionValue,
					}}
					onSubmit={_handleSubmitModifyPlayDescription}
					onCancel={() => this.setState({ isModifyModalShow: false, })}
				/>
			</React.Fragment>
		);
	}
}

SystemSettingClientGameExplainPage.propTypes = propTypes;
SystemSettingClientGameExplainPage.defaultProps = defaultProps;

export default SystemSettingClientGameExplainPage;

const gamePlayDescription = [{
	key: 1,
	lotteryName: '重庆时时彩',
	playName: '五星',
	description: '投五個號碼',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},{
	key: 2,
	lotteryName: '重庆时时彩',
	playName: '五星直选复式',
	description: '直接五個號碼',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},{
	key: 3,
	lotteryName: '重庆时时彩',
	playName: '五星直选单式',
	description: '輸入方式為打數字或貼上號碼的模式，中獎與直選複式相同',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},{
	key: 4,
	lotteryName: '重庆时时彩',
	playName: '五星直选组合',
	description: '五個位置各選一個號碼，投一個重個位數開始的排列組合，最少5注',
	createdAt: '2019/5/3 13:32:31',
	updatedAt: '2019/5/3 13:32:31',
},];
