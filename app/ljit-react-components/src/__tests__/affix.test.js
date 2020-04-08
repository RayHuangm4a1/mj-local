import React from 'react';
import { shallow, mount, } from 'enzyme';
import Affix from '../components/affix';

describe('affix', () => {
	beforeEach(function () {
		jest.mock('antd/lib/affix');
	});

	afterEach(function () {
		jest.resetModules();
	});

	it('should handle default props', () => {
		const {
			onChange,
		} = Affix.defaultProps;

		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const positionToTop = 10;
		const positionToBottom = 100;

		const wrapper = shallow(<Affix
			positionToTop={positionToTop}
			positionToBottom={positionToBottom}
		/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const positionToTop = 10;
		const positionToBottom = 100;
		const className = 'mock-class';
		const children = 'mock-children';
		const style = { position: 'absolute', width: '100px', };
		const onChange = () => {};

		const wrapper = mount(<Affix
			positionToTop={positionToTop}
			positionToBottom={positionToBottom}
			style={style}
			className={className}
			onChange={onChange}
		>
			{children}
		</Affix>);

		expect(wrapper.props().positionToTop).toBe(positionToTop);
		expect(wrapper.props().positionToBottom).toBe(positionToBottom);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().onChange).toEqual(onChange);
	});

	it('should handle change event', () => {
		const value = 'mock-value';
		const onChange = jest.fn();
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<Affix onChange={onChange} />);

		wrapper.simulate('change', event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toBeCalledWith(event);
	});
});
