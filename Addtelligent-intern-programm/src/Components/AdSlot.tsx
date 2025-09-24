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
			className={`w-[${width ? `${width}px` : "auto"}] h-[${height ? `${height}px` : "auto"}] ${className}`}
			id={slotId}
		></div>
	);
};

export default AdSlot;
