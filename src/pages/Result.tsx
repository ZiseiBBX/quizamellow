import { Container, Flex, Box, Text, Stack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

function Result() {
	const navigate = useNavigate();
	const correctAnswers = useStore((state) => state.correctAnswers);
	const time = useStore((state) => state.elapsedTime);

	const percentage = (correctAnswers / 10) * 100;

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
					textAlign="center"
					color="black"
				>
					<Stack align="center">
						<Text fontWeight="600" fontSize="1.75rem" color="yellow.500">
							Result
						</Text>
						<Stack direction="row">
							<Text fontWeight="500">Total Questions:</Text>
							<Text>10</Text>
						</Stack>
						<Stack direction="row">
							<Text fontWeight="500">Correct Answers:</Text>
							<Text>{correctAnswers}</Text>
						</Stack>
						<Stack direction="row">
							<Text>You took  </Text>
              <Text fontWeight="bold">{(time / 1000).toFixed(0)}</Text>
              <Text> seconds to finish this quiz</Text>
						</Stack>
						<Stack direction="row">
							<Text fontWeight="500">Percentage:</Text>
							<Text>{percentage.toFixed(2)}%</Text>
						</Stack>
						<Stack>
							{percentage >= 60 ? (
								<Text mt="2" fontSize="1.2rem" fontWeight="600">
									You have passed :D
								</Text>
							) : (
								<Text fontSize="1.2rem" fontWeight="600" mt="2">
									You have failed :(
								</Text>
							)}
							<Button variant="link" mt="4" color="yellow.600" onClick={() => navigate("/")}>
								Go Back
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Flex>
		</Container>
	);
}

export default Result;
