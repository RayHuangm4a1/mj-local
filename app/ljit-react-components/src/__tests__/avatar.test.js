const React = require('react');
const { shallow, mount, } = require('enzyme');

describe('Avatar', () => {
	let Avatar, Icon;

	beforeEach(() => {
		jest.mock('antd/lib/avatar');
		jest.mock('../components/icon', () => function mockComponent() {
			return <div/>;
		});
		Avatar = require('../components/avatar').default;
		Icon = require('../components/icon');
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('should render correctly', () => {
		const icon = 'close-circle';
		const wrapper = shallow(
			<Avatar
				icon={icon}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should handle error event', () => {
		const icon = 'close-circle';
		const onError = jest.fn();
		const event = {
			preventDefault: () => {},
		};
		const wrapper = shallow(<Avatar icon={icon} onError={onError} />);

		wrapper.simulate('error', event);
		expect(onError).toBeCalledWith(event);
	});

	it('should render icon', () => {
		const icon = 'check-circle';

		const wrapper = shallow(
			<Avatar
				icon={icon}
			/>
		);

		expect(wrapper.contains(<Icon type={icon}/>)).toBe(true);
	});

	it('should render text', () => {
		const text = 'mock-text';
		const wrapper = shallow(
			<Avatar
				text={text}
			/>
		);

		expect(wrapper.children().text()).toBe(text);
	});

	it('should mount in a full DOM', () => {
		const icon = 'close-circle';
		const style = {};
		const size = 'default';
		const src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
		const alt = 'ljit-avatar';
		const text = 'ljit';
		const onError = () => false;

		const wrapper = mount(
			<Avatar
				icon={icon}
				style={style}
				size={size}
				src={src}
				alt={alt}
				text={text}
				onError={onError}
			/>
		);

		expect(wrapper.props().icon).toBe(icon);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().size).toBe(size);
		expect(wrapper.props().src).toBe(src);
		expect(wrapper.props().alt).toBe(alt);
		expect(wrapper.props().text).toBe(text);
		expect(wrapper.props().onError).toEqual(onError);
	});

	describe('Avatar Size Enums', () => {
		it('should cotain small property', () => {
			expect(Avatar.SizeEnums).toHaveProperty('SMALL', 'small');
		});
		it('should cotain default property', () => {
			expect(Avatar.SizeEnums).toHaveProperty('DEFAULT', 'default');
		});
	});
});
