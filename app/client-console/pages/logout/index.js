import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { authActions, } from '../../controller';
import { RouteKeyEnums, } from '../../route';

const { logoutAction, } = authActions;

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
	logoutAction: PropTypes.func.isRequired,
};

const LogoutPage = ({ logoutAction, onNavigate, }) => {
	logoutAction();
	onNavigate(RouteKeyEnums.LOGIN);
	// TODO 需清空 application 的資料
	return null;
};

function mapDispatchToProps(dispatch) {
	return {
		logoutAction: () => dispatch(logoutAction())
	};
}

LogoutPage.propTypes = propTypes;

export default connect(() => {}, mapDispatchToProps)(LogoutPage);
