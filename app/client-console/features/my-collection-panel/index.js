import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon, ExpandablePanel, } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import {
	myLotteryCollectionsActions,
} from '../../controller';
import {
	LotteryDataPropTypes,
	MyLotteryCollectionIdsDataPropTypes,
	MyLotteryCollectionsDataPropTypes,
} from '../../lib/prop-types-utils';
import DataInlineList from '../../components/data-inline-list';
import MyCollectionModal from '../../components/my-collection-modal';
import './style.styl';

const {
	updateMyLotteryCollectionsAction,
} = myLotteryCollectionsActions;

const propTypes = {
	className: PropTypes.string,
	lotteryClassesData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})),
	lotteriesData: PropTypes.objectOf(
		PropTypes.arrayOf(LotteryDataPropTypes)
	),
	lotteriesMapData: PropTypes.objectOf(LotteryDataPropTypes),
	myLotteryCollectionIdsData: MyLotteryCollectionIdsDataPropTypes,
	myLotteryCollectionsData: MyLotteryCollectionsDataPropTypes,
	onClickLottery: PropTypes.func,
	updateMyLotteryCollectionsAction: PropTypes.func.isRequired,
};
const defaultProps = {
	onClickLottery: () => {},
};

const PREFIX_CLASS = 'ljit-my-collection-panel';

class MyCollectionPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMyCollectionModalVisible: false,
		};

		this._handleToggleModalVisible = this._handleToggleModalVisible.bind(this);
		this._handleSubmitModal = this._handleSubmitModal.bind(this);
		this._renderFavorites = this._renderFavorites.bind(this);
	}

	_handleToggleModalVisible() {
		this.setState(({ isMyCollectionModalVisible: prevIsModalVisible, }) => ({
			isMyCollectionModalVisible: !prevIsModalVisible,
		}));
	}

	_handleSubmitModal(selectedLotteryIds) {
		const {
			updateMyLotteryCollectionsAction,
		} = this.props;

		updateMyLotteryCollectionsAction(selectedLotteryIds);

		this._handleToggleModalVisible();
	}

	_renderFavorites() {
		const {
			onClickLottery,
			myLotteryCollectionsData,
		} = this.props;

		return (
			<DataInlineList
				className={`${PREFIX_CLASS}__lottery-list`}
				data={myLotteryCollectionsData}
				onClickItem={onClickLottery}
				renderItem={(data = {}) => (
					<div>{data.name}</div>
				)}
			/>
		);
	}

	render() {
		const {
			className,
			lotteryClassesData,
			lotteriesData,
			lotteriesMapData,
			myLotteryCollectionIdsData,
		} = this.props;
		const { isMyCollectionModalVisible, } = this.state;
		const {
			_renderFavorites,
			_handleSubmitModal,
			_handleToggleModalVisible,
		} = this;

		return (
			<div className={cx(`${PREFIX_CLASS}__wrapper`, className)}>
				<ExpandablePanel
					title="我的收藏"
					titleIcon={<Icon type={Icon.IconTypeEnums.CROWN_COLOR} size={Icon.SizeEnums.X_LARGE}/>}
					topRight={
						<Icon
							type={Icon.IconTypeEnums.SETTING_FILL}
							size={Icon.SizeEnums.SMALL}
							style={{ color: '#646464', }}
						/>
					}
					onClickTopRight={_handleToggleModalVisible}
					className={`${PREFIX_CLASS}`}
					style={{ position: 'absoulte', }}
				>
					{_renderFavorites()}
				</ExpandablePanel>
				<MyCollectionModal
					isVisible={isMyCollectionModalVisible}
					selectedLotteryIds={myLotteryCollectionIdsData}
					lotteryClasses={lotteryClassesData}
					lotteries={lotteriesData}
					lotteriesMapData={lotteriesMapData}
					onSubmitModal={_handleSubmitModal}
					onCloseModal={_handleToggleModalVisible}
				/>
			</div>
		);
	}
}

MyCollectionPanel.propTypes = propTypes;
MyCollectionPanel.defaultProps = defaultProps;

function mapStateToProps(state) {
	const {
		lotteries: lotteriesReducer,
		myLotteryCollections: myLotteryCollectionsReducer,
	} = state;

	return {
		lotteryClassesData: state.lotteryClasses.get('data').toArray(),
		lotteriesData: lotteriesReducer.get('lotteriesData').toObject(),
		lotteriesMapData: lotteriesReducer.get('lotteriesMapData').toObject(),
		myLotteryCollectionIdsData: myLotteryCollectionsReducer.get('collectionIdsData').toArray(),
		myLotteryCollectionsData: myLotteryCollectionsReducer.get('collectionsData').toArray(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateMyLotteryCollectionsAction: (...args) => dispatch(updateMyLotteryCollectionsAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCollectionPanel);
