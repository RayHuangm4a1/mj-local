import React, { Component, } from 'react';
import PropTypes from 'prop-types';
// TODO remove moment form page
import moment from 'moment';
import { HeaderButtonBar, Button, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import PageModal from '../../../components/page-modal';
import InfoTable from './info-table';
import SettingForm from './forms/setting-form';
import { StatusEnum, StatusTextMap, } from './utils';

const { ACTIVE, DISABLE, DELETE, } = StatusEnum;
const { Message } = PageModal;

const fakeData = [
	{
		key: 0,
		createdAt: moment('2019/05/25', 'YYYY/MM/DD'),
		title: 'test',
		content: '开业消费送，好礼不间断！ 活动期间： 2015.12.1-2015.12.7 活动内容： 当日消费1888，赠送8 当日消费5888，赠送38 当日消费10888，赠送58 当日消费30888，赠送128 当日消费50888，赠送208 当日消费108888，赠送 508 当日消费208888，赠送1088 当日消费308888，赠送1588 当日消费508888，赠送2588 当日消费888888，赠送4588 当日消费1288888，赠送6888 活动办法： 1、	会员当日消费达活动标准，系统将于凌晨3点自动发送 2、	每日为凌晨3点至隔日凌晨3点为一天周期 3、	梦之城保有活动的任何解释、修改及终止的权力	',
		startShowingTime: moment('2019/05/25', 'YYYY/MM/DD'),
		endShowingTime: moment('2019/05/26', 'YYYY/MM/DD'),
		levels: ['levelOne', 'levelThree', 'levelSeven' ],
		status: 'active',
	},
	{
		key: 1,
		createdAt: moment('2019/05/25', 'YYYY/MM/DD'),
		title: 'test',
		content: '开业消费送，好礼不间断！ 活动期间： 2015.12.1-2015.12.7 活动内容： 当日消费1888，赠送8 当日消费5888，赠送38 当日消费10888，赠送58 当日消费30888，赠送128 当日消费50888，赠送208 当日消费108888，赠送 508 当日消费208888，赠送1088 当日消费308888，赠送1588 当日消费508888，赠送2588 当日消费888888，赠送4588 当日消费1288888，赠送6888 活动办法： 1、	会员当日消费达活动标准，系统将于凌晨3点自动发送 2、	每日为凌晨3点至隔日凌晨3点为一天周期 3、	梦之城保有活动的任何解释、修改及终止的权力	',
		startShowingTime: moment('2019/05/25', 'YYYY/MM/DD'),
		endShowingTime: moment('2019/05/26', 'YYYY/MM/DD'),
		levels: ['levelOne', 'levelFour', 'levelFive', 'levelSeven' ],
		status: 'disable',
	},
	{
		key: 2,
		createdAt: moment('2019/05/25', 'YYYY/MM/DD'),
		title: 'test',
		content: '开业消费送，好礼不间断！ 活动期间： 2015.12.1-2015.12.7 活动内容： 当日消费1888，赠送8 当日消费5888，赠送38 当日消费10888，赠送58 当日消费30888，赠送128 当日消费50888，赠送208 当日消费108888，赠送 508 当日消费208888，赠送1088 当日消费308888，赠送1588 当日消费508888，赠送2588 当日消费888888，赠送4588 当日消费1288888，赠送6888 活动办法： 1、	会员当日消费达活动标准，系统将于凌晨3点自动发送 2、	每日为凌晨3点至隔日凌晨3点为一天周期 3、	梦之城保有活动的任何解释、修改及终止的权力	',
		startShowingTime: moment('2019/05/25', 'YYYY/MM/DD'),
		endShowingTime: moment('2019/05/26', 'YYYY/MM/DD'),
		levels: ['levelOne', 'levelThree', 'levelSeven', 'levelTen' ],
		status: 'active',
	},
];

const propTypes = {
	onNavigate: PropTypes.func,
};
const defaultProps = {
	onNavigate: () => {},
};
const initialMessageState = {
	isConfirmMessageVisible: false,
	selectedKey: null,
};

class PopUpInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			displayStatus: null,
			...initialMessageState,
		};

		this._handleSettingFormSubmit = this._handleSettingFormSubmit.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleClickStatusToggle = this._handleClickStatusToggle.bind(this);
		this._handleCancelConfirm = this._handleCancelConfirm.bind(this);
		this._handleSubmitDisableConfirm = this._handleSubmitDisableConfirm.bind(this);
		this._handleSubmitActiveConfirm = this._handleSubmitActiveConfirm.bind(this);
		this._handleSubmitDeleteConfirm = this._handleSubmitDeleteConfirm.bind(this);
		this._renderMessage = this._renderMessage.bind(this);

		this.MessageSubmitMap = {
			[DISABLE]: this._handleSubmitDisableConfirm,
			[ACTIVE]: this._handleSubmitActiveConfirm,
			[DELETE]: this._handleSubmitDeleteConfirm,
		};
	}
	_handleSettingFormSubmit(values) {
		// TODO send save setting api
	}
	_handleClickEdit(selectedData) {
		const { onNavigate, } = this.props;
		const options = {
			passProps: {
				title: selectedData.title,
				content: selectedData.content,
				startShowingTime: selectedData.startShowingTime,
				endShowingTime: selectedData.endShowingTime,
				levels: selectedData.levels,
				isEditing: true,
			},
		};

		onNavigate(`/announcement/pop-up/${selectedData.key}/edit`, options);
	}
	_handleClickStatusToggle(selectedKey, displayStatus) {
		this.setState({
			isConfirmMessageVisible: true,
			displayStatus,
			selectedKey,
		});
	}
	_handleClickDelete(selectedKey) {
		this.setState({
			isConfirmMessageVisible: true,
			displayStatus: DELETE,
			selectedKey,
		});
	}
	_handleCancelConfirm() {
		this.setState(initialMessageState);
	}
	_handleSubmitDisableConfirm() {
		// TODO send disable api
		const { selectedKey, data, } = this.state;
		const updatedData = data.map(item => {
			if (item.key === selectedKey) {
				return Object.assign({}, item, {
					status: DISABLE
				});
			} else {
				return Object.assign({}, item);
			}
		});

		this.setState({
			data: updatedData,
			...initialMessageState,
		});
	}
	_handleSubmitActiveConfirm() {
		// TODO send active api
		const { selectedKey, data, } = this.state;
		const updatedData = data.map(item => {
			if (item.key === selectedKey) {
				return Object.assign({}, item, {
					status: ACTIVE
				});
			} else {
				return Object.assign({}, item);
			}
		});

		this.setState({
			data: updatedData,
			...initialMessageState,
		});
	}
	_handleSubmitDeleteConfirm() {
		// TODO sens delete api
		const { selectedKey, data, } = this.state;
		const updatedData = data.filter(item => {
			return item.key !== selectedKey;
		});

		this.setState({
			data: updatedData,
			...initialMessageState,
		});
	}
	_renderMessage() {
		const { displayStatus, isConfirmMessageVisible, } = this.state;
		const  { _handleCancelConfirm, MessageSubmitMap, } = this;

		return (
			<Message
				visible={isConfirmMessageVisible}
				title='提示'
				message={`確定要${StatusTextMap[displayStatus]}嗎？`}
				onClickCancel={_handleCancelConfirm}
				onClickOk={MessageSubmitMap[displayStatus]}
			/>
		);
	}
	render() {
		const { onNavigate, } = this.props;
		const { data, } = this.state;
		const {
			_handleSettingFormSubmit,
			_handleClickEdit,
			_handleClickDelete,
			_handleClickStatusToggle,
			_renderMessage,
		} = this;


		return (
			<React.Fragment>
				<PageBlock noMinHeight className="setting-from-block">
					<SettingForm
						onSubmit={_handleSettingFormSubmit}
					/>
				</PageBlock>
				<PageBlock>
					<HeaderButtonBar
						right={(
							<Button
								color={Button.ColorEnums.BRIGHTBLUE500}
								icon="plus"
								onClick={() => onNavigate(`/announcement/pop-up/create`)}
							>
								新增公告
							</Button>
						)}
					/>
					<InfoTable
						data={data}
						onClickEdit={_handleClickEdit}
						onClickDelete={_handleClickDelete}
						onClickStatusToggle={_handleClickStatusToggle}
					/>
					{_renderMessage()}
				</PageBlock>
			</React.Fragment>
		);
	}

	componentDidMount() {
		this.setState({
			data: fakeData,
		});
	}
}

PopUpInfoPage.propTypes = propTypes;
PopUpInfoPage.defaultProps = defaultProps;

export default PopUpInfoPage;
