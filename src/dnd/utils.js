export function height(element) {
	const style = style => parseFloat(getComputedStyle(element)[style]);
	return style("height") + style("padding-top") + style("padding-bottom") + "px"
}

export function width(element) {
	const style = style => parseFloat(getComputedStyle(element)[style]);
	return style("width") + style("padding-left") + style("padding-right") + "px"
}

export function elementNearestThePoint(elements, x = 0, y = 0) {
	if(!elements || elements.length === 0) return undefined; 
	
	return elements.reduce((opt, element) => {
		const { top, left } = element.getBoundingClientRect();
		const distance = Math.abs(top - y) + Math.abs(left - x);
		
		if(opt.minimalDistance <= distance) return opt.closestElement

		opt.minimalDistance = distance;
		return opt.closestElement = element;
	}, {
		minimalDistance: Infinity,
		closestElement: null
	});
}