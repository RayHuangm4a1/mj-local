import React from 'react';
import { shallow, mount, } from 'enzyme';
import InfoCard from '../components/info-card';

describe('InfoCard', () => {
	it('should handle default props', () => {
		const {
			className,
			isShowingCloseButton,
			onClose,
		} = InfoCard.defaultProps;

		expect(className).toEqual('');
		expect(isShowingCloseButton).toBe(false);
		expect(onClose).toBeDefined();
		expect(onClose).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			className: 'mock-class',
			topLeft: 'mock-top-left',
			topRight: 'mock-top-right',
			left: 'mock-left',
			right: 'mock-right',
			bottom: 'mock-bottom',
			isShowingCloseButton: true,
		};
		const wrapper = shallow(<InfoCard {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-info-card', () => {
		const wrapper = shallow(<InfoCard/>);

		expect(wrapper.hasClass('ljit-info-card')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<InfoCard className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle onClose event', () => {
		const onClose = jest.fn();
		const wrapper = mount(
			<InfoCard onClose={onClose} isShowingCloseButton={true}/>
		);

		wrapper.find('.ljit-info-card__close-button').simulate('click');
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(onClose).toHaveBeenCalled();
	});
	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-class',
			topLeft: 'mock-top-left',
			topRight: 'mock-top-right',
			left: 'mock-left',
			right: 'mock-right',
			bottom: 'mock-bottom',
			isShowingCloseButton: true,
			onClose: () => {},
		};
		const wrapper = mount(<InfoCard {...props}/>);

		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().topLeft).toEqual(props.topLeft);
		expect(wrapper.props().topRight).toEqual(props.topRight);
		expect(wrapper.props().left).toEqual(props.left);
		expect(wrapper.props().right).toEqual(props.right);
		expect(wrapper.props().bottom).toEqual(props.bottom);
		expect(wrapper.props().isShowingCloseButton).toEqual(props.isShowingCloseButton);
		expect(wrapper.props().onClose).toEqual(props.onClose);
	});
});
