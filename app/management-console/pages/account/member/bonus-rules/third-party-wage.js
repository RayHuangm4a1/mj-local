import React, { useRef, } from 'react';
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
import { getMaxWage, } from './utils';

const propTypes = {
	onBack: PropTypes.func.isRequired,
	updateBonusRulesAction: PropTypes.func,
	platform: PropTypes.shape({
		_id: PropTypes.string,
		status: PropTypes.string,
		name: PropTypes.string,
		code: PropTypes.string,
		bonus: PropTypes.shape({
			list: PropTypes.array,
			max: PropTypes.number,
			min: PropTypes.number,
		}),
		fixedWages: PropTypes.array,
		couldEqualToPlatformMaxBonus: PropTypes.bool,
		couldEqualToParentBonus: PropTypes.bool,
		rewardMode: PropTypes.string,
		nonPKMaxProfit: PropTypes.number,
		pkMaxProfit: PropTypes.number,
		entertainFixedWages: PropTypes.array,
	}),
};

const AccountMemberBonusRulesThirdPartyWagePage = ({ platform, onBack, }) => {
	function _handleSubmit() {
		const form = formInstance.current.getForm().getFieldsValue();

		form.entertainFixedWages = form.entertainFixedWages.split(', ');
		// TODO dispatch updateBonusRulesAction
	}

	const formInstance = useRef(null);
	const { entertainFixedWages, } = platform;
	const maxWage = getMaxWage(entertainFixedWages);

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
					left={<PageBlock.Title text="娱乐工资规则" />}
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
					ref={formInstance}
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
								label="可设定娱乐工资"
								key="entertainFixedWages"
								itemName="entertainFixedWages"
								itemConfig={{
									initialValue : entertainFixedWages.join(', '),
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
							<div className="management-member-wage-rules__input__notice">*请由高到低输入娱乐工资，中间用逗点分隔（不需输入%数)</div>
						</Col>
					</Row>
				</Form>
			</PageBlock>
		</React.Fragment>
	);
};

AccountMemberBonusRulesThirdPartyWagePage.propTypes = propTypes;

function mapStateToProps(state) {
	// TODO get real entertainFixedWages
	const platform = state.platform.get("data").toObject();

	return {
		platform: {
			...platform,
			...fakeData,
		},
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add updateBonusRulesAction
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesThirdPartyWagePage);

const fakeData = {
	entertainFixedWages: [2, 1.8, 1.6, 1.4, 1.2],
};
