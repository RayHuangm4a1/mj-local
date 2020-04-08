import React from 'react';
import { shallow, mount, } from 'enzyme';
import InputGroup from '../components/input-group';

jest.mock('antd/lib/input/Group', () => function mockComponent() {
	return <div />;
});

const { InputSizeEnums, } = InputGroup;

describe('InputGroup', () => {
	it('should handle default props', () => {
		const {
			isCompact,
			size,
			className,
			style,
		} = InputGroup.defaultProps;

		expect(isCompact).toEqual(false);
		expect(size).toEqual(InputSizeEnums.DEFAULT);
		expect(className).toEqual('');
		expect(style).toEqual({});
	});

	it('should render correctly', () => {
		const props = {
			isCompact: true,
			size: InputSizeEnums.DEFAULT,
			className: 'snapshot-class',
			style: {},
		};
		const wrapper = shallow(<InputGroup {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-input-group', () => {
		const wrapper = shallow(<InputGroup />);

		expect(wrapper.hasClass('ljit-input-group')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<InputGroup className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by size: DEFAULT', () => {
		const size = InputSizeEnums.DEFAULT;
		const wrapper = shallow(<InputGroup size={size} />);

		expect(wrapper.hasClass('ljit-input-group-size--default')).toEqual(true);
	});

	it('should be selectable by class ljit-input-group-compact when isCompact equals true', () => {
		const isCompact = true;
		const wrapper = shallow(<InputGroup isCompact={isCompact} />);

		expect(wrapper.hasClass('ljit-input-group-compact')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const inputNode = (
			<React.Fragment>
				<input placeholder="mount-placeholder-1"/>
				<input placeholder="mount-placeholder-2"/>
			</React.Fragment>
		);
		const props = {
			isCompact: true,
			size: InputSizeEnums.LARGE,
			className: 'mount-class',
			style: { width: '264px', },
			children: inputNode,
		};
		const wrapper = mount(<InputGroup {...props} />);

		expect(wrapper.props().isCompact).toBe(props.isCompact);
		expect(wrapper.props().size).toBe(props.size);
		expect(wrapper.props().className).toBe(props.className);
		expect(wrapper.props().style).toBe(props.style);
		expect(wrapper.props().children).toBe(props.children);
	});

	describe('InputSize Enums', () => {
		it('should contain DEFAULT property', () => {
			const typeName = 'default';
			const formatType = 'DEFAULT';

			expect(InputSizeEnums[formatType]).toEqual(typeName);
		});

		it('should contain LARGE property', () => {
			const typeName = 'large';
			const formatType = 'LARGE';

			expect(InputSizeEnums[formatType]).toEqual(typeName);
		});

		it('should contain SMALL property', () => {
			const typeName = 'small';
			const formatType = 'SMALL';

			expect(InputSizeEnums[formatType]).toEqual(typeName);
		});
	});
});