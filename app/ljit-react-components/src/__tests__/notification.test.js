import React from 'react';
import { shallow, mount, } from 'enzyme';
import Notification, { notificationGenerator, NotificationContent, } from '../components/notification';
import Icon from '../components/icon';

class NotificationTestContainer extends React.Component {
	constructor() {
		super();
		this._handleOpenNotification = this._handleOpenNotification.bind(this);
	}

	_handleOpenNotification() {
		return Notification.info({
			...this.props,
		});
	}

	render() {
		return (
			<button onClick={this._handleOpenNotification}>
				open notification
			</button>
		);
	}
}

jest.mock('antd/lib/notification', () => {
	return {
		info: () => () => {},
	};
});

describe('Notification', () => {
	it('should info be defined', () => {
		expect(Notification.info).toBeDefined();
	});

	it('should PlacementEnums be defined', () => {
		expect(Notification.PlacementEnums).toBeDefined();
	});

	it('should notificationGenerator return a function', () => {
		const result = notificationGenerator();

		expect(result).toBeInstanceOf(Function);
	});

	describe('when duration is less than zero', () => {
		it('should throw an error', () => {
			const duration = -1000;
			const title = 'mock-title';
			const description = 'mock-description';

			expect(() => {
				Notification.info({
					title,
					description,
					duration,
				});
			}).toThrowError(/^Notification: duration must greater than zero.$/);
		});
	});

	describe('when duration is equal to zero', () => {
		it('should return a function', () => {
			const duration = 0;
			const title = 'mock-title';
			const description = 'mock-description';

			expect(() => {
				Notification.info({
					title,
					description,
					duration,
				});
			}).toBeInstanceOf(Function);
		});
	});

	describe('when duration is greater than zero', () => {
		it('should return a function with a duration greater than zero', () => {
			const duration = 3000;
			const title = 'mock-title';
			const description = 'mock-description';

			expect(() => {
				Notification.info({
					title,
					description,
					duration,
				});
			}).toBeInstanceOf(Function);
		});
	});

	it('should handle default props', () => {
		const className = '';
		const title = '';
		const description = '';
		const iconType = Icon.IconTypeEnums.INFO_FILL;
		const placement = Notification.PlacementEnums.TOP_RIGHT;
		const duration = 3000;

		const wrapper = mount(
			<NotificationTestContainer
				className={className}
				iconType={iconType}
				title={title}
				description={description}
				placement={placement}
				duration={duration}
			/>
		);

		expect(wrapper.props().className).toEqual('');
		expect(wrapper.props().iconType).toEqual(Icon.IconTypeEnums.INFO_FILL);
		expect(wrapper.props().title).toEqual('');
		expect(wrapper.props().description).toEqual('');
		expect(wrapper.props().placement).toEqual(Notification.PlacementEnums.TOP_RIGHT);
		expect(wrapper.props().duration).toEqual(3000);
	});

	it('should render correctly', () => {
		const className = 'mock-class';
		const iconType = Icon.IconTypeEnums.INFO_FILL;
		const title = 'mock-title';
		const description = 'mock-description';
		const placement = 'topRight';
		const wrapper = shallow(
			<NotificationTestContainer
				className={className}
				iconType={iconType}
				title={title}
				description={description}
				placement={placement}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const iconType = null;
		const title = 'mock-title';
		const description = 'mock-description';
		const placement = Notification.PlacementEnums.TOP_RIGHT;
		const wrapper = mount(
			<NotificationTestContainer
				className={className}
				iconType={iconType}
				title={title}
				description={description}
				placement={placement}
			/>
		);

		expect(wrapper).toMatchSnapshot();

		const button = wrapper.find('button').at(0);

		button.simulate('click');

		expect(wrapper).toMatchSnapshot();
	});

	describe('Notification Content', () => {
		it('should contains default class ljit-notification__title', () => {
			const node = 'mock-title';
			const result = NotificationContent('title', node);

			expect(result).toEqual(<div className='ljit-notification__title'>{node}</div>);
		});

		it('should contains default class ljit-notification__description', () => {
			const node = 'mock-description';
			const result = NotificationContent('description', node);

			expect(result).toEqual(<div className='ljit-notification__description'>{node}</div>);
		});
	});

	describe('PlacementEnums', () => {
		it('should contain TOP_RIGHT property', () => {
			const type = 'topRight';

			expect(Notification.PlacementEnums.TOP_RIGHT).toEqual(type);
		});

		it('should contain TOP_LEFT property', () => {
			const type = 'topLeft';

			expect(Notification.PlacementEnums.TOP_LEFT).toEqual(type);
		});

		it('should contain BOTTOM_RIGHT property', () => {
			const type = 'bottomRight';

			expect(Notification.PlacementEnums.BOTTOM_RIGHT).toEqual(type);
		});

		it('should contain BOTTOM_LEFT property', () => {
			const type = 'bottomLeft';

			expect(Notification.PlacementEnums.BOTTOM_LEFT).toEqual(type);
		});
	});
});
