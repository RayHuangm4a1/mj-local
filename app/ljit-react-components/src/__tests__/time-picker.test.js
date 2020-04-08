import React from 'react';
import moment from 'moment';
import { shallow, mount, } from 'enzyme';
import TimePicker from '../components/time-picker';

jest.mock('antd/lib/time-picker');

describe('DateRangePicker', () => {
	it('handle default props', () => {
		const {
			isDisabled,
			format,
			hourStep,
			minuteStep,
			secondStep,
			disabledMinutes,
			disabledSeconds,
			onChange,
		} = TimePicker.defaultProps;

		expect(isDisabled).toEqual(false);
		expect(format).toEqual('HH:mm:ss');
		expect(hourStep).toEqual(1);
		expect(minuteStep).toEqual(1);
		expect(secondStep).toEqual(1);
		expect(disabledMinutes).toBeDefined();
		expect(disabledMinutes).toBeInstanceOf(Function);
		expect(disabledSeconds).toBeDefined();
		expect(disabledSeconds).toBeInstanceOf(Function);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<TimePicker
				value={moment('2019-05-02').toDate()}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-time-picker', () => {
		const wrapper = shallow(<TimePicker />);

		expect(wrapper.hasClass('ljit-time-picker')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<TimePicker className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const onChange = jest.fn();
		const value = moment('2019-05-02');
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<TimePicker onChange={onChange} />);

		wrapper.simulate('change', event);
		expect(onChange).toBeCalledWith(event);
	});

	it('should mount in a full dom', () => {
		const props = {
			addon: <span>mock node</span>,
			className: 'mock-class',
			placeholder: 'mock-placeholder',
			isDisabled: false,
			inputReadOnly: false,
			disabledHours: [1,2,4,],
			disabledMinutes: () => {},
			disabledSeconds: () => {},
			onChange: () => {},
			value: moment('2019-05-02').toDate(),
			format: 'HH:mm:ss',
			hourStep: 2,
			minuteStep: 2,
			secondStep: 2,
			style: { width: 100, },
		};

		const wrapper = mount(
			<TimePicker {...props} />
		);

		expect(wrapper.props().addon).toEqual(props.addon);
		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().placeholder).toEqual(props.placeholder);
		expect(wrapper.props().isDisabled).toEqual(props.isDisabled);
		expect(wrapper.props().disabledHours).toEqual(props.disabledHours);
		expect(wrapper.props().disabledMinutes).toEqual(props.disabledMinutes);
		expect(wrapper.props().disabledSeconds).toEqual(props.disabledSeconds);
		expect(wrapper.props().onChange).toEqual(props.onChange);
		expect(wrapper.props().value).toEqual(props.value);
		expect(wrapper.props().format).toEqual(props.format);
		expect(wrapper.props().hourStep).toEqual(props.hourStep);
		expect(wrapper.props().minuteStep).toEqual(props.minuteStep);
		expect(wrapper.props().secondStep).toEqual(props.secondStep);
		expect(wrapper.props().style).toEqual(props.style);
	});

	describe('Format Type Enums', () => {
		it('should contains "HH:mm:ss" property', () => {
			const typeName = 'HH:mm:ss';
			const formatType = 'HHmmss';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
		it('should contains "HH:mm" property', () => {
			const typeName = 'HH:mm';
			const formatType = 'HHmm';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
		it('should contains "mm:ss" property', () => {
			const typeName = 'mm:ss';
			const formatType = 'mmss';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
		it('should contains "HH" property', () => {
			const typeName = 'hh';
			const formatType = 'HH';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
		it('should contains "mm" property', () => {
			const typeName = 'mm';
			const formatType = 'MM';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
		it('should contains "ss" property', () => {
			const typeName = 'ss';
			const formatType = 'SS';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
		it('should contains "h:mm:ss a" property', () => {
			const typeName = 'h:mm:ss a';
			const formatType = 'Hmmssa';

			expect(TimePicker.FormatTypeEnums[formatType]).toEqual(typeName);
		});
	});
});
