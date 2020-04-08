import React from 'react';
import { shallow, mount, } from 'enzyme';
import BankCard from '../components/bank-card';

describe('BankCard', () => {
	it('should handle default props', () => {
		const {
			className,
			isUnbindButtonVisible,
			onClickUnbind,
		} = BankCard.defaultProps;

		expect(className).toEqual('');
		expect(isUnbindButtonVisible).toBe(false);
		expect(onClickUnbind).toBeDefined();
		expect(onClickUnbind).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			className: 'mock-class',
			dataSource: {
				bankName: 'mock-bankName',
				payer: 'mock-payer',
				number: 'mock-number',
				activatedAt: '2019-08-13T10:38:43',
				withdrawableAt: '2019-08-13T16:38:43',
			},
			onClickUnbind: () => {},
			isUnbindButtonVisible: true,
		};
		const wrapper = shallow(<BankCard {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-bank-card', () => {
		const wrapper = shallow(
			<BankCard
				dataSource={{
					bankName: 'mock-bankName',
					payer: 'mock-payer',
					number: 'mock-number',
					activatedAt: '2019-08-13T10:38:43',
					withdrawableAt: '2019-08-13T16:38:43',
				}}
			/>
		);

		expect(wrapper.hasClass('ljit-bank-card')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<BankCard
				className={className}
				dataSource={{
					bankName: 'mock-bankName',
					payer: 'mock-payer',
					number: 'mock-number',
					activatedAt: '2019-08-13T10:38:43',
					withdrawableAt: '2019-08-13T16:38:43',
				}}
			/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	describe('when pass isUnbindButtonVisible', () => {
		it('should has class "ljit-bank-card__bottom class"', () => {
			const wrapper = mount(
				<BankCard
					dataSource={{
						bankName: 'mock-bankName',
						payer: 'mock-payer',
						number: 'mock-number',
						activatedAt: '2019-08-13T10:38:43',
						withdrawableAt: '2019-08-13T16:38:43',
					}}
					isUnbindButtonVisible={true}
				/>
			);

			expect(wrapper.find('.ljit-bank-card__bottom')).toHaveLength(1);
		});
		it('should handle onClickUnbind event', () => {
			const onClickUnbind = jest.fn();
			const dataSource = {
				bankName: 'mock-bankName',
				payer: 'mock-payer',
				number: 'mock-number',
				activatedAt: '2019-08-13T10:38:43',
				withdrawableAt: '2019-08-13T16:38:43',
			};
			const wrapper = mount(
				<BankCard
					onClickUnbind={onClickUnbind}
					dataSource={dataSource}
					isUnbindButtonVisible={true}
				/>
			);

			wrapper.find('button').simulate('click');
			expect(onClickUnbind).toHaveBeenCalledTimes(1);
			expect(onClickUnbind).toHaveBeenCalledWith(dataSource);
		});
	});

	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-class',
			dataSource: {
				bankName: 'mock-bankName',
				payer: 'mock-payer',
				number: 'mock-number',
				activatedAt: '2019-08-13T10:38:43',
				withdrawableAt: '2019-08-13T16:38:43',
			},
			isUnbindButtonVisible: true,
			onClickUnbind: () => {},
		};
		const wrapper = mount(<BankCard {...props}/>);

		expect(wrapper.props().className).toEqual(props.className);
		expect(wrapper.props().dataSource).toEqual(props.dataSource);
		expect(wrapper.props().isUnbindButtonVisible).toEqual(props.isUnbindButtonVisible);
		expect(wrapper.props().onClickUnbind).toEqual(props.onClickUnbind);
	});
});
