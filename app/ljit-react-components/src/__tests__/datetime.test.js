import React from 'react';
import { shallow, mount, } from 'enzyme';
import Datetime, { PREFIX_CLASS, } from '../components/datetime';

describe('Datetime', () => {
	let date;

	beforeEach(() => {
		date = '2019-06-25T13:00:00+00:00';
	});
	afterEach(() => {
		date = undefined;
	});

	it('should PREFIX_CLASS to equal ljit-datetime', () => {
		expect(PREFIX_CLASS).toEqual('ljit-datetime');
	});

	it('should handle default props', () => {
		const {
			format,
			className,
		} = Datetime.defaultProps;

		expect(format).toEqual('YYYY/MM/DD HH:mm:ss');
		expect(className).toEqual('');
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<Datetime
				data={date}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should wrapped by span', () => {
		const wrapper = shallow(
			<Datetime
				data={date}
			/>
		);

		expect(wrapper.type()).toEqual('span');
	});

	it('should be selectable by class ljit-datetime', () => {
		const className = 'ljit-datetime';
		const wrapper = shallow(<Datetime />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	describe('When pass invalid date', () => {
		let expected

		beforeEach(() => {
			expected = '';
		});
		afterEach(() => {
			expected = undefined;
		});

		it('should \'foo\' to be \'\'', () => {
			const fakeDate = 'foo';
			const wrapper = mount(
				<Datetime
					data={fakeDate}
				/>
			);

			expect(wrapper.text()).toEqual(expected);
		});

		it('should \'25/6/2019\' to be \'\'', () => {
			const fakeDate = '25/6/2019';
			const wrapper = mount(
				<Datetime
					data={fakeDate}
				/>
			);

			expect(wrapper.text()).toEqual(expected);
		});

		it('should \'123456789\' to be \'\'', () => {
			const fakeDate = '12345678';
			const wrapper = mount(
				<Datetime
					data={fakeDate}
				/>
			);

			expect(wrapper.text()).toEqual(expected);
		});
	});

	describe('DateOnly', () => {
		it('should contains DateOnly component', () => {
			const wrapper = shallow(
				<Datetime.DateOnly
					data={date}
				/>
			);

			expect(wrapper.exists()).toEqual(true);
		});

		it('should format to be \'YYYY/MM/DD\'', () => {
			const wrapper = shallow(
				<Datetime.DateOnly
					data={date}
				/>
			);

			expect(wrapper.props().format).toEqual('YYYY/MM/DD');
		});

		it('should \'2019-06-25T13:00:00+00:00\' to be \'2019/06/25\'', () => {
			const expected = '2019/06/25';
			const wrapper = mount(
				<Datetime.DateOnly
					data={date}
				/>
			);

			expect(wrapper.text()).toEqual(expected);
		});
	});

	describe('Time', () => {
		it('should contains Time component', () => {
			const wrapper = shallow(
				<Datetime.Time
					data={date}
				/>
			);

			expect(wrapper.exists()).toEqual(true);
		});

		it('should format to be \'HH:mm\'', () => {
			const wrapper = shallow(
				<Datetime.Time
					data={date}
				/>
			);

			expect(wrapper.props().format).toEqual('HH:mm');
		});

		it('should \'2019-06-25T13:00:00+00:00\' to be \'21:00\'', () => {
			const expected = '21:00';
			const wrapper = mount(
				<Datetime.Time
					data={date}
				/>
			);

			expect(wrapper.text()).toEqual(expected);
		});
	});

	describe('TimeSeconds', () => {
		it('should contains TimeSeconds component', () => {
			const wrapper = shallow(
				<Datetime.TimeSeconds
					data={date}
				/>
			);

			expect(wrapper.exists()).toEqual(true);
		});

		it('should format to be \'HH:mm:ss\'', () => {
			const wrapper = shallow(
				<Datetime.TimeSeconds
					data={date}
				/>
			);

			expect(wrapper.props().format).toEqual('HH:mm:ss');
		});

		it('should \'2019-06-25T13:00:00+00:00\' to be \'21:00:00\'', () => {
			const expected = '21:00:00';
			const wrapper = mount(
				<Datetime.TimeSeconds
					data={date}
				/>
			);

			expect(wrapper.text()).toEqual(expected);
		});
	});
});
