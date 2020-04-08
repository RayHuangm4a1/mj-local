import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import LogoIcon from '../../components/logo-icon';

const propTypes = {
	title: PropTypes.string,
};
const defaultProps = {
	title: '',
};
const PREFIX_CLASS = 'login-logo';

class LoginLogo extends Component {
	constructor() {
		super();

		this._renderTitle = this._renderTitle.bind(this);
	}

	_renderTitle() {
		const { title, } = this.props;

		if (title.length === 0) {
			return false;
		} else {
			return (
				<div className={`${PREFIX_CLASS}__title`}>{title}</div>
			);
		}
	}

	render() {
		const { _renderTitle, } = this;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__logo`}>
					<LogoIcon
						size={LogoIcon.SizeEnums.LARGE}
					/>
				</div>
				{_renderTitle()}
			</div>
		);
	}
}

LoginLogo.propTypes = propTypes;
LoginLogo.defaultProps = defaultProps;

export default LoginLogo;
