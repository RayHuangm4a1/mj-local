import React, { Fragment, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	ListItem,
	Icon,
} from 'ljit-react-components';
import { isDateValid, formatDate, } from '../../../../lib/moment-utils';
import DataInlineList from '../../../components/data-inline-list';
import './style.styl';

const {
	IconTypeEnums,
	ColorEnums,
	SizeEnums,
} = Icon;
const PREFIX_CLASS = 'announcement-page-list';

const propTypes = {
	selectId: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	announcementData: PropTypes.arrayOf(PropTypes.object),
	onClickItem: PropTypes.func,
};

const AnnouncementDataList = ({
	selectId = 0,
	announcementData = [],
	onClickItem = () => {},
}) => {
	return (
		<DataInlineList
			className={PREFIX_CLASS}
			data={announcementData}
			onClickItem={onClickItem}
			renderItem={(data = {},) => (
				<ListItem
					className={cx({
						[`${PREFIX_CLASS}__active`]: data.id === selectId,
					})}
					title={<span title={data.title}>{data.title}</span>}
					description={(
						<Fragment>
							<Icon
								className={`${PREFIX_CLASS}__icon`}
								type={IconTypeEnums.TIMER}
								color={ColorEnums.GREY}
								size={SizeEnums.X_SMALL}
							/>
							{isDateValid(data.createdAt) ? formatDate(data.createdAt) : ''}
						</Fragment>
					)}
				/>
			)}
		/>
	);
};

AnnouncementDataList.propTypes = propTypes;

export default AnnouncementDataList;
