import React from 'react';
import { shallow, mount, } from 'enzyme';
import CodeBallButtonAnimal from '../components/code-ball-button/animal';

const { SizeEnums, } = CodeBallButtonAnimal;

describe('CodeBallButton Animal', () => {
	it('should handle default props', () => {
		const {
			text,
			size,
			isSelected,
			onChange,
		} = CodeBallButtonAnimal.defaultProps;

		expect(text).toEqual('');
		expect(size).toEqual(SizeEnums.BIG_32);
		expect(isSelected).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<CodeBallButtonAnimal
				text={'0'}
				size={SizeEnums.BIG_32}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by default class "ljit-code-ball-button--animal"', () => {
		const wrapper = shallow(
			<CodeBallButtonAnimal
				text={'0'}
				size={SizeEnums.BIG_32}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass('ljit-code-ball-button--animal')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<CodeBallButtonAnimal
				className={className}
				text={'0'}
				size={SizeEnums.BIG_32}
				isSelected={false}
				onChange={() => {}}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const style = { fontSize: '30px', };
		const text = '0';
		const size = SizeEnums.BIG_32;
		const isSelected = false;
		const onChange = () => {};
		const wrapper = mount(
			<CodeBallButtonAnimal
				text={text}
				className={className}
				style={style}
				size={size}
				isSelected={isSelected}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().text).toEqual(text);
		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().isSelected).toEqual(isSelected);
		expect(wrapper.props().onChange).toEqual(onChange);
	});

	describe('handle click event', () => {
		it('should handle onChange when clicked', () => {
			const onChange = jest.fn();
			const wrapper = mount(<CodeBallButtonAnimal onChange={onChange} />);

			wrapper.simulate('click');
			expect(onChange).toHaveBeenCalledTimes(1);
			expect(onChange).toHaveBeenCalled();
		});
	});
});
