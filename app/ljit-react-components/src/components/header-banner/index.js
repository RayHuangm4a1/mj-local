import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Store from './store';
import HeaderBannerItem from './item';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	breadcrumb: PropTypes.node,
};

class HeaderBanner extends Component {
	constructor() {
		super();
		this._unsubscribe = null;
	}

	componentDidMount() {
		this._unsubscribe = Store.subscribe(() => {
			this.forceUpdate();
		});
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	render() {
		const {
			className,
			breadcrumb: Breadcrumb,
		} = this.props;
		const data = Store.getState();

		if (!data.isBannerVisible) {
			return null;
		}

		return (
			<div className={cx('ljit-header-banner', className)}>
				{Breadcrumb}
				<h1 className="ljit-header-banner__title">{data.title}</h1>
				{(() => {
					if (!data.description) {
						return null;
					}
					return <div className="ljit-header-banner__description">{data.description}</div>;
				})()}
			</div>
		);
	}
}

HeaderBanner.propTypes = propTypes;
HeaderBanner.HeaderBannerItem = HeaderBannerItem;

export default HeaderBanner;
