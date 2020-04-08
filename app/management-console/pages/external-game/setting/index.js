import React, { Component, } from 'react';
import {
	HeaderButtonBar,
	Table,
	InputSearch,
	TextButton,
} from 'ljit-react-components';
import SettingForm from './setting-form';
import PageBlock from '../../../components/page-block';
import { Cells, } from '../../../components/table';
import { TransferEnums, } from '../utils';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../lib/enums';
import './style.styl';

const propTypes = {
	layoutConfigs: layoutConfigsPropTypes,
};
const defaultProps = {};
const { StatusCell, } = Cells;
const { MANUAL, SYNC, } = TransferEnums;

const fakeData = [{
	key: 'game-1',
	platformName: 'AG真人',
	platformClass: '真人',
	isAppShow: true,
	transfer: MANUAL,
	status: 'offline',
},{
	key: 'game-2',
	platformName: 'AG棋牌',
	platformClass: '棋牌',
	isAppShow: true,
	transfer: MANUAL,
	status: 'online',
},{
	key: 'game-3',
	platformName: 'UG体育',
	platformClass: '体育',
	isAppShow: true,
	transfer: SYNC,
	status: 'maintenance',
}];

function getShowText(bool) {
	if (bool) {
		return '显示';
	} else {
		return '不显示';
	}
}

function getTransferText(type) {
	if (type === MANUAL) {
		return '手动转点';
	}
	if (type === SYNC) {
		return '平台同步';
	}
	return '';
}

class ExternalGameSettingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			searchValue: '',
			isModifyModalShow: false,
			editedPlatform: {},
		};
		this._handleSearchChange = this._handleSearchChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleSubmitModifyPlatform = this._handleSubmitModifyPlatform.bind(this);
		this._handleModifyPlatform = this._handleModifyPlatform.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}

	_handleSearchChange(event) {
		this.setState({ searchValue: event.target.value, });
	}
	_handleSearch(value) {
		//TODO search by api
	}

	_handleSubmitModifyPlatform(settings) {
		// TODO dispatch modify action

		this.setState({ isModifyModalShow: false, });
	}
	_handleModifyPlatform(editedPlatform) {
		this.setState({
			isModifyModalShow: true,
			editedPlatform,
		});
	}

	_renderTable() {
		const { tableData, } = this.state;
		const { _handleModifyPlatform, } = this;

		return (
			<Table
				dataSource={tableData}
				columns={[
					{
						title: '平台名称',
						dataIndex: 'platformName',
						key: 'platformName',
					},{
						title: '类别',
						dataIndex: 'platformClass',
						key: 'platformClass',
					},{
						title: 'APP是否显示',
						dataIndex: 'isAppShow',
						key: 'isAppShow',
						render: (isAppShow) => <div>{getShowText(isAppShow)}</div>,
					},{
						title: '转点方式',
						dataIndex: 'transfer',
						key: 'transfer',
						sorter: (firstElement, secondElement) => firstElement.transfer.localeCompare(secondElement.transfer),
						render: (transfer) => <div>{getTransferText(transfer)}</div>,
					},{
						title: '状态',
						dataIndex: 'status',
						key: 'status',
						render: (status) => <StatusCell.System data={status}/>,
					},{
						title: '操作',
						dataIndex: '',
						key: '',
						render: (record) =>
							<TextButton
								className="modify-text-button"
								text="修改"
								color={TextButton.TYPE_DEFAULT}
								onClick={() => _handleModifyPlatform(record)}
							/>
					},
				]}
			/>
		);
	}

	render() {
		const {
			isModifyModalShow,
			searchValue,
			editedPlatform,
		} = this.state;
		const { _renderTable, _handleSubmitModifyPlatform, } = this;
		const { layoutConfigs: { isFeatureActive, }, } = this.props;

		if (!isFeatureActive) {
			return null;
		}
		return (
			<PageBlock className="external-game-setting-page">
				<SettingForm
					isVisible={isModifyModalShow}
					initialValues={editedPlatform}
					onSubmit={_handleSubmitModifyPlatform}
					onCancel={() => this.setState({ isModifyModalShow: false, })}
				/>
				<HeaderButtonBar
					className="platform-setting-header-bar"
					right={
						<InputSearch
							className="platform-setting-header-bar__input-search"
							value={searchValue}
							onChange={this._handleSearchChange}
							onSearch={this._handleSearch}
							placeholder="请输入"
						/>
					}
				/>
				{_renderTable()}
			</PageBlock>
		);
	}

	componentDidMount() {
		// TODO fetch game by platform
		this.setState({
			tableData: fakeData,
		});
	}
}

ExternalGameSettingPage.propTypes = propTypes;
ExternalGameSettingPage.defaultProps = defaultProps;

export default compose(
	withFeatureToggle(FeatureCodeEnum.EXTERNAL_GAME_SETTING)
)(ExternalGameSettingPage);
