import React, { Component, } from 'react';
import {
	Icon,
	InputSearch,
} from '../../../src';
import ComponentBlock from '../ComponentBlock';
import './style.styl';

const { Item, } = ComponentBlock;
const IconTypeEnums = Icon.IconTypeEnums;
const IconColorEnums = Icon.ColorEnums;
const IconSizeEnums = Icon.SizeEnums;

const {
	EXCLAMATION_CIRCLE,
} = IconTypeEnums;
const iconTypes = Object.keys(IconTypeEnums).map(_key => IconTypeEnums[_key]);

const ICON_LIST_CLASS = 'icon-list';

class IconSample extends Component {
	constructor() {
		super();
		this.state = {
			iconTypeName: '',
		};

		this._handleSearchIcon = this._handleSearchIcon.bind(this);
		this._renderIconList = this._renderIconList.bind(this);
	}

	_handleSearchIcon(event) {
		this.setState({ iconTypeName: event.target.value, });
	}

	_renderIconList() {
		const {
			iconTypeName,
		} = this.state;
		const iconItems = iconTypes
			.filter(iconType => iconType.indexOf(iconTypeName.toLowerCase()) > -1)
			.map((iconType) => {
				const icon = <Icon type={iconType} size={IconSizeEnums.LARGE} />;

				return (
					<li
						key={iconType}
						className={`${ICON_LIST_CLASS}__item`}
					>
						<div className="icon-card">
							<div className="icon-card__icon">
								{icon}
							</div>
							<div className="icon-card__name">
								{iconType}
							</div>
						</div>
					</li>
				);
			});

		return (
			<ul className={ICON_LIST_CLASS}>
				{iconItems}
			</ul>
		);
	}

	render() {
		return (
			<ComponentBlock title="Icon">
				<Item>
					<InputSearch
						style={{ maxWidth: 350, }}
						value={this.state.iconTypeName}
						onChange={this._handleSearchIcon}
					/>
					{this._renderIconList()}
				</Item>
				<Item>
					<h2>
						Icon Color
					</h2>
					<div>
						{'Danger: '}
						<Icon type={EXCLAMATION_CIRCLE} color={IconColorEnums.DANGER} size={IconSizeEnums.LARGE} />
					</div>
					<div>
						{'Primary: '}
						<Icon type={EXCLAMATION_CIRCLE} color={IconColorEnums.PRIMARY} size={IconSizeEnums.LARGE} />
					</div>
					<div>
						{'Success: '}
						<Icon type={EXCLAMATION_CIRCLE} color={IconColorEnums.SUCCESS} size={IconSizeEnums.LARGE} />
					</div>
					<div>
						{'White: '}
						<Icon type={EXCLAMATION_CIRCLE} color={IconColorEnums.WHITE} size={IconSizeEnums.LARGE} />
					</div>
				</Item>
				<Item>
					<h2>
						Icon Size
					</h2>
					<div>
						{'X Small: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.X_SMALL} />
					</div>
					<div>
						{'Small: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.SMALL} />
					</div>
					<div>
						{'Middle: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.MIDDLE} />
					</div>
					<div>
						{'Large: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} />
					</div>
					<div>
						{'X Large: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.X_LARGE} />
					</div>
					<div>
						{'XX Large: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.XX_LARGE} />
					</div>
				</Item>
				<Item>
					<h2>
						Icon Translucent
					</h2>
					<div>
						{'Normal: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} />
					</div>
					<div>
						{'Translucent: '}
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} isTranslucent />
					</div>
				</Item>
				<Item>
					<h2>
						Icon Spin
					</h2>
					<div>
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} spin />
					</div>
				</Item>
				<Item>
					<h2>
						Icon Rotate
					</h2>
					<div>
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} />
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} rotate={90} />
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} rotate={180} />
						<Icon type={EXCLAMATION_CIRCLE} size={IconSizeEnums.LARGE} rotate={270} />
					</div>
				</Item>
			</ComponentBlock>
		);
	}
}

export default IconSample;
