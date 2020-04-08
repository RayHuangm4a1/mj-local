import React, { Component, } from 'react';
import { RadioGroup, } from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';
import SelectDropdown from '../../../../components/select-dropdown';
import { UserTypeEnum, } from '../../../../lib/enums';
import PropTypes from 'prop-types';

const { AGENT, MEMBER, } = UserTypeEnum;

const propTypes = {
	isVisable: PropTypes.bool,
	onClickCancel: PropTypes.func,
	onClickOk: PropTypes.func,
};

const defaultProps = {
	onClickCancel: () => {},
	onClickOk: () => {},
};

// get options from API and post data when click ok
class PromotionLinkGenerationModal extends Component {
	constructor() {
		super();
		this.state = {
			memberType: AGENT,
			platformType: 'mobile',
		};
		this._handleChangeMemberType = this._handleChangeMemberType.bind(this);
		this._handleChangePlatformType = this._handleChangePlatformType.bind(this);
		this._handleChangeLotteryRebate = this._handleChangeLotteryRebate.bind(this);
		this._handleClickOk = this._handleClickOk.bind(this);
	}
	_handleChangeMemberType(event) {
		this.setState({
			memberType: event.target.value,
		});
	}
	_handleChangePlatformType(event) {
		this.setState({
			platformType: event.target.value,
		});
	}
	_handleChangeLotteryRebate (value) {
		this.setState({
			lotteryRebate: value
		});
	}
	_handleClickOk () {
		// TODO post data to generation promrtional link
		this.props.onClickOk();
	}
	render() {
		const { isVisable, onClickCancel } = this.props;
		const { memberType, platformType, lotteryRebate, } = this.state;
		const {
			_handleChangeMemberType,
			_handleChangePlatformType,
			_handleChangeLotteryRebate,
			_handleClickOk,
		} = this;

		return (
			<SubmitFormModal
				isVisible={isVisable}
				title="生成推广链结"
				onClickCancel={onClickCancel}
				onClickOk={_handleClickOk}
				className="ljit-promotion-link-generation-modal"
			>
				<div className="ljit-promotion-link-generation-modal__content">
					<div className="ljit-promotion-link-generation-modal__content-member-type">
						<p>会员类型</p>
						<RadioGroup
							value={memberType}
							options={[
								{ label: '代理', value: AGENT, },
								{ label: '会员', value: MEMBER, },
							]}
							onChange={ (event) => { _handleChangeMemberType(event);}}
						/>
					</div>
					<div className="ljit-promotion-link-generation-modal__content-platform-type">
						<p>平台类型</p>
						<RadioGroup
							value={platformType}
							options={[
								{ label: '手机', value: 'mobile', },
								{ label: '网页', value: 'web', },
							]}
							onChange={ (event) => { _handleChangePlatformType(event);}}
						/>
					</div>
					<div className="ljit-promotion-link-generation-modal__content-lottery-rebate">
						<p>彩票奖金/返点</p>
						<SelectDropdown
							style={{ width: '100%' }}
							value={lotteryRebate}
							options={[
								{ label: '返点：12.8%、奖金：1956', value: 'option0', },
								{ label: '返点：10.1%、奖金：1960', value: 'option1', },
							]}
							placeholder="请选择彩票奖金/返点"
							onChange={ (value) => { _handleChangeLotteryRebate(value);}}
						/>
					</div>
				</div>
			</SubmitFormModal>
		);
	}
}

PromotionLinkGenerationModal.propTypes = propTypes;
PromotionLinkGenerationModal.defaultProps = defaultProps;

export default PromotionLinkGenerationModal;
