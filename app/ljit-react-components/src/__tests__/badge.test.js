import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('Badge', () => {
	let Badge;

	beforeEach(() => {
		jest.doMock('antd/lib/badge');
		Badge = require('../components/badge').default;
	});

	afterEach(() => {
		jest.unmock('antd/lib/badge');
		Badge = undefined;
	});

	it('should handle default props', () => {
		const {
			className,
			overflowCount,
			isZeroVisible,
			isBordered,
		} = Badge.defaultProps;

		expect(className).toEqual('');
		expect(overflowCount).toEqual(99);
		expect(isZeroVisible).toEqual(false);
		expect(isBordered).toEqual(true);
	});

	it('should render correctly', () => {
		const className = 'mock-class';
		const count = 80;
		const overflowCount = 79;
		const isZeroVisible = false;
		const isBordered = true;
		const wrapper = shallow(
			<Badge
				className={className}
				count={count}
				overflowCount={overflowCount}
				isZeroVisible={isZeroVisible}
				isBordered={isBordered}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-badge', () => {
		const wrapper = shallow(
			<Badge />
		);

		expect(wrapper.hasClass('ljit-badge')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<Badge className={className} />
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const count = 80;
		const overflowCount = 79;
		const isZeroVisible = false;
		const isBordered = true;
		const children = 'mock-children';
		const wrapper = mount(
			<Badge
				className={className}
				count={count}
				overflowCount={overflowCount}
				isZeroVisible={isZeroVisible}
				isBordered={isBordered}
			>
				{children}
			</Badge>
		);

		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().count).toEqual(count);
		expect(wrapper.props().overflowCount).toEqual(overflowCount);
		expect(wrapper.props().isZeroVisible).toEqual(isZeroVisible);
		expect(wrapper.props().isBordered).toEqual(isBordered);
		expect(wrapper.props().children).toEqual(children);
	});

	describe('when pass isBordered in Badge', () => {
		it('should ljit-badge--bordered be selected by isBordered true', () => {
			const isBordered = true;
			const expected = true;
			const wrapper = shallow(<Badge isBordered={isBordered} />);

			expect(wrapper.hasClass('ljit-badge--bordered')).toEqual(expected);
		});

		it('should ljit-badge--no-bordered be selected by isBordered false', () => {
			const isBordered = false;
			const expected = true;
			const wrapper = shallow(<Badge isBordered={isBordered} />);

			expect(wrapper.hasClass('ljit-badge--no-bordered')).toEqual(expected);
		});
	});
});
