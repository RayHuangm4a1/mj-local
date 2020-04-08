import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import MemberTableBlocks from './member-table-blocks';
import './style.styl';

const propTypes = {
	onNavigate: PropTypes.func,
	onBack: PropTypes.func,
	username: PropTypes.string,
};

const defaultProps = {};

class Member extends Component {
	constructor(props) {
		super(props);

		//data will get by api
		this.state = {
			teamRecord: team,
			personRecord: person,
			subordinateRecord: subordinate,
		};
	}

	render() {
		const { onNavigate, onBack, username, } = this.props;
		const { teamRecord, personRecord, subordinateRecord } = this.state;

		return (
			<div>
				<div className="back-button">
					<Button outline={Button.OutlineEnums.HOLLOW} onClick={() => onBack()}>返回上一層</Button>
				</div>
				<MemberTableBlocks
					username={username}
					teamRecord={teamRecord}
					personRecord={personRecord}
					subordinateRecord={subordinateRecord}
					onNavigate={onNavigate}
				/>
			</div>
		);
	}
}

Member.propTypes = propTypes;
Member.defaultProps = defaultProps;

export default Member;

const team = [{
	key: 1,
	account: 'codest1234',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -22,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
}];

const person = [{
	key: 1,
	account: 'codest1234',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -22,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
}];

const subordinate = [{
	key: 1,
	account: 'codest1234',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -22,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
},{
	key: 2,
	account: 'codest134',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -2,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
},{
	key: 3,
	account: 'codest111',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -1244,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
}];
