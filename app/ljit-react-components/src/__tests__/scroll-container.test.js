import React from 'react';
import { shallow, mount, } from 'enzyme';
import { MemoryRouter as Router, } from 'react-router-dom';
import ScrollContainer from '../components/scroll-container';

const mockList = `
	<ul>
		<li key='1'>mock item 1</li>
		<li key='2'>mock item 2</li>
		<li key='3'>mock item 3</li>
	</ul>`;

describe('ScrollContainer', () => {
	it('should handle default props', () => {
		const {
			buttonText,
			isButtonDisabled,
			onClick,
		} = ScrollContainer.defaultProps;

		expect(buttonText).toEqual('更多');
		expect(isButtonDisabled).toEqual(false);
		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const buttonText = 'mock-text';
		const className = 'mock-class';
		const style = { maxWidth: '200px', };
		const isButtonDisabled = false;
		const onClick = () => console.log('click');

		const wrapper = shallow(
			<ScrollContainer
				buttonText={buttonText}
				className={className}
				style={style}
				isButtonDisabled={isButtonDisabled}
				onClick={onClick}
			>
				{mockList}
			</ScrollContainer>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-scroll-container', () => {
		const wrapper = shallow(
			<ScrollContainer>
				{mockList}
			</ScrollContainer>
		);

		expect(wrapper.hasClass('ljit-scroll-container')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<ScrollContainer className={className}>
				{mockList}
			</ScrollContainer>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const children = mockList;
		const buttonText = 'mock-text';
		const className = 'mock-class';
		const style = { maxWidth: '200px', };
		const isButtonDisabled = false;
		const onClick = () => console.log('click');

		const wrapper = mount(
			<ScrollContainer
				buttonText={buttonText}
				className={className}
				style={style}
				isButtonDisabled={isButtonDisabled}
				onClick={onClick}
			>
				{children}
			</ScrollContainer>
		);

		expect(wrapper.props().buttonText).toBe(buttonText);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().isButtonDisabled).toEqual(isButtonDisabled);
		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().onClick).toEqual(onClick);
	});

	it('should handle onClick event', () => {
		const onClick = jest.fn();
		const wrapper = mount(
			<Router>
				<ScrollContainer onClick={onClick}>
					{mockList}
				</ScrollContainer>
			</Router>
		);
		const button = wrapper.find('Button').at(0);

		button.simulate('click');

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});
});
