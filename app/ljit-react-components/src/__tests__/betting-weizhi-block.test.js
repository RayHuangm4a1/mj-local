import React from 'react';
import { shallow, mount, } from 'enzyme';
import BettingWeizhiBlock from '../components/betting-weizhi-block';

const { SOLID, HOLLOW, } = BettingWeizhiBlock.CheckboxStyleEnum;

describe('Betting weizhi block', () => {
	it('handle default props', () => {
		const {
			options,
			description,
			onPressCheckbox,
			checkboxStyle,
		} = BettingWeizhiBlock.defaultProps;

		expect(options).toMatchObject([]);
		expect(description).toBe('');
		expect(checkboxStyle).toBe(SOLID);
		expect(onPressCheckbox).toBeDefined();
		expect(onPressCheckbox).toBeInstanceOf(Function);

	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<BettingWeizhiBlock
				className="mock-class-name"
				options={[
					{
						name: '萬',
						isSelected: true,
					},
					{
						name: '千',
						isSelected: false,
					},
					{
						name: '百',
						isSelected: false,
					},
					{
						name: '十',
						isSelected: false,
					},
					{
						name: '個',
						isSelected: false,
					},
				]}
				description="您选择了 2 个位置，系统自动根据位置组合成 1 个方案。"
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-betting-weizhi-block', () => {
		const wrapper = shallow(<BettingWeizhiBlock/>);

		expect(wrapper.hasClass('ljit-betting-weizhi-block')).toEqual(true);
	});

	it('should be selectable by class ljit-betting-weizhi-block--solid', () => {
		const wrapper = shallow(<BettingWeizhiBlock/>);

		expect(wrapper.hasClass('ljit-betting-weizhi-block--solid')).toEqual(true);
	});

	it('should be selectable by class ljit-betting-weizhi-block--hollow', () => {
		const wrapper = shallow(<BettingWeizhiBlock checkboxStyle={HOLLOW}/>);

		expect(wrapper.hasClass('ljit-betting-weizhi-block--hollow')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<BettingWeizhiBlock className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});
	it('should handle onPressCheckbox event', () => {
		const onPressCheckbox = jest.fn();
		const wrapper = mount(
			<BettingWeizhiBlock
				onPressCheckbox={onPressCheckbox}
			/>
		);

		wrapper.props().onPressCheckbox();
		expect(onPressCheckbox).toHaveBeenCalledTimes(1);
		expect(onPressCheckbox).toHaveBeenCalled();
	});

	it('should mount in a full DOM', () => {
		const options = [
			{
				name: '萬',
				isSelected: true,
			},
			{
				name: '千',
				isSelected: false,
			},
			{
				name: '百',
				isSelected: false,
			},
			{
				name: '十',
				isSelected: false,
			},
			{
				name: '個',
				isSelected: false,
			},
		];
		const className = 'mock-class';
		const description = '您选择了 2 个位置，系统自动根据位置组合成 1 个方案。';
		const onPressCheckbox = () => {};
		const wrapper = mount(
			<BettingWeizhiBlock
				options={options}
				className={className}
				description={description}
				onPressCheckbox={onPressCheckbox}
			/>
		);

		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().options).toMatchObject(options);
		expect(wrapper.props().description).toEqual(description);
		expect(wrapper.props().onPressCheckbox).toEqual(onPressCheckbox);
	});
});

describe('Betting weizhi block CheckboxStyleEnum ', () => {
	it('should contains solid property', () => {
		const typeName = 'solid';
		const formatType = 'SOLID';

		expect(BettingWeizhiBlock.CheckboxStyleEnum[formatType]).toEqual(typeName);
	});

	it('should contains hollow property', () => {
		const typeName = 'hollow';
		const formatType = 'HOLLOW';

		expect(BettingWeizhiBlock.CheckboxStyleEnum[formatType]).toEqual(typeName);
	});
});