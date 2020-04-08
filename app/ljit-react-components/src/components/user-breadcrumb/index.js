import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-user-breadcrumb';

const MAX_CRUMB_COUNT = 9;
const LAST_CRUMB_COUNT = 3;

const propTypes = {
	data: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.string,
	])),
	targetKey: PropTypes.string,
	omitText: PropTypes.string,
	className: PropTypes.string,
	separator: PropTypes.string,
	onClickUser: PropTypes.func,
	isShowingCurrentCount: PropTypes.bool,
};
const defaultProps = {
	data: [],
	targetKey: '',
	omitText: '......',
	className: '',
	separator: '>',
	onClickUser: () => {},
	isShowingCurrentCount: true,
};

class UserBreadcrumb extends Component {
	constructor() {
		super();

		this._getLimitedCrumbs = this._getLimitedCrumbs.bind(this);
		this._getCrumbs = this._getCrumbs.bind(this);
		this._renderCrumb = this._renderCrumb.bind(this);
	}

	_getLimitedCrumbs() {
		const {
			data,
			omitText,
			targetKey,
		} = this.props;
		const size = data.length;
		const firstCrumb = data.slice().shift();
		const lastCrumbs = data.slice(size - LAST_CRUMB_COUNT, size);

		if (targetKey) {
			return [].concat(firstCrumb, { [targetKey]: omitText, }, lastCrumbs);
		} else {
			return [].concat(firstCrumb, omitText, lastCrumbs);
		}
	}
	_getCrumbs() {
		const { data, } = this.props;
		const isOverMaxLevel = data.length > MAX_CRUMB_COUNT;

		if (isOverMaxLevel) {
			return this._getLimitedCrumbs();
		}

		return data;
	}

	_renderCrumb(crumb, index, array) {
		const {
			separator,
			onClickUser,
			omitText,
			targetKey,
			isShowingCurrentCount,
		} = this.props;
		const isLastCrumb = index === array.length - 1;
		const crumbClass = `${PREFIX_CLASS}__crumb`;
		const crumbKey = `crumb-${index}`;
		const content = crumb[targetKey] ? crumb[targetKey] : crumb;
		const separatorElement = (
			<span className={`${PREFIX_CLASS}__separator`}>
				{separator}
			</span>
		);

		if (content === omitText) {
			return (
				<Fragment key={crumbKey}>
					<span className={`${crumbClass} ${crumbClass}--omit`}>
						{content}
					</span>
					{separatorElement}
				</Fragment>
			);
		} else if (isLastCrumb) {
			const total = this.props.data.length;

			return (
				<Fragment key={crumbKey}>
					<span className={crumbClass}>
						{content}
					</span>
					{isShowingCurrentCount ? <span className={`${PREFIX_CLASS}__current-count`}>{`(第${total}层)`}</span> : null}
				</Fragment>
			);
		}

		return (
			<Fragment key={crumbKey}>
				<span
					className={`${crumbClass} ${crumbClass}--active`}
					onClick={() => onClickUser(crumb)}
				>
					{content}
				</span>
				{separatorElement}
			</Fragment>
		);
	}

	render() {
		const { className, } = this.props;
		const crumbs = this._getCrumbs();

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				{crumbs.map(this._renderCrumb)}
			</div>
		);
	}
}

UserBreadcrumb.propTypes = propTypes;
UserBreadcrumb.defaultProps = defaultProps;

export default UserBreadcrumb;
