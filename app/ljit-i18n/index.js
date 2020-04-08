import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider, translate } from 'react-i18next';

class I18NProvider extends Component {
	render() {
		const { i18n, children } = this.props;

		return (
			<I18nextProvider i18n={i18n}>
				{children}
			</I18nextProvider>
		);
	}
}
I18NProvider.propTypes = {
	i18n: PropTypes.object.isRequired,
	children: PropTypes.any,
};

function withTranslate(WrappedComponent) {
	return translate()(WrappedComponent);
}

export {
	I18NProvider,
	withTranslate,
};
