import React from 'react';
import { shallow, mount, } from 'enzyme';
import Countdown,{ PREFIX_CLASS, } from '../components/count-down';

jest.mock('antd/lib/statistic/Countdown.js', () => function mockComponent() {
	return <div />;
});

describe('Countdown',() => {
	it('should PREFIX_CLASS to equal ljit-countdown',() => {
		expect(PREFIX_CLASS).toEqual('ljit-countdown');
	});

	it('should handle default props', () => {
		const {
			title,
			prefix,
			suffix,
			format,
			onFinish,
			className,
			size,
			color,
			offset,
		} = Countdown.defaultProps;

		expect(title).toEqual('');
		expect(prefix).toEqual('');
		expect(suffix).toEqual('');
		expect(format).toEqual(Countdown.FormatEnums.HH_MM_SS);
		expect(onFinish).toBeInstanceOf(Function);
		expect(size).toEqual(Countdown.SizeEnums.SMALL);
		expect(color).toEqual('');
		expect(offset).toEqual(0);
		expect(className).toEqual('');

	});
	it('should render correctly',() => {
		const props = {
			title: 'mock-title',
			prefix: 'mock-prefix',
			suffix: 'mock-suffix',
			className: 'mock-class',
			endDate: new Date(2019, 6, 17, 12, 0, 0),
			format: Countdown.FormatEnums.HH_MM_SS,
			size: Countdown.SizeEnums.SMALL,
			color: Countdown.ColorEnums.RED,
			onFinish: () => {},
			offset: 0,
		};
		const wrapper = shallow(<Countdown {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-countdown',() => {
		const wrapper = shallow(<Countdown/>);

		expect(wrapper.hasClass('ljit-countdown')).toEqual(true);
	});

	it('should be selectable by custom class',() => {
		const className = 'mock-class';
		const wrapper = shallow(<Countdown className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM',() => {

		const props={
			title : 'mock-title',
			prefix : 'mock-prefix',
			suffix : 'mock-suffix',
			endDate: new Date(2019, 6, 17, 12, 0, 0),
			format: Countdown.FormatEnums.HH_MM_SS,
			size: Countdown.SizeEnums.SMALL,
			color: Countdown.ColorEnums.RED,
			onFinish: () => {},
			className : 'mock-class',
			offset: 0,
		};

		const wrapper = mount(<Countdown {...props}/>);

		expect(wrapper.props().title).toEqual(props.title);
		expect(wrapper.props().prefix).toEqual(props.prefix);
		expect(wrapper.props().suffix).toEqual(props.suffix);
		expect(wrapper.props().format).toBe(props.format);
		expect(wrapper.props().size).toBe(props.size);
		expect(wrapper.props().color).toBe(props.color);
		expect(wrapper.props().offset).toBe(props.offset);
		expect(wrapper.props().onFinish).toEqual(props.onFinish);
		expect(wrapper.hasClass(props.className)).toEqual(true);
	});
});

describe('Countdown FormatEnums ', () => {
	it('should contains HH:mm:ss property', () => {
		const typeName = 'HH:mm:ss';
		const formatType = 'HH_MM_SS';

		expect(Countdown.FormatEnums[formatType]).toEqual(typeName);
	});
	it('should contains HH:mm:ss:SSS property', () => {
		const typeName = 'HH:mm:ss:SSS';
		const formatType = 'HH_MM_SS_SSS';

		expect(Countdown.FormatEnums[formatType]).toEqual(typeName);
	});
	it('should contains ss property', () => {
		const typeName = 'ss';
		const formatType = 'SS';

		expect(Countdown.FormatEnums[formatType]).toEqual(typeName);
	});
});

describe('Countdown SizeEnums ', () => {
	it('should contains small property', () => {
		const typeName = 'small';
		const formatType = 'SMALL';

		expect(Countdown.SizeEnums[formatType]).toEqual(typeName);
	});
	it('should contains medium property', () => {
		const typeName = 'medium';
		const formatType = 'MEDIUM';

		expect(Countdown.SizeEnums[formatType]).toEqual(typeName);
	});
	it('should contains large property', () => {
		const typeName = 'large';
		const formatType = 'LARGE';

		expect(Countdown.SizeEnums[formatType]).toEqual(typeName);
	});
});

describe('Countdown ColorEnums ', () => {
	it('should contains #fd3e3e property', () => {
		const typeName = '#fd3e3e';
		const formatType = 'RED';

		expect(Countdown.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains #19c5cc property', () => {
		const typeName = '#19c5cc';
		const formatType = 'BLUE';

		expect(Countdown.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains #ff8113 property', () => {
		const typeName = '#ff8113';
		const formatType = 'ORANGE';

		expect(Countdown.ColorEnums[formatType]).toEqual(typeName);
	});
});