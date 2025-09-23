import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type React from "react";
import { Link, useSearchParams } from "react-router";
import type { NewsItem } from "../api/api.types";
import defaultImage from "../assets/images/defaultImage.webp";
import { useFeedStatus } from "../hooks/useFeed";
import ImageWithPlaceholder from "./ImageWithPlaceholder";
import Loader from "./Loader";

const itemsPerPage = 6;

const NewsList = () => {
	const { feedData, isLoading, error } = useFeedStatus();

	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get("page") || "1", 10);

	const totalItems = feedData?.data.total || 0;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedNews = feedData?.data.items.slice(startIndex, endIndex) || [];

	const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
		setSearchParams({ page: value.toString() });
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (isLoading) {
		return <Loader />;
	}
	if (error) {
		return (
			<div className="p-4 text-center text-red-500">Error: {error.message}</div>
		);
	}

	return (
		<>
			<h1 className="text-4xl p-4">News</h1>
			<Grid
				container
				spacing={4}
				sx={{
					padding: "20px",
					minHeight: "950px",
					alignItems: "flex-start",
				}}
			>
				{displayedNews.map((item: NewsItem) => {
					const imageUrl = item.imageUrl ? item.imageUrl : defaultImage;
					return (
						<Grid size={4} key={item.id}>
							<Link to={`/news/${item.id}`} state={{ detailUrl: item.link }}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
										transition: "transform 0.3s, box-shadow 0.3s",
										"&:hover": {
											transform: "scale(1.03)",
											boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
										},
										cursor: "pointer",
									}}
								>
									<ImageWithPlaceholder
										image={imageUrl}
										title={item.title}
										height={300}
										className="min-h-[300px] max-h-[300px]"
									/>
									<CardContent
										sx={{ flexGrow: 1 }}
										className="dark:bg-dark-theme-400"
									>
										<Typography gutterBottom variant="h5" component="div">
											{item.title}
										</Typography>
										<Typography
											variant="body2"
											sx={{
												overflow: "hidden",
												textOverflow: "ellipsis",
												display: "-webkit-box",
												WebkitLineClamp: 2,
												WebkitBoxOrient: "vertical",
											}}
											color="text.secondary"
										>
											{item.description}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
			<Stack spacing={2} sx={{ my: 2, alignItems: "center" }}>
				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handleChange}
						shape="rounded"
						color="standard"
						className="dark:bg-dark-theme-400 p-2 rounded-md"
					/>
				)}
			</Stack>
		</>
	);
};

export default NewsList;
