import React from 'react';

export const defaultPortrait =
	'https://lh3.googleusercontent.com/gg/AIJ2gl-C4Kc-wsIFfhy1_ffV7-s4srjwCRuFfPa0DkJcywGk40ZpqCFpb5QgG_ygWYo0EFqhR9AllZACK6NX8he8FlvNZfnokEzaConxGsOSYaDYxKaSe5umVoLOmY5pXb53ip-b2QTlPPs0rUhQ2rZvMLDbPYQYj7BOdhoVkjir9L6sQHOgxPc6=s1024-rj-mp2';

export const Portrait = ({ url }: { url?: string }) => (
	<div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-amber-600 bg-slate-800">
		<img src={url || defaultPortrait} alt="Portrait" className="opacity-50" />
	</div>
);
