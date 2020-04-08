import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('DrawingInfoCardCodeBallDice', () => {
	let DrawingInfoCardCodeBallDice;

	beforeEach(() => {
		DrawingInfoCardCodeBallDice = require('../components/drawing-info-card/elements/drawing-info-card-code-ball-dice').default;
	});

	afterEach(() => {
		DrawingInfoCardCodeBallDice = undefined;
	});

	it('should be selectable by class drawing-info-card-code-ball-dice', () => {
		const wrapper = shallow(<DrawingInfoCardCodeBallDice
			splitOpencodes={['1','2','3','4','5',]}
		/>);

		expect(wrapper.hasClass('drawing-info-card-code-ball-dice')).toEqual(true);
	});

	it('should renders correctly', () => {
		const props = {
			splitOpencodes: ['1','2','3','4','5',],
		};

		const wrapper = shallow(<DrawingInfoCardCodeBallDice {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			splitOpencodes: ['1','2','3','4','5',],
		};

		const wrapper = mount(<DrawingInfoCardCodeBallDice {...props} />);

		expect(wrapper.props().opencode).toBe(props.opencode);
		expect(wrapper.props().splitOpencode).toBe(props.splitOpencode);
	});
});
