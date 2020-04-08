import React, { Component, } from 'react';
import { shallow, mount, } from 'enzyme';
import Menu from '../components/menu';

jest.mock('antd/lib/menu');

class MenuTestContainer extends Component {
	constructor() {
		super();
		this.state = {
			openKeys: [],
			selectedKeys: [],
		};
	}

	render() {
		return (
			<div>
				<Menu
					openKeys={this.state.openKeys}
					selectedKeys={this.state.selectedKeys}
					onSubMenuOpenChange={(openKeys) => this.setState({ openKeys, })}
					onMenuItemSelect={({ selectedKeys, }) => this.setState({ selectedKeys, })}
				>
					<Menu.Item key="1">1</Menu.Item>
					<Menu.SubMenu title="2" key="2">
						<Menu.Item key="2-1">2-1</Menu.Item>
						<Menu.SubMenu key="2-3" title="2-3">
							<Menu.Item key="2-3-1">2-3-1</Menu.Item>
						</Menu.SubMenu>
					</Menu.SubMenu>
					<Menu.SubMenu key="3" title="3">
						<Menu.ItemGroup key="3-1"  title="3-2">
							<Menu.Item key="3-1-1">3-1-1</Menu.Item>
						</Menu.ItemGroup>
						<Menu.ItemGroup key="3-2" title="3-2">
							<Menu.Item key="3-2-1">3-2-1</Menu.Item>
							<Menu.Item key="3-2-2">3-2-1</Menu.Item>
						</Menu.ItemGroup>
					</Menu.SubMenu>
				</Menu>
			</div>
		);
	}
}

describe('Menu', () => {
	it('handle default props', () => {
		const {
			themeType,
			modeType,
			onSubMenuOpenChange,
			onMenuItemSelect,
		} = Menu.defaultProps;

		expect(themeType).toEqual('light');
		expect(modeType).toEqual('inline');
		expect(onSubMenuOpenChange).toBeDefined();
		expect(onSubMenuOpenChange).toBeInstanceOf(Function);
		expect(onMenuItemSelect).toBeDefined();
		expect(onMenuItemSelect).toBeInstanceOf(Function);
	});

	describe('when wrap menu in a container', () => {
		it('should renders correctly', () => {
			const wrapper = shallow(<MenuTestContainer />);

			expect(wrapper.find(Menu)).toHaveLength(1);
		});
	});

	describe('ThemeTypeEnums', () => {
		it('should contain light property.', () => {
			expect(Menu.ThemeTypeEnums).toHaveProperty('LIGHT', 'light');
		});

		it('should contain dark property.', () => {
			expect(Menu.ThemeTypeEnums).toHaveProperty('DARK', 'dark');
		});
	});

	describe('ModeTypeEnums', () => {
		it('should contain inline property.', () => {
			expect(Menu.ModeTypeEnums).toHaveProperty('INLINE', 'inline');
		});

		it('should contain horizontal property.', () => {
			expect(Menu.ModeTypeEnums).toHaveProperty('HORIZONTAL', 'horizontal');
		});

		it('should contain vertical property.', () => {
			expect(Menu.ModeTypeEnums).toHaveProperty('VERTICAL', 'vertical');
		});
	});
});

describe('Sub Menu', () => {
	it('should be selectable by class ljit-menu__sub', () => {
		const wrapper = shallow(<Menu.SubMenu />);

		expect(wrapper.hasClass('ljit-menu__sub')).toEqual(true);
	});
});

describe('Menu Item', () => {
	it('should be selectable by class ljit-menu__item', () => {
		const wrapper = shallow(<Menu.Item />);

		expect(wrapper.hasClass('ljit-menu__item')).toEqual(true);
	});
});

describe('Menu ItemGroup', () => {
	it('should be selectable by class ljit-menu__group', () => {
		const wrapper = shallow(<Menu.ItemGroup />);

		expect(wrapper.hasClass('ljit-menu__group')).toEqual(true);
	});
});
