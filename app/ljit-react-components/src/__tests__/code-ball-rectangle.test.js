
import React from 'react';
import { shallow, mount, } from 'enzyme';
import Rectangle from '../components/code-ball/rectangle';

const {
	SizeEnum,
	FontSizeEnum,
	StatusTypeEnum,
	BorderRadiusEnum,
} = Rectangle;

describe('CodeBall Rectangle', () => {
	it('should handle default props', () => {
		const {
			size,
			fontSize,
		} = Rectangle.defaultProps;

		expect(size).toEqual(SizeEnum.MIDDLE);
		expect(fontSize).toEqual(FontSizeEnum.MIDDLE);
	});

	it('should render correctly', () => {
		const wrapper = shallow(<Rectangle text='总和小'/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class "ljit-code-ball--rectangle"', () => {
		const wrapper = shallow(<Rectangle text='总和小'/>);

		expect(wrapper.hasClass('ljit-code-ball--rectangle')).toEqual(true);
	});

	it('should be selectable by class "ljit-code-ball--selected"', () => {
		const wrapper = shallow(<Rectangle text='1' type={StatusTypeEnum.SELECTED}/>);

		expect(wrapper.hasClass('ljit-code-ball--selected')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Rectangle text='总和小' className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const text = '总和小';
		const className = 'mock-class';
		const size = SizeEnum.SMALL;
		const fontSize = FontSizeEnum.SMALL;
		const borderRadius = BorderRadiusEnum.WITH_4;
		const type = StatusTypeEnum.PRIMARY;

		const wrapper = mount(
			<Rectangle
				text={text}
				className={className}
				size={size}
				fontSize={fontSize}
				borderRadius={borderRadius}
				type={type}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().fontSize).toEqual(fontSize);
		expect(wrapper.props().borderRadius).toEqual(borderRadius);
		expect(wrapper.props().type).toEqual(type);
	});
});

describe('Rectangle SizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(Rectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Rectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Rectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Rectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(Rectangle.SizeEnum[formatType]).toEqual(typeName);
	});
});

describe('Rectangle FontSizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(Rectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Rectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Rectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Rectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(Rectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});
});

describe('Rectangle StatusTypeEnum', () => {
	it('should contains PRIMARY property', () => {
		const typeName = 'primary';
		const formatType = 'PRIMARY';

		expect(Rectangle.StatusTypeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SELECTED property', () => {
		const typeName = 'selected';
		const formatType = 'SELECTED';

		expect(Rectangle.StatusTypeEnum[formatType]).toEqual(typeName);
	});

	it('should contains DISABLED property', () => {
		const typeName = 'disabled';
		const formatType = 'DISABLED';

		expect(Rectangle.StatusTypeEnum[formatType]).toEqual(typeName);
	});
});

describe('Rectangle BorderRadiusEnum', () => {
	it('should contains WITH_4 property', () => {
		const typeName = 'with-4';
		const formatType = 'WITH_4';

		expect(Rectangle.BorderRadiusEnum[formatType]).toEqual(typeName);
	});

	it('should contains WITH_12 property', () => {
		const typeName = 'with-12';
		const formatType = 'WITH_12';

		expect(Rectangle.BorderRadiusEnum[formatType]).toEqual(typeName);
	});

	it('should contains WITH_16 property', () => {
		const typeName = 'with-16';
		const formatType = 'WITH_16';

		expect(Rectangle.BorderRadiusEnum[formatType]).toEqual(typeName);
	});
});