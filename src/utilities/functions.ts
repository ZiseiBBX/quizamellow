export function shuffle(array: any[]) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export function htmlDecode(input: string): string {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent as string;
}
