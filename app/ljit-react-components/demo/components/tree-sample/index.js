import React from 'react';
import CustomTreeSample from './custom-tree-sample';
import SimpleTreeSample from './simple-tree-sample';
import ComponentBlock from '../../components/ComponentBlock';

function TreeSample() {
	return (
		<div>
			<ComponentBlock title="SimpleTreeSample">
				<SimpleTreeSample/>
			</ComponentBlock>
			<ComponentBlock title="CustomTreeSample">
				<CustomTreeSample/>
			</ComponentBlock>
		</div>
	);
}

export default TreeSample;

