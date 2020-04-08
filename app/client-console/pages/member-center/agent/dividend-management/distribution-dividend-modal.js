import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	LabelText,
	LabelContent,
	Input,
	InputNumber,
	DecimalNumber,
} from 'ljit-react-components';
import SelectDropdown from '../../../../components/select-dropdown';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onToggleModal: PropTypes.func,
	target: PropTypes.object,
	walletsData: PropTypes.object,
	usedWalletData: PropTypes.object,
	onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
	isVisible: false,
	onToggleModal: () => {},
	target: {},
};

class DistributionDividendModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actualDividendValue: 0,
			selectedWalletId: '',
			password: '',
		};
		this._renderOptions = this._renderOptions.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handleClickSubmit = this._handleClickSubmit.bind(this);
		this._handleChangeActualDividend = this._handleChangeActualDividend.bind(this);
		this._handleChangePassword = this._handleChangePassword.bind(this);
		this._handleChangeOption = this._handleChangeOption.bind(this);
		this._renderLabelContent = this._renderLabelContent.bind(this);
	}
	_handleClickCancel() {
		const { onToggleModal } = this.props;

		onToggleModal();
	}
	_handleClickSubmit() {
		const {
			onSubmit,
			target,
		} = this.props;
		const {
			selectedWalletId,
			actualDividendValue,
			password,
		} = this.state;
		const { id, } = target;

		onSubmit(id, selectedWalletId, actualDividendValue, password);
	}
	_handleChangeActualDividend(value) {
		this.setState({
			actualDividendValue: value,
		});
	}
	_handleChangeOption(value) {
		this.setState({
			selectedWalletId: value,
		});
	}
	_handleChangePassword(event) {
		this.setState({
			password: event.target.value
		});
	}
	_renderLabelContent(walletData) {
		const {
			name = '',
			balance = 0,
		} = walletData;

		return (
			<div>
				{name} (<DecimalNumber data={balance} hasSeparator isCurrency/>)
			</div>
		);
	}
	_renderOptions() {
		const { _renderLabelContent } = this;
		const { walletsData } = this.props;
		const primaryWallet = walletsData.primary[0];
		const supervisionWallet = walletsData.supervision[0];

		return [{
			value: primaryWallet.code,
			label: _renderLabelContent(primaryWallet),
		},{
			value: supervisionWallet.code,
			label: _renderLabelContent(supervisionWallet),
		}];
	}
	render() {
		const {
			isVisible,
			target,
		} = this.props;
		const {
			_handleChangeActualDividend,
			_handleChangePassword,
			_renderOptions,
			_handleChangeOption,
			_handleClickSubmit,
			_handleClickCancel,
		} = this;
		const {
			actualDividendValue,
			selectedWalletId,
			password,
		} = this.state;
		const {
			username,
			teamDurationStats = [],
		} = target;
		const maxGrantAmount = teamDurationStats[0] ? teamDurationStats[0].maxGrantAmount : 0;

		return (
			<SubmitFormModal
				className="ljit-distrbution-dividend-modal"
				isVisible={isVisible}
				width="440px"
				title="发放分红"
				okText='发放'
				cancelText='取消'
				onClickCancel={_handleClickCancel}
				onClickOk={_handleClickSubmit}
			>
				<div className="ljit-distrbution-dividend-modal__content">
					<LabelText
						label= "发放对象"
						text={username}
						labelColType={LabelText.SizeEnums.SMALL}
					/>
					<LabelText
						label= "应发分红"
						text= {maxGrantAmount}
						labelColType={LabelText.SizeEnums.SMALL}
					/>
					<LabelContent
						label="选择帐户"
						labelColon={false}
					>
						<SelectDropdown
							options={_renderOptions()}
							value={selectedWalletId}
							onChange={_handleChangeOption}
						></SelectDropdown>
					</LabelContent>
					<LabelContent
						label="实发金额"
						labelColon={false}
					>
						<InputNumber
							value={actualDividendValue}
							onChange={_handleChangeActualDividend}
						></InputNumber>
					</LabelContent>
					<LabelContent
						label="资金密码"
						labelColon={false}
					>
						<Input
							placeholder="请输入资金密码"
							type="password"
							value={password}
							onChange={_handleChangePassword}
						></Input>
					</LabelContent>
				</div>
			</SubmitFormModal>
		);
	}
	componentDidUpdate(prevProps) {
		const { usedWalletData, target } = this.props;
		const {
			teamDurationStats = [],
		} = target;
		const maxGrantAmount = teamDurationStats[0] ? teamDurationStats[0].maxGrantAmount : 0;
		const grantedAmount = teamDurationStats[0] ? teamDurationStats[0].grantedAmount : 0;

		if (prevProps.isVisible !== this.props.isVisible) {
			this.setState({
				selectedWalletId: usedWalletData.code,
				actualDividendValue: maxGrantAmount - grantedAmount,
				password: '',
			});
		}
	}
}

DistributionDividendModal.propTypes = propTypes;
DistributionDividendModal.defaultProps = defaultProps;

export default DistributionDividendModal;
