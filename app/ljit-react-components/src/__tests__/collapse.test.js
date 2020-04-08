import React from 'react';
import { shallow, mount, } from 'enzyme';
import Collapse from '../components/collapse';

describe('Collapse', () => {
	let panelsData;

	beforeEach(() => {
		panelsData = [
			{
				header: 'normal',
				key: 1,
				content: <div>text content</div>,
			},
			{
				header: 'isDisabled',
				key: 2,
				content: <div>text content</div>,
			},
			{
				header: 'with extra',
				key: 3,
				content: <div>text content</div>,
			},
			{
				header: 'isShowArrow false',
				key: 4,
				content: <div>text content</div>,
			},
		];
	});

	afterEach(() => {
		panelsData = undefined;
	});

	it('should handle default props', () => {
		const {
			className,
			isAccordion,
			panelsData,
			isIconPositionRight,
			isBordered,
			onChange,
			expandIcon,
		} = Collapse.defaultProps;

		expect(className).toEqual('');
		expect(isAccordion).toEqual(false);
		expect(panelsData).toEqual([]);
		expect(isIconPositionRight).toEqual(true);
		expect(isBordered).toEqual(false);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(expandIcon).toBeDefined();
		expect(expandIcon).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<Collapse
				panelsData={panelsData}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by "ljit-collapse" class', () => {
		const wrapper = shallow(
			<Collapse
				panelsData={panelsData}
			/>
		);

		expect(wrapper.hasClass('ljit-collapse')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<Collapse
				className={className}
				panelsData={panelsData}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const defaultActiveKey = 1;
		const isAccordion = true;
		const isIconPositionRight = true;
		const isBordered = true;
		const expandIcon = () => {};
		const onChange = () => {};
		const wrapper = mount(
			<Collapse
				className={className}
				defaultActiveKey={defaultActiveKey}
				panelsData={panelsData}
				isIconPositionRight={isIconPositionRight}
				isAccordion={isAccordion}
				isBordered={isBordered}
				expandIcon={expandIcon}
				onChange={onChange}
			/>
		);

		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().defaultActiveKey).toEqual(defaultActiveKey);
		expect(wrapper.props().panelsData).toEqual(panelsData);
		expect(wrapper.props().isIconPositionRight).toEqual(isIconPositionRight);
		expect(wrapper.props().isAccordion).toEqual(isAccordion);
		expect(wrapper.props().isBordered).toEqual(isBordered);
		expect(wrapper.props().expandIcon).toEqual(expandIcon);
		expect(wrapper.props().onChange).toEqual(onChange);
	});

	it('should be selectable by class "ljit-collapse__icon-right" when isIconPositionRight is true', () => {
		const wrapper = shallow(
			<Collapse
				isIconPositionRight={true}
				panelsData={panelsData}
			/>
		);

		expect(wrapper.hasClass('ljit-collapse__icon-right')).toEqual(true);
	});

	it('should not show icon when panel data isShowArrow is false', () => {
		const notShowIconPanelsData = [{
			header: 'normal',
			key: 1,
			isShowArrow: false,
			content: <div>text content</div>,
		},];
		const wrapper = mount(
			<Collapse
				panelsData={notShowIconPanelsData}
			/>
		);

		expect(wrapper.find('i')).toHaveLength(0);
	});
	it('panel number should equal panelsData', () => {
		const panelNumber = panelsData.length;
		const wrapper = shallow(
			<Collapse
				panelsData={panelsData}
			/>
		);

		expect(wrapper.find('.ljit-collapse__panel')).toHaveLength(panelNumber);
	});

	describe('when Collapse panel is click', () => {
		it('should handle onChange', () => {
			const onChange = jest.fn();
			const wrapper = shallow(
				<Collapse
					onChange={onChange}
					panelsData={panelsData}
				/>
			);

			wrapper.simulate('change');
			expect(onChange).toBeCalled();
		});

		it('should add class ant-collapse-item-active', () => {
			const disbledPanelsData = [{
				header: 'normal',
				key: 1,
				content: <div>text content</div>,
			},];
			const onChange = jest.fn();
			const wrapper = mount(
				<Collapse
					onChange={onChange}
					panelsData={disbledPanelsData}
				/>
			);

			wrapper.find('.ant-collapse-header').simulate('click');
			expect(wrapper.find('.ant-collapse-item-active')).toHaveLength(1);
		});

		it('should not add class ant-collapse-item-active when Collapse panel is isDisabled', () => {
			const disbledPanelsData = [{
				header: 'normal',
				key: 1,
				isDisabled: true,
				content: <div>text content</div>,
			},];
			const onChange = jest.fn();
			const wrapper = mount(
				<Collapse
					onChange={onChange}
					panelsData={disbledPanelsData}
				/>
			);

			wrapper.find('.ant-collapse-header').simulate('click');
			expect(wrapper.find('ant-collapse-item-active')).toHaveLength(0);
		});
	});
});
