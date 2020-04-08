import React from 'react';
import { shallow, mount, } from 'enzyme';
import CodeBallButtonRectangle from '../components/code-ball-button/rectangle';

const {
	SizeEnum,
	FontSizeEnum,
	BorderRadiusEnum,
} = CodeBallButtonRectangle;

describe('CodeBallButton Rectangle', () => {
	it('should handle default props', () => {
		const {
			text,
			size,
			fontSize,
			isSelected,
			onChange,
		} = CodeBallButtonRectangle.defaultProps;

		expect(text).toEqual('');
		expect(size).toEqual(SizeEnum.MIDDLE);
		expect(fontSize).toEqual(FontSizeEnum.MIDDLE);
		expect(isSelected).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<CodeBallButtonRectangle
				text={'0'}
				fontSize={FontSizeEnum.MIDDLE}
				size={SizeEnum.MIDDLE}
				borderRadius={BorderRadiusEnum.WITH_12}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by default class "ljit-code-ball-button--rectangle"', () => {
		const wrapper = shallow(
			<CodeBallButtonRectangle
				text={'0'}
				fontSize={FontSizeEnum.MIDDLE}
				size={SizeEnum.MIDDLE}
				borderRadius={BorderRadiusEnum.WITH_12}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass('ljit-code-ball-button--rectangle')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<CodeBallButtonRectangle
				className={className}
				text={'0'}
				fontSize={FontSizeEnum.MIDDLE}
				size={SizeEnum.MIDDLE}
				borderRadius={BorderRadiusEnum.WITH_12}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const text = '0';
		const size = SizeEnum.MIDDLE;
		const fontSize = FontSizeEnum.MIDDLE;
		const borderRadius = BorderRadiusEnum.WITH_12;
		const isSelected = false;
		const onChange = () => {};
		const wrapper = mount(
			<CodeBallButtonRectangle
				text={text}
				className={className}
				size={size}
				fontSize={fontSize}
				borderRadius={borderRadius}
				isSelected={isSelected}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().fontSize).toEqual(fontSize);
		expect(wrapper.props().borderRadius).toEqual(borderRadius);
		expect(wrapper.props().isSelected).toEqual(isSelected);
		expect(wrapper.props().onChange).toEqual(onChange);
	});

	describe('handle click event', () => {
		it('should handle onChange when clicked', () => {
			const onChange = jest.fn();
			const wrapper = mount(<CodeBallButtonRectangle onChange={onChange} />);

			wrapper.simulate('click');
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalled();
		});
	});
});

describe('CodeBallButtonRectangle SizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(CodeBallButtonRectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(CodeBallButtonRectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(CodeBallButtonRectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(CodeBallButtonRectangle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(CodeBallButtonRectangle.SizeEnum[formatType]).toEqual(typeName);
	});
});

describe('CodeBallButtonRectangle FontSizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(CodeBallButtonRectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(CodeBallButtonRectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(CodeBallButtonRectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(CodeBallButtonRectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(CodeBallButtonRectangle.FontSizeEnum[formatType]).toEqual(typeName);
	});
});

describe('CodeBallButtonRectangle BorderRadiusEnum', () => {
	it('should contains WITH_4 property', () => {
		const typeName = 'with-4';
		const formatType = 'WITH_4';

		expect(CodeBallButtonRectangle.BorderRadiusEnum[formatType]).toEqual(typeName);
	});

	it('should contains WITH_12 property', () => {
		const typeName = 'with-12';
		const formatType = 'WITH_12';

		expect(CodeBallButtonRectangle.BorderRadiusEnum[formatType]).toEqual(typeName);
	});

	it('should contains WITH_16 property', () => {
		const typeName = 'with-16';
		const formatType = 'WITH_16';

		expect(CodeBallButtonRectangle.BorderRadiusEnum[formatType]).toEqual(typeName);
	});
});