import React from 'react';
import Collapse from '../../../src/components/collapse';
import Icon from '../../../src/components/icon';
import './style.styl';

function CollapseSample() {
	const _renderContent = () => {
		return (
			<div className="ljit-collapse-sample__content">
				text content
			</div>
		);
	};
	const panelsData = [
		{
			header: 'normal',
			key: 1,
			content: _renderContent(),
		},
		{
			header: 'disabled',
			key: 2,
			content: _renderContent(),
			isDisabled: true,
		},
		{
			header: 'with extra',
			key: 3,
			content: _renderContent(),
			extra: (
				<div>
					<Icon type={Icon.IconTypeEnums.MEMBER}/>
					this is extra
				</div>
			),
		},
		{
			header: 'showArrow false',
			key: 4,
			content: _renderContent(),
			isShowArrow: false,
		},
	];

	return (
		<div className="ljit-collapse-sample">
			<Collapse
				defaultActiveKey={1}
				panelsData={panelsData}
				isIconPositionRight={false}
				isAccordion={true}
				isBordered={true}
				onChange={(activeKey) => console.log(activeKey)}
			/>
			<Collapse
				className="ljit-collapse-sample__custom"
				defaultActiveKey={1}
				panelsData={panelsData}
				onChange={(activeKey) => console.log(activeKey)}
			/>
		</div>
	);
}

export default CollapseSample;
