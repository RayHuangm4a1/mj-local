import React from 'react';
import { shallow, mount, } from 'enzyme';
import UserBreadcrumb from '../components/user-breadcrumb';

describe('UserBreadcrumb', () => {
	it('handle default props', () => {
		const {
			data,
			targetKey,
			omitText,
			className,
			separator,
			onClickUser,
			isShowingCurrentCount,
		} = UserBreadcrumb.defaultProps;

		expect(data).toEqual([]);
		expect(targetKey).toEqual('');
		expect(omitText).toEqual('......',);
		expect(className).toEqual('',);
		expect(separator).toEqual('>',);
		expect(onClickUser).toBeInstanceOf(Function);
		expect(isShowingCurrentCount).toBe(true);
	});

	it('should render correctly', () => {
		const data = ['mock-data',];
		const wrapper = shallow(
			<UserBreadcrumb
				data={data}
				targetKey=""
				omitText="......"
				className="mock-className"
				separator=">"
				onClickUser={() => {}}
				isShowingCurrentCount={true}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-user-breadcrumb', () => {
		const wrapper = shallow(<UserBreadcrumb />);

		expect(wrapper.hasClass('ljit-user-breadcrumb')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<UserBreadcrumb className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});
	it('should handle onClickUser', () => {
		const mockOnClickUser = jest.fn();
		const wrapper = shallow(
			<UserBreadcrumb
				data={['mock-data', 'mock-data-two',]}
				onClickUser={mockOnClickUser}
			/>
		);
		const ActiveUserSpan = wrapper.find('.ljit-user-breadcrumb__crumb--active').at(0);

		ActiveUserSpan.simulate('click');
		expect(mockOnClickUser).toHaveBeenCalledTimes(1);
		expect(mockOnClickUser).toHaveBeenCalledWith('mock-data');
	});
	it('should mount in a full DOM', () => {
		const data = ['mock-data',];
		const className = 'mock-class';
		const targetKey = '';
		const omitText = '......';
		const separator = '>';
		const onClickUser = () => {};
		const isShowingCurrentCount = true;

		const wrapper = mount(
			<UserBreadcrumb
				data={data}
				targetKey={targetKey}
				omitText={omitText}
				className={className}
				separator={separator}
				onClickUser={onClickUser}
				isShowingCurrentCount={isShowingCurrentCount}
			/>
		);

		expect(wrapper.props().data).toBe(data);
		expect(wrapper.props().targetKey).toBe(targetKey);
		expect(wrapper.props().omitText).toBe(omitText);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().separator).toBe(separator);
		expect(wrapper.props().onClickUser).toEqual(onClickUser);
		expect(wrapper.props().isShowingCurrentCount).toEqual(isShowingCurrentCount);
	});
});
