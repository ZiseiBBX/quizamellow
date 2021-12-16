import { Badge, Flex, Text } from "@chakra-ui/react";

interface OptionProps {
	number: number;
	option: string;
  onClick?(): void
}

function Option(props: OptionProps) {
	return (
		<Flex
			bg="yellow.500"
			py="4"
			width="300px"
			height="60px"
			sx={{ borderRadius: "50px 50px 50px 50px" }}
			align="center"
			mb="4"
			userSelect="none"
      cursor="pointer"
      onClick={props.onClick}
		>
			<Badge bg="white" color="yellow.500" borderRadius="50%" ml="4" px="4" py="2">
				<Text fontSize="0.9rem">{props.number}</Text>
			</Badge>
			<Text ml="2" fontWeight="600" color="white">
				{props.option}
			</Text>
		</Flex>
	);
}

export default Option;
