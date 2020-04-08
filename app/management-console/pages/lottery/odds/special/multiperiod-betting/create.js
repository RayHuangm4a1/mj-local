import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'ljit-react-components';
import BettingLimitForm from './betting-limit-form';
import PageBlock from '../../../../../components/page-block';
import './style.styl';

const propTypes = {
	onBack: PropTypes.func.isRequired,
};
const defaultProps = {
	onBack: () => {},
};

const PREFIX_CLASS = 'multiperiod-betting';

class GameOddsMultiperiodBettingCreatePage extends Component {
	constructor() {
		super();

		this._handleSave = this._handleSave.bind(this);
	}

	_handleSave(form) {
		//TODO save by api
		form.validateFields((err, values) => {});
	}

	render() {
		const {
			onBack,
		} = this.props;
		const { _handleSave, } = this;

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
						formType={BettingLimitForm.FormTypeEnums.CREATE}
						onSave={_handleSave}
					/>
				</PageBlock>
			</div>
		);
	}
}

GameOddsMultiperiodBettingCreatePage.propTypes = propTypes;
GameOddsMultiperiodBettingCreatePage.defaultProps = defaultProps;

export default GameOddsMultiperiodBettingCreatePage;
