import React from 'react';
import { shallow, mount, } from 'enzyme';
import { MemoryRouter as Router, } from 'react-router-dom';
import ClickableTag from '../components/clickable-tag';

const { ColorEnums, BadgeAlignmentEnums, } = ClickableTag;

describe('ClickableTag', () => {
	it ('should handle default props', () => {
		const {
			backgroundColor,
			textColor,
			text,
			color,
			badgeAlignment,
			hasBadge,
			badgeIcon,
			onClick,
		} = ClickableTag.defaultProps;

		expect(backgroundColor).toEqual('');
		expect(textColor).toEqual('');
		expect(text).toEqual('');
		expect(color).toEqual(ColorEnums.BLACK);
		expect(badgeAlignment).toEqual(BadgeAlignmentEnums.LEFT);
		expect(hasBadge).toEqual(false);
		expect(badgeIcon).toEqual(0);
		expect(onClick).toBeDefined();
		expect(onClick).toBeInstanceOf(Function);
	});

	it ('should render correctly', () => {
		const backgroundColor = 'blue';
		const textColor = 'yellow';
		const text = 'mock-text';
		const className = 'mock-class';
		const style = { fontSize: '20px', };
		const color = ColorEnums.BLACK;
		const badgeAlignment = BadgeAlignmentEnums.LEFT;
		const badgeIcon = 0;
		const hasBadge = true;
		const onClick = () => {};
		const wrapper = shallow(
			<ClickableTag
				backgroundColor={backgroundColor}
				textColor={textColor}
				text={text}
				color={color}
				className={className}
				badgeAlignment={badgeAlignment}
				badgeIcon={badgeIcon}
				hasBadge={hasBadge}
				onClick={onClick}
				style={style}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it ('should be selectable by class ljit-clickable-tag', () => {
		const wrapper = shallow(
			<ClickableTag text={'mock-text'} />
		);

		expect(wrapper.hasClass('ljit-clickable-tag')).toEqual(true);
	});

	it ('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper = shallow(
			<ClickableTag text={'mock-text'} className={className}/>
		);

		expect(wrapper.hasClass(className)).toEqual(true);
	});

	it ('should be selectable by class ljit-clickable-tag--with-badge when hasBadge passed as true', () => {
		const wrapper = shallow(
			<ClickableTag text={'mock-text'} hasBadge={true} />
		);

		expect(wrapper.hasClass('ljit-clickable-tag--with-badge')).toEqual(true);
	});

	it ('should be selectable by class ljit-clickable-tag--with-left-badge when badgeAlignment passed as left', () => {
		const wrapper = shallow(
			<ClickableTag text={'mock-text'} hasBadge={true} badgeAlignment={BadgeAlignmentEnums.LEFT} />
		);

		expect(wrapper.hasClass('ljit-clickable-tag--with-left-badge')).toEqual(true);
	});

	it ('should be selectable by class ljit-clickable-tag--with-right-badge when badgeAlignment passed as left', () => {
		const wrapper = shallow(
			<ClickableTag text={'mock-text'} hasBadge={true} badgeAlignment={BadgeAlignmentEnums.RIGHT} />
		);

		expect(wrapper.hasClass('ljit-clickable-tag--with-right-badge')).toEqual(true);
	});

	it ('should mount in a full DOM', () => {
		const backgroundColor = 'blue';
		const textColor = 'yellow';
		const text = 'mock-text';
		const className = 'mock-class';
		const style = { fontSize: '20px', };
		const color = ColorEnums.BLACK;
		const badgeAlignment = BadgeAlignmentEnums.LEFT;
		const badgeIcon = 0;
		const hasBadge = true;
		const onClick = () => {};
		const wrapper = mount(
			<Router>
				<ClickableTag
					backgroundColor={backgroundColor}
					textColor={textColor}
					text={text}
					style={style}
					className={className}
					color={color}
					badgeAlignment={badgeAlignment}
					badgeIcon={badgeIcon}
					hasBadge={hasBadge}
					onClick={onClick}
				/>
			</Router>
		);

		expect(wrapper.find('ClickableTag').props().backgroundColor).toEqual(backgroundColor);
		expect(wrapper.find('ClickableTag').props().textColor).toEqual(textColor);
		expect(wrapper.find('ClickableTag').props().text).toEqual(text);
		expect(wrapper.find('ClickableTag').props().className).toEqual(className);
		expect(wrapper.find('ClickableTag').props().style).toMatchObject(style);
		expect(wrapper.find('ClickableTag').props().color).toEqual(color);
		expect(wrapper.find('ClickableTag').props().badgeAlignment).toEqual(badgeAlignment);
		expect(wrapper.find('ClickableTag').props().badgeIcon).toEqual(badgeIcon);
		expect(wrapper.find('ClickableTag').props().hasBadge).toEqual(hasBadge);
		expect(wrapper.find('ClickableTag').props().onClick).toEqual(onClick);
	});
});

describe('LinkTag BadgeAlignment Enums', () => {
	it('should contain LEFT property', () => {
		const typeName = 'left';
		const formatType = 'LEFT';

		expect(BadgeAlignmentEnums[formatType]).toEqual(typeName);
	});

	it('should contain RIGHT property', () => {
		const typeName = 'right';
		const formatType = 'RIGHT';

		expect(BadgeAlignmentEnums[formatType]).toEqual(typeName);
	});
});