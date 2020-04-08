import React, { Fragment, Component, } from 'react';
import PropTypes from 'prop-types';
import MemberTableUnit from '../member-profit-loss-table-block';

const propTypes = {
	username: PropTypes.string,
	teamRecord: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.number,
			account: PropTypes.string,
			bettingAmount: PropTypes.number,
			prize: PropTypes.number,
			rebate: PropTypes.number,
			activity: PropTypes.number,
			surplus: PropTypes.number,
			recharge: PropTypes.number,
			withdrawal: PropTypes.number,
			bonus: PropTypes.number,
		}),
	),
	personRecord: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.number,
			account: PropTypes.string,
			bettingAmount: PropTypes.number,
			prize: PropTypes.number,
			rebate: PropTypes.number,
			activity: PropTypes.number,
			surplus: PropTypes.number,
			recharge: PropTypes.number,
			withdrawal: PropTypes.number,
			bonus: PropTypes.number,
		}),
	),
	subordinateRecord: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.number,
			account: PropTypes.string,
			bettingAmount: PropTypes.number,
			prize: PropTypes.number,
			rebate: PropTypes.number,
			activity: PropTypes.number,
			surplus: PropTypes.number,
			recharge: PropTypes.number,
			withdrawal: PropTypes.number,
			bonus: PropTypes.number,
		}),
	),
	onNavigate: PropTypes.func,
};

const defaultProps = {};

function getURL(username, subordinate) {
	return `/company-report/profit/${username}/${subordinate}`;
}

class MemberTableBlocks extends Component {
	constructor() {
		super();
		this._onClickRecord = this._onClickRecord.bind(this);
	}

	_onClickRecord(record) {
		return this.props.onNavigate(getURL(this.props.username, record.account));
	}

	render() {
		const { username, teamRecord, personRecord, subordinateRecord, } =this.props;

		const baseTableBlock = (
			<Fragment>
				<MemberTableUnit
					title={`团队整体汇总结果 : ${username}`}
					dataSource={teamRecord}
					text={(
						<div>
							<div>* 团队总返点: 该用户的整个团队自身所获得的返点额总和.</div>
							<div>* 团队总活动: 该用户的整个团队所获得的一切活动总和.</div>
						</div>
					)}
				/>
				<MemberTableUnit
					title={`个人报表结果 : ${username}`}
					dataSource={personRecord}
					text={(
						<div>
							<div>* 个人返点:个人投注返点加下级返点.</div>
						</div>
					)}
				/>
			</Fragment>
		);

		if (subordinateRecord.length > 0) {
			return (
				<Fragment>
					{baseTableBlock}
					<MemberTableUnit
						title={"直接下级(及各自团队)分列详细结果"}
						dataSource={subordinateRecord}
						onClickRecord={this._onClickRecord}
						text={(
							<div>
								<div>* 总盈亏:总返点+总奖金+ 总优惠- 总投注</div>
								<div>* 注意：报表汇总结果中包含目标用户自身的数据。</div>
							</div>
						)}
					/>
				</Fragment>
			);
		}
		return baseTableBlock;
	}
}

MemberTableBlocks.propTypes = propTypes;
MemberTableBlocks.defaultProps = defaultProps;

export default MemberTableBlocks;
