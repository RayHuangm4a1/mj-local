import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { RouteKeyEnums, } from '../../../route';

const {
	THIRDPARTY,
} = RouteKeyEnums;
const SEARCH_DELAY = 300;

const propTypes = {
	thirdPartyType: PropTypes.string.isRequired,
	thirdPartyPlatform: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

const withThirdPartySelector = (WrappedComponent) => {
	class WithThirdPartySelector extends Component {
		static getDerivedStateFromProps(props, state) {
			const {
				thirdPartyType: nextThirdPartyType,
				thirdPartyPlatform: nextThirdPartyPlatform,
			} = props;
			const {
				thirdPartyTypeKey,
				thirdPartyPlatformKey,
			} = state;

			if (
				(nextThirdPartyType !== thirdPartyTypeKey)
				|| (nextThirdPartyPlatform !== thirdPartyPlatformKey)
			) {
				return {
					...state,
					thirdPartyTypeKey: nextThirdPartyType,
					thirdPartyPlatformKey: nextThirdPartyPlatform,
				};
			}

			return null;
		}

		constructor(props) {
			super(props);
			this.state = {
				thirdPartyName: '',
				thirdPartyTypeKey: '',
				thirdPartyPlatformKey: '',
			};

			this._handleChangeName = this._handleChangeName.bind(this);
			this._handleSearchName = this._handleSearchName.bind(this);
			this._handleSelectType = this._handleSelectType.bind(this);
			this._handleSelectPlatform = this._handleSelectPlatform.bind(this);
		}

		_handleChangeName(event) {
			this.setState({ thirdPartyName: event.target.value, });
		}
		_handleSearchName() {
			// TODO search third-party by name
		}

		_handleSelectType(data = {}) {
			const { onNavigate, } = this.props;
			const { thirdPartyTypeKey, } = this.state;

			if (data.id === thirdPartyTypeKey) {
				return;
			}

			// TODO replace hot to real third-party platform
			const path = checkIsAllType(data.id) ? THIRDPARTY : `${THIRDPARTY}/${data.id}/hot`;

			onNavigate(path);
		}
		_handleSelectPlatform(data = {}) {
			const { onNavigate, } = this.props;
			const { thirdPartyTypeKey, thirdPartyPlatformKey, } = this.state;

			if (data.id === thirdPartyPlatformKey) {
				return;
			}

			const path = checkIsAllType(data.id) ? THIRDPARTY : `${THIRDPARTY}/${thirdPartyTypeKey}/${data.id}`;

			onNavigate(path);
		}

		render() {
			const {
				thirdPartyName,
				thirdPartyTypeKey,
				thirdPartyPlatformKey,
			} = this.state;

			return (
				<WrappedComponent
					{...this.props}
					thirdPartySelector={{
						thirdPartyName,
						thirdPartyTypeKey,
						thirdPartyPlatformKey,
						onChangeName: this._handleChangeName,
						onSearchName: debounce(this._handleSearchName, SEARCH_DELAY),
						onSelectType: this._handleSelectType,
						onSelectPlatform: this._handleSelectPlatform,
					}}
				/>
			);
		}
	}

	WithThirdPartySelector.displayName = `WithThirdPartySelector(${getDisplayName(WrappedComponent)})`;
	WithThirdPartySelector.propTypes = propTypes;

	return WithThirdPartySelector;
};

export default withThirdPartySelector;

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const checkIsAllType = selectedId => selectedId === 'all';
