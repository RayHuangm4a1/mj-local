import React from 'react';
import PropTypes from 'prop-types';
import { Collapse as AntdCollapse, } from 'antd';
import Icon from '../icon';
import cx from 'classnames';
import './style.styl';

const AntdPanel = AntdCollapse.Panel;
const propTypes = {
	className: PropTypes.string,
	defaultActiveKey: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.number),
		PropTypes.arrayOf(PropTypes.string),
	]),
	isAccordion: PropTypes.bool,
	panelsData: PropTypes.arrayOf(PropTypes.shape({
		header: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.string,
		]),
		key: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		isDisabled: PropTypes.bool,
		isShowArrow: PropTypes.bool,
		extra: PropTypes.node,
		content: PropTypes.node,
	})),
	isIconPositionRight: PropTypes.bool,
	isBordered: PropTypes.bool,
	onChange: PropTypes.func,
	expandIcon: PropTypes.func,
};
const defaultProps = {
	className: '',
	isAccordion: false,
	panelsData: [],
	isIconPositionRight: true,
	isBordered: false,
	onChange: () => {},
	expandIcon: function renderExpendIcon({ isActive, }) {
		return <Icon type={Icon.IconTypeEnums.RIGHT} rotate={isActive ? 90 : 0}/>;
	},
};

function Collapse({
	className,
	defaultActiveKey,
	isAccordion,
	panelsData,
	isIconPositionRight,
	isBordered,
	onChange,
	expandIcon,
}) {
	const _renderPanels = () => {
		return panelsData.map(panelData => {
			const {
				key,
				header,
				content,
				isDisabled = false,
				isShowArrow = true,
				extra = null,
			} = panelData;

			return (
				<AntdPanel
					key={key}
					header={header}
					disabled={isDisabled}
					showArrow={isShowArrow}
					extra={extra}
					className={'ljit-collapse__panel'}
				>
					{content}
				</AntdPanel>
			);
		});
	};

	return (
		<AntdCollapse
			className={cx('ljit-collapse',
				className,
				{ 'ljit-collapse__icon-right': isIconPositionRight, }
			)}
			defaultActiveKey={defaultActiveKey}
			bordered={isBordered}
			accordion={isAccordion}
			onChange={onChange}
			expandIcon={expandIcon}
		>
			{_renderPanels()}
		</AntdCollapse>
	);
}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;

export default Collapse;
