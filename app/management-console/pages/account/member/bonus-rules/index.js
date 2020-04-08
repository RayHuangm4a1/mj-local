import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';
import { connect } from '../../../../../ljit-store-connecter';
import { userBonusRulesManagementPageActions, } from '../../../../controller';

const { initUserBonusRulesManagementPageAction, } = userBonusRulesManagementPageActions;
const propTypes = {
	renderedRoutes: PropTypes.object,
	initUserBonusRulesManagementPageAction: PropTypes.func,
};

const defaultProps = {
	initUserBonusRulesManagementPageAction: () => {}
};

class AccountMemberBonusRulesPage extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const { initUserBonusRulesManagementPageAction, } = this.props;

		initUserBonusRulesManagementPageAction();
	}
	render() {
		const { renderedRoutes, } = this.props;

		return (
			<div className="management-member-bonus-rules">
				{renderedRoutes}
			</div>
		);
	}
}

AccountMemberBonusRulesPage.propTypes = propTypes;
AccountMemberBonusRulesPage.defaultProps = defaultProps;

function mapStateToProps() {}
function mapDispatchToProps(dispatch) {
	return {
		initUserBonusRulesManagementPageAction: () => dispatch(initUserBonusRulesManagementPageAction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberBonusRulesPage);
