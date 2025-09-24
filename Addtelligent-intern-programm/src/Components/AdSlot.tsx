import type React from "react";

interface AdSlotProps {
	slotId: string;
	width?: number;
	height?: number;
	className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({
	slotId,
	width,
	height,
	className,
}) => {
	return (
		<div
			className={className}
			id={slotId}
			style={{
				width: width ? `${width}px` : "auto",
				height: height ? `${height}px` : "auto",
			}}
		></div>
	);
};

export default AdSlot;
