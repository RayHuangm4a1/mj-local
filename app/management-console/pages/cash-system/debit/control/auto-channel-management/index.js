import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import {
	HeaderButtonBar,
	Button,
	Table,
	Divider,
	TextButton,
	Popover,
} from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import PageModal from '../../../../../components/page-modal';
import AutoChannelFormModal from './auto-channel-form-modal';
import './style.styl';

const { Title } = PageBlock;
const { Message } = PageModal;

// TODO: 確認資料格式
const propTypes = {
	autoChannels: PropTypes.arrayOf(PropTypes.shape({
		channel: PropTypes.string,
		minValue: PropTypes.number,
		maxValue: PropTypes.number,
		blackList: PropTypes.arrayOf(PropTypes.string),
	})),
};
const defaultProps = {
	autoChannels: [],
};

const initialState = {
	isFormModalVisible: false,
	isConfirmModalVisible: false,
	isEditing: false,
	selectedAutoChannel: {},
};

const PREFIX_CLASS = 'auto-channel-setting';

class CashSystemDebitControlAutoChannelManagementPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			...initialState,
			// TODO: 串接正式資料之後，要把這個 state remove
			autoChannels: props.autoChannels,
		};

		this._handleClickCreate = this._handleClickCreate.bind(this);
		this._handleSubmitCreate = this._handleSubmitCreate.bind(this);
		this._handleSubmitEdit = this._handleSubmitEdit.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}
	
	_handleClickCreate() {
		this.setState({
			isFormModalVisible: true,
		});
	}

	_handleCancel() {
		this.setState(initialState);
	} 

	_handleSubmitCreate(record) {
		// TODO: send create api
		const { autoChannels } = this.state;
		const newId = autoChannels[autoChannels.length - 1]._id + 1;
		const newChannel = Object.assign({}, record, {
			_id: newId,
			...record,
		});
		const updatedChannels = [...autoChannels, { ...newChannel }, ];

		this.setState({
			...initialState,
			autoChannels: updatedChannels,
		});
	}

	_handleSubmitEdit(record) {
		// TODO: send update api
		const { selectedAutoChannel, autoChannels, } = this.state;
		const { _id } = selectedAutoChannel;
		const updatedChannels = autoChannels.map(_channel => {
			if (_channel._id === _id) {
				return Object.assign({}, _channel, {
					...record,
				});
			} else {
				return _channel;
			}
		});

		this.setState({
			...initialState,
			autoChannels: updatedChannels,
		});
	}

	_handleClickEdit(selectedAutoChannel) {
		this.setState({
			isEditing: true,
			isFormModalVisible: true,
			selectedAutoChannel,
		});
	}

	_handleClickDelete(selectedAutoChannel) {
		this.setState({
			isConfirmModalVisible: true,
			selectedAutoChannel,
		});
	}

	_handleSubmitDelete() {
		// TODO: send delete api
		const { selectedAutoChannel, autoChannels } = this.state;
		const { _id } = selectedAutoChannel;

		const updatedChannels = autoChannels.filter(_channel => _channel._id !== _id);

		this.setState({
			...initialState,
			autoChannels: updatedChannels,
		});
	}

	render() {
		const { 
			isFormModalVisible,
			isConfirmModalVisible,
			isEditing,
			autoChannels,
			selectedAutoChannel,
		} = this.state;
		const {
			_handleClickCreate,
			_handleClickEdit,
			_handleSubmitCreate,
			_handleSubmitEdit,
			_handleSubmitDelete,
			_handleClickDelete,
			_handleCancel,
		} = this;
		
		return (
			<PageBlock className={PREFIX_CLASS}>
				<HeaderButtonBar
					left={<Title text="自动出款通道设定" />}
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							icon="plus"
							onClick={_handleClickCreate}
						>
							新增出款通道
						</Button>
					)}
				/>
				<Table
					dataSource={autoChannels}
					rowKey="_id"
					columns={[
						{
							title: '通道',
							dataIndex: 'channel',
						},
						{
							title: '限制金额',
							render: (autoChannel) => {
								const [min, max] = [autoChannel.minValue, autoChannel.maxValue];

								return min && max ? `${min}-${max}` : '-';
							},
						},
						{
							title: '银行黑名单',
							dataIndex: 'blackList',
							width: 86,
							render: (value) => {
								if (!value) return '-';
								const content = value.map((item, index) => (
									<p
										key={`${item}-${index}`}
										className={`${PREFIX_CLASS}__popover--black-list-item`}
									>
										{item}
									</p>
								));

								return (
									<Fragment>
										<Popover
											title='银行黑名单'
											content={content}
											overlayClassName={`${PREFIX_CLASS}__popover--black-list`}
										>
											<div className="with-ellipsis">{value}</div>
										</Popover>
									</Fragment>
								);
							},
						},
						{
							title: '操作',
							render: (text, autoChannel) => (
								<Fragment>
									<TextButton
										text="修改"
										onClick={() => _handleClickEdit(autoChannel)}
									/>
									<Divider type={Divider.DirectionTypeEnums.VERTICAL}/>
									<TextButton
										color="danger"
										text="删除"
										onClick={() => _handleClickDelete(autoChannel)}
									/>
								</Fragment>
							),
						},
					]}
				/>
				<AutoChannelFormModal
					isVisible={isFormModalVisible}
					isEditing={isEditing}
					onSubmit={isEditing ? _handleSubmitEdit: _handleSubmitCreate}
					onCancel={_handleCancel}
					initialValues={{
						channel: selectedAutoChannel.channel,
						minValue: selectedAutoChannel.minValue,
						maxValue: selectedAutoChannel.maxValue,
						blackList: selectedAutoChannel.blackList,
					}}
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
}

CashSystemDebitControlAutoChannelManagementPage.propTypes = propTypes;
CashSystemDebitControlAutoChannelManagementPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		autoChannels: state.cashSystemAutoChannelManagementPage.get('autoChannelsData').toArray(),
	};
}
export default connect(mapStateToProps)(CashSystemDebitControlAutoChannelManagementPage);
