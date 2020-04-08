import React from 'react';
import { shallow, mount, } from 'enzyme';
import IconButton from '../components/icon-button';

const { IconTypeEnums, ColorEnums, SizeEnums, } = IconButton;

jest.mock('antd/lib/icon', () => function mockComponent() {
	return <div />;
});
jest.mock('antd/lib/button', () => function mockComponent() {
	return <div />;
});

describe('IconButton', () => {
	it('should handle default props', () => {
		const {
			type,
			disabled,
			onClick,
		} = IconButton.defaultProps;

		expect(type).toEqual(IconTypeEnums.LEFT);
		expect(disabled).toEqual(false);
		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<IconButton
				onClick={() => {}}
				className="mock-class"
				disabled={false}
				type={IconTypeEnums.LEFT}
				color={ColorEnums.PRIVATE}
				size={SizeEnums.LARGE}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by ljit-icon-button class', () => {
		const wrapper = shallow(
			<IconButton
				onClick={() => {}}
				disabled={false}
				type={IconTypeEnums.LEFT}
				color={ColorEnums.PRIVATE}
				size={SizeEnums.LARGE}
			/>
		);

		expect(wrapper.hasClass('ljit-icon-button')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<IconButton
				className={className}
				onClick={() => {}}
				disabled={false}
				type={IconTypeEnums.LEFT}
				color={ColorEnums.PRIVATE}
				size={SizeEnums.LARGE}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const style = { width: '100px', };
		const disabled = false;
		const type = IconTypeEnums.LEFT;
		const color = ColorEnums.PRIVATE;
		const size = SizeEnums.LARGE;
		const onClick = () => {};
		const wrapper = mount(
			<IconButton
				className={className}
				style={style}
				disabled={disabled}
				onClick={onClick}
				type={type}
				color={color}
				size={size}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().style).toEqual(style);
		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().type).toEqual(type);
		expect(wrapper.props().color).toEqual(color);
		expect(wrapper.props().size).toEqual(size);
		expect(wrapper.props().onClick).toEqual(onClick);
	});

	it('should handle onclick event', () => {
		const onClick = jest.fn();
		const wrapper = shallow(
			<IconButton onClick={onClick}>Button</IconButton>
		);

		wrapper.simulate('click');

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});

	it('should be disabled when pass true', () => {
		const disabled = true;
		const wrapper = mount(
			<IconButton disabled={disabled}>Button</IconButton>
		);

		expect(wrapper.props().disabled).toEqual(true);
	});
});
