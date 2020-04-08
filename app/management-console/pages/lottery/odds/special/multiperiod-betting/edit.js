import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'ljit-react-components';
import BettingLimitForm from './betting-limit-form';
import PageBlock from '../../../../../components/page-block';
import './style.styl';

const fakeData = {
	key: '1',
	play: 'play 1',
	lottery: 'lottery 1',
	lotteryClass:  'lotteryClass 1',
	reward: '和',
	odds: [{
		key: '0',
		isLargestIssue: false,
		failIssuesFrom: 0,
		failIssuesTo: 10,
		maxBet: 50000,
		maxReceipt: 350000,
	},{
		key: '1',
		isLargestIssue: false,
		failIssuesFrom: 11,
		failIssuesTo: 20,
		maxBet: 50000,
		maxReceipt: 250000,
	},{
		key: '2',
		isLargestIssue: true,
		failIssuesFrom: 21,
		failIssuesTo: 21,
		maxBet: 30000,
		maxReceipt: 150000,
	}],
};
const propTypes = {
	onBack: PropTypes.func.isRequired,
};
const defaultProps = {
	onBack: () => {},
};

const PREFIX_CLASS = 'multiperiod-betting';

class GameOddsMultiperiodBettingEditPage extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				odds: [],
			},
		};

		this._handleDelete = this._handleDelete.bind(this);
		this._handleSave = this._handleSave.bind(this);
	}

	_handleDelete(form) {
		//TODO delete by api
	}

	_handleSave(form) {
		//TODO save by api
		form.validateFields((err, values) => {});
	}

	render() {
		const { onBack, } = this.props;
		const { data, } = this.state;
		const { _handleDelete, _handleSave, } = this;

		return (
			<div className={`${PREFIX_CLASS}-page`}>
				<Button
					className="onback-button"
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => onBack()}
				>
					回到上一页
				</Button>
				<PageBlock className={`${PREFIX_CLASS}__edit-block betting-limit-form`}>
					<BettingLimitForm
						formType={BettingLimitForm.FormTypeEnums.EDIT}
						initialValues={data}
						onDelete={_handleDelete}
						onSave={_handleSave}
					/>
				</PageBlock>
			</div>
		);
	}

	componentDidMount() {
		this.setState({
			data: fakeData,
		});
	}
}

GameOddsMultiperiodBettingEditPage.propTypes = propTypes;
GameOddsMultiperiodBettingEditPage.defaultProps = defaultProps;

export default GameOddsMultiperiodBettingEditPage;
