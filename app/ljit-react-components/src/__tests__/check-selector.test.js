import React from 'react';
import { shallow, mount, } from 'enzyme';
import CheckSelector from '../components/check-selector';

describe('CheckSelector', () => {
	it('handle default props', () => {
		const {
			source,
			activeIds,
			selectedIds,
			checkedIds,
			onChange,
			backgroundColor,
		} = CheckSelector.defaultProps;

		expect(source).toMatchObject([]);
		expect(activeIds).toMatchObject([]);
		expect(selectedIds).toMatchObject([]);
		expect(checkedIds).toMatchObject([]);
		expect(backgroundColor).toEqual(CheckSelector.BackgroundColorEnums.GRAY);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should be selectable by class ljit-check-selector', () => {
		const wrapper = shallow(<CheckSelector />);

		expect(wrapper.hasClass('ljit-check-selector')).toEqual(true);
	});

	it('should be selectable by class custom class', () => {
		const wrapper = shallow(<CheckSelector className="mock-class"/>);

		expect(wrapper.hasClass('mock-class')).toEqual(true);
	});

	it('should renders correctly', () => {
		const source = [
			{ id: 1, name: 'name 1', },
		];
		const wrapper = shallow(
			<CheckSelector
				source={source}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should renders three menu', () => {
		const source = [
			{ id: 1, name: 'name 1', },
			{ id: 2, name: 'name 2', },
			{ id: 3, name: 'name 3', },
		];
		const wrapper = shallow(<CheckSelector source={source} />);

		expect(wrapper.find('.ljit-check-selector li')).toHaveLength(3);
	});

	it('should mount in a full DOM', () => {
		const source = [
			{ id: 1, name: 'name 1', },
		];
		const activeIds = [];
		const selectedIds = [];
		const checkedIds = [];
		const onChange = () => {};
		const backgroundColor = CheckSelector.BackgroundColorEnums.GRAY;
		const className = 'mock-class';
		const wrapper = mount(
			<CheckSelector
				source={source}
				activeIds={activeIds}
				selectedIds={selectedIds}
				checkedIds={checkedIds}
				onChange={onChange}
				backgroundColor={backgroundColor}
				className={className}
			/>
		);

		expect(wrapper.props().source).toMatchObject(source);
		expect(wrapper.props().activeIds).toMatchObject(activeIds);
		expect(wrapper.props().selectedIds).toMatchObject(selectedIds);
		expect(wrapper.props().checkedIds).toMatchObject(checkedIds);
		expect(wrapper.props().onChange).toEqual(onChange);
		expect(wrapper.props().backgroundColor).toEqual(backgroundColor);
		expect(wrapper.props().className).toEqual(className);
	});
	describe('Background Enums', () => {
		it('should contain GRAY property.', () => {
			expect(CheckSelector.BackgroundColorEnums).toHaveProperty('GRAY', 'gray');
		});

		it('should contain WHITE property.', () => {
			expect(CheckSelector.BackgroundColorEnums).toHaveProperty('WHITE', 'white');
		});
	});
	describe('CheckSelector Style Type', () => {
		it('should render selected class', () => {
			const source = [
				{ id: 1, name: 'name 1', },
			];
			const selectedIds = [1,];
			const wrapper = shallow(<CheckSelector source={source} selectedIds={selectedIds}/>);

			expect(wrapper.find('.ljit-check-selector .ljit-check-selector__item--selected')).toHaveLength(1);
		});

		it('should render active class', () => {
			const source = [
				{ id: 1, name: 'name 1', },
			];
			const activeIds = [1,];
			const wrapper = shallow(<CheckSelector source={source} activeIds={activeIds}/>);

			expect(wrapper.find('.ljit-check-selector .ljit-check-selector__item--active')).toHaveLength(1);
		});

		it('should render check class', () => {
			const source = [
				{ id: 1, name: 'name 1', },
			];
			const checkedIds = [1,];
			const wrapper = shallow(<CheckSelector source={source} checkedIds={checkedIds}/>);

			expect(wrapper.find('.ljit-check-selector .ljit-check-selector__item--check')).toHaveLength(1);
		});
	});
});
