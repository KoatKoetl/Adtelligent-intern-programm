/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <It is used to sanitize html> */

import Typography from "@mui/material/Typography";
import DOMPurify from "dompurify";
import type React from "react";

interface SanitizedHtmlRendererProps {
	html: string;
}

const SanitizedHtmlRenderer: React.FC<SanitizedHtmlRendererProps> = ({
	html,
}) => {
	const sanitizedHtml = DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true },
	});
	return (
		<Typography
			variant="body1"
			sx={{ whiteSpace: "pre-line" }}
			dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
		/>
	);
};

export default SanitizedHtmlRenderer;
