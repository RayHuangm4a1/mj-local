import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	FormItem,
	Select,
	RadioGroup,
	InputNumber,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';
import TwoColumnsList from '../../../components/two-columns-list';
const { Message } = PageModal;
const propTypes = {
	username: PropTypes.string,
};
const inputStyle = { width: '397px', };

class PersonalEntertainmentTab extends Component {
	constructor() {
		super();
		this.state = {
			isSingleTransferModalVisible: false,
			isConfirmMessageVisible: false,
		};

		this._handleSubmitSingleTransfer = this._handleSubmitSingleTransfer.bind(this);
		this._handelSubmitRetrieveAll = this._handelSubmitRetrieveAll.bind(this);
	}

	_handleSubmitSingleTransfer() {
		// TODO send single transfer api
		this.setState({ isSingleTransferModalVisible: false, });
	}

	_handelSubmitRetrieveAll() {
		// TDO send retrieve all api
		this.setState({ isConfirmMessageVisible: false, });
	}
	render() {
		const {
			isSingleTransferModalVisible,
			isConfirmMessageVisible,
		} = this.state;
		const {
			_handleSubmitSingleTransfer,
			_handelSubmitRetrieveAll,
		} = this;

		return (
			<div className="personal-entertainment-tab">
				<div style={{ marginLeft: 8, }}>
					<label>中心帐户</label>
					<div style={{ fontSize: '24px', marginBottom: 16, }}>
						{'0.000'}
					</div>
					<div style={{ marginBottom: 56, }}>
						<Button
							onClick={() => this.setState({ isConfirmMessageVisible: true, })}
							color={Button.ColorEnums.BRIGHTBLUE500}
							style={{ marginRight: 16, }}
						>
							一键回收
						</Button>
						<Button
							onClick={() => this.setState({ isSingleTransferModalVisible: true, })}
							outline={Button.OutlineEnums.HOLLOW}
						>
							单笔转换
						</Button>
					</div>
				</div>
				<TwoColumnsList
					data={listdata}
					titleKey="title"
					contentKey="amount"
				/>
				<Message
					visible={isConfirmMessageVisible}
					title="确认提示"
					message="是否确定回收所有款项？"
					onClickCancel={() => this.setState({ isConfirmMessageVisible: false, })}
					onClickOk={_handelSubmitRetrieveAll}
				/>
				<PageModal
					visible={isSingleTransferModalVisible}
					title="单笔转换"
					onClickCancel={() => this.setState({ isSingleTransferModalVisible: false, })}
					onClickOk={_handleSubmitSingleTransfer}
				>
					<Form
						submitButtonDisabled
						cancelButtonDisabled
						ref={(refForm) => this.formInstance = refForm }
					>
						<FormItem
							label="交易平台"
							itemName="platform"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Select
								// TODO get options
								options={[
									{ label: 'VR电子', value: 'VR电子', },
									{ label: 'CQ9', value: 'CQ9', },
									{ label: 'GD电子', value: 'GD电子', },
									{ label: '二元期权', value: '二元期权', },
									{ label: 'AS直播', value: 'AS直播', },
									{ label: 'Gamma棋牌', value: 'Gamma棋牌', },
									{ label: '开元棋牌', value: '开元棋牌', },
									{ label: 'UG体育', value: 'UG体育', },
									{ label: 'PT电子', value: 'PT电子', },
									{ label: 'EBET电子', value: 'EBET电子', },
									{ label: 'SA电子', value: 'SA电子', },
									{ label: 'AG电子', value: 'AG电子', },
								]}
								placeholder="请选择平台"
								style={inputStyle}
							/>
						</FormItem>
						<FormItem
							label="交易类型"
							itemName="type"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
							itemConfig={{ initialValue: 'transferOut', }}
						>
							<RadioGroup
								options={[
									{ label: '转入', value: 'transferIn', },
									{ label: '转出', value: 'transferOut', },
								]}
								style={inputStyle}
							/>
						</FormItem>
						<FormItem
							label="交易金额"
							itemName="amount"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<InputNumber style={inputStyle}/>
						</FormItem>
					</Form>
				</PageModal>
			</div>
		);
	}
}

PersonalEntertainmentTab.propTypes = propTypes;

export default PersonalEntertainmentTab;

const listdata = [
	{ title: 'VR电子', amount: 1, },
	{ title: 'CQ9', amount: 1, },
	{ title: 'GD电子', amount: 1, },
	{ title: '二元期权', amount: 1, },
	{ title: 'AS直播', amount: 1, },
	{ title: 'Gamma棋牌', amount: 1, },
	{ title: '开元棋牌', amount: 1, },
	{ title: 'UG体育', amount: 1, },
	{ title: 'PT电子', amount: 1, },
	{ title: 'EBET电子', amount: 1, },
	{ title: 'SA电子', amount: 1, },
	{ title: 'AG电子', amount: 1, },
];
