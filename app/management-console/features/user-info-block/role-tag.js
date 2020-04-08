import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { UserTypeEnum, } from '../../lib/enums';

const PREFIX_CLASS = 'role-tag';
const {
	ZHAOSHANG,
	MEMBER,
	AGENT,
} = UserTypeEnum;

const RoleNameMap = {
	[ZHAOSHANG]: '招商',
	[MEMBER]: '会员',
	[AGENT]: '代理',
};

const propTypes = {
	role: PropTypes.oneOf([
		ZHAOSHANG,
		MEMBER,
		AGENT,
	]),
	className: PropTypes.string,
};
const defaultProps = {
	role: MEMBER,
	className: '',
};

const RoleTag = ({ role, className, }) => (
	<div
		className={cx(PREFIX_CLASS, {
			[`${PREFIX_CLASS}--zhaoshang`]: role === ZHAOSHANG,
			[`${PREFIX_CLASS}--member`]: role === MEMBER,
			[`${PREFIX_CLASS}--agent`]: role === AGENT,
		}, className)}
	>
		{RoleNameMap[role]}
	</div>
);

RoleTag.propTypes = propTypes;
RoleTag.defaultProps = defaultProps;

export default RoleTag;
