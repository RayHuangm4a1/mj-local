import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import ClientMessageModal from '../../components/client-message-modal';
import './style.styl';

const propTypes = {
	isVisible: PropTypes.bool,
	fundsCredential: PropTypes.shape({
		isEnabled: PropTypes.bool,
	}),
	children: PropTypes.node,
	onClose: PropTypes.func,
};
const defaultProps = {
	fundsCredential: { isEnabled: false, },
	onClose: () => {},
};

const FundsPasswordChecker = ({
	isVisible,
	fundsCredential,
	children,
	onClose,
}) => {
	const { isEnabled, } = fundsCredential;

	if (isEnabled) {
		return children;
	} else {
		return (
			<ClientMessageModal
				isVisible={isVisible}
				onClickCancel={onClose}
				onClickOk={onClose}
				message={(
					<div className="zh-word-break">
						您尚未设定资金密码，请先设定资金密码后再设定安全问题。
					</div>
				)}
				isHideCancelButton
			/>
		);
	}
};

FundsPasswordChecker.propTypes = propTypes;
FundsPasswordChecker.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		fundsCredential: state.userSecurity.getIn(['data', 'fundsCredential']),
	};
}

export default connect(mapStateToProps)(FundsPasswordChecker);
