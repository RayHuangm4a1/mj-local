import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Table,
	Button,
	TextButton,
	Divider,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import UrlForm from './url-form';

const fakeData = Array.from(Array(20).keys()).map((index) => {
	return {
		_id: index + 1,
		linkUrl: `http://coddemo.cloudapp${index + 1}.net`,
		forestageUrl: `http://coddemo.cloudapp${index + 1}`,
	};
});

const INITIAL_ROW_ID = null;

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.object),
};

class SystemSettingPlatformUrlPage extends Component {
	constructor() {
		super();
		this.state = {
			isUrlFormVisible: false,
			isMessageVisible: false,
			formTitle: null,
			rowData: {},
			rowId: INITIAL_ROW_ID,
		};
		this._handleAddFormShow = this._handleAddFormShow.bind(this);
		this._handleEditFormShow = this._handleEditFormShow.bind(this);
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._handleFormCancel = this._handleFormCancel.bind(this);
		this._handleMessageShow = this._handleMessageShow.bind(this);
		this._handleMessageConfirm = this._handleMessageConfirm.bind(this);
		this._handleMessageCancel = this._handleMessageCancel.bind(this);
	}

	_handleAddFormShow() {
		this.setState(() => setFormData('新增网址'));
		this.setState(toggleFormVisible);
	}
	_handleEditFormShow(rowData) {
		this.setState(() => setFormData('修改网站网址', rowData));
		this.setState(toggleFormVisible);
	}
	_handleFormSubmit() {
		// TODO call api with form data
		this.setState(toggleFormVisible);
	}
	_handleFormCancel() {
		this.setState(toggleFormVisible);
	}

	_handleMessageShow(rowId) {
		this.setState(() => setRowId(rowId));
		this.setState(toggleMessage);
	}
	_handleMessageConfirm() {
		// TODO call api with row id
		this.setState(toggleMessage);
	}
	_handleMessageCancel() {
		this.setState(toggleMessage);
		this.setState(resetRowId);
	}

	render() {
		const {
			data = fakeData,
		} = this.props;
		const {
			isUrlFormVisible,
			isMessageVisible,
			formTitle,
			rowData,
		} = this.state;
		const columns = [
			{
				title: '连结网址',
				dataIndex: 'linkUrl',
			},
			{
				title: '前台网址',
				dataIndex: 'forestageUrl',
			},
			{
				title: '功能',
				dataIndex: 'operation',
				render: (text, record) => (
					<Fragment>
						<TextButton
							text="修改"
							onClick={() => this._handleEditFormShow(record)}
						/>
						<Divider
							type={Divider.DirectionTypeEnums.VERTICAL}
						/>
						<TextButton
							color="danger"
							text="刪除"
							onClick={() => this._handleMessageShow(record._id)}
						/>
					</Fragment>
				),
			},
		];

		return (
			<PageBlock>
				<UrlForm
					isFormVisible={isUrlFormVisible}
					initialValues={rowData}
					formTitle={formTitle}
					onSubmit={this._handleFormSubmit}
					onCancel={this._handleFormCancel}
				/>
				<PageModal.Message
					visible={isMessageVisible}
					title="确认提示"
					message="您确定要刪除嗎 ？"
					onClickOk={this._handleMessageConfirm}
					onClickCancel={this._handleMessageCancel}
				/>
				<div style={{ marginBottom: 24, }}>
					<HeaderButtonBar
						right={(
							<Button
								icon={Button.IconEnums.PLUS}
								onClick={this._handleAddFormShow}
							>
								新增网址
							</Button>
						)}
					/>
				</div>
				<Table
					rowKey="_id"
					dataSource={data}
					columns={columns}
				/>
			</PageBlock>
		);
	}
}

SystemSettingPlatformUrlPage.propTypes = propTypes;

const toggleKey = key => state => ({
	[key]: !state[key],
});
const toggleFormVisible = toggleKey('isUrlFormVisible');
const toggleMessage = toggleKey('isMessageVisible');
const setFormData = function setFormData(formTitle, rowData = {}) {
	return {
		formTitle,
		rowData,
	};
};
const setRowId = function setRowId(rowId) {
	return {
		rowId,
	};
};
const resetRowId = function resetRowId() {
	return {
		rowId: INITIAL_ROW_ID,
	};
};

export default SystemSettingPlatformUrlPage;
