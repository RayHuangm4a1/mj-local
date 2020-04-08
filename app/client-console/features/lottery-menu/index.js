import React from 'react';
import { Menu, Divider, } from 'ljit-react-components';
import PropTypes from 'prop-types';
//TODO: add icon mail to ljit component
import { Icon, } from 'antd';
import './style.styl';

const { SubMenu }  = Menu;

const propTypes = {};
const defaultProps = {};

function LotteryMenu() {
	return (
		// TODO: change layout and use UI image
		<React.Fragment>
			<span className="lottery-dashboard__title">彩種速選</span>
			<Menu
				className="lottery-dashboard__menu"
				themeType={Menu.ThemeTypeEnums.LIGHT}
				modeType={Menu.ModeTypeEnums.VERTICAL}
			>

				<SubMenu
					className="lottery-dashboard__submenu"
					key="sub1"
					title={
						<span>
							<Icon type="mail" />
							<span className="lottery-dashboard__submenu--title">分分彩</span>
							<span className="lottery-dashboard__submenu--sub">重慶 騰訊</span>
						</span>
					}
				/>
				<Divider />
				<SubMenu
					className="lottery-dashboard__submenu"
					key="sub2"
					title={
						<span>
							<Icon type="mail" />
							<span className="lottery-dashboard__submenu--title">六合彩</span>
							<span className="lottery-dashboard__submenu--sub">香港 1.5分</span>
						</span>
					}
				/>
				<Divider />
				<SubMenu
					className="lottery-dashboard__submenu"
					key="sub3"
					title={
						<span>
							<Icon type="mail" />
							<span className="lottery-dashboard__submenu--title">PC蛋蛋</span>
							<span className="lottery-dashboard__submenu--sub">幸運28</span>
						</span>
					}
				/>
				<Divider />
				<SubMenu
					className="lottery-dashboard__submenu"
					key="sub4"
					title={
						<span>
							<Icon type="mail" />
							<span className="lottery-dashboard__submenu--title">PK10</span>
							<span className="lottery-dashboard__submenu--sub">飛艇 北京</span>
						</span>
					}
				/>
				<Divider />
				<SubMenu
					className="lottery-dashboard__submenu"
					key="sub5"
					title={
						<span>
							<Icon type="mail" />
							<span className="lottery-dashboard__submenu--title">11選5</span>
							<span className="lottery-dashboard__submenu--sub">上海 安徽</span>
						</span>
					}
				/>
				<Divider />
				<SubMenu
					className="lottery-dashboard__submenu"
					key="sub6"
					title={
						<span>
							<Icon type="mail" />
							<span className="lottery-dashboard__submenu--title">快樂彩</span>
							<span className="lottery-dashboard__submenu--sub">重慶 1.5分</span>
						</span>
					}
				/>
			</Menu>
		</React.Fragment>
	);
}

LotteryMenu.propTypes = propTypes;
LotteryMenu.defaultProps = defaultProps;

export default LotteryMenu;
