import React from 'react';
import { Steps as AntdSteps, } from 'antd';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

const propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	icon: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

function Step(props) {
	//antd need additional props itself
	const childProps = omit(props, ['title', 'description', 'icon', ]);

	return (
		<AntdSteps.Step
			title={childProps.title}
			description={childProps.description}
			icon={childProps.icon}
			{...props}
		/>
	);
}

Step.propTypes = propTypes;

export default Step;
