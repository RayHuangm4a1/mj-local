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
	InputTextarea,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { connect } from '../../../../../ljit-store-connecter';
import { updateBonusRulesAction } from '../../../../controller/actions/platform-actions';
import { getMaxWage } from './utils';
import { PlatformPropTypes } from '../../../../lib/prop-types-utils';

const propTypes = {
	onBack: PropTypes.func.isRequired,
	updateBonusRulesAction: PropTypes.func,
	platformData: PlatformPropTypes,
};

const defaultProps = {
	updateBonusRulesAction: () => {}
};

class AccountMemberBonusRulesWagePage extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm().getFieldsValue();
		const { updateBonusRulesAction, } = this.props;

		form.fixedWages = form.fixedWages.split(', ');
		updateBonusRulesAction({
			ruleId: 'wageRule',
			rule: form,
		});
	}

	render() {
		const { props, _handleSubmit, } = this;
		const { onBack, platformData, } = props;
		const { fixedWages = [], } = platformData;
		const maxWage = getMaxWage(fixedWages);

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
						left={<PageBlock.Title text="固定工资规则" />}
						right={[
							(
								<Button key="save" outline={Button.OutlineEnums.SOLID} onClick={_handleSubmit}>储存修改</Button>
							),
						]}
					/>
					<Form
						className="maximum-wage-form"
						submitButtonDisabled
						cancelButtonDisabled
						ref={(refForm) => this.formInstance = refForm }
					>
						<Row>
							<Col>
								{/* TODO: 串API后配合资料名称来修改 key 跟 itemName */}
								<FormItem
									label="最高工资"
									key="maxWage"
									itemName="maxWage"
									itemConfig={{
										initialValue : maxWage,
										rules: [{
											required: true,
											message: '最高工资 为必填',
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
								<FormItem
									label="前台可设定固定工资"
									key="fixedWages"
									itemName="fixedWages"
									itemConfig={{
										initialValue : fixedWages.join(', '),
										rules: [{
											required: true,
											message: '工资设定 为必填',
										},],
									}}
								>
									<InputTextarea
										className="management-member-bonus-rules__input__textarea"
										minRows={3}
										maxRows={6}
									/>
								</FormItem>
								<div className="management-member-wage-rules__input__notice">* 请由高到低输入固定工资，中间用逗号分隔(不需输入%数)</div>
							</Col>
						</Row>
					</Form>
				</PageBlock>
			</React.Fragment>
		);
	}
}

AccountMemberBonusRulesWagePage.propTypes = propTypes;
AccountMemberBonusRulesWagePage.defaultProps = defaultProps;

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

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesWagePage);
