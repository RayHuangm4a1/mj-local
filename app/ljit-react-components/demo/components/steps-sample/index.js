import React, { Component, } from 'react';
import {
	Steps,
	Button,
} from '../../../src';
import ComponentBlock from '../ComponentBlock';
import './style.styl';

class StepsSample extends Component {
	constructor() {
		super();
		this.state = {
			activeKey: 0,
		};
	}

	render() {
		const {
			activeKey,
		} = this.state;

		return (
			<React.Fragment>
				<ComponentBlock title='Default Steps'>
					<Steps className="steps-sample" activeKey={activeKey} size={Steps.SizeEnums.SMALL}>
						<Steps.Step title="Finished" description="This is a description." />
						<Steps.Step title="In Progress" description="This is a description." />
						<Steps.Step title="Waiting" description="This is a description." />
					</Steps>
					<div className="steps-action">
						{activeKey === 0 && (
							<Button type="primary" onClick={() => this.setState({ activeKey: activeKey + 1, })}>
							Next
							</Button>
						)}
						{activeKey === 1 && (
							<div>
								<Button type="primary" onClick={() => this.setState({ activeKey: activeKey + 1, })}>
								Next
								</Button>
								<Button type="primary" onClick={() => this.setState({ activeKey: activeKey - 1, })}>
								Previous
								</Button>
							</div>
						)}
						{activeKey === 2 && (
							<Button type="primary" onClick={() => this.setState({ activeKey: activeKey - 1, })}>
							Previous
							</Button>
						)}
					</div>
				</ComponentBlock>
			</React.Fragment>
		);
	}
}

export default StepsSample;
