import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			themeMaps: props.themeMaps || {},
			style: props.style || {},
		};

		this._handleSwitchTheme = this._handleSwitchTheme.bind(this);
	}
	_handleSwitchTheme(styleType = '') {
		const { themeMaps } = this.state;

		if (!themeMaps[styleType]) {
			console.warn('do not get any style');
		}

		this.setState({ style: themeMaps[styleType], });
	}
	render() {
		const { children } = this.props;
		const { style, } = this.state;

		return (
			<ThemeContext.Provider
				value={{
					style,
					onSwitchTheme: this._handleSwitchTheme,
				}}
			>
				{children}
			</ThemeContext.Provider>
		);
	}
}

ThemeProvider.propTypes = {
	style: PropTypes.object,
	themeMaps: PropTypes.object,
	children: PropTypes.any
};

export function withTheme(WrappedComponent) {
	class WithThemeComponent extends  Component {
		render() {
			return (
				<ThemeContext.Consumer>
					{(theme) => (
						<WrappedComponent
							{...this.props}
							theme={theme}
						/>
					)}
				</ThemeContext.Consumer>
			);
		}
	}

	WithThemeComponent.displayName = `withTheme(${getDisplayName(WrappedComponent)})`;
	return WithThemeComponent;
}

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
