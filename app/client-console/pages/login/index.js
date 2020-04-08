import React from 'react';
import PropTypes from 'prop-types';
import { Icon, } from 'ljit-react-components';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

const LoginPage = ({ renderedRoutes, }) => {
	return (
		<div className="login-page">
			{renderedRoutes}
			<div className="login-page__bottom">
				<div className="login-page__bottom-service">
					<Icon type="info"size={Icon.SizeEnums.SMALL} />
					如有任何疑問，歡迎諮詢<a href="#">在線客服</a>
				</div>
				<div className="login-page__bottom-icons">
					{/* TODO: 更換成對的圖 */}
					<div className="login-page__bottom-icon"><Icon size={Icon.SizeEnums.XX_LARGE} type="apple"/></div>
					<div className="login-page__bottom-icon"><Icon size={Icon.SizeEnums.XX_LARGE} type="android"/></div>
					<div className="login-page__bottom-icon"><Icon size={Icon.SizeEnums.XX_LARGE} type="windows"/></div>
				</div>
				<p>© 2020 YY娱乐 All Rights Reserved.   彩票有风险，投注需谨慎，不向未满18周岁的青少年出售彩票</p>
			</div>
		</div>
	);
};

LoginPage.propTypes = propTypes;

export default LoginPage;
