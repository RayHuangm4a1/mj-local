import React, { Component, } from 'react';
import CodeBallButton from '../../../src/components/code-ball-button';
import './style.styl'

const plays = [
	{ id: 0, name: '0', },
	{ id: 1, name: '1', },
	{ id: 2, name: '2', },
	{ id: 3, name: '3', },
	{ id: 4, name: '4', },
	{ id: 5, name: '5', },
	{ id: 6, name: '6', },
	{ id: 7, name: '7', },
	{ id: 8, name: '8', },
	{ id: 9, name: '9', },
];

class CodeBallButtonSample extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlays: [],
		};

		this._handleClickPlays = this._handleClickPlays.bind(this);
	}

	_handleClickPlays(text) {
		this.setState(prevState => {
			let selectedPlays = [...prevState.selectedPlays,];
			const index = selectedPlays.findIndex(play => play === text);

			if (index > -1) {
				selectedPlays.splice(index, 1);
			} else {
				selectedPlays = [...selectedPlays, text, ];
			}

			return {
				selectedPlays,
			};
		});
	}

	render() {
		const { selectedPlays, } = this.state;
		const { _handleClickPlays, } = this;

		return (
			<React.Fragment>
				<div className="code-ball-button-sample">
					<p>current my selected: [{selectedPlays.toString()}]</p>

					{plays.map(play => {
						const isSelected = selectedPlays.findIndex(text => text === play.name);

						return (
							<CodeBallButton.Circle
								key={`code-ball-button-${play.id + play.name}`}
								text={play.name}
								onChange={_handleClickPlays}
								size={CodeBallButton.Circle.SizeEnum.MIDDLE}
								fontSize={CodeBallButton.Circle.FontSizeEnum.MIDDLE}
								isSelected={isSelected > -1 ? true : false}
							/>
						);
					})}
				</div>
				<hr/>
				<div className="code-ball-button-sample">
					<CodeBallButton.Round
						className="code-ball-button-sample--round"
						onChange={text => console.log(text)}
						text={'大'}
						size={CodeBallButton.Round.SizeEnum.MIDDLE}
						fontSize={CodeBallButton.Round.FontSizeEnum.MIDDLE}
					/>
					<CodeBallButton.Round
						className="code-ball-button-sample--round"
						onChange={text => console.log(text)}
						text={'小'}
						size={CodeBallButton.Round.SizeEnum.MIDDLE}
						fontSize={CodeBallButton.Round.FontSizeEnum.MIDDLE}
					/>
					<CodeBallButton.Round
						className="code-ball-button-sample--round"
						onChange={text => console.log(text)}
						text={'單'}
						size={CodeBallButton.Round.SizeEnum.MIDDLE}
						fontSize={CodeBallButton.Round.FontSizeEnum.MIDDLE}
					/>
					<CodeBallButton.Round
						className="code-ball-button-sample--round"
						onChange={text => console.log(text)}
						text={'雙'}
						size={CodeBallButton.Round.SizeEnum.MIDDLE}
						fontSize={CodeBallButton.Round.FontSizeEnum.MIDDLE}
					/>
				</div>

				<div>
					<CodeBallButton.Rectangle
						className="code-ball-button-sample--rectangle"
						text="五条"
						size={CodeBallButton.Rectangle.SizeEnum.MIDDLE}
						fontSize={CodeBallButton.Rectangle.FontSizeEnum.MIDDLE}
						borderRadius={CodeBallButton.Rectangle.BorderRadiusEnum.WITH_4}
					/>
				</div>
			</React.Fragment>
		);
	}
}

export default CodeBallButtonSample;
