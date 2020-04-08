import React, { Fragment, } from 'react';
import {
	Button,
	Statistic,
} from 'ljit-react-components';
import TwoColumnsList from '../../../../components/two-columns-list';
import PageMessageModal from '../../../../components/page-modal/message';
import {
	TransactionTypeEnum,
	transactionTypeOptions,
	PREFIX_CLASS,
} from '../utils';
import SearchForm from '../search-form';
import SingleTransferModal from '../single-transfer-modal';

const propTypes = {};
const defaultProps = {};

const fakePlatformOptions = [
	{ label: 'VR电子', value: '1', },
	{ label: 'CQ9', value: '2', },
	{ label: 'GD电子', value: '3', },
	{ label: 'PT电子', value: '4', },
	{ label: '二元期权', value: '5', },
	{ label: 'AS直播', value: '6', },
	{ label: 'GD电子', value: '7', },
	{ label: 'Gamma棋牌', value: '8', },
	{ label: '开元棋牌', value: '9', },
	{ label: 'UG体育', value: '10', },
	{ label: 'EBET电子', value: '11', },
	{ label: 'SA电子', value: '12', },
	{ label: 'AG电子', value: '13', },
];

function CashSystemFundsTransferPage() {
	const [isTransferVisible, setIsTransferVisible] = React.useState(false);
	const [isRecycleModalVisible, setIsRecycleModalVisible] = React.useState(false);
	const [searchData, setSearchData] = React.useState(false);
	const _handleSearch = (data) => {
		setSearchData(data);
	};
	const _handleClickRecycle = () => {
		setIsRecycleModalVisible(true);
	};
	const _handleHideRecycleModal = () => {
		setIsRecycleModalVisible(false);
	};
	const _handleClickRecycleModalOk = () => {
		_handleHideRecycleModal();
	};
	const _handleTransferModalShow = () => {
		setIsTransferVisible(true);
	};
	const _handleTransferModalHide = () => {
		setIsTransferVisible(false);
	};
	const _handleTransferModalSubmit = (data) => {
		_handleTransferModalHide();
	};
	const _renderSearchResult = () => {
		if (searchData.username) {
			return (
				<Fragment>
					<div className="info">
						<Statistic
							title="中心帐户"
							value={fakeAccount.amount}
							precision={3}
						/>
						<div className="recycle-and-transfer">
							<Button
								onClick={_handleClickRecycle}
							>
								一键回收
							</Button>
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleTransferModalShow}
							>
								单笔转换
							</Button>
						</div>
					</div>
					<TwoColumnsList
						data={fakeAccount.subAccounts}
						titleKey="lotteryName"
						contentKey="amount"
					/>
				</Fragment>
			);
		}
		return null;
	};

	return (
		<div className={`${PREFIX_CLASS}__transfer`}>
			<div className="fund-search">
				<SearchForm
					initialValues={{
						account: '',
					}}
					onSearch={_handleSearch}
				/>
			</div>
			{_renderSearchResult()}
			<SingleTransferModal
				initialValues={{
					transactionType: TransactionTypeEnum.IN,
				}}
				isVisible={isTransferVisible}
				platformOptions={fakePlatformOptions}
				transactionTypeOptions={transactionTypeOptions}
				onSubmit={_handleTransferModalSubmit}
				onCancel={_handleTransferModalHide}
			/>
			<PageMessageModal
				visible={isRecycleModalVisible}
				title="确认提示"
				message="是否确定回收所有款项？"
				onClickCancel={_handleHideRecycleModal}
				onClickOk={_handleClickRecycleModalOk}
			/>
		</div>
	);
}

const fakeAccount =  {
	amount: 1234567,
	subAccounts: fakePlatformOptions.map((item, index) => ({
		_id: index + 1,
		lotteryName: item.label,
		amount: index * 1000 + index,
	})),
};

// TODO 串接 API 來完成 (1)搜尋、(2)轉換 與 (3)一鍵回收
CashSystemFundsTransferPage.propTypes = propTypes;
CashSystemFundsTransferPage.defaultProps = defaultProps;

export default CashSystemFundsTransferPage;
