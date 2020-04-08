import React from 'react';
import { shallow, mount, } from 'enzyme';
import Button from '../components/button';

describe('Button', () => {
	it('handle default props', () => {
		const {
			color,
			outline,
			disabled,
			onClick,
		} = Button.defaultProps;

		expect(color).toEqual('');
		expect(outline).toEqual(Button.OutlineEnums.SOLID);
		expect(disabled).toEqual(false);
		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
	});

	it('should renders correctly', () => {
		const disabled = false;
		const outline = Button.OutlineEnums.SOLID;
		const className = 'mock-button';
		const wrapper = shallow(<Button disabled={disabled} outline={outline} className={className}>
			Button
		</Button>);

		expect(wrapper).toMatchSnapshot();
	});

	it('should be selectable by class ljit-btn', () => {
		const wrapper = shallow(<Button/>);

		expect(wrapper.hasClass('ljit-btn')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(<Button className={className}>mock text</Button>);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it('should be selectable by outline: SOLID', () => {
		const outline = Button.OutlineEnums.SOLID;
		const wrapper = shallow(<Button outline={outline}>mock text</Button>);

		expect(wrapper.hasClass('ljit-button--solid')).toEqual(true);
	});

	it('should be selectable by color: BRIGHTBLUE500', () => {
		const color = Button.ColorEnums.BRIGHTBLUE500;
		const wrapper = shallow(<Button color={color}>mock text</Button>);

		expect(wrapper.hasClass('ljit-button-color--brightBlue500')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const disabled = false;
		const outline = Button.OutlineEnums.SOLID;
		const color = Button.ColorEnums.BRIGHTBLUE500;
		const className = 'mock-class';
		const style = { marginLeft: '10px', };
		const children = 'Button';
		const icon = 'plus';
		const isFullWidth = false;
		const onClick = () => {};

		const wrapper = mount(
			<Button
				disabled={disabled}
				outline={outline}
				color={color}
				className={className}
				style={style}
				icon={icon}
				isFullWidth={isFullWidth}
				onClick={onClick}
			>
				{children}
			</Button>
		);

		expect(wrapper.props().disabled).toEqual(disabled);
		expect(wrapper.props().outline).toBe(outline);
		expect(wrapper.props().color).toBe(color);
		expect(wrapper.props().className).toBe(className);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().children).toBe(children);
		expect(wrapper.props().icon).toBe(icon);
		expect(wrapper.props().isFullWidth).toEqual(isFullWidth);
		expect(wrapper.props().onClick).toEqual(onClick);

	});

	it('should handle onclick event', () => {
		const onClick = jest.fn();
		const wrapper = shallow(<Button onClick={onClick} />);

		wrapper.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalled();
	});
});


describe('Button OutlineEnums ', () => {
	it('should contains solid property', () => {
		const typeName = 'solid';
		const formatType = 'SOLID';

		expect(Button.OutlineEnums[formatType]).toEqual(typeName);
	});

	it('should contains hollow property', () => {
		const typeName = 'hollow';
		const formatType = 'HOLLOW';

		expect(Button.OutlineEnums[formatType]).toEqual(typeName);
	});

	it('should contains text property', () => {
		const typeName = 'text';
		const formatType = 'TEXT';

		expect(Button.OutlineEnums[formatType]).toEqual(typeName);
	});

	it('should contains dashed property', () => {
		const typeName = 'dashed';
		const formatType = 'DASHED';

		expect(Button.OutlineEnums[formatType]).toEqual(typeName);
	});
});

describe('Button IconEnums ', () => {
	it('should contains plus property', () => {
		const typeName = 'plus';
		const formatType = 'PLUS';

		expect(Button.IconEnums[formatType]).toEqual(typeName);
	});

	it('should contains down property', () => {
		const typeName = 'down';
		const formatType = 'DOWN';

		expect(Button.IconEnums[formatType]).toEqual(typeName);
	});

	it('should contains up property', () => {
		const typeName = 'up';
		const formatType = 'UP';

		expect(Button.IconEnums[formatType]).toEqual(typeName);
	});

	it('should contains left property', () => {
		const typeName = 'left';
		const formatType = 'LEFT';

		expect(Button.IconEnums[formatType]).toEqual(typeName);
	});

	it('should contains right property', () => {
		const typeName = 'right';
		const formatType = 'RIGHT';

		expect(Button.IconEnums[formatType]).toEqual(typeName);
	});
});

describe('Button ColorEnums ', () => {
	it('should contains brightBlue500 property', () => {
		const typeName = 'brightBlue500';
		const formatType = 'BRIGHTBLUE500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains brightBlue300 property', () => {
		const typeName = 'brightBlue300';
		const formatType = 'BRIGHTBLUE300';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains grassGreen900 property', () => {
		const typeName = 'grassGreen900';
		const formatType = 'GRASSGREEN900';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});


	it('should contains grassGreen700 property', () => {
		const typeName = 'grassGreen700';
		const formatType = 'GRASSGREEN700';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});


	it('should contains grassGreen500 property', () => {
		const typeName = 'grassGreen500';
		const formatType = 'GRASSGREEN500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains lightRed500 property', () => {
		const typeName = 'lightRed500';
		const formatType = 'LIGHTRED500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains warmOrange900 property', () => {
		const typeName = 'warmOrange900';
		const formatType = 'WARMORANGE900';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains warmOrange700 property', () => {
		const typeName = 'warmOrange700';
		const formatType = 'WARMORANGE700';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains warmOrange500 property', () => {
		const typeName = 'warmOrange500';
		const formatType = 'WARMORANGE500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains lightPurple500 property', () => {
		const typeName = 'lightPurple500';
		const formatType = 'LIGHTPURPLE500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains tiffanyGreen500 property', () => {
		const typeName = 'tiffanyGreen500';
		const formatType = 'TIFFANYGREEN500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});

	it('should contains salmonRed500 property', () => {
		const typeName = 'salmonRed500';
		const formatType = 'SALMONRED500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains pinkish property', () => {
		const typeName = 'pinkish';
		const formatType = 'PINKISH';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains salmonRed500 property', () => {
		const typeName = 'salmonRed500';
		const formatType = 'SALMONRED500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains coral property', () => {
		const typeName = 'coral';
		const formatType = 'CORAL';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains bloodOrange property', () => {
		const typeName = 'bloodOrange';
		const formatType = 'BLOODORANGE';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains butterscotch property', () => {
		const typeName = 'butterscotch';
		const formatType = 'BUTTERSCOTCH';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains salmonRed500 property', () => {
		const typeName = 'salmonRed500';
		const formatType = 'SALMONRED500';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains topaz property', () => {
		const typeName = 'topaz';
		const formatType = 'TOPAZ';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains grey30 property', () => {
		const typeName = 'grey30';
		const formatType = 'GREY30';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains grey20 property', () => {
		const typeName = 'grey20';
		const formatType = 'GREY20';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains grey12 property', () => {
		const typeName = 'grey12';
		const formatType = 'GREY12';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains grey9 property', () => {
		const typeName = 'grey9';
		const formatType = 'GREY9';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains greyishBrown property', () => {
		const typeName = 'greyishBrown';
		const formatType = 'GREYISHBROWN';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains pale property', () => {
		const typeName = 'pale';
		const formatType = 'PALE';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains paleTwo property', () => {
		const typeName = 'paleTwo';
		const formatType = 'PALETWO';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains blue100 property', () => {
		const typeName = 'blue100';
		const formatType = 'BLUE100';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
	it('should contains blue50 property', () => {
		const typeName = 'blue50';
		const formatType = 'BLUE50';

		expect(Button.ColorEnums[formatType]).toEqual(typeName);
	});
});
