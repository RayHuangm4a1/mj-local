import React from 'react';
import { shallow, mount, } from 'enzyme';
import CodeBall from '../components/code-ball';
const CodeBallCircle = CodeBall.Circle;
const { SizeEnum, FontSizeEnum, } = CodeBallCircle;

describe('DrawingInfoCardKL8CodeBallCircle', () => {
	let DrawingInfoCardKL8CodeBallCircle;

	beforeEach(() => {
		DrawingInfoCardKL8CodeBallCircle = require('../components/drawing-info-card/elements/drawing-info-card-kl8-code-ball-circle').default;
	});

	afterEach(() => {
		DrawingInfoCardKL8CodeBallCircle = undefined;
	});

	it('should handle defaultProps.', () => {
		const {
			size,
			fontSize,
		} = DrawingInfoCardKL8CodeBallCircle.defaultProps;

		expect(size).toEqual(SizeEnum.SMALL);
		expect(fontSize).toEqual(FontSizeEnum.SMALL);
	});

	it('should be selectable by class drawing-info-card-kl8-code-ball-circle', () => {
		const wrapper = shallow(
			<DrawingInfoCardKL8CodeBallCircle
				splitOpencodes={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
					'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',]}
			/>
		);

		expect(wrapper.hasClass('drawing-info-card-kl8-code-ball-circle')).toEqual(true);
	});

	it('should renders correctly', () => {
		const props = {
			splitOpencodes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',],
		};

		const wrapper = shallow(<DrawingInfoCardKL8CodeBallCircle {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			splitOpencodes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',],
		};

		const wrapper = mount(<DrawingInfoCardKL8CodeBallCircle {...props} />);

		expect(wrapper.props().splitOpencodes).toBe(props.splitOpencodes);
	});
});
