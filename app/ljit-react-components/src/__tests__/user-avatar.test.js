import React from 'react';
import { shallow, mount, } from 'enzyme';
import UserAvatar from '../components/user-avatar';

const { SizeEnums, AlignmentEnums, } = UserAvatar;

describe('UserAvatar', () => {
	beforeEach(() => {
		jest.mock('antd/lib/avatar');
		jest.mock('../components/avatar', () => function mockComponent() {
			return <div />;
		});
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('handle default props', () => {
		const {
			size,
			alignment,
			onError,
		} = UserAvatar.defaultProps;

		expect(size).toEqual(SizeEnums.SMALL);
		expect(alignment).toEqual(AlignmentEnums.LEFT);
		expect(onError).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const text = 'user';
		const wrapper = shallow(
			<UserAvatar
				text={text}
				size={56}
				alignment={AlignmentEnums.LEFT}
				userName='mock-username'
				description='mock-description'
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-user-avatar', () => {
		const wrapper = shallow(<UserAvatar />);

		expect(wrapper.hasClass('ljit-user-avatar')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<UserAvatar className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by top: TOP', () => {
		const alignment = AlignmentEnums.TOP;
		const wrapper = shallow(<UserAvatar alignment={alignment} />);

		expect(wrapper.hasClass('ljit-user-avatar--top')).toEqual(true);
	});

	it('should be selectable by left: LEFT', () => {
		const alignment = AlignmentEnums.LEFT;
		const wrapper = shallow(<UserAvatar alignment={alignment} />);

		expect(wrapper.hasClass('ljit-user-avatar--left')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const style = {};
		const src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
		const alt = 'ljit-avatar';
		const text = 'ljit';
		const userName = 'User001';
		const onError = () => {};
		const alignment = AlignmentEnums.TOP;
		const description = 'mock-description';
		const size = 56;
		const wrapper = mount(
			<UserAvatar
				className={className}
				style={style}
				src={src}
				alt={alt}
				text={text}
				userName={userName}
				onError={onError}
				alignment={alignment}
				description={description}
				size={size}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().src).toBe(src);
		expect(wrapper.props().alt).toBe(alt);
		expect(wrapper.props().text).toBe(text);
		expect(wrapper.props().userName).toBe(userName);
		expect(wrapper.props().onError).toEqual(onError);
		expect(wrapper.props().alignment).toBe(alignment);
		expect(wrapper.props().description).toEqual(description);
		expect(wrapper.props().size).toEqual(size);
	});

	describe('Alignment Enums', () => {
		it('should contains TOP property', () => {
			const typeName = 'top';
			const formatType = 'TOP';

			expect(AlignmentEnums[formatType]).toEqual(typeName);
		});
		it('should contains LEFT property', () => {
			const typeName = 'left';
			const formatType = 'LEFT';

			expect(AlignmentEnums[formatType]).toEqual(typeName);
		});
	});
});
