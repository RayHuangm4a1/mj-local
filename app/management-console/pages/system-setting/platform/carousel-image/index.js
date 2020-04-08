import React, { Component, } from 'react';
import {
	HeaderButtonBar,
	Button,
	Table,
	Switch,
	Divider,
	TextButton,
	Datetime,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import { convertDateStringToTimestamp, } from '../../../../lib/moment-utils';
import ImageEditingForm from './image-editing-form';
import { TypeNameMap, } from './utils';

const { Message } = PageModal;
const fakeData = [
	{
		key: 1,
		id: 1,
		imageFile: {
			uid: 'pic1',
			name: 'pic1',
			thumbUrl: 'https://picsum.photos/id/111/50/40'
		},
		type: 'Promotion',
		activity: 'activityB',
		URL: null,
		creater: 'Admin',
		isOpen: true,
		isMobile: false,
		updateAt: '2019-05-27T10:45:36+00:00',
	},
	{
		key: 2,
		id: 1,
		imageFile: {
			uid: 'pic2',
			name: 'pic2',
			thumbUrl: 'https://picsum.photos/id/112/50/40'
		},
		type: 'FixedImage',
		activity: null,
		URL: null,
		creater: 'Admin',
		isOpen: false,
		isMobile: true,
		updateAt: '2019-05-23T10:45:36+00:00',
	},
	{
		key: 3,
		id: 2,
		imageFile: {
			uid: 'pic3',
			name: 'pic3',
			thumbUrl: 'https://picsum.photos/id/113/50/40'
		},
		type: 'URL',
		activity: null,
		URL: 'https://google.com',
		creater: 'Admin',
		isOpen: true,
		isMobile: false,
		updateAt: '2019-05-25T10:45:36+00:00',
	},
	{
		key: 4,
		id: 2,
		imageFile: {
			uid: 'pic4',
			name: 'pic4',
			thumbUrl: 'https://picsum.photos/id/133/50/40'
		},
		type: 'URL',
		activity: null,
		URL: 'https://google.com',
		creater: 'Admin',
		isOpen: true,
		isMobile: false,
		updateAt: '2019-05-25T10:45:36+00:00',
	},
];

class SystemSettingPlatformCarouselImagePage extends Component {
	constructor() {
		super();

		this.state = {
			data: null,
			isEditingModalVisible: false,
			isEditing: false,
			isDeleteModalVisible: false,
			selectedData: null,
		};

		this._handleClickCreate = this._handleClickCreate.bind(this);
		this._handleEditingModalHide = this._handleEditingModalHide.bind(this);
		this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
		this._handleIsOpenChange = this._handleIsOpenChange.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleDeleteModalHide = this._handleDeleteModalHide.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
	}
	_handleClickCreate() {
		this.setState({
			isEditingModalVisible: true,
			isEditing: false,
			selectedData: null,
		});
	}

	_handleEditingModalHide() {
		this.setState({
			isEditingModalVisible: false,
			selectedData: null,
		});
	}
	_handleSubmitCreate(values) {
		const { _handleEditingModalHide } = this;

		// TODO send create api
		_handleEditingModalHide();
	}

	_handleIsOpenChange(selectedData) {
		// TODO send update api
		const { data, } = this.state;
		const { key } = selectedData;
		const updatedData = data.map(item => {
			if (item.key === key) {
				return Object.assign({}, item, {
					isOpen: !item.isOpen
				});
			} else {
				return Object.assign({}, item);
			}
		});

		this.setState({
			data: updatedData,
		});
	}
	_handleClickEdit(selectedData) {
		this.setState({
			isEditingModalVisible: true,
			isEditing: true,
			selectedData,
		});
	}
	_handleClickDelete(selectedData) {
		this.setState({
			isDeleteModalVisible: true,
			selectedData,
		});
	}
	_handleDeleteModalHide() {
		this.setState({
			isDeleteModalVisible: false,
			selectedData: null,
		});
	}
	_handleSubmitDelete() {
		const { _handleDeleteModalHide } = this;
		// TODO send delete api
		const { data, selectedData, } = this.state;
		const { key } = selectedData ;
		const updatedData = data.filter(item => {
			return (item.key !== key);
		});

		this.setState({
			data: updatedData,
		});
		_handleDeleteModalHide();
	}

	render() {
		const {
			data,
			isEditingModalVisible,
			isEditing,
			isDeleteModalVisible,
			selectedData,
		} = this.state;
		const {
			_handleClickCreate,
			_handleEditingModalHide,
			_handleSubmitCreate,
			_handleIsOpenChange,
			_handleClickEdit,
			_handleClickDelete,
			_handleDeleteModalHide,
			_handleSubmitDelete,
		} = this;

		return (
			<PageBlock>
				<HeaderButtonBar
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							icon="plus"
							onClick={_handleClickCreate}
							style ={{ marginBottom: 26 }}
						>
							新增图片
						</Button>
					)}
				/>
				<Table
					columns={[
						{
							title: "ID",
							dataIndex: "id"
						},
						{
							title: "图示",
							dataIndex: "imageFile",
							render: (value) => {
								if (value && value.thumbUrl) {
									return (
										<img
											style={{ maxWidth: 60, maxHeight: 60, }}
											src={value.thumbUrl}
										/>
									);
								}
							}
						},
						{
							title: "类型",
							dataIndex: "type",
							render: (value) => TypeNameMap[value]
						},
						{
							title: "建立者",
							dataIndex: "creater",
						},
						{
							title: "开放",
							dataIndex: "isOpen",
							render: (value, record) => {
								return (
									<Switch
										checked={value}
										onChange={() => _handleIsOpenChange(record)}
									/>
								);
							}
						},
						{
							title: "手机版",
							dataIndex: "isMobile",
							render: (value) => value === true ? "是" : "否"
						},
						{
							title: "异动时间",
							dataIndex: "updateAt",
							sorter: (a, b) => convertDateStringToTimestamp(a.updateAt) - convertDateStringToTimestamp(b.updateAt),
							render: (record) => (
								<div>
									<Datetime.DateOnly data={record} />
								</div>
							),
						},
						{
							title: "操作",
							dataIndex: "operation",
							render: (value, record) => {
								return (
									<div>
										<TextButton
											text="修改"
											onClick={() => _handleClickEdit(record)}
										/>
										<Divider type="vertical"/>
										<TextButton
											text="刪除"
											onClick={() => _handleClickDelete(record)}
											color="danger"
										/>
									</div>
								);
							}
						},
					]}
					dataSource={data}
				/>
				<Message
					visible={isDeleteModalVisible}
					title="确认提示"
					message="是否确定刪除图片？"
					onClickCancel={_handleDeleteModalHide}
					onClickOk={_handleSubmitDelete}
				/>
				<ImageEditingForm
					isVisible={isEditingModalVisible}
					onSubmit={_handleSubmitCreate}
					onCancel={_handleEditingModalHide}
					isEditing={isEditing}
					selectedData={selectedData}
				/>
			</PageBlock>
		);
	}

	componentDidMount() {
		this.setState({
			// TODO fetch data
			data: fakeData,
		});
	}
}

export default SystemSettingPlatformCarouselImagePage;

