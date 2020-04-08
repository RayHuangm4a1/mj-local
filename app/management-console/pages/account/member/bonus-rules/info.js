import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, HeaderButtonBar, DecimalNumber, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { RouteKeyEnums } from '../../../../routes.js';
import { connect } from '../../../../../ljit-store-connecter';
import { getFixedWagesText, getMaxWage, } from './utils';
import { PlatformPropTypes } from '../../../../lib/prop-types-utils';

const propTypes ={
	onNavigate: PropTypes.func,
	platformData: PlatformPropTypes,
};

const defaultProps = {
	onNavigate: () => {},
};

class AccountMemberBonusRulesInfoPage extends Component {
	render() {
		const { onNavigate, platformData, } = this.props;
		const {
			bonus = {},
			couldEqualToPlatformMaxBonus,
			couldEqualToParentBonus,
			fixedWages = [],
			bettingPolicy = {},
		} = platformData;
		const { list = [], max, min } = bonus;
		const { rewardMode, nonPKMaxProfit, pkMaxProfit, } = bettingPolicy;
		const effectiveMember = 1000;
		const maxDividend = 20;
		const maxWage = getMaxWage(fixedWages);

		return (
			<PageBlock noMinHeight>
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="奖金号规则" />
						),
						(
							<Button
								key="save"
								outline={Button.OutlineEnums.HOLLOW}
								className="management-member-bonus-rules__button"
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_MEMBER_BONUSRULES_BONUS_NUMBER_RULES)}
							>
								修改
							</Button>
						)
					]}
				/>
				<div className="management-member-bonus-rules__content">
					<div>
						最高奖金号：
						<span> {max} </span>
					</div>
					<div>
						最低奖金号：
						<span> {min} </span>
					</div>
					<div>
						奖金号间隔：
						<span> {list.join(', ')} </span>
					</div>
					<div>
						最高奖金号是否可设定平级：
						<span> {couldEqualToPlatformMaxBonus ? '是' : '否'} </span>
					</div>
					<div>
						其他奖金号是否可设定平级：
						<span> {couldEqualToParentBonus ? '是' : '否'} </span>
					</div>
				</div>
				<div className="separate-line"/>
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="固定工资规则" />
						),
						(
							<Button
								key="save"
								outline={Button.OutlineEnums.HOLLOW}
								className="management-member-bonus-rules__button"
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_MEMBER_BONUSRULES_WAGE)}
							>
								修改
							</Button>
						)
					]}
				/>
				<div className="management-member-bonus-rules__content">
					<div>
						最高工资：
						<span> {`${maxWage}%`} </span>
					</div>
					<div>
						前台可设定固定工资：
						<span>{getFixedWagesText(fixedWages)}</span>
					</div>
				</div>
				<div className="separate-line"/>
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="娱乐工资规则" />
						),
						(
							<Button
								key="save"
								outline={Button.OutlineEnums.HOLLOW}
								className="management-member-bonus-rules__button"
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_MEMBER_BONUSRULES_THIRD_PARTY_WAGE)}
							>
								修改
							</Button>
						)
					]}
				/>
				<div className="management-member-bonus-rules__content">
					<div>
						最高工资：
						<span> {`${maxWage}%`} </span>
					</div>
					<div>
						可设定娱乐工资：
						<span>{getFixedWagesText(fixedWages)}</span>
					</div>
				</div>
				<div className="separate-line"/>
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="分红规则" />
						),
						(
							<Button
								key="save"
								className="management-member-bonus-rules__button"
								outline={Button.OutlineEnums.HOLLOW}
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_MEMBER_BONUSRULES_DIVIDEND)}
							>
								修改
							</Button>
						)
					]}
				/>
				<div className="management-member-bonus-rules__content">
					<div>
						前台可设定最高分红：
						{/* TODO: 串API后替代掉最高分红之呈现数值 */}
						<span> {`${maxDividend}%`} </span>
					</div>
				</div>
				<div className="separate-line"/>
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="有效人数" />
						),
						(
							<Button
								key="save"
								className="management-member-bonus-rules__button"
								outline={Button.OutlineEnums.HOLLOW}
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_MEMBER_BONUSRULES_EFFECTIVE_MEMBER)}
							>
								修改
							</Button>
						)
					]}
				/>
				<div className="management-member-bonus-rules__content">
					<div>
						有效人数定义：
						{/* TODO: 串API后替代掉有效人数定义之呈现数值 */}
						<span>{`当日投注超过 ${effectiveMember} 元`}</span>
					</div>
				</div>
				<div className="separate-line"/>
				<HeaderButtonBar
					left={[
						(
							<PageBlock.Title key="title" text="最高奖金利润" />
						),
						(
							<Button
								key="save"
								className="management-member-bonus-rules__button"
								outline={Button.OutlineEnums.HOLLOW}
								onClick={() => onNavigate(RouteKeyEnums.ACCOUNT_MEMBER_BONUSRULES_MAX_PROFIT)}
							>
								修改
							</Button>
						)
					]}
				/>
				<div className="management-member-bonus-rules__content">
					<div>
						单挑最高利润：<span>{<DecimalNumber data={pkMaxProfit} hasSeparator/>}</span>
					</div>
					<div>
						非单挑最高利润：<span>{<DecimalNumber data={nonPKMaxProfit} hasSeparator/>}</span>
					</div>
					<div>
						模式：<span>{rewardMode}</span>
					</div>
				</div>
			</PageBlock>
		);
	}
}

AccountMemberBonusRulesInfoPage.defaultProps = defaultProps;
AccountMemberBonusRulesInfoPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		platformData: state.platform.get('data').toObject(),
	};
}

function mapDispatchToProps() {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesInfoPage);
