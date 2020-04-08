import React from 'react';
import moment from 'moment';
import { shallow, mount, } from 'enzyme';
import
DateRangePicker,
{
	getToday,
	getYesterday,
	getThisWeek,
	getLastSevenDay,
	getLastThirtyDay,
	getPresentPeriod,
	getPreviousPeriod,
	getFormerDay,
	getLaterDay,
} from '../components/date-range-picker';

const { PRESETTED_RANGES, RangesEnums, DateEnums, } = DateRangePicker;

jest.mock('antd/lib/date-picker/RangePicker.js');

describe('DateRangePicker', () => {
	it('handle default props', () => {
		const {
			ranges,
			format,
			className,
			dropdownClassName,
			disabled,
			inputStyle,
			onChange,
			onFocus,
			onBlur,
			showTime,
			hourOffset,
			onOverLimitDays,
		} = DateRangePicker.defaultProps;

		expect(ranges).toEqual([]);
		expect(format).toEqual('YYYY/MM/DD');
		expect(className).toEqual('');
		expect(dropdownClassName).toEqual('');
		expect(inputStyle).toEqual({});
		expect(disabled).toEqual(false);
		expect(showTime).toEqual(false);
		expect(hourOffset).toEqual(0);
		expect(onChange).toBeDefined();
		expect(onChange).toBeInstanceOf(Function);
		expect(onFocus).toBeDefined();
		expect(onFocus).toBeInstanceOf(Function);
		expect(onBlur).toBeDefined();
		expect(onBlur).toBeInstanceOf(Function);
		expect(onOverLimitDays).toBeDefined();
		expect(onOverLimitDays).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const format = 'YYYY/MM/DD';
		const ranges = [];
		const wrapper = shallow(
			<DateRangePicker
				format={format}
				ranges={ranges}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-daterange-picker', () => {
		const wrapper = shallow(<DateRangePicker />);

		expect(wrapper.hasClass('ljit-daterange-picker')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<DateRangePicker className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle change event', () => {
		const onChange = jest.fn();
		const wrapper = shallow(<DateRangePicker onChange={onChange} />).instance();

		wrapper._handleChange();
		expect(onChange).toBeCalled();
	});

	it('should handle focus event', () => {
		const onFocus = jest.fn();
		const value = [moment('2019-04-01', 'YYYY/MM/DD'), moment('2019-04-22', 'YYYY/MM/DD'),];
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<DateRangePicker onFocus={onFocus} />);

		wrapper.simulate('focus', event);
		expect(onFocus).toBeCalledWith(event);
	});

	it('should handle blur event', () => {
		const onBlur = jest.fn();
		const value = [moment('2019-04-01', 'YYYY/MM/DD'), moment('2019-04-22', 'YYYY/MM/DD'),];
		const event = {
			preventDefault: () => {},
			target: { value, },
		};
		const wrapper = shallow(<DateRangePicker onBlur={onBlur} />);

		wrapper.simulate('blur', event);
		expect(onBlur).toBeCalledWith(event);
	});

	it('should mount in a full dom', () => {
		const props = {
			format: 'YYYY/MM/DD',
			locale: 'zh_CN',
			className: 'mock-class',
			dropdownClassName: 'mock-drop-class',
			style: { width: '150px', },
			ranges: ['today', 'lastSevenDays', 'lastThirtyDays',],
			disabled: false,
			showTime: false,
			renderExtraFooter: 'extra footer',
			value: [moment('2019-04-01', 'YYYY/MM/DD'), moment('2019-04-22', 'YYYY/MM/DD'),],
			onChange: () => {},
			onFocus: () => {},
			onBlur: () => {},
			fromDate: moment('2019-04-01', 'YYYY/MM/DD'),
			toDate: moment('2019-04-22', 'YYYY/MM/DD'),
			hourOffset: 0,
			limitDays: 7,
			onOverLimitDays: () => {},
		};

		const wrapper = mount(
			<DateRangePicker {...props} />
		);

		expect(wrapper.props().value).toEqual(props.value);
		expect(wrapper.props().format).toEqual(props.format);
		expect(wrapper.props().locale).toEqual(props.locale);
		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().dropdownClassName).toEqual(props.dropdownClassName);
		expect(wrapper.props().ranges).toEqual(props.ranges);
		expect(wrapper.props().disabled).toEqual(props.disabled);
		expect(wrapper.props().showTime).toEqual(props.showTime);
		expect(wrapper.props().renderExtraFooter).toEqual(props.renderExtraFooter);
		expect(wrapper.props().style).toEqual(props.style);
		expect(wrapper.props().onChange).toEqual(props.onChange);
		expect(wrapper.props().onFocus).toEqual(props.onFocus);
		expect(wrapper.props().onBlur).toEqual(props.onBlur);
		expect(wrapper.props().fromDate).toEqual(props.fromDate);
		expect(wrapper.props().toDate).toEqual(props.toDate);
		expect(wrapper.props().hourOffset).toEqual(props.hourOffset);
		expect(wrapper.props().limitDays).toEqual(props.limitDays);
		expect(wrapper.props().onOverLimitDays).toEqual(props.onOverLimitDays);
	});

	describe('Ranges Enums', () => {
		it('should contains TODAY property', () => {
			expect(RangesEnums).toHaveProperty('TODAY', 'today');
		});
		it('should contains YESTERDAY property', () => {
			expect(RangesEnums).toHaveProperty('YESTERDAY', 'yesterday');
		});
		it('should contains THIS_WEEK property', () => {
			expect(RangesEnums).toHaveProperty('THIS_WEEK', 'thisWeek');
		});
		it('should contains LAST_SEVEN_DAYS property', () => {
			expect(RangesEnums).toHaveProperty('LAST_SEVEN_DAYS', 'lastSevenDays');
		});
		it('should contains LAST_THIRTY_DAYS property', () => {
			expect(RangesEnums).toHaveProperty('LAST_THIRTY_DAYS', 'lastThirtyDays');
		});
		it('should contains PRESENT_PERIOD property', () => {
			expect(RangesEnums).toHaveProperty('PRESENT_PERIOD', 'presentPeriod');
		});
		it('should contains PREVIOUS_PERIOD property', () => {
			expect(RangesEnums).toHaveProperty('PREVIOUS_PERIOD', 'previousPeriod');
		});
	});

	describe('Date Enums', () => {
		it('should contains FORMER_THIRTY_DAYS property', () => {
			expect(DateEnums).toHaveProperty('FORMER_THIRTY_DAYS', 30);
		});
	});

	describe('PRESETTED_RANGES', () => {
		it('should contains TODAY property', () => {
			const type = 'today';
			const value = { '今天': getToday, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});

		it('should contains YESTERDAY property', () => {
			const type = 'yesterday';
			const value = { '昨天': getYesterday, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});

		it('should contains THIS_WEEK property', () => {
			const type = 'thisWeek';
			const value = { '本周': getThisWeek, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});

		it('should contains LAST_SEVEN_DAYS property', () => {
			const type = 'lastSevenDays';
			const value = { '七天': getLastSevenDay, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});

		it('should contains LAST_THIRTYDAYS property', () => {
			const type = 'lastThirtyDays';
			const value = { '三十天': getLastThirtyDay, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});

		it('should contains PRESENT_PERIOD property', () => {
			const type = 'presentPeriod';
			const value = { '当前周期': getPresentPeriod, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});

		it('should contains LAST_PERIOD property', () => {
			const type = 'previousPeriod';
			const value = { '上一周期': getPreviousPeriod, };

			expect(PRESETTED_RANGES).toHaveProperty(type, value);
		});
	});

	describe('getToday', () => {
		let today;

		beforeEach(() => {
			today = getToday();
		});
		afterEach(() => {
			today = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(today).toBeInstanceOf(Array);
			expect(today.length).toEqual(2);
		});
		it('return array should start with startOfToday, end with endOfToday', () => {
			const startOfToday = moment().startOf('day');
			const endOfToday = moment().endOf('day');

			expect(today[0]).toEqual(startOfToday);
			expect(today[1]).toEqual(endOfToday);
		});
	});
	describe('getToday and offset 3 hours ', () => {
		let today;
		const hourOffset = 3;

		beforeEach(() => {
			today = getToday(hourOffset);
		});
		afterEach(() => {
			today = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(today).toBeInstanceOf(Array);
			expect(today.length).toEqual(2);
		});
		it('return array should start with startOfToday and offset 3 hours, end with endOfToday and offset 3 hours', () => {
			const startOfToday = moment().startOf('day').add(hourOffset, 'hour');
			const endOfToday = moment().endOf('day').add(hourOffset, 'hour');

			expect(today[0]).toEqual(startOfToday);
			expect(today[1]).toEqual(endOfToday);
		});
	});
	describe('getYesterday', () => {
		let yesterday;

		beforeEach(() => {
			yesterday = getYesterday();
		});
		afterEach(() => {
			yesterday = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(yesterday).toBeInstanceOf(Array);
			expect(yesterday.length).toEqual(2);
		});
		it('return array should start with startOfToday, end with endOfToday', () => {
			const startOfYesterday = moment().subtract(1, 'days').startOf('day');
			const endOfYesterday = moment().subtract(1, 'days').endOf('day');

			expect(yesterday[0]).toEqual(startOfYesterday);
			expect(yesterday[1]).toEqual(endOfYesterday);
		});
	});
	describe('getYesterday and offset 3 hours', () => {
		let yesterday;
		const hourOffset = 3;

		beforeEach(() => {
			yesterday = getYesterday(hourOffset);
		});
		afterEach(() => {
			yesterday = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(yesterday).toBeInstanceOf(Array);
			expect(yesterday.length).toEqual(2);
		});
		it('return array should start with startOfToday and offset 3 hours, end with endOfToday and offset 3 hours', () => {
			const startOfYesterday = moment().subtract(1, 'days').startOf('day').add(hourOffset, 'hour');
			const endOfYesterday = moment().subtract(1, 'days').endOf('day').add(hourOffset, 'hour');

			expect(yesterday[0]).toEqual(startOfYesterday);
			expect(yesterday[1]).toEqual(endOfYesterday);
		});
	});
	describe('getThisWeek', () => {
		let thisWeek;

		beforeEach(() => {
			thisWeek = getThisWeek();
		});
		afterEach(() => {
			thisWeek = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(thisWeek).toBeInstanceOf(Array);
			expect(thisWeek.length).toEqual(2);
		});
		it('return array should start with startOfToday, end with endOfToday', () => {
			const startOfThisWeek = moment().day(0).startOf('day');
			const endOfThisWeek = moment().day(6).endOf('day');

			expect(thisWeek[0]).toEqual(startOfThisWeek);
			expect(thisWeek[1]).toEqual(endOfThisWeek);
		});
	});
	describe('getThisWeek and offset 3 hours', () => {
		let thisWeek;
		const hourOffset = 3;

		beforeEach(() => {
			thisWeek = getThisWeek(hourOffset);
		});
		afterEach(() => {
			thisWeek = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(thisWeek).toBeInstanceOf(Array);
			expect(thisWeek.length).toEqual(2);
		});
		it('return array should start with startOfToday and offset 3 hours, end with endOfToday and offset 3 hours', () => {
			const startOfThisWeek = moment().day(0).startOf('day').add(hourOffset, 'hour');
			const endOfThisWeek = moment().day(6).endOf('day').add(hourOffset, 'hour');

			expect(thisWeek[0]).toEqual(startOfThisWeek);
			expect(thisWeek[1]).toEqual(endOfThisWeek);
		});
	});
	describe('Period().getLastSevenDay', () => {
		let lastSevenDay;

		beforeEach(() => {
			lastSevenDay = getLastSevenDay();
		});
		afterEach(() => {
			lastSevenDay = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(lastSevenDay).toBeInstanceOf(Array);
			expect(lastSevenDay.length).toEqual(2);
		});
		it('return array should start with startOfLastSevenDay, end with endOfToday', () => {
			const startOfLastSevenDay = moment().subtract(6, 'days').startOf('day');
			const endOfToday = moment().endOf('day');

			expect(lastSevenDay[0]).toEqual(startOfLastSevenDay);
			expect(lastSevenDay[1]).toEqual(endOfToday);
		});
	});
	describe('Period().getLastSevenDay and offset 3 hours', () => {
		let lastSevenDay;
		const hourOffset = 3;

		beforeEach(() => {
			lastSevenDay = getLastSevenDay(hourOffset);
		});
		afterEach(() => {
			lastSevenDay = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(lastSevenDay).toBeInstanceOf(Array);
			expect(lastSevenDay.length).toEqual(2);
		});
		it('return array should start with startOfLastSevenDay and offset 3 hours, end with endOfToday and offset 3 hours', () => {
			const startOfLastSevenDay = moment().subtract(6, 'days').startOf('day').add(hourOffset, 'hour');
			const endOfToday = moment().endOf('day').add(hourOffset, 'hour');

			expect(lastSevenDay[0]).toEqual(startOfLastSevenDay);
			expect(lastSevenDay[1]).toEqual(endOfToday);
		});
	});
	describe('getLastThirtyDay', () => {
		let lastThirtyDay;

		beforeEach(() => {
			lastThirtyDay = getLastThirtyDay();
		});
		afterEach(() => {
			lastThirtyDay = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(lastThirtyDay).toBeInstanceOf(Array);
			expect(lastThirtyDay.length).toEqual(2);
		});
		it('return array should start with startOfLastThirtyDay, end with endOfToday', () => {
			const startOfLastThirtyDay = moment().subtract(29, 'days').startOf('day');
			const endOfToday = moment().endOf('day');

			expect(lastThirtyDay[0]).toEqual(startOfLastThirtyDay);
			expect(lastThirtyDay[1]).toEqual(endOfToday);
		});
	});
	describe('getLastThirtyDay and offset 3 hours', () => {
		let lastThirtyDay;
		const hourOffset = 3;

		beforeEach(() => {
			lastThirtyDay = getLastThirtyDay(hourOffset);
		});
		afterEach(() => {
			lastThirtyDay = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(lastThirtyDay).toBeInstanceOf(Array);
			expect(lastThirtyDay.length).toEqual(2);
		});
		it('return array should start with startOfLastThirtyDay and offset 3 hours, end with endOfToday and offset 3 hours', () => {
			const startOfLastThirtyDay = moment().subtract(29, 'days').startOf('day').add(hourOffset, 'hour');
			const endOfToday = moment().endOf('day').add(hourOffset, 'hour');

			expect(lastThirtyDay[0]).toEqual(startOfLastThirtyDay);
			expect(lastThirtyDay[1]).toEqual(endOfToday);
		});
	});
	describe('getPresentPeriod', () => {
		let presetPeriod;
		let today;

		beforeEach(() => {
			presetPeriod = getPresentPeriod();
			today = moment();
		});
		afterEach(() => {
			presetPeriod = undefined;
			today = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(presetPeriod).toBeInstanceOf(Array);
			expect(presetPeriod.length).toEqual(2);
		});
		it('return array should start with startOfPresetPeriodFistDay, end with today', () => {
			const thisMonthFirstHalfPeriodStart = today.clone().startOf('month').add(3, 'hour');
			const thisMonthLastHalfPeriodStart = today.clone().startOf('month').add(15, 'days').add(3, 'hour');
			const lastMonthLastHalfPeriodStart = today.clone().subtract(1,'months').startOf('month').add(15, 'days').add(3, 'hour');
			const isLastMonthLastHalfPeriod = today.clone().isBefore(thisMonthFirstHalfPeriodStart);
			const isThisMonthFirstHalfPeriod = today.clone().isBefore(thisMonthLastHalfPeriodStart) && today.clone().isAfter(thisMonthFirstHalfPeriodStart);

			let startOfPresetPeriodFirstDay;

			if (isLastMonthLastHalfPeriod) {
				startOfPresetPeriodFirstDay = lastMonthLastHalfPeriodStart;
			} else {
				if (isThisMonthFirstHalfPeriod) {
					startOfPresetPeriodFirstDay = thisMonthFirstHalfPeriodStart;
				} else {
					startOfPresetPeriodFirstDay = thisMonthLastHalfPeriodStart;
				}
			}

			expect(presetPeriod[0]).toEqual(startOfPresetPeriodFirstDay);
			expect(presetPeriod[1]).toEqual(today);
		});
	});
	describe('getPreviousPeriod', () => {
		let previousPeriod;
		let today;

		beforeEach(() => {
			previousPeriod = getPreviousPeriod();
			today = moment();
		});
		afterEach(() => {
			previousPeriod = undefined;
			today = undefined;
		});

		it('should return an array with length of 2', () => {
			expect(previousPeriod).toBeInstanceOf(Array);
			expect(previousPeriod.length).toEqual(2);
		});
		it('return array should start with startOfPreviousPeriodFirstDay, end with endOfPreviousPeriodLastDay', () => {
			const thisMonthFirstHalfPeriodStart = today.clone().startOf('month').add(3, 'hour');
			const thisMonthLastHalfPeriodStart = today.clone().startOf('month').add(15, 'days').add(3, 'hour');
			const lastMonthFirstHalfPeriodStart = today.clone().subtract(1,'months').startOf('month').add(3, 'hour');
			const lastMonthLastHalfPeriodStart = today.clone().subtract(1,'months').startOf('month').add(15, 'days').add(3, 'hour');
			const isLastMonthLastHalfPeriod = today.clone().isBefore(thisMonthFirstHalfPeriodStart);
			const isThisMonthFirstHalfPeriod = today.clone().isBefore(thisMonthLastHalfPeriodStart) && today.clone().isAfter(thisMonthFirstHalfPeriodStart);

			let startOfPreviousPeriodFirstDay;

			let endOfPreviousPeriodLastDay;

			if (isLastMonthLastHalfPeriod) {
				startOfPreviousPeriodFirstDay = lastMonthFirstHalfPeriodStart,
				endOfPreviousPeriodLastDay = lastMonthLastHalfPeriodStart;
			} else {
				if (isThisMonthFirstHalfPeriod) {
					startOfPreviousPeriodFirstDay = lastMonthLastHalfPeriodStart,
					endOfPreviousPeriodLastDay = thisMonthFirstHalfPeriodStart;
				} else {
					startOfPreviousPeriodFirstDay = thisMonthFirstHalfPeriodStart,
					endOfPreviousPeriodLastDay = thisMonthLastHalfPeriodStart;
				}
			}

			expect(previousPeriod[0]).toEqual(startOfPreviousPeriodFirstDay);
			expect(previousPeriod[1]).toEqual(endOfPreviousPeriodLastDay);
		});
	});

	describe('getFormerDay(days) with argument 30 as days', () => {
		let days;
		let formerThirtyDays;
		let today;

		beforeEach(() => {
			days = 30;
			today = moment();
			formerThirtyDays = getFormerDay(days);
		});
		afterEach(() => {
			days = undefined;
			today = undefined;
			formerThirtyDays = undefined;
		});

		it('should return an object', () => {
			expect(formerThirtyDays).toBeInstanceOf(Object);
			expect(formerThirtyDays instanceof moment).toEqual(true);
		});

		it('today subtract days should be equal formerThirtyDays', () => {
			const duration = moment.duration(today.diff(formerThirtyDays)).asDays();

			expect(duration).toEqual(days);
		});
	});
	describe('onOverLimitDays need to call when set limitDays', () => {
		it('should be true when diffDay more than limitDays', () => {
			const value = [moment('2019-04-01', 'YYYY/MM/DD'), moment('2019-04-08', 'YYYY/MM/DD'),];
			const wrapper = shallow(<DateRangePicker limitDays={7}/>);

			wrapper.instance()._handleChange(value);
			wrapper.instance()._handleOpenChange(false);
			expect(wrapper.state().isOverLimitDays).toEqual(true);
		});
		it('should be false when diffDay more than limitDays', () => {
			const value = [moment('2019-04-01', 'YYYY/MM/DD'), moment('2019-04-07', 'YYYY/MM/DD'),];
			const wrapper = shallow(<DateRangePicker limitDays={7}/>);

			wrapper.instance()._handleChange(value);
			wrapper.instance()._handleOpenChange(false);
			expect(wrapper.state().isOverLimitDays).toEqual(false);
		});
		it('should handle onOverLimitDays event', () => {
			const onOverLimitDays = jest.fn();
			const value = [moment('2019-04-01', 'YYYY/MM/DD'), moment('2019-04-22', 'YYYY/MM/DD'),];
			const wrapper = shallow(<DateRangePicker onOverLimitDays={onOverLimitDays} limitDays={7}/>);
	
			wrapper.instance()._handleChange(value);
			wrapper.instance()._handleOpenChange(false);
			expect(onOverLimitDays).toBeCalled();
		});
	});

	describe('getLaterDay(days) with argument 1 as days', () => {
		let days;
		let laterOneDays;
		let today;

		beforeEach(() => {
			days = 1;
			today = moment();
			laterOneDays = getLaterDay(days);
		});
		afterEach(() => {
			days = undefined;
			today = undefined;
			laterOneDays = undefined;
		});

		it('should return an object', () => {
			expect(laterOneDays).toBeInstanceOf(Object);
			expect(laterOneDays instanceof moment).toEqual(true);
		});

		it('today subtract days should be equal laterOneDays', () => {
			const duration = moment.duration(laterOneDays.diff(today)).asDays();

			expect(duration).toEqual(days);
		});
	});

	describe('_getDisableDate(Date) from formerThirtyDays to today', () => {
		let days;
		let today;
		let yesterday;
		let tomorrow;
		let formerThirtyDays;
		let formerThirtyOneDays;
		let props;
		let wrapper;

		beforeEach(() => {
			days = DateEnums.FORMER_THIRTY_DAYS;
			today = moment();
			yesterday = moment().subtract(1, 'days').startOf('day');
			tomorrow = moment().add(1, 'days').endOf('day');
			formerThirtyDays = getFormerDay(days);
			formerThirtyOneDays = moment().subtract(31, 'days').startOf('day');
			props = {
				fromDate: formerThirtyDays,
				toDate: today,
			};
			wrapper = shallow(<DateRangePicker {...props}/>).instance();
		});
		afterEach(() => {
			days = undefined;
			today = undefined;
			yesterday = undefined;
			tomorrow = undefined;
			formerThirtyDays = undefined;
			formerThirtyOneDays = undefined;
			props = undefined;
			wrapper = undefined;
		});

		it('input today should return false', () => {
			const inputToday = wrapper._getDisableDate(today);

			expect(inputToday).toEqual(false);
		});

		it('input yesterday should return false', () => {
			const inputYesterday = wrapper._getDisableDate(yesterday);

			expect(inputYesterday).toEqual(false);
		});

		it('input tomorrow should return true', () => {
			const inputTomorrow = wrapper._getDisableDate(tomorrow);

			expect(inputTomorrow).toEqual(true);
		});

		it('input formerThirtyDays should return false', () => {
			const inputFormerThirtyDays = wrapper._getDisableDate(formerThirtyDays);

			expect(inputFormerThirtyDays).toEqual(false);
		});

		it('input formerThirtyDays should return true', () => {
			const inputFormerThirtyOneDays = wrapper._getDisableDate(formerThirtyOneDays);

			expect(inputFormerThirtyOneDays).toEqual(true);
		});
	});
});
