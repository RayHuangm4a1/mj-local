import React from 'react';
import { shallow, mount, } from 'enzyme';

describe('Layout', () => {
	let Layout, Sider, Header, Content, Footer;

	beforeEach(() => {
		jest.mock('antd/lib/layout');
		jest.mock('antd/lib/layout/Sider');
		Layout = require('../components/layout').default;
		({ Sider, Header, Content, Footer, } = Layout);
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('should render correctly', () => {
		const child = <div></div>;
		const style = {};
		const wrapper = shallow(
			<Layout
				style={style}
			>
				{child}
			</Layout>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-layout', () => {
		const wrapper = shallow(<Layout />);

		expect(wrapper.hasClass('ljit-layout')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Layout className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const style = {};
		const children = 'mock-children';

		const wrapper = mount(
			<Layout
				className={className}
				style={style}
			>
				{children}
			</Layout>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().children).toBe(children);
	});

	describe('Sider', () => {
		it('should render correctly', () => {
			const wrapper = shallow(
				<Sider/>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should mount in a full DOM', () => {
			const className = 'mock-class';
			const style = {};
			const children = 'mock-children';

			const wrapper = mount(
				<Sider
					className={className}
					style={style}
				>
					{children}
				</Sider>
			);

			expect(wrapper.props().className).toBe(className);
			expect(wrapper.props().style).toMatchObject(style);
			expect(wrapper.props().children).toBe(children);
		});
	});

	describe('Header', () => {
		it('should render correctly', () => {
			const child = <div></div>;
			const style = {};
			const wrapper = shallow(
				<Header
					style={style}
				>
					{child}
				</Header>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should be selectable by class ljit-layout-header', () => {
			const wrapper = shallow(<Header />);

			expect(wrapper.hasClass('ljit-layout-header')).toEqual(true);
		});

		it('should be selectable by custom class', () => {
			const className = 'mock-class';
			const wrapper = shallow(<Header className={className} />);

			expect(wrapper.hasClass(className)).toEqual(true);
		});

		it('should mount in a full DOM', () => {
			const className = 'mock-class';
			const style = {};
			const children = 'mock-children';

			const wrapper = mount(
				<Header
					className={className}
					style={style}
				>
					{children}
				</Header>
			);

			expect(wrapper.props().className).toBe(className);
			expect(wrapper.props().style).toMatchObject(style);
			expect(wrapper.props().children).toBe(children);
		});
	});

	describe('Content', () => {
		it('should render correctly', () => {
			const child = <div></div>;
			const style = {};
			const wrapper = shallow(
				<Content
					style={style}
				>
					{child}
				</Content>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should be selectable by class ljit-layout-content', () => {
			const wrapper = shallow(<Content />);

			expect(wrapper.hasClass('ljit-layout-content')).toEqual(true);
		});

		it('should be selectable by custom class', () => {
			const className = 'mock-class';
			const wrapper = shallow(<Content className={className} />);

			expect(wrapper.hasClass(className)).toEqual(true);
		});

		it('should mount in a full DOM', () => {
			const className = 'mock-class';
			const style = {};
			const children = 'mock-children';

			const wrapper = mount(
				<Content
					className={className}
					style={style}
				>
					{children}
				</Content>
			);

			expect(wrapper.props().className).toBe(className);
			expect(wrapper.props().style).toMatchObject(style);
			expect(wrapper.props().children).toBe(children);
		});
	});

	describe('Footer', () => {
		it('should render correctly', () => {
			const child = <div></div>;
			const style = {};
			const wrapper = shallow(
				<Footer
					style={style}
				>
					{child}
				</Footer>
			);

			expect(wrapper).toMatchSnapshot();
		});

		it('should be selectable by class ljit-layout-footer', () => {
			const wrapper = shallow(<Footer />);

			expect(wrapper.hasClass('ljit-layout-footer')).toEqual(true);
		});

		it('should be selectable by custom class', () => {
			const className = 'mock-class';
			const wrapper = shallow(<Footer className={className} />);

			expect(wrapper.hasClass(className)).toEqual(true);
		});

		it('should mount in a full DOM', () => {
			const className = 'mock-class';
			const style = {};
			const children = 'mock-children';

			const wrapper = mount(
				<Footer
					className={className}
					style={style}
				>
					{children}
				</Footer>
			);

			expect(wrapper.props().className).toBe(className);
			expect(wrapper.props().style).toMatchObject(style);
			expect(wrapper.props().children).toBe(children);
		});
	});
});
