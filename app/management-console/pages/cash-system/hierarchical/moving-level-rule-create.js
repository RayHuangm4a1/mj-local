import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeaderButtonBar, Button } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import SpecialRuleSettingForm from './form/special-rule-setting-form';

const propTypes = {
	onBack: PropTypes.func,
};
const defaultProps = {
	onBock: () => {},
};

class MovingLevelCreatePage extends Component {
	constructor() {
		super();
	}

	render() {
		const { onBack } = this.props;

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
					<SpecialRuleSettingForm/>
				</PageBlock>
			</React.Fragment>
		);
	}
}

MovingLevelCreatePage.propTypes = propTypes;
MovingLevelCreatePage.defaultProps = defaultProps;

export default MovingLevelCreatePage;
