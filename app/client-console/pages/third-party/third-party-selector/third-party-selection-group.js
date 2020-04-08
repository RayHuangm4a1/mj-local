import React from 'react';
import PropTypes from 'prop-types';
import {
	LabelSelector,
	Icon,
	InputSearch,
} from 'ljit-react-components';

const {
	IconTypeEnums,
	SizeEnums,
} = Icon;
const {
	ELECTRONIC_YELLOW,
} = IconTypeEnums;
const {
	LARGE,
} = SizeEnums;
const PREFIX_CLASS = 'third-party-selection-group';

const propTypes = {
	groupTitle: PropTypes.string,
	thirdPartyName: PropTypes.string.isRequired,
	thirdPartyTypeKey: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	thirdPartyPlatformKey: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	thirdPartyTypeSelections: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		name: PropTypes.string,
	})).isRequired,
	thirdPartyPlatformSelections: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		name: PropTypes.string,
	})).isRequired,
	onChangeName: PropTypes.func.isRequired,
	onSearchName: PropTypes.func.isRequired,
	onSelectType: PropTypes.func.isRequired,
	onSelectPlatform: PropTypes.func.isRequired,
};
const defaultProps = {
	groupTitle: '娛樂大廳',
};

const ThirdPartySelectionGroup = ({
	groupTitle,
	thirdPartyName,
	thirdPartyTypeKey,
	thirdPartyPlatformKey,
	thirdPartyTypeSelections,
	thirdPartyPlatformSelections,
	onChangeName,
	onSearchName,
	onSelectType,
	onSelectPlatform,
}) => (
	<div className={PREFIX_CLASS}>
		<div className={`${PREFIX_CLASS}__header`}>
			<Icon
				className={`${PREFIX_CLASS}__icon`}
				type={ELECTRONIC_YELLOW}
				size={LARGE}
			/>
			<span className={`${PREFIX_CLASS}__title`}>{groupTitle}</span>
			<InputSearch
				className={`${PREFIX_CLASS}__search`}
				value={thirdPartyName}
				onChange={onChangeName}
				onSearch={onSearchName}
				placeholder="请输入中文游戏名称"
			/>
		</div>
		<LabelSelector
			items={thirdPartyTypeSelections}
			label="游戏类型："
			selectedId={thirdPartyTypeKey}
			onClickItem={onSelectType}
		/>
		<LabelSelector
			items={thirdPartyPlatformSelections}
			label="游戏平台："
			selectedId={thirdPartyPlatformKey}
			onClickItem={onSelectPlatform}
		/>
	</div>
);

ThirdPartySelectionGroup.propTypes = propTypes;
ThirdPartySelectionGroup.defaultProps = defaultProps;

export default ThirdPartySelectionGroup;
