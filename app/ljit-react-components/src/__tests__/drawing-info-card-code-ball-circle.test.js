import React from 'react';
import { shallow, mount, } from 'enzyme';
import CodeBall from '../components/code-ball';
const CodeBallCircle = CodeBall.Circle;
const { SizeEnum, FontSizeEnum, } = CodeBallCircle;

describe('DrawingInfoCardCodeBallCircle', () => {
	let DrawingInfoCardCodeBallCircle;

	beforeEach(() => {
		DrawingInfoCardCodeBallCircle = require('../components/drawing-info-card/elements/drawing-info-card-code-ball-circle').default;
	});

	afterEach(() => {
		DrawingInfoCardCodeBallCircle = undefined;
	});

	it('should handle defaultProps.', () => {
		const {
			size,
			fontSize,
		} = DrawingInfoCardCodeBallCircle.defaultProps;

		expect(size).toEqual(SizeEnum.MIDDLE);
		expect(fontSize).toEqual(FontSizeEnum.MIDDLE);
	});

	it('should be selectable by class drawing-info-card-code-ball-circle', () => {
		const wrapper = shallow(<DrawingInfoCardCodeBallCircle
			splitOpencodes={['1','2','3','4','5',]}
		/>);

		expect(wrapper.hasClass('drawing-info-card-code-ball-circle')).toEqual(true);
	});

	it('should renders correctly', () => {
		const props = {
			splitOpencodes: ['1','2','3','4','5',],
		};

		const wrapper = shallow(<DrawingInfoCardCodeBallCircle {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			splitOpencodes: ['1','2','3','4','5',],
		};

		const wrapper = mount(<DrawingInfoCardCodeBallCircle {...props} />);

		expect(wrapper.props().opencode).toBe(props.opencode);
		expect(wrapper.props().splitOpencode).toBe(props.splitOpencode);
	});
});
