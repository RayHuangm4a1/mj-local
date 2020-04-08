import React, { Component, } from 'react';
import {
	HeaderButtonBar,
	Button,
	Table,
	TextButton,
	Divider,
	Popover,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import PageModal from '../../../components/page-modal';
import PresetMaintainEditingModal from './preset-maintain-editing-modal';
import { convertDateStringToTimestamp, formatDate } from '../../../../lib/moment-utils';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../lib/enums';

const propTypes = {
	layoutConfigs: layoutConfigsPropTypes,
};

const { Message } = PageModal;

const fakeData = [
	{
		_id: '0',
		type: '真人视讯',
		game: 'AG',
		maintainDays: [
			{ key: '0', weekday: '礼拜一', startAt: convertDateStringToTimestamp('07:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
			{ key: '1', weekday: '礼拜二', startAt: convertDateStringToTimestamp('07:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
		]
	},
	{
		_id: '1',
		type: '体育',
		game: 'UG',
		maintainDays: [
			{ key: '0', weekday: '礼拜一', startAt: convertDateStringToTimestamp('07:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
			{ key: '1', weekday: '礼拜二', startAt: convertDateStringToTimestamp('08:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
			{ key: '2', weekday: '礼拜日', startAt: convertDateStringToTimestamp('09:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
		]
	},
	{
		_id: '2',
		type: '棋牌',
		game: 'SA',
		maintainDays: [
			{ key: '0', weekday: '礼拜一', startAt: convertDateStringToTimestamp('07:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
			{ key: '1', weekday: '礼拜二', startAt: convertDateStringToTimestamp('09:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
			{ key: '2', weekday: '礼拜日', startAt: convertDateStringToTimestamp('10:45', 'HH:mm'), endAt: convertDateStringToTimestamp('23:00', 'HH:mm'), },
		]
	}
];

// TODO set default data
const defaultSelectedData = {
	type: '棋牌',
	game: 'SA',
	maintainDays: [
		{
			key: '0',
			weekday: '礼拜一',
			startAt: convertDateStringToTimestamp(formatDate()),
			endAt: convertDateStringToTimestamp(formatDate()),
		},
		{
			key: '1',
			weekday: '礼拜二',
			startAt: convertDateStringToTimestamp(formatDate()),
			endAt: convertDateStringToTimestamp(formatDate()),
		}
	],
};
const initialState = {
	isEditingModalVisible: false,
	isConfirmModalVisible: false,
	isEditing: false,
	selectedData: defaultSelectedData,
};
const PREFIX_CLASS = 'preset-maintain-setting';

class ExternalGameMaintenancePage extends Component {
	constructor() {
		super();
		this.state = {
			...initialState,
			dataSource: [],
		};

		this._handleClickAdd = this._handleClickAdd.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
		this._renderMaintainList = this._renderMaintainList.bind(this);
	}

	_handleClickAdd() {
		this.setState({
			isEditingModalVisible: true,
			isEditing: false,
		});
	}
	_handleClickEdit(selectedData) {
		this.setState({
			isEditingModalVisible: true,
			isEditing: true,
			selectedData
		});
	}
	_handleClickDelete(selectedData) {
		this.setState({
			isConfirmModalVisible: true,
			selectedData
		});
	}
	_handleCancel() {
		this.setState(initialState);
	}
	_handleSubmitEdit(values) {
		// TODO send edit api
		const { selectedData, dataSource, } = this.state;
		const { _id, } = selectedData;
		const updatedDataSource = dataSource.map(item => {
			if (item._id === _id) {
				return Object.assign({}, item, {
					...values
				});
			} else {
				return item;
			}
		});

		this.setState({
			...initialState,
			dataSource: updatedDataSource,
		});
	}
	_handleSubmitAdd(values) {
		// TODO send add api
		const { dataSource, } = this.state;

		if (values.maintainDays) {
			const updatedDataSource = [ ...dataSource, { ...values, },];

			this.setState({
				...initialState,
				dataSource: updatedDataSource,
			});
		}
	}
	_handleSubmitDelete() {
		// TODO send delete api
		const { selectedData, dataSource, } = this.state;
		const { _id } = selectedData;
		const updatedDataSource = dataSource.filter(item => {
			return item._id !== _id;
		});

		this.setState({
			...initialState,
			dataSource: updatedDataSource,
		});
	}
	_renderMaintainList(value = []) {
		return (
			<React.Fragment>
				{value.map((item, index) => (
					<div key={index} className={`${PREFIX_CLASS}__popover-overlay__list-item`}>
						<span>{item.weekday}</span>
						{`${formatDate(item.startAt, 'HH:mm')} - ${formatDate(item.endAt, 'HH:mm')}`}
					</div>
				))}
			</React.Fragment>
		);
	}

	render() {
		const {
			isEditingModalVisible,
			isConfirmModalVisible,
			isEditing,
			dataSource,
			selectedData,
		} = this.state;
		const {
			_handleClickAdd,
			_handleClickEdit,
			_handleClickDelete,
			_handleCancel,
			_handleSubmitAdd,
			_handleSubmitEdit,
			_handleSubmitDelete,
			_renderMaintainList,
		} = this;

		const title = isEditing ? "修改" : "新增";
		const handleSubmit = isEditing ? _handleSubmitEdit : _handleSubmitAdd;
		const { layoutConfigs: { isFeatureActive, } } = this.props;

		if (!isFeatureActive) {
			return null;
		}
		return (
			<PageBlock className={PREFIX_CLASS}>
				<HeaderButtonBar
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							icon="plus"
							onClick={_handleClickAdd}
						>
							新增
						</Button>
					)}
				/>
				<Table
					columns={[{
						title: '类型',
						dataIndex: 'type',
					},{
						title: '平台',
						dataIndex: 'game',
					},{
						title: '维护日期',
						dataIndex: 'maintainDays',
						render: value => (
							<Popover
								title="维护时间"
								overlayClassName={`${PREFIX_CLASS}__popover-overlay`}
								content={_renderMaintainList(value)}
								placement={Popover.PlacementEnums.TOP_LEFT}
							>
								<span style={{ color: '#268dff', }}>移动到此查看</span>
							</Popover>
						)
					},{
						title: '操作',
						render: (record) =>  {
							return (
								<div>
									<TextButton
										text="修改"
										onClick={() => _handleClickEdit(record)}
									/>
									<Divider type="vertical"/>
									<TextButton
										color="danger"
										text="删除"
										onClick={() => _handleClickDelete(record)}
									/>
								</div>
							);
						}
					},]}
					dataSource={dataSource}
					rowKey="_id"
				/>
				<PresetMaintainEditingModal
					data={selectedData}
					isVisible={isEditingModalVisible}
					title={title}
					onCancel={_handleCancel}
					onSubmit={handleSubmit}
				/>
				<Message
					visible={isConfirmModalVisible}
					title="确认提示"
					message="是否确认删除"
					onClickCancel={_handleCancel}
					onClickOk={_handleSubmitDelete}
				/>
			</PageBlock>
		);
	}
	componentDidMount() {
		// TODO get data
		this.setState({ dataSource: fakeData, });
	}
}

ExternalGameMaintenancePage.propTypes = propTypes;

export default compose(
	withFeatureToggle(FeatureCodeEnum.EXTERNAL_GAME_MAINTENANCE)
)(ExternalGameMaintenancePage);
