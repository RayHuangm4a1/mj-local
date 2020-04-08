import React, { Component, } from 'react';
import XinYongPlaySlot from '../../../src/components/xin-yong-play-slot';
import './style.styl';

const XinYongPlaySlotLine = XinYongPlaySlot.Line;
const XinYongPlaySlotSquare = XinYongPlaySlot.Square;

class XinYongPlaySlotSample extends Component {
	constructor(props) {
		super(props);

		this.state = {
			betting: {},
			selectedIds: [],
		};

		this._handleChangeSlotInput = this._handleChangeSlotInput.bind(this);
		this._handleClickSquareSlot = this._handleClickSquareSlot.bind(this);
	}

	_handleChangeSlotInput(play, amount) {
		const betting = {
			play: play,
			amount: amount,
		};

		this.setState({
			betting: betting,
		});

		console.log('betting: ', betting);
	}
	_handleClickSquareSlot(id) {
		const { selectedIds, } = this.state;
		const isSelected = selectedIds.includes(id);

		if (isSelected) {
			this.setState({
				selectedIds: selectedIds.filter(selectedId => selectedId !== id),
			});
		} else {
			this.setState({
				selectedIds: [...selectedIds, id, ],
			});
		}
	}

	render() {
		const { _handleChangeSlotInput, _handleClickSquareSlot, } = this;
		const { betting, selectedIds, } = this.state;

		return (
			<div>
				<section>
					<h5>Line</h5>
					<XinYongPlaySlotLine
						style={{ width: '174px', }}
						play={{ name: '大', id: 53000, bonus: 1.996, }}
						betting={betting}
						defaultAmount={100}
						onChange={_handleChangeSlotInput}
					/>
					<XinYongPlaySlotLine
						style={{ width: '174px', }}
						isDisabled
						disabledText={'維修中'}
						play={{ name: '大', id: 53000, bonus: 1.996, }}
						betting={betting}
						onChange={_handleChangeSlotInput}
					/>
					<XinYongPlaySlotLine
						style={{ width: '174px', }}
						isDisabled
						disabledText={'封盘'}
						play={{ name: '0', id: 53000, bonus: 1.996, playSlotType: XinYongPlaySlotLine.TypeEnums.ANIMAL, }}
						betting={betting}
						onChange={_handleChangeSlotInput}
					/>
				</section>
				<section>
					<h5>Square</h5>
					<div className="ljit-xin-yong-play-slot-square-sample">
						<div className="ljit-xin-yong-play-slot-square-sample__block ">
							<XinYongPlaySlotSquare
								play={{ id: 0, name: 0, odds: 1.995, }}
								onClick={() => _handleClickSquareSlot(0)}
								isSelected={selectedIds.includes(0)}
							/>
						</div>
						<div className="ljit-xin-yong-play-slot-square-sample__block ">
							<XinYongPlaySlotSquare
								play={{ id: 1, name: '总和大', odds: 1.995, }}
								onClick={() => _handleClickSquareSlot(1)}
								isSelected={selectedIds.includes(1)}
							/>
						</div>
						<div className="ljit-xin-yong-play-slot-square-sample__block ">
							<XinYongPlaySlotSquare
								play={{ id: 2, name: '总和尾大', odds: 1.995, }}
								onClick={() => _handleClickSquareSlot(2)}
								isSelected={selectedIds.includes(2)}
								isDisabled
							/>
						</div>
						<div className="ljit-xin-yong-play-slot-square-sample__block ">
							<XinYongPlaySlotSquare
								play={{ id: 3, name: '2', odds: 1.993, }}
								onClick={() => _handleClickSquareSlot(3)}
								isSelected={selectedIds.includes(3)}
								playSlotType={XinYongPlaySlotSquare.TypeEnums.ANIMAL}
							/>
						</div>
						<div
							className="
								ljit-xin-yong-play-slot-square-sample__block
								ljit-xin-yong-play-slot-square-sample__circle
							"
						>
							<XinYongPlaySlotSquare
								play={{ id: 4, name: 1, odds: 1.995, }}
								onClick={() => _handleClickSquareSlot(4)}
								isSelected={selectedIds.includes(4)}
								playSlotType={XinYongPlaySlotSquare.TypeEnums.CIRCLE}
							/>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default XinYongPlaySlotSample;
