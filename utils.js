function unvue(obj) {
	return JSON.parse(JSON.stringify(obj))
}

function distinct(value, index, self) {
	return self.indexOf(value) === index;
}

export {
	unvue,
	distinct
}