import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'ljit-react-components';
import { PREFIX_CLASS } from './';
import DataInlineList from '../../../components/data-inline-list';

const propTypes = {
	topList: PropTypes.array,
	contentList: PropTypes.array,
};

const defaultProps = {
	topList: [],
	contentList: [],
};

function ListContainer({
	topList,
	contentList,
}) {

	function _renderContentItem(item) {
		return (
			<React.Fragment>
				<div> {item.icon} {item.text} </div>
				<Icon type={Icon.IconTypeEnums.RIGHT} size={Icon.SizeEnums.SMALL}></Icon>
			</React.Fragment>
		);
	}

	return (
		<div className={`${PREFIX_CLASS}__list-container`}>
			<DataInlineList
				onClickItem={(item) => {item.onClick();}}
				className={`${PREFIX_CLASS}__list-container--top`}
				data={topList}
				renderItem={(item) => (
					<React.Fragment>{item.icon} {item.text} </React.Fragment>
				)}
			/>
			<DataInlineList
				onClickItem={(item) => {item.onClick();}}
				className={`${PREFIX_CLASS}__list-container--content`}
				data={contentList}
				renderItem={_renderContentItem}
			/>
		</div>
	);
}

ListContainer.propTypes = propTypes;
ListContainer.defaultProps = defaultProps;

export default ListContainer;
