import React from 'react';
import { shallow, mount, } from 'enzyme';
import ScrollSelector from '../components/scroll-selector';

describe('ScrollSelector', () => {
	it('handle default props', () => {
		const {
			options,
			onClick,
		} = ScrollSelector.defaultProps;

		expect(options).toEqual([]);
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const options = ['mock-value1',];
		const className = 'mock-class';
		const selectedIndex = 0;
		const wrapper = shallow(<ScrollSelector 
			options={options}
			className={className}
			selectedIndex={selectedIndex}
			onClick={() => {}}
		/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-scroll-selector', () => {
		const wrapper = shallow(<ScrollSelector/>);

		expect(wrapper.hasClass('ljit-scroll-selector')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<ScrollSelector className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle onClick event', () => {
		const onClick = jest.fn();
		const wrapper = shallow(<ScrollSelector onClick={onClick} options={['mock-value1',]}/>);

		wrapper.find('.ljit-scroll-selector__option').simulate('click');

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});

	it('shoulf renders correctly options', () => {
		const options = ['mock-value1', 'mock-value2',];
		const wrapper = shallow(<ScrollSelector options={options}/>);
		
		expect(wrapper.find('.ljit-scroll-selector__option')).toHaveLength(2);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const options = ['mock-value1',];
		const selectedIndex = 0;
		const onClick = () => {};
		const wrapper = mount(
			<ScrollSelector
				className={className}
				options={options}
				selectedIndex={selectedIndex}
				onClick={onClick}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().options).toBe(options);
		expect(wrapper.props().selectedIndex).toBe(selectedIndex);
		expect(wrapper.props().onClick).toEqual(onClick);
	});
});