import React from 'react';
import { shallow, mount, } from 'enzyme';
import TextButton from '../components/text-button';

describe('TextButton', () => {
	it('handle default props', () => {
		const {
			color,
			disabled,
			onClick,
			fontSize,
			fontWeight,
		} = TextButton.defaultProps;

		expect(color).toEqual('default');
		expect(disabled).toEqual(false);
		expect(fontSize).toEqual('medium');
		expect(fontWeight).toEqual('normal');
		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const disabled = false;
		const className = 'mock-button';
		const text = 'mock-text';
		const fontSize = 'medium';
		const fontWeight = 'normal';
		const wrapper = shallow(
			<TextButton
				disabled={disabled}
				className={className}
				text={text}
				fontSize={fontSize}
				fontWeight={fontWeight}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-text-button', () => {
		const wrapper = shallow(<TextButton/>);

		expect(wrapper.hasClass('ljit-text-button')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const text ='mock-text';
		const wrapper = shallow(
			<TextButton
				className={className}
				text={text}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by ljit-text-button--default if props.color equal default ', () => {
		const wrapper = shallow(
			<TextButton color={'default'}/>);

		expect(wrapper.hasClass('ljit-text-button--default')).toEqual(true);
	});

	it('should be selectable by ljit-text-button--danger if props.color equal default ', () => {
		const wrapper = shallow(
			<TextButton color={'danger'}/>);

		expect(wrapper.hasClass('ljit-text-button--danger')).toEqual(true);
	});
	it('should be selectable by ljit-text-button--text-small if props.fontSize equal small ', () => {
		const wrapper = shallow(
			<TextButton fontSize={'small'}/>);

		expect(wrapper.hasClass('ljit-text-button--text-small')).toEqual(true);
	});
	it('should be selectable by ljit-text-button--text-medium if props.fontSize equal medium ', () => {
		const wrapper = shallow(
			<TextButton fontSize={'medium'}/>);

		expect(wrapper.hasClass('ljit-text-button--text-medium')).toEqual(true);
	});
	it('should be selectable by ljit-text-button--weight-normal if props.fontWeight equal normal ', () => {
		const wrapper = shallow(
			<TextButton fontWeight={'normal'}/>);

		expect(wrapper.hasClass('ljit-text-button--weight-normal')).toEqual(true);
	});
	it('should be selectable by ljit-text-button--weight-heavy if props.fontWeight equal heavy ', () => {
		const wrapper = shallow(
			<TextButton fontWeight={'heavy'}/>);

		expect(wrapper.hasClass('ljit-text-button--weight-heavy')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const disabled = false;
		const className = 'mock-class';
		const text ='mock-text';
		const color = 'default';
		const onClick = () => {};

		const wrapper = mount(
			<TextButton
				disabled={disabled}
				color={color}
				className={className}
				onClick={onClick}
				text={text}
			/>
		);

		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().color).toBe(color);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().onClick).toEqual(onClick);
		expect(wrapper.props().text).toBe(text);

	});

	it('should handle onclick event', () => {
		const onClick = jest.fn();
		const wrapper = shallow(<TextButton onClick={onClick} />);

		wrapper.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});
});

describe('TextButton SizeEnums ', () => {
	it('should contains SMALL property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(TextButton.SizeEnums[formatType]).toEqual(typeName);
	});

	it('should contains MEDIUM property', () => {
		const typeName = 'medium';
		const formatType = 'MEDIUM';

		expect(TextButton.SizeEnums[formatType]).toEqual(typeName);
	});
});
describe('TextButton WeightEnums ', () => {
	it('should contains NORMAL property', () => {
		const typeName = 'normal';
		const formatType = 'NORMAL';

		expect(TextButton.WeightEnums[formatType]).toEqual(typeName);
	});

	it('should contains HEAVY property', () => {
		const typeName = 'heavy';
		const formatType = 'HEAVY';

		expect(TextButton.WeightEnums[formatType]).toEqual(typeName);
	});
});
