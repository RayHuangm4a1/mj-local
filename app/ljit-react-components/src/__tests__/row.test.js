import React from 'react';
import { shallow, mount, } from 'enzyme';
import Row from '../components/row';

describe('Row', () => {
	it('should renders correctly', () => {
		const wrapper = shallow(<Row/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-row', () => {
		const wrapper = shallow(<Row/>);

		expect(wrapper.hasClass('ljit-row')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Row className={className}>mock text</Row>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const type = 'flex';
		const flexLayout = 'center';
		const align = 'top';
		const gutter = 8;
		const className = 'mock-class';
		const children = 'mock-children';

		const wrapper = mount(
			<Row
				align={align}
				gutter={gutter}
				flexLayout={flexLayout}
				type={type}
				className={className}
			>
				{children}
			</Row>
		);

		expect(wrapper.props().type).toBe(type);
		expect(wrapper.props().flexLayout).toBe(flexLayout);
		expect(wrapper.props().align).toBe(align);
		expect(wrapper.props().gutter).toBe(gutter);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().children).toBe(children);

	});
});

describe('Row AlignEnums ', () => {
	it('should contains top property', () => {
		const typeName = 'top';
		const formatType = 'TOP';

		expect(Row.AlignEnums[formatType]).toEqual(typeName);
	});

	it('should contains middle property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Row.AlignEnums[formatType]).toEqual(typeName);
	});

	it('should contains bottom property', () => {
		const typeName = 'bottom';
		const formatType = 'BOTTOM';

		expect(Row.AlignEnums[formatType]).toEqual(typeName);
	});
});

describe('Row FlexJustifyEnums ', () => {
	it('should contains start property', () => {
		const typeName = 'start';
		const formatType = 'START';

		expect(Row.FlexJustifyEnums[formatType]).toEqual(typeName);
	});

	it('should contains start property', () => {
		const typeName = 'start';
		const formatType = 'START';

		expect(Row.FlexJustifyEnums[formatType]).toEqual(typeName);
	});

	it('should contains end property', () => {
		const typeName = 'end';
		const formatType = 'END';

		expect(Row.FlexJustifyEnums[formatType]).toEqual(typeName);
	});

	it('should contains center property', () => {
		const typeName = 'center';
		const formatType = 'CENTER';

		expect(Row.FlexJustifyEnums[formatType]).toEqual(typeName);
	});

	it('should contains space-around property', () => {
		const typeName = 'space-around';
		const formatType = 'SPACE_AROUND';

		expect(Row.FlexJustifyEnums[formatType]).toEqual(typeName);
	});

	it('should contains space-between property', () => {
		const typeName = 'space-between';
		const formatType = 'SPACE_BETWEEN';

		expect(Row.FlexJustifyEnums[formatType]).toEqual(typeName);
	});
});

describe('Row TypeEnums ', () => {
	it('should contains flex property', () => {
		const typeName = 'flex';
		const formatType = 'FLEX';

		expect(Row.TypeEnums[formatType]).toEqual(typeName);
	});
});
