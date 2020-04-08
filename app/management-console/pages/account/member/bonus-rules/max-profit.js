import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Form,
	FormItem,
	Button,
	InputNumber,
	RadioGroup,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { connect } from '../../../../../ljit-store-connecter';
import { PlatformPropTypes } from '../../../../lib/prop-types-utils';

const propTypes = {
	onBack: PropTypes.func.isRequired,
	platformData: PlatformPropTypes,
};
const defaultProps = {
	platform: {},
};

class AccountMemberBonusRulesMaxProfitPage extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				// TODO dispatch update bonus-rules Action
			}
		});
	}
	render() {
		const { _handleSubmit, } = this;
		const { onBack, platformData, } = this.props;
		const { bettingPolicy = {} } = platformData;
		const { pkMaxProfit, nonPKMaxProfit, rewardMode } = bettingPolicy;

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
						left={<PageBlock.Title text="最高奖金利润" />}
						right={(
							<Button
								outline={Button.OutlineEnums.SOLID}
								onClick={_handleSubmit}
							>
								储存修改
							</Button>
						)}
					/>
					<Form
						className="max-profit-form"
						submitButtonDisabled
						cancelButtonDisabled
						ref={(refForm) => this.formInstance = refForm }
					>
						<FormItem
							label="单挑最高利润"
							itemName="pkMaxProfit"
							itemConfig={{ initialValue: pkMaxProfit, }}
						>
							<InputNumber
								className="management-member-bonus-rules__input-profit"
								min={0}
							/>
						</FormItem>
						<FormItem
							label="单挑最高利润"
							itemName="nonPKMaxProfit"
							itemConfig={{ initialValue: nonPKMaxProfit, }}
						>
							<InputNumber
								className="management-member-bonus-rules__input-profit"
								min={0}
							/>
						</FormItem>
						<FormItem
							label="模式"
							itemName="mode"
							itemConfig={{ initialValue: rewardMode, }}
						>
							<RadioGroup
								options={[
									// TODO check option value after schema is ok
									{ label: '奖金模式', value: '奖金模式', },
									{ label: '利润模式', value: '利润模式', },
								]}
							/>
						</FormItem>
					</Form>
				</PageBlock>
			</React.Fragment>
		);
	}
}

AccountMemberBonusRulesMaxProfitPage.propTypes = propTypes;
AccountMemberBonusRulesMaxProfitPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		platformData: state.platform.get("data").toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add action after api is ok.
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesMaxProfitPage);
