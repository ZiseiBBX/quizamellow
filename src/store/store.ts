import produce from "immer";
import create from "zustand";
import { QuizResponse, Result } from "../interfaces";
import { htmlDecode } from "../utilities/functions";

interface UserReponse extends Result {
	user_answer: string;
}

interface Store {
	initialize(): void;
	quizData: Result[];
	category: string;
	setCategory(cat: string): void;
	startQuiz(): void;
	stopQuiz(): void;
	fetchQuiz(): Promise<void>;

	responses: UserReponse[];
	addResponse(response: UserReponse): void;

	elapsedTime: number;
	interval: any;
	startStopwatch(): void;
	stopStopwatch(): void;
	resetStopwatch(): void;

	correctAnswers: number;
	generateStatistics(): void;
}

const useStore = create<Store>((set, get) => ({
	initialize() {
		get().resetStopwatch();
		set({ quizData: [], correctAnswers: 0 });
	},

	quizData: [],
	category: "any",
	setCategory(cat) {
		set({ category: cat });
	},
	async startQuiz() {
		await get().fetchQuiz();
		get().startStopwatch();
	},
	stopQuiz() {
		get().stopStopwatch();
		get().generateStatistics();
	},
	async fetchQuiz() {
		try {
			let baseUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
			if (get().category !== "any") baseUrl += `&category=${get().category}`;
			console.log(baseUrl);
			const res = await fetch(baseUrl);
			const json: QuizResponse = await res.json();
			const results = json.results;
			const finalData = produce(results, (draft) => {
				draft.forEach((r, index) => {
					draft[index].correct_answer = htmlDecode(draft[index].correct_answer);
					draft[index].incorrect_answers.forEach((ia, iIndex) => {
						draft[index].incorrect_answers[iIndex] = htmlDecode(ia);
					});
					draft[index].question = htmlDecode(draft[index].question);
				});
			});
			set({ quizData: finalData });
		} catch (err) {
			console.log(err);
		}
	},

	responses: [],
	addResponse(response) {
		set(
			produce((draft: Store) => {
				draft.responses.push(response);
			})
		);
	},

	elapsedTime: 0,
	interval: 0,
	startStopwatch() {
		const i = setInterval(() => {
			set({ elapsedTime: get().elapsedTime + 1000 });
		}, 1000);
		set({ interval: i });
	},
	stopStopwatch() {
		clearInterval(get().interval);
	},
	resetStopwatch() {
		set({ elapsedTime: 0 });
	},

	correctAnswers: 0,
	generateStatistics() {
		let correct = 0;

		get().responses.forEach((response) => {
			if (response.correct_answer === response.user_answer) correct += 1;
		});

		set({ correctAnswers: correct });
	},
}));

export default useStore;
