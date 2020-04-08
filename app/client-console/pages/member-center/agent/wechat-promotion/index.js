import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Switch, IconButton, Notify } from 'ljit-react-components';
import PagerTable from '../../../../components/pager-table';
import PromotionLinkGenerationModal from './promotion-link-generation-modal';
import DeleteInfoModal from './delete-info-modal';
import QRCodeModal from './qr-code-modal';
import './style.styl';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		remark: PropTypes.string,
		bonus: PropTypes.number,
		memberType: PropTypes.string,
		accountType: PropTypes.string,
		platformType: PropTypes.string,
		url: PropTypes.string,
		createdAt: PropTypes.string,
		isUsing: PropTypes.bool,
	})),
};

const defaultProps = {
	dataSource: [],
};

const {
	IconTypeEnums,
	SizeEnums,
} = Icon;

const {
	INFO_FILL,
	COPY,
	QR_CODE,
	TRASH,
} = IconTypeEnums;

const {
	SMALL,
	LARGE,
} = SizeEnums;

// get table data from API
class WeChatPromotion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isGeneratingPromotionalModalVisable: false,
			isDeleteInfoModalVisable: false,
			isQRCodeModalVisable: false,
			dataSource: fakeDataSource,
			pagination: {},
		};
		this._handleToggleGeneratingPromotionalModal = this._handleToggleGeneratingPromotionalModal.bind(this);
		this._handleToggleDeleteInfoModal = this._handleToggleDeleteInfoModal.bind(this);
		this._handleToggleQRCodeModal = this._handleToggleQRCodeModal.bind(this);
		this._handleToggleUsing = this._handleToggleUsing.bind(this);
	}

	_handleToggleGeneratingPromotionalModal() {
		this.setState({
			isGeneratingPromotionalModalVisable: !this.state.isGeneratingPromotionalModalVisable,
		});
	}
	_handleToggleDeleteInfoModal() {
		this.setState({
			isDeleteInfoModalVisable: !this.state.isDeleteInfoModalVisable,
		});
	}

	_handleToggleQRCodeModal() {
		this.setState({
			isQRCodeModalVisable: !this.state.isQRCodeModalVisable,
		});
	}

	_handleToggleUsing(record, index) {
		// post API to modify switch value
		const { dataSource } = this.state;
		const newDataSource = [...dataSource];

		if (record.isUsing) {
			record.isUsing = false;
			Notify.info('已禁用链结', 1000);
		} else {
			record.isUsing = true;
			Notify.success('已启用链结', 1000);

		}
		newDataSource[index] = record;

		this.setState({
			dataSource: newDataSource,
		});
	}

	render() {
		const { dataSource } = this.state;
		const {
			isGeneratingPromotionalModalVisable,
			isDeleteInfoModalVisable,
			isQRCodeModalVisable 
		} = this.state;
		const {
			_handleToggleGeneratingPromotionalModal,
			_handleToggleDeleteInfoModal,
			_handleToggleQRCodeModal,
			_handleToggleUsing,
		} = this;

		return (
			<div className="ljit-wechat-promotion">
				<div className="ljit-wechat-promotion__header">
					<div>
						<Icon
							type={INFO_FILL}
							size={SMALL}
							style={{ marginRight: '8px' }}
						/>
					微信推广帮助
					</div>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						className="ljit-wechat-promotion__header-button"
						onClick={_handleToggleGeneratingPromotionalModal}
					> 生成推广链结 </Button>
				</div>
				<PagerTable
					rowKey="remark"
					dataSource={dataSource}
					columns={[
						{
							title: '备注',
							dataIndex: 'remark',
							width: 73,
							key: 'remark',
						},
						{
							title: '奖金号',
							dataIndex: 'bonus',
							width: 94,
							sorter: () => 0,
						},
						{
							title: '会员类型',
							dataIndex: 'memberType',
							width: 87,
						},
						{
							title: '帐号模式',
							dataIndex: 'accountType',
							width: 87,
						},
						{
							title: '平台类型',
							dataIndex: 'platformType',
							width: 87,
						},
						{
							title: '链接网址',
							dataIndex: 'url',
							width: 216,
							render: (value) => (
								<div className="ljit-wechat-promotion-table__link">
									<IconButton
										type={COPY}
										size={LARGE}
										style={{ marginRight: '6px' }}
									/>
									{value}
								</div>
							),
						},
						{
							title: '时间',
							dataIndex: 'createdAt',
							width: 186,
							sorter: () => 0,
						},
						{
							title: '禁用/启用',
							dataIndex: 'isUsing',
							width: 93,
							render: (value, record, index) => (
								<Switch
									checked={value}
									onChange={() => {_handleToggleUsing(record, index);}}
								/>
							),
						},
						{
							title: '操作',
							dataIndex: 'operating',
							width: 69,
							render: () => (
								<div>
									<IconButton
										type={TRASH}
										size={LARGE}
										onClick={_handleToggleDeleteInfoModal}
									/>
									<IconButton
										type={QR_CODE}
										size={LARGE}
										onClick={_handleToggleQRCodeModal}
									/>
								</div>
							)
						},
					]}
					hasPagination
					paginationProps={{
						...this.state.pagination,
						total: 200,
					}}
					onTableChange={(pagination) => this.setState({ pagination, })}
				/>
				<PromotionLinkGenerationModal
					isVisable={isGeneratingPromotionalModalVisable}
					onClickCancel={_handleToggleGeneratingPromotionalModal}
					onClickOk={_handleToggleGeneratingPromotionalModal}
				/>
				<DeleteInfoModal
					isVisable={isDeleteInfoModalVisable}
					onClickCancel={_handleToggleDeleteInfoModal}
					onClickOk={_handleToggleDeleteInfoModal}
				/>
				<QRCodeModal
					isVisable={isQRCodeModalVisable}
					onClickCancel={_handleToggleQRCodeModal}
					onClickOk={_handleToggleQRCodeModal}
				/>
			</div>
		);
	}
}

WeChatPromotion.propTypes = propTypes;
WeChatPromotion.defaultProps = defaultProps;

export default WeChatPromotion;

// TODO remove fake data when data form redux
const fakeDataSource=[
	{
		remark: '12345',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'qwe',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: false,
	},
	{
		remark: 'RD',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD1',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD2',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.comadfasgasdgasdgaskfjasldghaskgjalsjglaj;l',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD3',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD4',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD5',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD6',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
	{
		remark: 'RD7',
		bonus: 1960,
		memberType: '代理',
		accountType: '普通帳號',
		platformType: '手機',
		url: 'hrrp://google.com',
		createdAt: '2019/7/26 15:30:24',
		isUsing: true,
	},
];