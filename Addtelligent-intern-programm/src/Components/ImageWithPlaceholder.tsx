import { Box, CardMedia } from "@mui/material";
import { useState } from "react";

const generatePlaceholder = (_url: string) => {
	return "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%20viewBox%3D%220%200%201%201%22%3E%3Crect%20width%3D%221%22%20height%3D%221%22%20fill%3D%22%23cccccc%22%2F%3E%3C%2Fsvg%3E";
};

const ImageWithPlaceholder = ({
	image,
	title,
	height,
	className,
}: {
	image: string;
	title: string;
	height: number;
	className?: string;
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const placeholder = generatePlaceholder(image);

	const handleImageLoad = () => {
		setIsLoaded(true);
	};

	return (
		<Box sx={{ position: "relative", width: "100%", minHeight: height }}>
			<CardMedia
				component="img"
				image={placeholder}
				alt={`Placeholder for ${title}`}
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					filter: "blur(20px)",
					transition: "opacity 0.5s ease-in-out",
					opacity: isLoaded ? 0 : 1,
					objectFit: "cover",
				}}
				className={className}
			/>
			<CardMedia
				component="img"
				image={image}
				alt={title}
				onLoad={handleImageLoad}
				sx={{
					opacity: isLoaded ? 1 : 0,
					transition: "opacity 0.5s ease-in-out",
					objectFit: "cover",
				}}
				className={className}
				loading="lazy"
			/>
		</Box>
	);
};

export default ImageWithPlaceholder;
