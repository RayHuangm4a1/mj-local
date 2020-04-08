import React from 'react';
import { shallow, mount, } from 'enzyme';
import DropdownMenuBar from '../components/dropdown-menu-bar';

describe('DropdownMenuBar', () => {
	it('should handle default props', () => {
		const {
			menuItems,
			onClickMenu,
			onClickMask,
		} = DropdownMenuBar.defaultProps;

		expect(menuItems).toEqual([]);
		expect(onClickMenu).toBeDefined();
		expect(onClickMenu).toBeInstanceOf(Function);
		expect(onClickMask).toBeDefined();
		expect(onClickMask).toBeInstanceOf(Function);
	});

	it('should render correctly', () => {
		const props = {
			menuItems: [
				{ id: 1, title: 'mock-title1', dropdownContent: <div>mock-content1</div>, },
				{ id: 2, title: 'mock-title2', dropdownContent: <div>mock-content2</div>, },
			],
			selectedId: 1,
			onClickMenu: () => {},
			onClickMask: () => {},
		};

		const wrapper = shallow(<DropdownMenuBar {...props}/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const props = {
			menuItems: [
				{ id: 1, title: 'mock-title1', dropdownContent: <div>mock-content1</div>, },
				{ id: 2, title: 'mock-title2', dropdownContent: <div>mock-content2</div>, },
			],
			selectedId: 1,
			onClickMenu: () => {},
			onClickMask: () => {},
		};

		const wrapper = mount(<DropdownMenuBar {...props}/>);

		expect(wrapper.props().menuItems).toEqual(props.menuItems);
		expect(wrapper.props().selectedId).toEqual(props.selectedId);
		expect(wrapper.props().onClickMenu).toEqual(props.onClickMenu);
		expect(wrapper.props().onClickMask).toEqual(props.onClickMask);
	});
});
