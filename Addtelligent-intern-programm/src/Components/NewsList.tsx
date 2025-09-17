import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router";
import newsJson from "../assets/json/news.mock.json";

const itemsPerPage = 6;

const NewsList = () => {
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(newsJson.length / itemsPerPage);

	const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedNews = newsJson.slice(startIndex, endIndex);

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
				{displayedNews.map((item) => (
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
								<CardMedia
									component="img"
									height="300"
									image={item.image}
									alt={item.title}
									className="min-h-[300px]"
									loading="lazy"
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
				))}
			</Grid>
			<Stack spacing={2} sx={{ my: 2, alignItems: "center" }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handleChange}
					shape="rounded"
					color="standard"
					className="dark:bg-dark-theme-400 p-2 rounded-md"
				/>
			</Stack>
		</>
	);
};

export default NewsList;
