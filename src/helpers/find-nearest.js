const cached = new Map();

export function findNearestElementsBySelector(startFrom, selector = "*", checkedElements = new Array()) {
	if(!startFrom) return new Array();
	if(cached.has(startFrom)) return cached.get(startFrom);
	const searchAmong = list => searchAmongElements(list, selector, checkedElements);

	const neighbours = getNeighboursOfElement(startFrom, checkedElements);
	const children = new Array(...startFrom.childNodes);
	const matchingChildren = searchAmong(children);

	const result = matchingChildren.length !== 0 ? matchingChildren : searchAmong(neighbours);
	
	cached.set(startFrom, result);
	return result
}


function getNeighboursOfElement(element, except = new Array()) {
	if(!element.parentNode) return new Array();
	
	const exceptions = except.concat(element);
	const neighbours = new Array(...element.parentNode.childNodes);
	return neighbours.filter(item => exceptions.indexOf(item) === -1)
}


function searchAmongElements(elements, selector = "*", checkedElements = new Array()) {
	if (!elements || elements.length === 0) return new Array();

	const _elements = elements.filter(element => !checkedElements.includes(element));
	const matches = getMatchesIn(_elements, selector);
	
	checkedElements = checkedElements.concat(_elements);
	if (matches.length !== 0) return matches;

	return _elements.reduce((childMatches, element) => {
		return childMatches.concat(findNearestElementsBySelector(element, selector, checkedElements))
	}, [])
}

function getMatchesIn(elements, selector = "*") {
	return elements.reduce((matched, item) => {
		if(item.tagName !== undefined && item.matches(selector)) 
      matched.push(item);
		return matched
	}, new Array());
}