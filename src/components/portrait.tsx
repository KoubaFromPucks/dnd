import React from 'react';

export const defaultPortrait =
	'https://ucnmuni-my.sharepoint.com/:i:/r/personal/567772_muni_cz/Documents/LLM/pictures/gemini_defaukt_char.jpg?csf=1&web=1&e=PhNXqx';

export const Portrait = ({ url }: { url?: string }) => (
	<div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-amber-600 bg-slate-800">
		<img src={url || defaultPortrait} alt="Portrait" className="opacity-50" />
	</div>
);
