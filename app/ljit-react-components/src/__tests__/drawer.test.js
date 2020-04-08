import React, { Component, } from 'react';
import { shallow, mount, } from 'enzyme';
import Drawer from '../components/drawer';

class DrawerTestContainer extends Component {
	constructor() {
		super();
		this.state = {
			isVisible: false,
		};
		this.handleVisible = this.handleVisible.bind(this);
	}

	handleVisible() {
		this.setState({ isVisible: !this.state.isVisible, });
	}

	render() {
		return (
			<div>
				<button onClick={this.handleVisible}>open Drawer</button>
				<Drawer
					isVisible={this.state.isVisible}
					{...this.props}
				/>
			</div>
		);
	}
}

describe('Drawer', () => {
	it('handle default props', () => {
		const {
			isVisible,
			placement,
			width,
			height,
			isShowCloseIcon,
			isMaskClosable,
			isShowMask,
			onClose,
		} = Drawer.defaultProps;

		expect(isVisible).toEqual(false);
		expect(placement).toBe('right');
		expect(width).toBe('256px');
		expect(height).toBe('256px');
		expect(isShowCloseIcon).toEqual(true);
		expect(isMaskClosable).toEqual(true);
		expect(isShowMask).toEqual(false);
		expect(onClose).toBeDefined();
		expect(onClose).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const className = 'mock-classname';
		const isVisible = true;
		const placement = 'right';
		const title = 'mock-title';
		const width = '300px';
		const height = '300px';
		const style = { color: '#f00b00', };
		const onClose = () => {};
		const children = 'drawer-content';
		const isShowCloseIcon = true;
		const isMaskClosable = true;
		const isShowMask = false;

		const wrapper = shallow(
			<Drawer
				className={className}
				isVisible={isVisible}
				placement={placement}
				title={title}
				width={width}
				height={height}
				style={style}
				onClose={onClose}
				isShowCloseIcon={isShowCloseIcon}
				isMaskClosable={isMaskClosable}
				isShowMask={isShowMask}
			>
				{children}
			</Drawer>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			className: 'mock-classname',
			isVisible: false,
			placement: 'right',
			title: 'mock-title',
			width: '300px',
			height: '300px',
			style: { color: '#f00b00', },
			onClose: () => {},
			children: 'drawer-content',
			isShowCloseIcon: true,
			isMaskClosable: true,
			isShowMask: false,
		};
		const wrapper = mount(<Drawer {...props} />);

		expect(wrapper.props().className).toBe(props.className);
		expect(wrapper.props().isVisible).toBe(props.isVisible);
		expect(wrapper.props().placement).toBe(props.placement);
		expect(wrapper.props().title).toBe(props.title);
		expect(wrapper.props().width).toBe(props.width);
		expect(wrapper.props().height).toBe(props.height);
		expect(wrapper.props().onClose).toBe(props.onClose);
		expect(wrapper.props().children).toBe(props.children);
		expect(wrapper.props().isShowCloseIcon).toEqual(props.isShowCloseIcon);
		expect(wrapper.props().isMaskClosable).toBe(props.isMaskClosable);
		expect(wrapper.props().isShowMask).toBe(props.isShowMask);
	});

	describe('when wrap drawer in a container', () => {
		it('should renders correctly', () => {
			const wrapper = shallow(<DrawerTestContainer />);

			expect(wrapper.find(Drawer)).toHaveLength(1);
			expect(wrapper.find(Drawer).prop('isVisible')).toEqual(false);
		});

		it('should opens drawer when button is clicked', () => {
			const wrapper = shallow(<DrawerTestContainer />);

			wrapper.find('button').simulate('click');
			expect(wrapper.find(Drawer).prop('isVisible')).toEqual(true);
		});

		it('should handle onClose when CloseIcon is clicked', () => {
			const onClose = jest.fn();
			const wrapper = mount(<Drawer
				isVisible={true}
				onClose={onClose}
				isShowCloseIcon={true}
			>
				drawer-content
			</Drawer>);

			wrapper.find('.ant-drawer-close').simulate('click');
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalled();
		});

		it('should handle onClose when mask is clicked', () => {
			const onClose = jest.fn();
			const wrapper = mount(<Drawer
				isVisible={true}
				onClose={onClose}
				isShowMask={true}
			>
				drawer-content
			</Drawer>);

			wrapper.find('.ant-drawer-mask').simulate('click');
			expect(onClose).toHaveBeenCalledTimes(1);
			expect(onClose).toHaveBeenCalled();
		});
	});
});

describe('PlacementEnums ', () => {
	it('should contains small property', () => {
		const typeName = 'top';
		const formatType = 'TOP';

		expect(Drawer.PlacementEnums[formatType]).toEqual(typeName);
	});

	it('should contains normal property', () => {
		const typeName = 'right';
		const formatType = 'RIGHT';

		expect(Drawer.PlacementEnums[formatType]).toEqual(typeName);
	});

	it('should contains large property', () => {
		const typeName = 'bottom';
		const formatType = 'BOTTOM';

		expect(Drawer.PlacementEnums[formatType]).toEqual(typeName);
	});

	it('should contains large property', () => {
		const typeName = 'left';
		const formatType = 'LEFT';

		expect(Drawer.PlacementEnums[formatType]).toEqual(typeName);
	});
});
