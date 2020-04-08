import React from 'react';

const BadgeExampleCube = (props) => (
	<a
		{...props}
		style={{
			display: 'inline-block',
			verticalAlign: 'middle',
			width: 42,
			height: 42,
			borderRadius: 4,
			background: '#CCC',
		}}
	/>
);

export default BadgeExampleCube;
