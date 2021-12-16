import { Box, Button, Container, Flex, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { shuffle } from "../utilities/functions";
import Option from "../components/Option";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import QuizamellowIcon from "../quizamellow_logo.png";

function Home() {
	const [index, setIndex] = useState(0);

	const initializeQuiz = useStore((state) => state.initialize);
	const quizData = useStore((state) => state.quizData);
	const category = useStore((state) => state.category);
	const setCategory = useStore((state) => state.setCategory);
	const startQuiz = useStore((state) => state.startQuiz);
	const stopQuiz = useStore((state) => state.stopQuiz);
	const responses = useStore((state) => state.responses);
	const addResponse = useStore((state) => state.addResponse);

	const navigate = useNavigate();

	useEffect(() => {
		initializeQuiz();
	}, []);

	return (
		<Container height="100vh">
			<Flex height="100%" width="100%" justify="center" align="center">
				<Box
					rounded="10px"
					alignItems="center"
					border="1px"
					borderColor="white"
					py="8"
					px="8"
					borderWidth="2px"
					bg="white"
					boxShadow="xl"
					userSelect="none"
				>
					{quizData.length > 0 && (
						<Flex alignItems="center" justifyContent="center" textAlign="center" direction="column" width="100%">
							<Text fontWeight="500" color="black">
								{index + 1}/10
							</Text>
							<Text fontWeight="600" fontSize="1.5rem" mb="4" color="black">
								{quizData[index].question}
							</Text>
							{shuffle([...(quizData[index].incorrect_answers ?? []), quizData[index].correct_answer]).map(
								(option, idx) => {
									return (
										<Option
											key={`${idx}${option}`}
											number={idx + 1}
											option={option}
											onClick={() => {
												addResponse({ ...quizData[index], user_answer: option });
												if (index < 9) setIndex((state) => state + 1);
												else {
													stopQuiz();
													navigate("/result");
												}
											}}
										/>
									);
								}
							)}
						</Flex>
					)}
					{quizData.length === 0 && (
						<Box textAlign="center">
							<Box h="12" w="12" mx="auto">
								<img src={QuizamellowIcon} />
							</Box>
							<Text fontWeight="600" fontSize="1.75rem" mb="4" color="yellow.600">
								Quizamellow
							</Text>
							<Select
								value={category}
								variant="outline"
								outlineColor="yellow.500"
								size="sm"
								placeholder="Select Category"
								color="yellow.500"
								fontWeight="bold"
								_focus={{ boxShadow: "none" }}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="any">Any Category</option>
								<option value="9">General Knowledge</option>
								<option value="10">Entertainment: Books</option>
								<option value="11">Entertainment: Film</option>
								<option value="12">Entertainment: Music</option>
								<option value="13">Entertainment: Musicals &amp; Theatres</option>
								<option value="14">Entertainment: Television</option>
								<option value="15">Entertainment: Video Games</option>
								<option value="16">Entertainment: Board Games</option>
								<option value="17">Science &amp; Nature</option>
								<option value="18">Science: Computers</option>
								<option value="19">Science: Mathematics</option>
								<option value="20">Mythology</option>
								<option value="21">Sports</option>
								<option value="22">Geography</option>
								<option value="23">History</option>
								<option value="24">Politics</option>
								<option value="25">Art</option>
								<option value="26">Celebrities</option>
								<option value="27">Animals</option>
								<option value="28">Vehicles</option>
								<option value="29">Entertainment: Comics</option>
								<option value="30">Science: Gadgets</option>
								<option value="31">Entertainment: Japanese Anime &amp; Manga</option>
								<option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
							</Select>
							<Button
								mt="4"
								onClick={startQuiz}
								color="white"
								bg="yellow.500"
								_hover={{ bg: "yellow.600", fontWeight: 700 }}
							>
								START QUIZ
							</Button>
						</Box>
					)}
				</Box>
			</Flex>
		</Container>
	);
}

export default Home;
