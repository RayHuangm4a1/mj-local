const COLON_RULE = /:\s{1}/;
const TOOLTIP_GUTTER = 30;

function tooltips(tooltip) {
	const prefixClass = 'chartjs-tooltip';
	let tooltipEl = document.getElementById(prefixClass);

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.id = prefixClass;
		tooltipEl.classList.add(prefixClass);
		this._chart.canvas.parentNode.appendChild(tooltipEl);
	}

	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = 0;
		return;
	}

	if (tooltip.body) {
		tooltipEl.innerHTML = renderTooltip(prefixClass, tooltip);
	}

	const { canvas, } = this._chart;
	let positionX = this._chart.canvas.offsetLeft;
	let positionY = this._chart.canvas.offsetTop;
	let offsetX = positionX + TOOLTIP_GUTTER + tooltip.caretX;
	let offsetY = positionY + tooltip.caretY;

	if (checkTooltipOverHalfChart(canvas, tooltip)) {
		offsetX = positionX + tooltip.caretX - TOOLTIP_GUTTER - tooltipEl.offsetWidth;
	}
	tooltipEl.style.opacity = 1;
	tooltipEl.style.left = `${offsetX}px`;
	tooltipEl.style.top = `${offsetY}px`;
};

function checkTooltipOverHalfChart(canvas = {}, tooltip = {}) {
	const {
		offsetWidth: canvasWidth,
	} = canvas;
	const tooltipOffsetRight = tooltip.caretX + tooltip.width;

	return tooltipOffsetRight > canvasWidth / 2;
}

function getBodyLines(bodyItem = {}) {
	const lines = bodyItem.lines || [];

	return lines.map((line) => {
		const chips = line.split(COLON_RULE);
		// get label data
		return chips[0];
	});
}
function renderTooltip(prefixClass = '', tooltip = {}) {
	const {
		dataPoints = [],
		labelColors = [],
		title = [],
		body = [],
	} = tooltip;
	const titleLines = title || [];
	const bodyLines = body.map(getBodyLines);

	return `
		<div class="${prefixClass}__wrapper">
			<div class="${prefixClass}__title">
				${titleLines.map((title) => title).join('')}
			</div>
			<table class="${prefixClass}__content">
				<tbody>
					${bodyLines.map((body, index) => {
						const dataPoint = dataPoints[index];
						const labelColor = labelColors[index];
						const style = `
							background: ${labelColor.backgroundColor};
						`;
						const dot = `
							<span
								class="${prefixClass}__key"
								style="${style}"
							>
							</span>
						`;
						return `
							<tr>
								<td>
									${dot}
									${body}
								</td>
								<td>
									${dataPoint.value}
								</td>
							</tr>
						`;
					}).join('')}
				</tbody>
			</table>
		</div>
	`;
}

export default tooltips;
