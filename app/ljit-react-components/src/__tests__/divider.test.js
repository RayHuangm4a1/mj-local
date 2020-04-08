import React from 'react';
import { shallow, mount, } from 'enzyme';
import Divider from '../components/divider';

jest.mock('antd/lib/divider',  () => function mockComponent() {
	return <div />;
});

const { OrientationEnums, DirectionTypeEnums, } = Divider;

describe('Divider', () => {
	it('should handle default props', () => {
		const {
			className,
			children,
			isDashed,
			orientation,
			style,
			type,
		} = Divider.defaultProps;

		expect(className).toEqual('');
		expect(children).toEqual('');
		expect(isDashed).toEqual(false);
		expect(orientation).toEqual(OrientationEnums.CENTER);
		expect(style).toEqual({});
		expect(type).toEqual(DirectionTypeEnums.HORIZONTAL);
	});

	it('should render correctly', () => {
		const props = {
			className: 'snapshot-class',
			children: 'snapshot-title',
			isDashed: false,
			orientation: OrientationEnums.CENTER,
			style: {},
			type: DirectionTypeEnums.HORIZONTAL,
		};
		const wrapper = shallow(<Divider {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-divider', () => {
		const className = 'ljit-divider';
		const wrapper = shallow(<Divider className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Divider className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const props = {
			className: 'mount-class',
			children: 'mount-title',
			isDashed: false,
			style: {},
			orientation: OrientationEnums.CENTER,
			type: DirectionTypeEnums.HORIZONTAL,

		};
		const wrapper = mount(
			<Divider {...props} />
		);

		expect(wrapper.props().className).toBe(props.className);
		expect(wrapper.props().children).toBe(props.children);
		expect(wrapper.props().isDashed).toEqual(props.isDashed);
		expect(wrapper.props().orientation).toBe(props.orientation);
		expect(wrapper.props().style).toMatchObject(props.style);
		expect(wrapper.props().type).toBe(props.type);
	});

	describe('Orientation Enums', () => {
		it('should contain LEFT property', () => {
			const typeName = 'left';
			const formatType = 'LEFT';

			expect(OrientationEnums[formatType]).toBe(typeName);
		});

		it('should container RIGHT property', () => {
			const typeName = 'right';
			const formatType = 'RIGHT';

			expect(OrientationEnums[formatType]).toBe(typeName);
		});

		it('should container CENTER property', () => {
			const typeName = 'center';
			const formatType = 'CENTER';

			expect(OrientationEnums[formatType]).toBe(typeName);
		});
	});

	describe('DirectionType Enums', () => {
		it('should contain HORIZONTAL property', () => {
			const typeName = 'horizontal';
			const formatType = 'HORIZONTAL';

			expect(DirectionTypeEnums[formatType]).toBe(typeName);
		});

		it('should container VERTICAL property', () => {
			const typeName = 'vertical';
			const formatType = 'VERTICAL';

			expect(DirectionTypeEnums[formatType]).toBe(typeName);
		});
	});
});