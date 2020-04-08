import React from 'react';
import { shallow, mount, } from 'enzyme';
import Circle from '../components/code-ball/circle';

const {
	SizeEnum,
	FontSizeEnum,
	StatusTypeEnum,
} = Circle;

describe('CodeBall Circle', () => {
	it('should handle default props', () => {
		const {
			size,
			fontSize,
			type,
		} = Circle.defaultProps;

		expect(size).toEqual(SizeEnum.MIDDLE);
		expect(fontSize).toEqual(FontSizeEnum.MIDDLE);
		expect(type).toEqual(StatusTypeEnum.PRIMARY);
	});

	it('should render correctly', () => {
		const wrapper = shallow(<Circle text='1'/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class "ljit-code-ball--circle"', () => {
		const wrapper = shallow(<Circle text='1'/>);

		expect(wrapper.hasClass('ljit-code-ball--circle')).toEqual(true);
	});

	it('should be selectable by class "ljit-code-ball--selected"', () => {
		const wrapper = shallow(<Circle text='1' type={StatusTypeEnum.SELECTED}/>);

		expect(wrapper.hasClass('ljit-code-ball--selected')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Circle text='1' className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const text = '1';
		const className = 'mock-class';
		const size = SizeEnum.LARGE;
		const fontSize = FontSizeEnum.LARGE;
		const type = StatusTypeEnum.PRIMARY;

		const wrapper = mount(
			<Circle
				text={text}
				className={className}
				size={size}
				fontSize={fontSize}
				type={type}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().fontSize).toEqual(fontSize);
		expect(wrapper.props().type).toEqual(type);
	});
});

describe('Circle SizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(Circle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Circle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Circle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Circle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(Circle.SizeEnum[formatType]).toEqual(typeName);
	});
});

describe('Circle FontSizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(Circle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Circle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Circle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Circle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(Circle.FontSizeEnum[formatType]).toEqual(typeName);
	});
});

describe('Circle StatusTypeEnum', () => {
	it('should contains PRIMARY property', () => {
		const typeName = 'primary';
		const formatType = 'PRIMARY';

		expect(Circle.StatusTypeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SELECTED property', () => {
		const typeName = 'selected';
		const formatType = 'SELECTED';

		expect(Circle.StatusTypeEnum[formatType]).toEqual(typeName);
	});

	it('should contains DISABLED property', () => {
		const typeName = 'disabled';
		const formatType = 'DISABLED';

		expect(Circle.StatusTypeEnum[formatType]).toEqual(typeName);
	});
});
