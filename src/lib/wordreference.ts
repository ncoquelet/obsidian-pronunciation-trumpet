import { request } from "obsidian";
import { Accent, Word } from "src/model/word";

const WORDREFERENCE_COM: string = "http://www.wordreference.com";

export const wordreference = async (
	search: string,
	from = "en",
	to = "fr"
): Promise<Word> => {
	const response = await request(
		`${WORDREFERENCE_COM}/${from}${to}/${search}`
	);

	if (response) {
		let audioFiles = readAudioToJson(searchAudio(response));
		return new Word(extractAccents(audioFiles));
	}
	return new Word();
};

const extractAccents = (audioFiles: string[]): Accent[] => {
	return audioFiles.map((audioFile): Accent => {
		return extractAccent(audioFile);
	});
};

const extractAccent = (audioFile: string): Accent => {
	let code = exractCode(audioFile);
	return { code: code, src: `${WORDREFERENCE_COM}${audioFile}` };
};

const exractCode = (audioFile: string): string => {
	const language = audioFile.match(/\/audio\/en\/(.*)\/.*\.mp3/);
	if (language && language.length > 0) {
		return language[1].replace("/", "-").toUpperCase();
	}
	return "Default accent";
};

const searchAudio = (htmlPage: string) => {
	const audioStr = htmlPage.match(/audioFiles = (\[.*?\])/);
	if (audioStr && audioStr.length != 0) {
		return audioStr[1];
	}
	throw "";
};

const readAudioToJson = (audioStr: string): string[] => {
	// remove extra commat at the end
	audioStr = audioStr.replace(",]", "]");
	// replace quotes
	audioStr = audioStr.replaceAll("'", '"');
	return JSON.parse(audioStr);
};
