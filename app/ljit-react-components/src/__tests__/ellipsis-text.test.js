import React from 'react';
import { mount, render, } from 'enzyme';
import EllipsisText from '../components/ellipsis-text';
import { shouldToggleEllipsis, getLineHeight, } from '../components/ellipsis-text';

describe('Elllpsis-text', () => {
	const { getComputedStyle, } = global;

	beforeEach(() => {
		Object.defineProperty(global, 'getComputedStyle', {
			value: () => ({
				getPropertyValue: () =>  12,
			}),
		});
	});

	afterEach(() => {
		Object.defineProperty(global, 'getComputedStyle', {
			value: getComputedStyle,
		});
	});

	it('handle default props', () => {
		const {
			isShowingButton,
			ButtonText,
			numberOfLines,
			onClickButton,
		} = EllipsisText.defaultProps;

		expect(isShowingButton).toEqual(true);
		expect(ButtonText).toBe('···');
		expect(numberOfLines).toBe(1);
		expect(onClickButton).toBeDefined();
		expect(onClickButton).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const text = 'mock-text';
		const ellipsisButtonText = 'mock-content';
		const wrapper = render(
			<EllipsisText
				text={text}
				isShowingButton={true}
				ButtonText={ellipsisButtonText}
			/>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should mount in a full DOM', () => {
		const className = 'mock-class';
		const text = 'mock-text';
		const ellipsisButtonText = 'mock-content';
		const onClickButton = () => {};
		const style = { color: '#FFFFFF', };
		const buttonStyle = { color: '#F00B00', };
		const wrapper = mount(<EllipsisText
			text={text}
			isShowingButton={true}
			className={className}
			ButtonText={ellipsisButtonText}
			numberOfLines={4}
			onClickButton={onClickButton}
			style={style}
			buttonStyle={buttonStyle}
		/>);

		expect(wrapper.props().text).toBe(text);
		expect(wrapper.props().isShowingButton).toEqual(true);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().ButtonText).toBe(ellipsisButtonText);
		expect(wrapper.props().numberOfLines).toBe(4);
		expect(wrapper.props().onClickButton).toBe(onClickButton);
		expect(wrapper.props().style).toBe(style);
		expect(wrapper.props().buttonStyle).toBe(buttonStyle);
	});

	it('should run componentDidUpdate after resize', () => {
		const wrapper = mount(<EllipsisText/>);
		const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');

		global.dispatchEvent(new Event('resize'));

		expect(componentDidUpdate).toHaveBeenCalled();
	});

	it('should render button if props.isShowingButton is false', () => {
		const wrapper = mount(<EllipsisText
			isShowingButton={true}
		/>);

		expect(wrapper.find('.ljit-ellipsis__button')).toHaveLength(1);
	});

	it('should not render button if props.isShowingButton is false', () => {
		const wrapper = mount(<EllipsisText
			isShowingButton={false}
		/>);

		expect(wrapper.find('.ljit-ellipsis__button')).toHaveLength(0);
	});

	it('should render ellipsis__dot if state.isShowingEllipsis is true', () => {
		const wrapper = mount(<EllipsisText/>);

		wrapper.setState({
			isShowingEllipsis: true,
		});
		expect(wrapper.find('.ljit-ellipsis__dot')).toHaveLength(1);
	});

	it('should not render ellipsis__dot if state.isShowingEllipsis is false', () => {
		const wrapper = mount(<EllipsisText/>);

		wrapper.setState({
			isShowingEllipsis: false,
		});

		expect(wrapper.find('.ljit-ellipsis__dot')).toHaveLength(0);
	});
});

describe('shouldToggleEllipsis', () => {
	it('should return true if isShowingEllipsis not equal to shouldShowEllipsis(offsetWidth < scrollWidth || offsetHeight < scrollHeight) ', () => {
		const mockIsShowingEllipsis = false;
		const mockRefTextContent = {
			offsetWidth: 10,
			scrollWidth: 11,
			offsetHeight: 10,
			scrollHeight: 11,
		};

		expect(shouldToggleEllipsis(mockIsShowingEllipsis, mockRefTextContent)).toBe(true);
	});
	it('should return false if isShowingEllipsis equal to shouldShowEllipsis(offsetWidth < scrollWidth || offsetHeight < scrollHeight) ', () => {
		const mockIsShowingEllipsis = true;
		const mockRefTextContent = {
			offsetWidth: 10,
			scrollWidth: 11,
			offsetHeight: 10,
			scrollHeight: 11,
		};

		expect(shouldToggleEllipsis(mockIsShowingEllipsis, mockRefTextContent)).toBe(false);
	});
});

describe('getLineHeight', () => {
	const { getComputedStyle, } = global;
	const style = { 'line-height': 12, };

	beforeEach(() => {
		Object.defineProperty(global, 'getComputedStyle', {
			value: () => ({
				getPropertyValue: (prop) => {
					return style[prop];
				},
			}),
		});
	});

	afterEach(() => {
		Object.defineProperty(global, 'getComputedStyle', {
			value: getComputedStyle,
		});
	});

	it('should return line-height of element', () => {
		const mockElement = mount(<div style={{ lineHeight: 12, }}></div>);

		expect(getLineHeight(mockElement)).toBe(12);
	});
});
