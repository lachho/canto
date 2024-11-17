// Function to convert accents to number-based tones
function toNumberSingle(word) {
	const accents = /[aeiouāēīōūáéíóúàèìòù]/i;
	const alphanumeric = /[a-zA-Z0-9]$/; // Alphanumeric or combining diacritical marks
    if (!alphanumeric.test(word) && !accents.test(word)) {
        return word;
    }
	
	let result = '';
	let h = false;
	let vowel = false;
	let accent = '';

	for (let i = 0; i < word.length; i++) {
		let char = word[i];

		if (accents.test(char)) {
			vowel = true;
			const normalised = char.normalize("NFD");
			result += normalised[0];
			if (normalised.length > 1) {
				accent = normalised[1];
			}		
			// this was to try to do multi-syllable words, but too many edge cases	
			// i++;
			// if (i < word.length) {
			// 	let h = false;
			// 	let next = word[i];
			// 	while (i < word.length && vowels.test(next)) {
			// 		result += next;
			// console.log(result);

			// 		i++;
			// 		next = word[i];
			// 	}
				
			// 	if (next === 'h' || next === 'H') {
			// 		i++;
			// 		h = true;
			// 	}
		} else {
				if (vowel && (char === 'h' || char === 'H')) {
					h = true;
				} else {
					result += char;
				}
		}
	}

	// no accent
	if (accent === '') {
		if (h) {
			// trailing h
			result += '6';
		} else {
			// no h
			result += '3';
		} 
	
	// grave accent
	} else if (accent.charCodeAt(0) === 0x0300) {
		result += '4';
	// macron accent
	} else if (accent.charCodeAt(0) === 0x0304) {
		result += '1';
	// acute accent
	} else if (accent.charCodeAt(0) === 0x0301) {
		if (h) {
			// trailing h
			result += '5';
		} else {
			// no h
			result += '2';
		} 
	}
	
	return result;
}

// Function to convert number-based tones to accents
function toAccentSingle(word) {
	const macron = '\u0304'; 
	const grave = '\u0300';
	const acute = '\u0301';

	const nums = /[123456]/i;
	const vowels = /[aeiou]/i;
	let vowel = false;

	const tone = word[word.length - 1];
	if (!nums.test(tone)) {
		return word;
	}

	let result = '';
	let char;
	for (let i = 0; i < word.length; i++) {	
		char = word[i];
		if (vowel || !vowels.test(char)) {
			if (!nums.test(char)) result += char;
		}	else {
			if (tone === '1') {
				char = char + macron;
			} else if (tone === '2' || tone === '5') {
				char = char + acute;
			} else if (tone === '4') {
				char = char + grave;
			}
			vowel = true;
			result += char.normalize('NFC');
		}
	}

	// console.log(result);
	let index = -1;
	if (tone === '4' || tone === '5' || tone === '6') {
    for (let i = 0; i < word.length; i++) {
			char = word[i];
			if (vowels.test(char)) {
					index = i;
					// Check if the next character is not a vowel or it's the end of the word
					if (i + 1 >= word.length || !vowels.test(char)) {
							break;
					}
			}
		}
		if (index !== -1) {
			return result.slice(0, index + 1) + 'h' + result.slice(index + 1);
		}
	}

	return result;
}

const updateWord = (dictionary, id, key, value) => {
	const updatedWords = { ...dictionary }; // Create a shallow copy of the dictionary object
    const wordToUpdate = updatedWords[id]; // Get the word to update using the id as the key
    console.log("word changed", id, updatedWords);
    if (wordToUpdate) {
		wordToUpdate[key] = value; // Update the specific field
		
		if (key === 'tone') {
			wordToUpdate.yale = toAccent(value); // Update 'yale' field based on 'tone'
		}
		else if (key === 'yale') {
			wordToUpdate.tone = toNumber(value); // Update 'tone' field based on 'yale'
		}
		else if (key === 'tags') {
			wordToUpdate.tags = value.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== '');
		}

		return updatedWords; // Update the local state
	}
}

const toNumber = (str) => str.split(' ').map(toNumberSingle).join(' ');
const toAccent = (str) => str.split(' ').map(toAccentSingle).join(' ');
module.exports = { toNumber, toAccent, updateWord };