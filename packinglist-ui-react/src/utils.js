export default {
	/**
	 * Splits an array into an array of arrays of a given length.
	 * @param array the array to split
	 * @param length the size of the sub-arrays
	 * @returns array of arrays of given length
	 */
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
