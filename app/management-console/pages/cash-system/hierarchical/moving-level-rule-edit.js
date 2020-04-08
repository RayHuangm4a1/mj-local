import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderButtonBar, Button } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import SpecialRuleSettingForm from './form/special-rule-setting-form';

const propTypes = {
	onBack: PropTypes.func,
	levels: PropTypes.arrayOf(PropTypes.string),
	comment: PropTypes.string,
	bettingAmountGreaterThanRechargeAmount: PropTypes.string,
	ipData: PropTypes.arrayOf(PropTypes.shape({
		ip: PropTypes.string,
	})),
	regionData: PropTypes.arrayOf(PropTypes.shape({
		province: PropTypes.string,
		city: PropTypes.string,
	})),
	movingLevel: PropTypes.string,
};
const defaultProps = {
	onBock: () => {},
};

class CreateMovingLevelPage extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			onBack,
			levels,
			comment,
			bettingAmountGreaterThanRechargeAmount,
			ipData,
			regionData,
			movingLevel,
		} = this.props;

		return (
			<React.Fragment>
				<HeaderButtonBar
					left={
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginBottom: 24 }}
							onClick={onBack}
						>
							返回上一層
						</Button>
					}
				/>
				<PageBlock>
					<SpecialRuleSettingForm
						levels={levels}
						comment={comment}
						bettingAmountGreaterThanRechargeAmount={bettingAmountGreaterThanRechargeAmount}
						ipData={ipData}
						regionData={regionData}
						movingLevel={movingLevel}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
}

CreateMovingLevelPage.propTypes = propTypes;
CreateMovingLevelPage.defaultProps = defaultProps;

export default CreateMovingLevelPage;
