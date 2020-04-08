import React from 'react';
import { shallow, mount, } from 'enzyme';
import WalletsInfoCard ,{ PREFIX_CLASS, } from '../components/wallets-info-card';

describe('Wallets Info Card', () => {
	it('should PREFIX_CLASS to equal ljit-wallets-info-card', () => {
		expect(PREFIX_CLASS).toEqual('ljit-wallets-info-card');
	});

	it('should be selectable by PREFIX_CLASS', () => {
		const wrapper = shallow(<WalletsInfoCard/>);

		expect(wrapper.hasClass('ljit-wallets-info-card')).toEqual(true);
	});

	it('should be selectable by className', () => {
		const className = 'mock-class';
		const wrapper = shallow(<WalletsInfoCard className={className}/>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should handle default props', () => {
		const {
			size,
			status,
			iconColor,
			className,
			name,
			value,
			onClick,
		} = WalletsInfoCard.defaultProps;

		expect(size).toEqual(WalletsInfoCard.SizeEnums.MEDIUM);
		expect(status).toEqual(WalletsInfoCard.StatusEnums.BASIC);
		expect(iconColor).toEqual(WalletsInfoCard.IconColorEnums.YELLOW);
		expect(className).toEqual('');
		expect(name).toEqual('');
		expect(value).toEqual(0);
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should renders corrently', () => {
		const size = WalletsInfoCard.SizeEnums.MEDIUM;
		const status = WalletsInfoCard.StatusEnums.BASIC;
		const iconColor = WalletsInfoCard.IconColorEnums.YELLOW;
		const className = 'mock-class';
		const name = 'mock-name';
		const value = 0;
		const onClick = () => {};
		const wrapper = shallow(
			<WalletsInfoCard
				size={size}
				status={status}
				iconColor={iconColor}
				className={className}
				name={name}
				value={value}
				onClick={onClick}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => { 
		const size = WalletsInfoCard.SizeEnums.MEDIUM;
		const status = WalletsInfoCard.StatusEnums.BASIC;
		const iconColor = WalletsInfoCard.IconColorEnums.YELLOW;
		const className = 'mock-class';
		const name = 'mock-name';
		const value = 0;
		const onClick = () => {};
		const wrapper = mount(
			<WalletsInfoCard
				size={size}
				status={status}
				iconColor={iconColor}
				className={className}
				name={name}
				value={value}
				onClick={onClick}
			/>
		);

		expect(wrapper.props().status).toBe(status);
		expect(wrapper.props().size).toBe(size);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().name).toBe(name);
		expect(wrapper.props().value).toBe(value);
		expect(wrapper.props().onClick).toEqual(onClick);
	});

	it('should handle onclick event', () => {
		const onClick = jest.fn();
		const wrapper = shallow(<WalletsInfoCard onClick={onClick} />);

		wrapper.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});

	describe('SizeEnums', () => {
		it('should contains medium property', () => {
			const typeName = 'medium';
			const formatType = 'MEDIUM';

			expect(WalletsInfoCard.SizeEnums[formatType]).toEqual(typeName);
		});
		it('should contains small property', () => {
			const typeName = 'small';
			const formatType = 'SMALL';

			expect(WalletsInfoCard.SizeEnums[formatType]).toEqual(typeName);
		});
	});

	describe('StatusEnums', () => {
		it('should contains basic property', () => {
			const typeName = 'basic';
			const formatType = 'BASIC';

			expect(WalletsInfoCard.StatusEnums[formatType]).toEqual(typeName);
		});
		it('should contains incoming property', () => {
			const typeName = 'incoming';
			const formatType = 'INCOMING';

			expect(WalletsInfoCard.StatusEnums[formatType]).toEqual(typeName);
		});
		it('should contains outgoing property', () => {
			const typeName = 'outgoing';
			const formatType = 'OUTGOING';

			expect(WalletsInfoCard.StatusEnums[formatType]).toEqual(typeName);
		});
		it('should contains disabled property', () => {
			const typeName = 'disabled';
			const formatType = 'DISABLED';

			expect(WalletsInfoCard.StatusEnums[formatType]).toEqual(typeName);
		});
	});

	describe('IconColorEnums', () => {
		it('should contains yellow property', () => {
			const typeName = 'yellow';
			const formatType = 'YELLOW';

			expect(WalletsInfoCard.IconColorEnums[formatType]).toEqual(typeName);
		});
		it('should contains green property', () => {
			const typeName = 'green';
			const formatType = 'GREEN';

			expect(WalletsInfoCard.IconColorEnums[formatType]).toEqual(typeName);
		});
	});
});
