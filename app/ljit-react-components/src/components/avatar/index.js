import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Avatar as AntdAvatar, } from 'antd';
import Icon from '../icon';

const SizeEnums = {
	SMALL: 'small',
	DEFAULT: 'default',
};

const { SMALL, DEFAULT, } = SizeEnums;

const propTypes = {
	icon: PropTypes.string,
	style: PropTypes.object,
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.oneOf([SMALL, DEFAULT,]),
	]),
	src: PropTypes.string,
	alt: PropTypes.string,
	text: PropTypes.string,
	onError: PropTypes.func,
};
const defaultProps = {
};

class Avatar extends Component {
	render() {
		const { icon, style, size, src, alt, text, onError, } = this.props;
		const content = icon ? <Icon type={icon}></Icon> : text ;

		return (
			<AntdAvatar
				style={style}
				size={size}
				src={src}
				alt={alt}
				onError={onError}
			>
				{content}
			</AntdAvatar>
		);
	}
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
Avatar.SizeEnums = SizeEnums;

export default Avatar;
