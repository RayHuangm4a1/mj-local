import React from 'react';
import PropTypes from 'prop-types';
import {
	dispatch,
	addInfo,
	updateInfo,
	removeInfo,
} from './store';

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	isBannerVisible: PropTypes.bool,
};

class Item extends React.Component {
	componentDidMount() {
		this._dispatch(addInfo({
			title: this.props.title,
			description: this.props.description,
			isBannerVisible: this.props.isBannerVisible,
		}));
	}

	componentDidUpdate(prevProps) {
		if (prevProps.title !== this.props.title) {
			this._dispatch(updateInfo({
				title: this.props.title,
			}));
		}
		if (prevProps.description !== this.props.description) {
			this._dispatch(updateInfo({
				description: this.props.description,
			}));
		}
		if (prevProps.isBannerVisible !== this.props.isBannerVisible) {
			this._dispatch(updateInfo({
				isBannerVisible: this.props.isBannerVisible,
			}));
		}
	}

	componentWillUnmount() {
		this._dispatch(removeInfo());
	}

	_dispatch(action) {
		dispatch(action);
	}

	render() {
		return null;
	}
}

Item.propTypes = propTypes;

export default Item;
