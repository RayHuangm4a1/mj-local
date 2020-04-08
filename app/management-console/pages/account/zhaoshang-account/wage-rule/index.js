import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, HeaderButtonBar } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { RouteKeyEnums } from '../../../../routes.js';
import { connect } from 'ljit-store-connecter';
import './style.styl';

const propTypes = {
	onNavigate: PropTypes.func,
	fixedWage: PropTypes.number,
};
const defaultProps = {
	onNavigate: () => {},
};

class AccountZhaoshangAccountWageRulePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { onNavigate, fixedWage } = this.props;

		return (
			<div className="management-zhaoshang-wage-rule">
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="招商固定工资" />
						),
						(
							<Button
								key="save"
								outline={Button.OutlineEnums.HOLLOW}
								className="management-zhaoshang-wage-rule__button"
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_ZHAOSHANGACCOUNT_WAGE_RULE_EDIT)}
							>修改</Button>
						)
					]}
				/>
				<div className="management-zhaoshang-wage-rule__content">
					<div>
						工资发放：
						{/* TODO 之後串接資料，目前爲寫死*/}
						<span> 即时发放 </span>
					</div>
					<div>
						固定工资：
						<span> {`${fixedWage}%`} </span>
					</div>
				</div>
			</div>
		);
	}
}

AccountZhaoshangAccountWageRulePage.propTypes = propTypes;
AccountZhaoshangAccountWageRulePage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		fixedWage: state.platform.get('data').toObject().fixedWage
	};
}

export default connect(mapStateToProps)(AccountZhaoshangAccountWageRulePage);
