import React from 'react';
import { shallow, mount, } from 'enzyme';
import Tag from '../components/tag';

jest.mock('antd/lib/tag');

const {
	ColorEnums,
	ShapeEnums,
	SizeEnum,
	FontSizeEnum,
	BorderRadiusEnum,
} = Tag;

describe('Tag', () => {
	it('handle default props', () => {
		const {
			shape,
			text,
			hasBorder,
			isClosable,
			onClose,
		} = Tag.defaultProps;

		expect(shape).toEqual(ShapeEnums.RECTANGLE);
		expect(text).toEqual('');
		expect(hasBorder).toEqual(false);
		expect(isClosable).toEqual(false);
		expect(onClose).toBeDefined();
		expect(onClose).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const text = 'mock-text';
		const color = ColorEnums.WARMORANGE900;
		const shape = ShapeEnums.CIRCLE;

		const wrapper = shallow(
			<Tag
				text={text}
				color={color}
				shape={shape}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-tag', () => {
		const wrapper = shallow(<Tag/>);

		expect(wrapper.hasClass('ljit-tag')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Tag className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by color: WARMORANGE500', () => {
		const color = ColorEnums.WARMORANGE500;
		const text = 'mock-text';
		const wrapper = shallow(
			<Tag
				text={text}
				color={color}
			/>
		);

		expect(wrapper.hasClass('ljit-tag-color--warmOrange500')).toEqual(true);
	});

	it('should be selectable by shape: CIRCLE', () => {
		const shape = ShapeEnums.CIRCLE;
		const text = 'mock-text';
		const wrapper = shallow(
			<Tag
				text={text}
				shape={shape}
			/>
		);

		expect(wrapper.hasClass('ljit-tag-shape--circle')).toEqual(true);
	});

	it('should be selectable by isWithOutline is true', () => {
		const text = 'mock-text';
		const wrapper = shallow(
			<Tag
				text={text}
				hasBorder={true}
			/>
		);

		expect(wrapper.hasClass('ljit-tag--border')).toEqual(true);
	});

	it('should be selectable by size: LARGE', () => {
		const size = SizeEnum.LARGE;
		const text = 'mock-text';
		const wrapper = shallow(
			<Tag
				text={text}
				size={size}
			/>
		);

		expect(wrapper.hasClass('ljit-tag-size--large')).toEqual(true);
	});

	it('should be selectable by fontSize: LARGE', () => {
		const fontSize = FontSizeEnum.LARGE;
		const text = 'mock-text';
		const wrapper = shallow(
			<Tag
				text={text}
				fontSize={fontSize}
			/>
		);

		expect(wrapper.hasClass('ljit-tag-font-size--large')).toEqual(true);
	});

	it('should be selectable by borderRadius: WITH_12', () => {
		const borderRadius = BorderRadiusEnum.WITH_12;
		const text = 'mock-text';
		const wrapper = shallow(
			<Tag
				text={text}
				borderRadius={borderRadius}
			/>
		);

		expect(wrapper.hasClass('ljit-tag-border-radius--with-12')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const text = 'mock-text';
		const color = ColorEnums.WARMORANGE500;
		const shape = ShapeEnums.CIRCLE;
		const hasBorder = false;
		const isClosable = false;
		const size = SizeEnum.MIDDLE;
		const fontSize = FontSizeEnum.MIDDLE;
		const borderRadius = BorderRadiusEnum.WITH_12;
		const onClose = () => {};

		const wrapper = mount(
			<Tag
				className={className}
				text={text}
				color={color}
				shape={shape}
				hasBorder={hasBorder}
				isClosable={isClosable}
				size={size}
				fontSize={fontSize}
				borderRadius={borderRadius}
				onClose={onClose}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().color).toBe(color);
		expect(wrapper.props().shape).toBe(shape);
		expect(wrapper.props().hasBorder).toEqual(hasBorder);
		expect(wrapper.props().isClosable).toEqual(isClosable);
		expect(wrapper.props().size).toBe(size);
		expect(wrapper.props().fontSize).toBe(fontSize);
		expect(wrapper.props().borderRadius).toBe(borderRadius);
		expect(wrapper.props().onClose).toEqual(onClose);
	});
});

describe('Tag ColorEnums', () => {
	it('should contains WARMORANGE500 property', () => {
		const typeName = 'warmOrange500';
		const formatType = 'WARMORANGE500';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains WARMORANGE700 property', () => {
		const typeName = 'warmOrange700';
		const formatType = 'WARMORANGE700';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains WARMORANGE900 property', () => {
		const typeName = 'warmOrange900';
		const formatType = 'WARMORANGE900';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains GRADIENT_ORANGE property', () => {
		const typeName = 'gradient-orange';
		const formatType = 'GRADIENT_ORANGE';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains ORANGE_RED property', () => {
		const typeName = 'orange-red';
		const formatType = 'ORANGE_RED';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains LIGHTGREY property', () => {
		const typeName = 'light-grey';
		const formatType = 'LIGHTGREY';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains BLACK property', () => {
		const typeName = 'black';
		const formatType = 'BLACK';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains WHITE property', () => {
		const typeName = 'white';
		const formatType = 'WHITE';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains GREEN property', () => {
		const typeName = 'green';
		const formatType = 'GREEN';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains RED property', () => {
		const typeName = 'red';
		const formatType = 'RED';

		expect(Tag.ColorEnums[formatType]).toEqual(typeName);
	});
});

describe('Tag ShapeEnums', () => {
	it('should contains RECTANGLE property', () => {
		const typeName = 'rectangle';
		const formatType = 'RECTANGLE';

		expect(Tag.ShapeEnums[formatType]).toEqual(typeName);
	});

	it('should contains CIRCLE property', () => {
		const typeName = 'circle';
		const formatType = 'CIRCLE';

		expect(Tag.ShapeEnums[formatType]).toEqual(typeName);
	});

	it('should contains ROUND property', () => {
		const typeName = 'round';
		const formatType = 'ROUND';

		expect(Tag.ShapeEnums[formatType]).toEqual(typeName);
	});
});

describe('Tag SizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(Tag.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Tag.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Tag.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Tag.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(Tag.SizeEnum[formatType]).toEqual(typeName);
	});
});

describe('Tag FontSizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(Tag.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Tag.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(Tag.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Tag.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(Tag.FontSizeEnum[formatType]).toEqual(typeName);
	});
});

describe('Tag BorderRadiusEnum', () => {
	it('should contains WITH_4 property', () => {
		const typeName = 'with-4';
		const formatType = 'WITH_4';

		expect(Tag.BorderRadiusEnum[formatType]).toEqual(typeName);
	});

	it('should contains WITH_12 property', () => {
		const typeName = 'with-12';
		const formatType = 'WITH_12';

		expect(Tag.BorderRadiusEnum[formatType]).toEqual(typeName);
	});

	it('should contains WITH_16 property', () => {
		const typeName = 'with-16';
		const formatType = 'WITH_16';

		expect(Tag.BorderRadiusEnum[formatType]).toEqual(typeName);
	});
});