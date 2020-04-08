import React from 'react';
import { shallow, mount, } from 'enzyme';
import TraceRecordCard from '../components/trace-record-card';

describe('Trace Info Card', () => {
	it('handle default props', () => {
		const {
			onClick,
			traceRecord,
			className,
		} = TraceRecordCard.defaultProps;

		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
		expect(traceRecord).toEqual({});
		expect(className).toBe('');
	});

	it('should renders correctly', () => {
		const wrapper = shallow(
			<TraceRecordCard
				traceRecord={{
					id: 201901240027,
					name: 'mock-name',
					lotteryName: 'mock-lottery',
					amountPerBet: 10,
					totalIssues: 2,
					reward: 0,
					issue: '20190701-0001',
					opencode: '',
					status: TraceRecordCard.StatusEnums.INCOMPLETE,
					createdAt: new Date('2019-04-13T10:38:43'),
				}}
				className='mock-class'
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-trace-info-card', () => {
		const wrapper = shallow(<TraceRecordCard/>);

		expect(wrapper.hasClass('ljit-trace-info-card')).toEqual(true);
	});

	it('should contains class ljit-trace-info-card__info', () => {
		const wrapper = shallow(<TraceRecordCard/>);

		expect(wrapper.find('.ljit-trace-info-card__info')).toHaveLength(1);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<TraceRecordCard className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});
	it('should handle onClick event', () => {
		const onClick = jest.fn();
		const wrapper = mount(
			<TraceRecordCard
				onClick={onClick}
			/>
		);

		wrapper.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});

	it('should mount in a full DOM', () => {
		const traceRecord = {
			id: 201901240027,
			name: 'mock-name',
			lotteryName: 'mock-lottery',
			amountPerBet: 10,
			totalIssues: 2,
			reward: 0,
			issue: '20190701-0001',
			opencode: '',
			status: TraceRecordCard.StatusEnums.INCOMPLETE,
			createdAt: new Date('2019-04-13T10:38:43'),
		};
		const className = 'mock-class';
		const onClick = () => {};
		const wrapper = mount(
			<TraceRecordCard
				traceRecord={traceRecord}
				className={className}
				onClick={onClick}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().traceRecord).toMatchObject(traceRecord);
		expect(wrapper.props().onClick).toEqual(onClick);
	});
});
