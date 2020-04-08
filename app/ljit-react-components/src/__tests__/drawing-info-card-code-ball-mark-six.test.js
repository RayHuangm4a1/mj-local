import React from 'react';
import { shallow, mount, } from 'enzyme';
import CodeBall from '../components/code-ball';
const CodeBallCircle = CodeBall.Circle;
const MarkSixColorMap = getMarkSixColorMap();
const { SizeEnum, FontSizeEnum, } = CodeBallCircle;

function getMarkSixColorMap() {
	const red = [
		'01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46',
	];
	const blue = [
		'03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48',
	];
	const green = [
		'05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49',
	];
	const ColorMap = {};

	red.forEach(number => {
		ColorMap[number] = '#ff594d';
	});
	blue.forEach(number => {
		ColorMap[number] = '#00a4fc';
	});
	green.forEach(number => {
		ColorMap[number] = '#00d2b7';
	});

	return ColorMap;
}


describe('DrawingInfoCardCodeBallMarkSix', () => {
	let DrawingInfoCardCodeBallMarkSix;

	beforeEach(() => {
		DrawingInfoCardCodeBallMarkSix = require('../components/drawing-info-card/elements/drawing-info-card-code-ball-mark-six').default;
	});

	afterEach(() => {
		DrawingInfoCardCodeBallMarkSix = undefined;
	});

	it('should handle defaultProps.', () => {
		const {
			size,
			fontSize,
		} = DrawingInfoCardCodeBallMarkSix.defaultProps;

		expect(size).toEqual(SizeEnum.MIDDLE);
		expect(fontSize).toEqual(FontSizeEnum.MIDDLE);
	});

	it('should be selectable by class drawing-info-card-code-ball-mark-six', () => {
		const wrapper = shallow(<DrawingInfoCardCodeBallMarkSix
			splitOpencodes={['01','02','03','04','05',]}
		/>);

		expect(wrapper.hasClass('drawing-info-card-code-ball-mark-six')).toEqual(true);
	});

	it('should renders correctly', () => {
		const props = {
			splitOpencodes: ['01','02','03','04','05',],
		};

		const wrapper = shallow(<DrawingInfoCardCodeBallMarkSix {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			splitOpencodes: ['01','02','03','04','05',],
		};

		const wrapper = mount(<DrawingInfoCardCodeBallMarkSix {...props} />);

		expect(wrapper.props().opencode).toBe(props.opencode);
		expect(wrapper.props().splitOpencode).toBe(props.splitOpencode);
	});

	it('should render corresponsed ball backgroundColor', () => {
		const props = {
			splitOpencodes: ['01','02','03','04','05',],
		};

		const wrapper = mount(<DrawingInfoCardCodeBallMarkSix {...props} />);
		const wrapperCodeBallCircle = wrapper.find(CodeBallCircle);

		wrapperCodeBallCircle.forEach(codeBall => {
			const { text, backgroundColor, } = codeBall.props().text;

			expect(backgroundColor).toEqual(MarkSixColorMap[text]);
		});
	});
});
