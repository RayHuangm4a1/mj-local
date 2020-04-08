import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'ljit-react-components';
import OddsLimitForm from './odds-limit-form';
import PageBlock from '../../../../../components/page-block';
import './style.styl';

const propTypes = {
	onBack: PropTypes.func.isRequired,
};
const defaultProps = {
	onBack: () => {},
};

const PREFIX_CLASS = 'multiperiod-odds';

class GameOddsMultiperiodOddsCreatePage extends Component {
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
				<PageBlock className={`${PREFIX_CLASS}__edit-block odds-limit-form`}>
					<OddsLimitForm
						formType={OddsLimitForm.FormTypeEnums.CREATE}
						platform={{
							bonus: { max: 1960, },
						}}
						onSave={_handleSave}
					/>
				</PageBlock>
			</div>
		);
	}
}

GameOddsMultiperiodOddsCreatePage.propTypes = propTypes;
GameOddsMultiperiodOddsCreatePage.defaultProps = defaultProps;

export default GameOddsMultiperiodOddsCreatePage;
