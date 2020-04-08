import React from 'react';
import { shallow, mount, } from 'enzyme';
import Notify, { NorifyContent, generator, } from '../components/notify';

jest.mock('antd/lib/message', () => {
	return {
		open: () => () => {},
	};
});
jest.mock('antd/lib/icon', () => function render() { return <div />; });
jest.mock('antd/lib/button');

jest.useFakeTimers();

describe('Notify', () => {
	it('should success be defined', () => {
		expect(Notify.success).toBeDefined();
	});

	it('should error be defined', () => {
		expect(Notify.error).toBeDefined();
	});

	describe('when duration less than zero', () => {
		it('should throw an error', () => {
			const duration = -500;
			const notify = generator('success');
			const content = 'notify content';

			expect(() => {
				notify(content, duration);
			}).toThrowError(/^Norify: duration must greater than zero.$/);
		});
	});
	describe('when duration equals zero', () => {
		it('should return a function', () => {
			const duration = 0;
			const notify = generator('success');
			const content = 'notify content';

			const result = notify(content, duration);

			expect(result).toBeInstanceOf(Function);
		});
	});
	describe('when duration greater than zero', () => {
		it('should setTmieout have been called', () => {
			const duration = 5000;
			const notify = generator('success');
			const content = 'notify content';

			notify(content, duration);

			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), duration);
		});
	});

	describe('Notify Type Enums', () => {
		it('should be defined', () => {
			expect(Notify.NotifyTypeEnums).toBeDefined();
		});

		it('should match NorifyContent\'s NotifyTypeEnums', () => {
			expect(Notify.NotifyTypeEnums).toMatchObject(NorifyContent.NotifyTypeEnums);
		});
	});
});

describe('Norify Content', () => {
	it('should handle default props', () => {
		const {
			notifyType,
			onClickClose,
		} = NorifyContent.defaultProps;

		expect(notifyType).toEqual(NorifyContent.NotifyTypeEnums.SUCCESS);
		expect(onClickClose).toBeDefined();
		expect(onClickClose).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const notifyType = NorifyContent.NotifyTypeEnums.ERROR;
		const content = 'notify content';
		const onClickClose = () => {};
		const wrapper = shallow(
			<NorifyContent
				notifyType={notifyType}
				content={content}
				onClickClose={onClickClose}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-notify', () => {
		const wrapper = shallow(<NorifyContent />);

		expect(wrapper.hasClass('ljit-notify')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const notifyType = NorifyContent.NotifyTypeEnums.ERROR;
		const content = 'notify content';
		const onClickClose = () => {};
		const wrapper = mount(
			<NorifyContent
				notifyType={notifyType}
				content={content}
				onClickClose={onClickClose}
			/>
		);

		expect(wrapper.props().notifyType).toEqual(notifyType);
		expect(wrapper.props().content).toEqual(content);
		expect(wrapper.props().onClickClose).toEqual(onClickClose);
	});

	describe('Notify Type Enums', () => {
		it('should contains success property', () => {
			const type = 'success';

			expect(NorifyContent.NotifyTypeEnums.SUCCESS).toEqual(type);
		});

		it('should contains error property', () => {
			const type = 'error';

			expect(NorifyContent.NotifyTypeEnums.ERROR).toEqual(type);
		});

		it('should contains info property', () => {
			const type = 'info';

			expect(NorifyContent.NotifyTypeEnums.INFO).toEqual(type);
		});
	});
});
