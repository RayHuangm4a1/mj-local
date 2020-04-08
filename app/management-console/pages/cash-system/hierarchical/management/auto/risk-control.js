import React from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
} from 'ljit-react-components';
import RiskControlForm from '../../form/risk-control-form';

const propTypes = {
	// TODO update prop types
	riskControlData: PropTypes.object,
};

const RiskControlPage = ({
	// TODO select from reducer
	riskControlData = fakeData,
}) => {

	// TODO fetch risk control data

	return (
		<div className="auto-page-content">
			<HeaderButtonBar
				left={(
					<div className="auto-page-content__title">
						风控条件设置
					</div>
				)}
			/>
			<div className="auto-page-content__form-wrapper">
				<RiskControlForm
					initialRuleValue={riskControlData.rule}
				/>
			</div>
		</div>
	);
};

RiskControlPage.propTypes = propTypes;

export default RiskControlPage;

const fakeData = {
	id: 1,
	rule: 1,
};
