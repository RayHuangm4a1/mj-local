import React from 'react';
import { shallow, mount, } from 'enzyme';
import Card from '../components/card';

describe('Card', () => {
	it('should handle default props', () => {
		const {
			className,
			children,
		} = Card.defaultProps;

		expect(className).toEqual('');
		expect(children).toEqual('');
	});

	it('should render correctly', () => {
		const props = {
			className: 'mock-class',
			children: 'mock-content',
		};
		const wrapper = shallow(<Card {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-card-border', () => {
		const wrapper = shallow(<Card/>);

		expect(wrapper.hasClass('ljit-card-border')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Card className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-class',
			children: 'mock-content',
		};
		const wrapper = mount(<Card {...props}/>);

		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().children).toEqual(props.children);
	});
});