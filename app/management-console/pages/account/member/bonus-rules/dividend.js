import React, { Component, } from 'react';
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

class AccountMemberBonusRulesDividendPage extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit() {
		const form = this.formInstance.getForm().getFieldsValue();

		const { updateBonusRulesAction } = this.props;

		updateBonusRulesAction({
			ruleId: 'dividendRule',
			rule: form,
		});
	}
	render() {
		const { _handleSubmit, props, } = this;
		const { onBack, } = props;
		const maxDividend = 20;

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
						left={<PageBlock.Title text="分红规则" />}
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
						className="dividend-form"
						submitButtonDisabled
						cancelButtonDisabled
						ref={(refForm) => this.formInstance = refForm }
					>
						<Row>
							<Col>
								{/* TODO: 串API后替代掉最高分红输入值, key, 和 itemName */}
								<FormItem
									label="最高分红"
									key="maxDividend"
									itemName="maxDividend"
									itemConfig={{
										initialValue: maxDividend,
										rules: [{
											required: true,
											message: '最高分红 为必填',
										},],
									}}
								>
									<InputNumber
										className="management-member-bonus-rules__input"
										max={100}
										min={1}
										step={0.1}
										placeholder="percentage"
										formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
									/>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</PageBlock>
			</React.Fragment>
		);
	}
}

AccountMemberBonusRulesDividendPage.propTypes = propTypes;
AccountMemberBonusRulesDividendPage.defaultProps = defaultProps;

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesDividendPage);
