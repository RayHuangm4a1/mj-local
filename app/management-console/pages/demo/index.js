import React, { Component, } from 'react';
import {
	Layout,
	Button,
	TextButton
} from 'ljit-react-components';
import TeamUserStatusManagementModal from '../../components/team-user-status-management-modal';

const { Content, Header, } = Layout;

class Demo extends Component {
	constructor() {
		super();
		this.state = {
			isTeamUserStatusManagementModalVisible: false
		};
	}
	render() {
		const { isTeamUserStatusManagementModalVisible, } = this.state;

		return (
			<Layout style={{ minHeight: '100vh', }}>
				<Header>DEMO PAGE</Header>
				<Content style={{ padding: '20px', }}>
					<section>
						<h2>TeamUserStatusManagementModal</h2>
						<Button onClick={() => this.setState({ isTeamUserStatusManagementModalVisible: true, })}>Click me</Button>
						<TeamUserStatusManagementModal
							title="提現"
							isVisible={isTeamUserStatusManagementModalVisible}
							onClickCancel={() => this.setState({ isTeamUserStatusManagementModalVisible: false, })}
							userData={{
								statusText: '未禁止',
								operation: <TextButton text="禁止" onClick={() => console.log("禁止")} />
							}}
							teamData={{
								statusText: <span className="team-user-status-management-modal__text-red">禁止中</span>,
								operation: (
									<div style={{ display: 'flex', flexDirection: 'column', height: 50, justifyContent: 'space-between', }}>
										<TextButton text="解除团队禁止" onClick={() => console.log("解除团队禁止")} />
										<TextButton text="解除团队中的个人禁止" onClick={() => console.log("解除团队中的个人禁止")} />
									</div>
								)
							}}
						/>
					</section>

				</Content>
			</Layout>
		);
	}
}

export default Demo;
