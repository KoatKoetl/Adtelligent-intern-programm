import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type React from "react";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import pexelsImage from "../assets/images/pexels-photo-97050.webp";
import newsJson from "../assets/json/news.mock.json";
import ImageWithPlaceholder from "./ImageWithPlaceholder";

const imageMap: { [key: string]: string } = {
	"pexels-photo-97050.webp": pexelsImage,
};

const itemsPerPage = 6;

const NewsList = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get("page") || "1", 10);
	const totalPages = Math.ceil(newsJson.length / itemsPerPage);

	const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
		setSearchParams({ page: value.toString() });
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const displayedNews = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return newsJson.slice(startIndex, endIndex);
	}, [currentPage]);

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
				{displayedNews.map((item) => {
					const imageUrl = imageMap[item.image];

					if (!imageUrl) {
						console.error(`Image not found in map: ${item.image}`);
						return null;
					}

					return (
						<Grid size={4} key={item.id}>
							<Link to={`/news/${item.id}`} state={{ newsItem: item }}>
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
											{item.text}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					);
				})}
			</Grid>
			<Stack spacing={2} sx={{ my: 2, alignItems: "center" }}>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handleChange}
					shape="rounded"
					color="standard"
					sx={{
						"& .MuiPaginationItem-root": {
							"&.Mui-selected": {
								// Example for selected button
								backgroundColor: "#fff", // White in dark mode
								"&.dark:hover": {
									backgroundColor: "gray",
								},
							},
						},
					}}
				/>
			</Stack>
		</>
	);
};

export default NewsList;
