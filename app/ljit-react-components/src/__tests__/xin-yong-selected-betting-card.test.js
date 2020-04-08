import React from 'react';
import { shallow, mount, } from 'enzyme';
import XinYongSelectedBettingCard from '../components/xing-yong-selected-betting-card';

describe('XinYongSelectedBettingCard', () => {
	it('handle default props', () => {
		const {
			data,
			onClose,
			isShowingCloseButton,
			className,
		} = XinYongSelectedBettingCard.defaultProps;

		expect(data).toEqual({});
		expect(onClose).toBeDefined();
		expect(onClose).toBeInstanceOf(Function);
		expect(isShowingCloseButton).toBe(true);
		expect(className).toBe('');
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<XinYongSelectedBettingCard
				data={{
					betcontent: '小',
					amount: 100,
					odds: 1.996,
					reward: 200,
				}}
				className='mock-class'
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class selected-betting-card', () => {
		const wrapper = shallow(<XinYongSelectedBettingCard/>);

		expect(wrapper.hasClass('selected-betting-card')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<XinYongSelectedBettingCard className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});
	it('should handle onClose event', () => {
		const onClose = jest.fn();
		const wrapper = mount(<XinYongSelectedBettingCard onClose={onClose} />
		);

		wrapper.find('.ljit-info-card__close-button').simulate('click');
		expect(onClose).toHaveBeenCalledTimes(1);
		expect(onClose).toHaveBeenCalled();
	});

	it('should mount in a full DOM', () => {
		const data={
			betcontent: '小',
			amount: 100,
			odds: 1.996,
			reward: 200,
		};
		const className = 'mock-class';
		const onClose = () => {};
		const isShowingCloseButton = true;
		const wrapper = mount(
			<XinYongSelectedBettingCard
				className={className}
				data={data}
				onClose={onClose}
				isShowingCloseButton={isShowingCloseButton}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().data).toMatchObject(data);
		expect(wrapper.props().onClose).toEqual(onClose);
		expect(wrapper.props().isShowingCloseButton).toEqual(isShowingCloseButton);
	});
});
