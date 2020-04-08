import React from 'react';
import { shallow, mount, } from 'enzyme';
import Animal from '../components/code-ball/animal';

const { SizeEnums, } = Animal;

describe('CodeBall Animal', () => {
	it('should handle default props', () => {
		const { size, } = Animal.defaultProps;

		expect(size).toEqual(SizeEnums.MEDIUM_25);
	});

	it('should render correctly', () => {
		const wrapper = shallow(<Animal text='0'/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class "ljit-code-ball--animal"', () => {
		const wrapper = shallow(<Animal text='0'/>);

		expect(wrapper.hasClass('ljit-code-ball--animal')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Animal text='0' className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const size = SizeEnums.MEDIUM_25;
		const text = '0';
		const className = 'mock-class';
		const style = { fontSize: '14px', };
		const wrapper = mount(
			<Animal
				size={size}
				text={text}
				className={className}
				style={style}
			/>
		);

		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().style).toMatchObject(style);
	});
});

describe('Size Enums', () => {
	it('should contain DEFAULT_12 property', () => {
		const typeName = 12;
		const formatType = 'DEFAULT_12';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contain SMALL_14 property', () => {
		const typeName = 14;
		const formatType = 'SMALL_14';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contain SMALL_20 property', () => {
		const typeName = 20;
		const formatType = 'SMALL_20';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contain MEDIUM_22 property', () => {
		const typeName = 22;
		const formatType = 'MEDIUM_22';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contain MEDIUM_24 property', () => {
		const typeName = 24;
		const formatType = 'MEDIUM_24';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contain MEDIUM_25 property', () => {
		const typeName = 25;
		const formatType = 'MEDIUM_25';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contain BIG_32 property', () => {
		const typeName = 32;
		const formatType = 'BIG_32';

		expect(SizeEnums[formatType]).toEqual(typeName);
	});
});
