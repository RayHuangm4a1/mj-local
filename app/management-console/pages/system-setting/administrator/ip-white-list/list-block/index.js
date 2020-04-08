import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Button,
	Table,
	TextButton,
} from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';
import PageBlock from '../../../../../components/page-block';
const { Title } = PageBlock;
const { Message } = PageModal;

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	onClickAdd: PropTypes.func,
	onSubmitDelete: PropTypes.func,
	data: PropTypes.array,

};

const defaultProps = {
	onClickAdd: () => {},
	onSubmitDelete: () => {},
};

class ListBlock extends Component {
	constructor() {
		super();

		this.state = {
			isModalVisible: false,
			seletedData: null,
		};
		this._handleClickDelete = this._handleClickDelete.bind(this);
		this._handleSubmitDelete = this._handleSubmitDelete.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
	}
	_handleClickDelete(seletedData) {
		this.setState({
			isModalVisible: true,
			seletedData,
		});
	}

	_handleSubmitDelete() {
		const { onSubmitDelete, } = this.props;
		const { seletedData } = this.state;

		onSubmitDelete(seletedData);
		this.setState({
			isModalVisible: false,
			seletedData: null,
		});
	}
	_handleClickCancel() {
		this.setState({
			isModalVisible: false,
			seletedData: null,
		});
	}

	render() {
		const { isModalVisible } = this.state;
		const {
			_handleClickDelete,
			_handleSubmitDelete,
			_handleClickCancel
		} = this;
		const { title, onClickAdd, data, } = this.props;

		return (
			<PageBlock>
				<HeaderButtonBar
					left={(
						<Title text={title}/>
					)}
					right={(
						<Button
							icon="plus"
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={onClickAdd}
						>
							新增IP
						</Button>
					)}
				/>
				<Table
					columns={[
						{
							title: "IP列表",
							dataIndex: "ip",
							width: "33%"
						},
						{
							title: "备注",
							dataIndex: "remark",
						},
						{
							title: "操作",
							dataIndex: "operation",
							render: (value, record) => (
								<TextButton
									text="删除"
									color="danger"
									onClick={() => _handleClickDelete(record)}
								/>
							)
						}
					]}
					dataSource={data}
				/>
				<Message
					visible={isModalVisible}
					title="确认提示"
					message={"您确定要刪除嗎 ？"}
					onClickCancel={_handleClickCancel}
					onClickOk={_handleSubmitDelete}
				/>
			</PageBlock>
		);
	}
}

ListBlock.propTypes = propTypes;
ListBlock.defaultProps = defaultProps;

export default ListBlock;
