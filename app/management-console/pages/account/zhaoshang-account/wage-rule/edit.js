import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderButtonBar, Button, Form, FormItem, Radio, Select, Notify } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { connect } from 'ljit-store-connecter';
import { platformActions } from '../../../../controller';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import './style.styl';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const { updatePlatformFixedWageAction, fetchPlatformAction } = platformActions;
const propTypes = {
	onBack: PropTypes.func.isRequired,
	fixedWage: PropTypes.number,
	fixedWages: PropTypes.arrayOf(PropTypes.number),
	updatePlatformFixedWageAction: PropTypes.func.isRequired,
	fetchPlatformAction: PropTypes.func.isRequired,
	updateFixedWageLoadingStatus: PropTypes.oneOf([	NONE, SUCCESS, FAILED, LOADING,]),
};
const defaultProps = {
	fixedWages: [],
};

class WageRuleEditPage extends Component {
	constructor() {
		super();

		this.state = {
			radioValue: true,
		};

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormSubmit(e) {
		e.preventDefault();
		const { updatePlatformFixedWageAction } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((err, { fixedWage, }) => {
			if (!err) {
				updatePlatformFixedWageAction(fixedWage);
			}
		});
	}

	render() {
		const { radioValue } = this.state;
		const { onBack, fixedWage, fixedWages } = this.props;
		const { _handleFormSubmit } = this;
		const wageInitialValue=  fixedWage || null;
		const fixedWageOptions = fixedWages.map(item => {
			return {
				label: `${item}%`,
				value: item,
			};
		});

		return (
			<React.Fragment>
				<HeaderButtonBar
					left={[
						(
							<Button
								key="save"
								outline={Button.OutlineEnums.HOLLOW}
								className="management-zhaoshang-wage-rule__button"
								onClick={onBack}
							>回到上一页</Button>
						)
					]}
				/>
				<PageBlock className="ljit-zhao-shang-wage-rule-edit">
					<div className="management-zhaoshang-wage-rule__form">
						<HeaderButtonBar
							right={[
								(
									<Button
										key="save"
										outline={Button.OutlineEnums.SOLID}
										onClick={_handleFormSubmit}
									>储存修改</Button>
								),
							]}
						/>
						<HeaderButtonBar
							left={[(
								<PageBlock.Title key="title" text="招商固定工资" />
							)]}
						/>
						<Form
							submitButtonDisabled
							cancelButtonDisabled
							ref={(refForm) => this.formInstance = refForm }
						>
							<FormItem
								label="工资发放"
								key="salaryPayed"
								itemName="salaryPayed"
								columnType={FormItem.ColumnTypeEnums.SMALL}
								itemConfig={{
									// TODO 之後串接資料，目前爲寫死，並確認欄位名稱
									initialValue: "即时发放",
									rules: [{
										required: true,
										message: '工资发放 为必填',
									},],
								}}
							>
								<Radio
									radioType={Radio.RadioTypeEnums.RADIO}
									defaultChecked
									checked={radioValue}
									onChange={event => this.setState({ radioValue: event.target.value, })}
								>
									即时发放
								</Radio>
							</FormItem>
							<FormItem
								label="固定工资"
								labelColon={false}
								key="fixedWage"
								itemName="fixedWage"
								columnType={FormItem.ColumnTypeEnums.SMALL}
								itemConfig={{
									initialValue: wageInitialValue,
									rules: [{
										required: true,
										message: '必填',
									},],
								}}
							>
								<Select
									options={fixedWageOptions}
								/>
							</FormItem>
						</Form>
					</div>
				</PageBlock>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const {
			fetchPlatformAction
		} = this.props;

		fetchPlatformAction();
	}

	componentDidUpdate(prevProps) {
		const {
			updateFixedWageLoadingStatus,
		} = this.props;

		if (prevProps.updateFixedWageLoadingStatus === LOADING && updateFixedWageLoadingStatus === SUCCESS) {
			// TODO 使用 notification action 
			Notify.success("固定工资修改成功", 3000);
		}
	}
}

WageRuleEditPage.propTypes = propTypes;
WageRuleEditPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		fixedWage: state.platform.get('data').toObject().fixedWage,
		fixedWages: state.platform.get('data').toObject().fixedWages,
		updateFixedWageLoadingStatus: state.platform.get('updateFixedWageLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updatePlatformFixedWageAction: (fixedWage) => dispatch(updatePlatformFixedWageAction(fixedWage)),
		fetchPlatformAction: () => dispatch(fetchPlatformAction()),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(WageRuleEditPage);
