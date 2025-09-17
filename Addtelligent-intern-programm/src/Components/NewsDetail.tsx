import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation, useParams } from "react-router";
import newsJson from "../assets/json/news.mock.json";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

const NewsDetail = () => {
	const { id } = useParams();
	const location = useLocation();
	const newsItemFromState = location.state?.newsItem;

	const newsItem =
		newsItemFromState || newsJson.find((item) => item.id.toString() === id);

	if (!newsItem) {
		return (
			<Box sx={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
				<Typography variant="h4" align="center" sx={{ mt: 5 }}>
					News article not found.
				</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
			<Typography variant="h3" gutterBottom>
				{newsItem.title}
			</Typography>
			<ImageWithPlaceholder
				image={newsItem.image}
				title={newsItem.title}
				height={500}
				className="min-h-[300px] max-h-[100%]"
			/>
			<Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
				{newsItem.text}
			</Typography>
		</Box>
	);
};

export default NewsDetail;
