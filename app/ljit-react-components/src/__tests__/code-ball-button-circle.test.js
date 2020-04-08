import React from 'react';
import { shallow, mount, } from 'enzyme';
import CodeBallButtonCircle from '../components/code-ball-button/circle';

const { SizeEnum, FontSizeEnum, } = CodeBallButtonCircle;

describe('CodeBallButton Circle', () => {
	it('should handle default props', () => {
		const {
			text,
			size,
			fontSize,
			isSelected,
			onChange,
		} = CodeBallButtonCircle.defaultProps;

		expect(text).toEqual('');
		expect(size).toEqual(SizeEnum.MIDDLE);
		expect(fontSize).toEqual(FontSizeEnum.MIDDLE);
		expect(isSelected).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<CodeBallButtonCircle
				text={'0'}
				fontSize={FontSizeEnum.MIDDLE}
				size={SizeEnum.MIDDLE}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by default class "ljit-code-ball-button--circle"', () => {
		const wrapper = shallow(
			<CodeBallButtonCircle
				text={'0'}
				fontSize={FontSizeEnum.MIDDLE}
				size={SizeEnum.MIDDLE}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass('ljit-code-ball-button--circle')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<CodeBallButtonCircle
				text={'0'}
				fontSize={FontSizeEnum.MIDDLE}
				size={SizeEnum.MIDDLE}
				onChange={() => {}}
				className={className}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const text= '0';
		const className = 'mock-class';
		const fontSize = FontSizeEnum.MIDDLE;
		const size = SizeEnum.MIDDLE;
		const isSelected = true;
		const onChange = () => {};
		const wrapper = mount(
			<CodeBallButtonCircle
				text={text}
				className={className}
				fontSize={fontSize}
				size={size}
				isSelected={isSelected}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().fontSize).toEqual(fontSize);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().isSelected).toEqual(isSelected);
		expect(wrapper.props().onChange).toEqual(onChange);
	});

	describe('handle click event', () => {
		it('should handle onChange when clicked', () => {
			const onChange = jest.fn();
			const wrapper = mount(<CodeBallButtonCircle onChange={onChange} />);

			wrapper.simulate('click');
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalled();
		});
	});
});

describe('Circle SizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(CodeBallButtonCircle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(CodeBallButtonCircle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(CodeBallButtonCircle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(CodeBallButtonCircle.SizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(CodeBallButtonCircle.SizeEnum[formatType]).toEqual(typeName);
	});
});

describe('CodeBallButtonCircle FontSizeEnum', () => {
	it('should contains EXTRA_LARGE property', () => {
		const typeName = 'extra-large';
		const formatType = 'EXTRA_LARGE';

		expect(CodeBallButtonCircle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains LARGE property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(CodeBallButtonCircle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains MIDDLE property', () => {
		const typeName = 'middle';
		const formatType = 'MIDDLE';

		expect(CodeBallButtonCircle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(CodeBallButtonCircle.FontSizeEnum[formatType]).toEqual(typeName);
	});

	it('should contains EXTRA_SMALL property', () => {
		const typeName = 'extra-small';
		const formatType = 'EXTRA_SMALL';

		expect(CodeBallButtonCircle.FontSizeEnum[formatType]).toEqual(typeName);
	});
});