import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Button,
	UserBreadcrumb,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import AccountPayInformation from './account-pay-information';
import AccountPayTable from './account-pay-table';
import AccountPayTimeline from './account-pay-timeline';
import AccountPayNote from './account-pay-note';
import {
	RecordPropTypes,
	ModalStateEnums,
} from './utils';

const FooterButtonEnums = {
	SUBMIT: 'submit',
	CANCEL: 'cancel',
	CLOSE: 'close',
};

const ModalTitle = {
	MANUAL: '手动汇款',
	AUTO: '自动汇款',
	DETAIL: '详情',
	REJECT: '拒绝',
};

const propTypes = {
	...RecordPropTypes,
	modalState: PropTypes.oneOf(Object.values(ModalStateEnums).concat('')),
	isVisible: PropTypes.bool,
	timelineDatas: PropTypes.array,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	timelineDatas: [],
	onSubmit: () => {},
	onCancel: () => {},
};

const PREFIX_CLASS = 'account-pay-modal';

class AccountPayModal extends Component {
	constructor() {
		super();

		this.state = {
			bankFee: null,
			financialNote: null,
			isGetFinancialNoteFromProps: true,
			isConfirmModalVisible: false,
		};
		this._renderFooter = this._renderFooter.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleModalCancel = this._handleModalCancel.bind(this);
		this._renderModalTitle = this._renderModalTitle.bind(this);
	}

	_handleSubmit() {
		const { onSubmit, } = this.props;

		this.setState({ isConfirmModalVisible: false });
		onSubmit();
	}

	_handleModalCancel() {
		const { onCancel, } = this.props;
		const obj = {
			isConfirmModalVisible: false,
			financialNote: '',
			isGetFinancialNoteFromProps: true,
		};

		this.setState(obj);
		onCancel();
	}

	_renderFooter(buttonConfig = []) {
		let renderButtonList = [];
		const customButtonList = {
			[FooterButtonEnums.SUBMIT]:
				<Button key={FooterButtonEnums.SUBMIT}
					onClick={this._handleSubmit}>
					确定
				</Button>,
			[FooterButtonEnums.CANCEL]:
				<Button key={FooterButtonEnums.CANCEL}
					outline={Button.OutlineEnums.HOLLOW}
					onClick={this._handleModalCancel}>
					取消
				</Button>,
			[FooterButtonEnums.CLOSE]:
				<Button key={FooterButtonEnums.CLOSE}
					onClick={this._handleModalCancel}
					outline={Button.OutlineEnums.HOLLOW}
					color={Button.ColorEnums.GREY9}>
					关闭
				</Button>,
		};

		if (buttonConfig) {
			renderButtonList = buttonConfig.map((button) => customButtonList[button]);
		}

		return renderButtonList;
	}

	_renderModalTitle(modalTitle) {
		const { record, } = this.props;
		const ancestors = record.ancestors.map(item => {
			return item.username;
		});

		return (
			<Fragment>
				{modalTitle}
				<UserBreadcrumb
					data={ancestors}
					className={`${PREFIX_CLASS}__subtitle`}
				/>
			</Fragment>
		);
	}

	render() {
		const {
			isVisible,
			modalState,
			record,
			timelineDatas,
		} = this.props;
		const {
			_handleModalCancel,
			_renderModalTitle,
			_renderFooter,
		} = this;
		const configs = getModalConfigs(modalState);

		return (
			<PageModal
				visible={isVisible}
				title={_renderModalTitle(configs.title)}
				onClickCancel={_handleModalCancel}
				footer={_renderFooter(configs.customButtonsConfig)}
				width="1024px"
				className={PREFIX_CLASS}
			>
				<Row>
					<Col>
						<AccountPayInformation
							record={record}
							modalState={modalState}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<AccountPayTable />
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<AccountPayTimeline
							timelineDatas={timelineDatas}
							onClick={() => console.log('load more timelines...')}
						/>
					</Col>
					<Col span={12}>
						<AccountPayNote
							record={record}
							modalState={modalState}
						/>
					</Col>
				</Row>
			</PageModal>
		);

	}
}

AccountPayModal.propTypes = propTypes;
AccountPayModal.defaultProps = defaultProps;
AccountPayModal.ModalStateEnums = ModalStateEnums;

export default AccountPayModal;

function getModalConfigs(state = '') {
	switch (state) {
		case ModalStateEnums.MANUAL:
			return {
				title: ModalTitle.MANUAL,
				customButtonsConfig: [
					FooterButtonEnums.CANCEL,
					FooterButtonEnums.SUBMIT
				],
			};
		case ModalStateEnums.AUTO:
			return {
				title: ModalTitle.AUTO,
				customButtonsConfig: [
					FooterButtonEnums.CANCEL,
					FooterButtonEnums.SUBMIT
				],
			};
		case ModalStateEnums.DETAIL:
			return {
				title: ModalTitle.DETAIL,
				customButtonsConfig: [
					FooterButtonEnums.CLOSE
				],
			};
		case ModalStateEnums.REJECT:
			return {
				title: ModalTitle.REJECT,
				customButtonsConfig: [
					FooterButtonEnums.CANCEL,
					FooterButtonEnums.SUBMIT,
				],
			};
		default:
			return {};
	}
}
