export default {
	splitEvery(array, length) {
		let retVal = [];
		if (array && array.length > 0) {
			for (let i = 0; i < array.length; i += length) {
				retVal.push(i + length < array.length ? array.slice(i, i + length) : array.slice(i));
			}
		}
		return retVal;
	}
}
