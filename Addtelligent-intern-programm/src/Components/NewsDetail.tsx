import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router";
import defaultImage from "../assets/images/defaultImage.webp";
import { useFeedArticle } from "../hooks/useFeedArticle";
import ImageWithPlaceholder from "./ImageWithPlaceholder";
import Loader from "./Loader";
import SanitizedHtmlRenderer from "./SanitizeHtmlDom";

const NewsDetail = () => {
	const location = useLocation();
	const detailUrl = location.state?.detailUrl;

	const { articleData, isLoading, error } = useFeedArticle(detailUrl);

	if (isLoading) {
		return <Loader />;
	}

	if (error) {
		return (
			<Box sx={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
				<Typography variant="h4" align="center" sx={{ mt: 5 }}>
					Error: {error.message}
				</Typography>
			</Box>
		);
	}

	if (!articleData) {
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
				{articleData.title}
			</Typography>
			<ImageWithPlaceholder
				image={articleData.heroImage || defaultImage}
				title={articleData.title}
				height={200}
				className="min-h-[300px] max-h-[100%] mb-4"
			/>
			<SanitizedHtmlRenderer html={articleData.content} />
		</Box>
	);
};

export default NewsDetail;
