import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Form,
	FormItem,
	Button,
	Radio,
	InputNumber,
	InputTextarea
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { connect } from '../../../../../ljit-store-connecter';
import { updateBonusRulesAction } from '../../../../controller/actions/platform-actions';
import { PlatformPropTypes } from '../../../../lib/prop-types-utils';

const propTypes = {
	onBack: PropTypes.func.isRequired,
	platformData: PlatformPropTypes,
	updateBonusRulesAction: PropTypes.func
};

const defaultProps = {
	updateBonusRulesAction: () => {}
};

class AccountMemberBounsNumberRulesPage extends Component {
	constructor(props) {
		super(props);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const { updateBonusRulesAction, } = this.props;
		const form = this.formInstance.getForm().getFieldsValue();

		form.list = form.list.split(', ');
		updateBonusRulesAction({
			ruleId: 'platform',
			rule: form
		});
	}

	render() {
		const { props, _handleSubmit, } = this;
		const { onBack, platformData, } = props;
		const { bonus = {}, couldEqualToPlatformMaxBonus, couldEqualToParentBonus, } = platformData;
		const { max, min, list = [], } = bonus;

		return (
			<React.Fragment>
				<HeaderButtonBar
					left={
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							className="management-member-bonus-rules__button__bar"
							onClick={onBack}
						>
							返回上一层
						</Button>
					}
				/>
				<PageBlock noMinHeight>
					<HeaderButtonBar
						left={<PageBlock.Title text="奖金号规则" />}
						right={[
							(
								<Button
									key="save"
									outline={Button.OutlineEnums.SOLID}
									onClick={_handleSubmit}
								>储存修改</Button>
							),
						]}
					/>
					<Form
						submitButtonDisabled
						cancelButtonDisabled
						ref={(refForm) => this.formInstance = refForm }
					>
						<FormItem
							label="最高奖金号："
							key="bonus.max"
							itemName="bonus.max"
							itemConfig={{
								initialValue : max,
								rules: [{
									required: true,
									message: '最高奖金号 为必填',
								},],
							}}
						>
							<InputNumber
								className="management-member-bonus-rules__input"
								max={3000}
								min={10}
								step={1}
								placeholder="0"
							/>
						</FormItem>
						<FormItem
							label="最低奖金号："
							key="bonus.min"
							itemName="bonus.min"
							itemConfig={{
								initialValue: min,
								rules: [{
									required: true,
									message: '最低奖金号 为必填',
								},],
							}}
						>
							<InputNumber
								className="management-member-bonus-rules__input"
								max={3000}
								min={10}
								step={1}
								placeholder="0"
							/>
						</FormItem>
						<FormItem
							label="奖金号间隔："
							key="list"
							itemName="list"
							itemConfig={{
								initialValue : list.join(', '),
								rules: [{
									required: true,
									message: '奖金号间隔 为必填',
								},],
							}}
						>
							<InputTextarea
								className="management-member-bonus-rules__input__textarea"
								minRows={3}
								maxRows={6}
							/>
						</FormItem>
						<div className="management-member-bonus-rules__input__notice">* 请由高到低输入奖金号，中间用逗号分隔</div>

						<FormItem
							label="最高奖金号是否可设定平级："
							key="couldEqualToPlatformMaxBonus"
							itemName="couldEqualToPlatformMaxBonus"
							itemConfig={{
								initialValue: couldEqualToPlatformMaxBonus,
							}}
						>
							<Radio checked={couldEqualToPlatformMaxBonus}>
								是
							</Radio>
						</FormItem>
						<FormItem
							label="其他奖金号是否可设定平级："
							key="couldEqualToParentBonus"
							itemName="couldEqualToParentBonus"
							itemConfig={{
								initialValue: couldEqualToParentBonus,
							}}
						>
							<Radio checked={!couldEqualToParentBonus}>
								否
							</Radio>
						</FormItem>
					</Form>
				</PageBlock>
			</React.Fragment>
		);
	}
}

AccountMemberBounsNumberRulesPage.propTypes = propTypes;
AccountMemberBounsNumberRulesPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		platformData: state.platform.get('data').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateBonusRulesAction: (data) => dispatch(updateBonusRulesAction(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBounsNumberRulesPage);
