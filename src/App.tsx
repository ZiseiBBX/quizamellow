import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";

function App() {
	return (
		<Box width="100%" height="100vh" bg="yellow.500">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/result" element={<Result />} />
					<Route path="*" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</Box>
	);
}

export default App;
