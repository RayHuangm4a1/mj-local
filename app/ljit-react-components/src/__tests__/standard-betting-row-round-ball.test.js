import React from 'react';
import { shallow, mount, } from 'enzyme';
import RoundBall from '../components/standard-betting-row/round-ball';
import { BallSizeEnum, } from '../components/standard-betting-element/utils';

describe('RoundBall', () => {
	it('should handle default props', () => {
		const {
			codes,
			onPressCodeBall,
			codeBallBadges,
		} = RoundBall.defaultProps;

		expect(codes).toEqual([]);
		expect(onPressCodeBall).toBeInstanceOf(Function);
		expect(codeBallBadges).toEqual({});
	});

	it('should be selectable by class ljit-round-ball', () => {
		const wrapper = shallow(<RoundBall/>);

		expect(wrapper.hasClass('ljit-round-ball')).toEqual(true);
	});

	it('should renders correctly', () => {
		const props = {
			codes: [],
			onPressCodeBall: () => {},
		};

		const wrapper = shallow(<RoundBall {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			codes: [],
			onPressCodeBall: () => {},
			codeBallSize: BallSizeEnum.LARGE,
			codeBallBadges: {},
		};

		const wrapper = mount(<RoundBall {...props} />);

		expect(wrapper.props().codes).toBe(props.codes);
		expect(wrapper.props().codeBallSize).toBe(props.codeBallSize);
		expect(wrapper.props().codeBallBadges).toBe(props.codeBallBadges);
		expect(wrapper.props().onPressCodeBall).toBe(props.onPressCodeBall);

	});

	it('should handle callback', () => {
		const callback = jest.fn();
		const wrapper = mount(
			<RoundBall
				onPressCodeBall={callback}
				codes={[ { name: '总和 大', bonus: '', isSelected: false, }, ]}
			/>
		);

		wrapper.find('.ljit-bet-rectangle .ljit-code-ball-button').at(0).simulate('click');
		expect(callback).toHaveBeenCalled();
	});

	it('should handle badge isSelected', () => {
		const codes = [
			{
				name: 'mock-name',
				isSelected: true,
			},
		];
		const codeBallBadges = {
			'mock-name': '單挑',
		};
		const wrapper = mount(<RoundBall
			codes={codes}
			codeBallBadges={codeBallBadges}
		/>);

		expect(wrapper.find('.ljit-bet-rectangle__badge').at(0).hasClass('ljit-bet-rectangle__badge-active')).toEqual(true);
	});
});
