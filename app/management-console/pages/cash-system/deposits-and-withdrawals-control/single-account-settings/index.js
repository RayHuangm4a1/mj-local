import React from 'react';
import {
	Table,
	Button,
	TextButton,
	HeaderButtonBar,
	InputSearch,
	DecimalNumber,
} from 'ljit-react-components';
import PageMessageModal from '../../../../components/page-modal/message';
import { PREFIX_CLASS, } from '../utils';
import CreateWithdrawAccountFormModal from './create-withdraw-account-form-modal';

const propTypes = {};
const defaultProps = {};

function DepositsAndWithdrawalsControlSingleAccountSettings () {
	const [searchValue, setSearchValue] = React.useState('');
	const [isCreateAccountModalVisible, setIsCreateAccountModalVisible] = React.useState(false);
	const [isMessageModalVisible, setIsMessageModalVisible] = React.useState(false);
	const _handleClickCreateAccount = () => {
		setIsCreateAccountModalVisible(true);
	};
	const _handleChangeInput = (event) => {
		setSearchValue(event.target.value);
	};
	const _handleClickSearch = (value) => {
		setSearchValue('');
	};
	const _handleDeleteSetting = () => {
		setIsMessageModalVisible(true);
	};
	const _handleHideCreateAccountModal = () => {
		setIsCreateAccountModalVisible(false);
	};
	const _handClickCreateAccountModalOk = (values) => {
		_handleHideCreateAccountModal();
	};
	const _handleHideMessageModal = () => {
		setIsMessageModalVisible(false);
	};
	const _handleClickMessageModalOk = () => {
		_handleHideMessageModal();
	};
	const dataSource = createFakeSettingsData();

	return (
		<div className={`${PREFIX_CLASS}__single-member-settings`}>
			<HeaderButtonBar
				left={null}
				right={[
					(
						<Button
							type="primary"
							key="btn"
							onClick={_handleClickCreateAccount}
						>
							＋新增个人出款帐号
						</Button>
					),
					(
						<InputSearch
							key="input-search"
							value={searchValue}
							onChange={_handleChangeInput}
							onSearch={_handleClickSearch}
						/>
					),
				]}
			/>
			<Table
				columns={[
					{
						title: '帐号',
						dataIndex: 'username'
					},
					{
						title: '每次出款上限',
						dataIndex: 'withdrawalLimitPerTime',
						render: function render(value) {
							return <DecimalNumber data={value} hasSeparator/>;
						},
					},
					{
						title: '每日出款上限',
						dataIndex: 'withdrawalLimitPerDay',
						render: function render(value) {
							return <DecimalNumber data={value} hasSeparator/>;
						},
					},
					{
						title: '每日提款次数',
						dataIndex: 'withdrawalTimesPerDay',
					},
					{
						title: '操作',
						dataIndex: 'operation',
						render: function render() {
							return (
								<TextButton
									onClick={_handleDeleteSetting}
									color='danger'
									text="删除"
								/>
							);
						}
					}
				]}
				dataSource={dataSource}
				rowKey="username"
			/>
			<CreateWithdrawAccountFormModal
				isModalVisible={isCreateAccountModalVisible}
				onClickOk={_handClickCreateAccountModalOk}
				onClickCancel={_handleHideCreateAccountModal}
			/>
			<PageMessageModal
				visible={isMessageModalVisible}
				title="确认提示"
				message="是否确定删除此帐号？"
				onClickCancel={_handleHideMessageModal}
				onClickOk={_handleClickMessageModalOk}
			/>
		</div>
	);
}

function createFakeSettingsData() {
	const fakeUserList = ['test01', 'test02', 'test03', 'test04', 'test05'];

	return fakeUserList.map((item, i) => ({
		username: item,
		withdrawalLimitPerTime: i * 3000,
		withdrawalLimitPerDay: i * 9000,
		withdrawalTimesPerDay: i * 3,
	}));
}

// TODO 串接API並完成 搜尋、刪除 與 新增帳戶 功能
DepositsAndWithdrawalsControlSingleAccountSettings.propTypes = propTypes;
DepositsAndWithdrawalsControlSingleAccountSettings.defaultProps = defaultProps;

export default DepositsAndWithdrawalsControlSingleAccountSettings;