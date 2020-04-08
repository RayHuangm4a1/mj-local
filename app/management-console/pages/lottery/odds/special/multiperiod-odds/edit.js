import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'ljit-react-components';
import OddsLimitForm from './odds-limit-form';
import PageBlock from '../../../../../components/page-block';
import './style.styl';

const fakeData = {
	lotteryClass: 'lotteryClass 1',
	lottery: 'lottery 1',
	play: 'play 1',
	reward: 'reward 1',
	odds: [{
		key: '0',
		isLargestIssue: false,
		failIssuesFrom: 0,
		failIssuesTo: 10,
		rewardCode: 1900,
	},{
		key: '1',
		isLargestIssue: false,
		failIssuesFrom: 11,
		failIssuesTo: 20,
		rewardCode: 1920,
	},{
		key: '2',
		isLargestIssue: true,
		failIssuesFrom: 21,
		failIssuesTo: 21,
		rewardCode: 1940,
	},],
};

const propTypes = {
	onBack: PropTypes.func.isRequired,
};
const defaultProps = {
	onBack: () => {},
};

const PREFIX_CLASS = 'multiperiod-odds';

class GameOddsMultiperiodOddsEditPage extends Component {
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
				<PageBlock className={`${PREFIX_CLASS}__edit-block odds-limit-form`}>
					<OddsLimitForm
						formType={OddsLimitForm.FormTypeEnums.EDIT}
						initialValues={data}
						platform={{
							bonus: { max: 1960, },
						}}
						onDelete={_handleDelete}
						onSave={_handleSave}
					/>
				</PageBlock>
			</div>
		);
	}

	componentDidMount() {
		//TODO get data by api
		this.setState({
			data: fakeData,
		});
	}
}

GameOddsMultiperiodOddsEditPage.propTypes = propTypes;
GameOddsMultiperiodOddsEditPage.defaultProps = defaultProps;

export default GameOddsMultiperiodOddsEditPage;
