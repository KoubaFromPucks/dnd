import React from 'react';

export const defaultPortrait =
	'https://ucnmuni-my.sharepoint.com/:i:/r/personal/567772_muni_cz/Documents/LLM/pictures/gemini_defaukt_char.jpg?csf=1&web=1&e=PhNXqx';

export const Portrait = ({
	url,
	size
}: {
	url?: string;
	size?: 'sm' | 'md' | 'lg';
}) => {
	const sizeClasses = {
		sm: 'h-8 w-8',
		md: 'h-16 w-16',
		lg: 'h-32 w-32'
	};

	const borderSizes = {
		sm: 'border-2',
		md: 'border-3',
		lg: 'border-4'
	};

	return (
		<div
			className={`mx-auto overflow-hidden rounded-full border-amber-600 bg-slate-800 ${sizeClasses[size || 'lg']} ${borderSizes[size || 'lg']}`}
		>
			<img src={url || defaultPortrait} alt="Portrait" className="opacity-70" />
		</div>
	);
};
