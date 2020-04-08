import React from 'react';
import { shallow, mount, render, } from 'enzyme';
import RemindText, { prefixClass, } from '../components/remind-text';

describe('Remind Text', () => {
	describe('prefixClass', () => {
		it('should be remind-text', () => {
			const expectPrefixClass = 'remind-text';

			expect(prefixClass).toEqual(expectPrefixClass);
		});
	});

	it('handle default props', () => {
		const {
			styleType,
			text,
		} = RemindText.defaultProps;

		expect(styleType).toEqual('default');
		expect(text).toEqual('');
	});

	it('should renders correctly', () => {
		const className = 'mock-class';
		const styleType = 'default';
		const text = 'mock text'
		const wrapper = render(
			<RemindText
				className={className}
				styleType={styleType}
				text={text}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by prefixClass', () => {
		const wrapper = shallow(<RemindText />);

		expect(wrapper.hasClass(prefixClass)).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<RemindText className={className} />);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const styleType = 'default';
		const text = 'mock text'
		const wrapper = mount(
			<RemindText
				className={className}
				styleType={styleType}
				text={text}
			/>
		);

		expect(wrapper.props().className).toEqual(className);
		expect(wrapper.props().styleType).toEqual(styleType);
		expect(wrapper.props().text).toEqual(text);
	});

	describe('when pass text', () => {
		it('should renders string', () => {
			const text = 'mock text';
			const wrapper = shallow(<RemindText text={text} />);

			expect(wrapper.text()).toEqual(text);
		});

		it('should renders react node', () => {
			const text = (
				<div>
					<div>mock text 1</div>
					<div>mock text 2</div>
					<div>mock text 3</div>
				</div>
			);
			const wrapper = shallow(<RemindText text={text} />);

			expect(wrapper.contains(text)).toEqual(true);
		});

		it('should renders array', () => {
			const text = [
				<div key="text-1">mock text 1</div>,
				<div key="text-2">mock text 2</div>,
				<div key="text-3">mock text 3</div>,
			];
			const wrapper = shallow(<RemindText text={text} />);

			expect(wrapper.contains(text)).toEqual(true);
		});
	});
});
