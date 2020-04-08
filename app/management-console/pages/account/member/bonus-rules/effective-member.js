import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Form,
	FormItem,
	Row,
	Col,
	Button,
	InputNumber,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { connect } from '../../../../../ljit-store-connecter';
import { updateBonusRulesAction } from '../../../../controller/actions/platform-actions';
import { PlatformPropTypes } from '../../../../lib/prop-types-utils';

const propTypes = {
	onBack: PropTypes.func.isRequired,
	updateBonusRulesAction: PropTypes.func,
	platformData: PlatformPropTypes,
};

const defaultProps = {
	updateBonusRulesAction: () => {}
};

class AccountMemberBonusRulesEffectMember extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm().getFieldsValue();
		const { updateBonusRulesAction, } = this.props;

		updateBonusRulesAction({
			// TODO: 串API后修正 有效人数定义 命名
			ruleId: 'effectiveMember',
			rule: form,
		});
	}
	render() {
		const { _handleSubmit, props, } = this;
		const { onBack, } = props;
		const definitionOfEffectiveMember = 1000;

		return (
			<Fragment>
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
						left={<PageBlock.Title text="有效人数" />}
						right={[
							(
								<Button
									key="save"
									outline={Button.OutlineEnums.SOLID}
									onClick={_handleSubmit}
								>
									储存修改
								</Button>
							),
						]}
					/>
					<Form
						submitButtonDisabled
						cancelButtonDisabled
						ref={(refForm) => this.formInstance = refForm }
					>
						<Row>
							<Col>
								{/* TODO: 串API后替代掉有效人数定义输入值, key, 和 itemName */}
								<FormItem
									label="有效人数定义"
									key="effectiveMember"
									itemName="effectiveMember"
									className="management-member-bonus-rules-effective-member"
									itemConfig={{
										initialValue: definitionOfEffectiveMember,
										rules: [{
											required: true,
											message: '有效人数定义 为必填',
										},],
									}}
								>
									<InputNumber
										className="management-member-bonus-rules__input"
										max={10000}
										min={1}
										step={1}
										placeholder="0"
									/>
								</FormItem>
								<span className="management-member-bonus-rules__input-prefix">当日投注超过</span>
							</Col>
						</Row>
					</Form>
				</PageBlock>
			</Fragment>
		);
	}
}

AccountMemberBonusRulesEffectMember.propTypes = propTypes;
AccountMemberBonusRulesEffectMember.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		platformData: state.platform.get("data").toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateBonusRulesAction: (data) => dispatch(updateBonusRulesAction(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesEffectMember);
