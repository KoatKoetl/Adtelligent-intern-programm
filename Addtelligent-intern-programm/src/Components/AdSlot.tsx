import type React from "react";

interface AdSlotProps {
	slotId: string;
	width?: number;
	height?: number;
}

const AdSlot: React.FC<AdSlotProps> = ({ slotId, width, height }) => {
	const style: React.CSSProperties = {
		width: width ? `${width}px` : "100%",
		height: height ? `${height}px` : "auto",
		margin: "0",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "12px",
		color: "#666",
	};

	return <div id={slotId} style={style}></div>;
};

export default AdSlot;
