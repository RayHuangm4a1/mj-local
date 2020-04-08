import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	Button,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		province: PropTypes.string,
		city: PropTypes.string,
	})),
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	dataSource: [],
	onClose: () => {},
};

class RegionListModal extends Component {
	constructor() {
		super();
	}

	render() {
		const { isVisible, onClose, dataSource, } = this.props;

		return (
			<PageModal
				title="地区列表"
				visible={isVisible}
				onClickCancel={onClose}
				footer={(
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={onClose}
					>
						关 闭
					</Button>
				)}
			>
				<Table
					dataSource={dataSource}
					columns={[
						{
							title: '省',
							dataIndex: 'province',
						},
						{
							title: '市',
							dataIndex: 'city',
						}
					]}
				/>
			</PageModal>
		);
	}
}

RegionListModal.propTypes = propTypes;
RegionListModal.defaultProps = defaultProps;

export default RegionListModal;
