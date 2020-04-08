import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import HeaderBanner from '../components/header-banner';
import {
	ADD_INFO,
	UPDATE_INFO,
	REMOVE_INFO,
	addInfo,
	updateInfo,
	removeInfo,
	reducer,
} from '../components/header-banner/store';

jest.mock('../components/breadcrumb', () => function mockComponent() {
	return <div />;
});

describe('Header Banner', () => {
	it('should renders correctly', () => {
		const className = 'mock-class';
		const Breadcrumb = (
			<ul>
				<li>Home</li>
				<li>Page 1</li>
				<li>Page 1-1</li>
			</ul>
		);
		const component = render(<HeaderBanner className={className} breadcrumb={Breadcrumb} />);

		expect(component).toMatchSnapshot();
	});

	it('should be selectable by class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<HeaderBanner className={className} />);

		expect(wrapper.is('.mock-class')).toEqual(true);
		expect(wrapper.is('.ljit-header-banner')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const Breadcrumb = (
			<ul>
				<li>Home</li>
				<li>Page 1</li>
				<li>Page 1-1</li>
			</ul>
		);
		const wrapper = mount(
			<HeaderBanner
				className={className}
				breadcrumb={Breadcrumb}
			/>
		);

		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().breadcrumb).toBe(Breadcrumb);
	});

	describe('actions', () => {
		it('should create an action to add banner info', () => {
			const title = 'Page Title';
			const description = 'page description';
			const isBannerVisible = true;
			const expectedAction = {
				type: ADD_INFO,
				payload: {
					title,
					description,
					isBannerVisible,
				},
			};

			expect(addInfo({ title, description, isBannerVisible, })).toEqual(expectedAction);
		});

		it('should create an action to update banner info', () => {
			const title = 'Page Title';
			const description = 'page description';
			const isBannerVisible = false;
			const expectedAction = {
				type: UPDATE_INFO,
				payload: {
					title,
					description,
					isBannerVisible,
				},
			};

			expect(updateInfo({ title, description, isBannerVisible, })).toEqual(expectedAction);
		});

		it('should create an action to remove banner info', () => {
			const expectedAction = {
				type: REMOVE_INFO,
			};

			expect(removeInfo()).toEqual(expectedAction);
		});
	});

	describe('reducer', () => {
		it('should return the initial state', () => {
			const initialState = undefined;
			const initialAction = {};
			const expectedState = {
				title: '',
				description: '',
				isBannerVisible: true,
			};

			expect(reducer(initialState, initialAction)).toEqual(expectedState);
		});

		it('should handle ADD_INFO', () => {
			const title = 'Page Title';
			const description = 'page description';
			const isBannerVisible = true;
			const initialState = undefined;
			const action = {
				type: ADD_INFO,
				payload: {
					title,
					description,
					isBannerVisible,
				},
			};
			const expectedState = {
				title,
				description,
				isBannerVisible,
			};

			expect(reducer(initialState, action)).toEqual(expectedState);
		});

		it('should handle UPDATE_INFO', () => {
			const title = 'Page Title';
			const description = 'page description';
			const isBannerVisible = false;
			const initialState = undefined;
			const action = {
				type: UPDATE_INFO,
				payload: {
					title,
					description,
					isBannerVisible,
				},
			};
			const expectedState = {
				title,
				description,
				isBannerVisible,
			};

			expect(reducer(initialState, action)).toEqual(expectedState);
		});

		it('should handle REMOVE_INFO', () => {
			const initialState = undefined;
			const action = {
				type: REMOVE_INFO,
			};
			const expectedState = {
				title: '',
				description: '',
				isBannerVisible: true,
			};

			expect(reducer(initialState, action)).toEqual(expectedState);
		});
	});
});
