import React, { Children, } from 'react';
import { shallow, mount, render, } from 'enzyme';
import HeaderButtonBar, { prefixClass, } from '../components/header-button-bar';
import HeaderButtonBarPool from '../components/header-button-bar/pool';

describe('Header Button Bar', () => {
	describe('prefixClass', () => {
		it('should be header-button-bar', () => {
			const expectPrefixClass = 'header-button-bar';

			expect(prefixClass).toEqual(expectPrefixClass);
		});
	});

	it('should renders correctly', () => {
		const wrapper = render(
			<HeaderButtonBar
				left={<div>header title</div>}
				right={[
					<button key="btn1">btn 1</button>,
					<button key="btn2">btn 2</button>,
				]}
				className="mock-class"
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should contains two pools', () => {
		const _prefixClass = prefixClass;
		const left = <div>header title</div>;
		const right = [
			<button key="btn1">btn 1</button>,
			<button key="btn2">btn 2</button>,
		];
		const wrapper = shallow(<HeaderButtonBar left={left} right={right} />);

		expect(wrapper.contains([
			<HeaderButtonBarPool prefixClass={_prefixClass}>{left}</HeaderButtonBarPool>,
			<HeaderButtonBarPool prefixClass={_prefixClass}>{right}</HeaderButtonBarPool>,
		])).toEqual(true);
	});

	it('should be selectable by prefixClass', () => {
		const wrapper = shallow(<HeaderButtonBar />);

		expect(wrapper.hasClass(prefixClass)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const left = <div>header title</div>;
		const right = [
			<button key="btn1">btn 1</button>,
			<button key="btn2">btn 2</button>,
		];
		const className = 'mock-class';
		const wrapper = mount(
			<HeaderButtonBar
				left={left}
				right={right}
				className={className}
			/>
		);

		expect(wrapper.props().left).toEqual(left);
		expect(wrapper.props().right).toEqual(right);
		expect(wrapper.props().className).toEqual(className);
	});
});

describe('Header Button Bar Pool', () => {
	it('handle default props', () => {
		const {
			children,
		} = HeaderButtonBarPool.defaultProps;

		expect(children).toMatchObject([]);
	});

	it('should be selectable by \`${prefixClass}__pool\`', () => {
		const wrapper = shallow(<HeaderButtonBarPool prefixClass={prefixClass} />);

		expect(wrapper.hasClass(`${prefixClass}__pool`)).toEqual(true);
	});

	it('should \`${prefixClass}__pool--empty\` be selectable by zero item', () => {
		const wrapper = shallow(<HeaderButtonBarPool prefixClass={prefixClass} />);

		expect(wrapper.hasClass(`${prefixClass}__pool--empty`)).toEqual(true);
	});

	describe('when pass children', () => {
		it('should renders three item', () => {
			const children = [
				<button key="btn1">btn 1</button>,
				<button key="btn2">btn 2</button>,
				<button key="btn3">btn 3</button>,
			];
			const itemClass = `.${prefixClass}__item`;
			const wrapper = shallow(
				<HeaderButtonBarPool prefixClass={prefixClass}>
					{children}
				</HeaderButtonBarPool>
			);

			expect(wrapper.find(itemClass)).toHaveLength(3);
		});
	});
});
