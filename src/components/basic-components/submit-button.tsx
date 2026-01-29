import React from 'react';
import { Button } from './button';

type SubmitButtonProps = {
	children?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
};

export const SubmitButton = ({
	children,
	onClick,
	disabled
}: SubmitButtonProps) => {
	return (
		<Button
			variant="default"
			type="submit"
			onClick={onClick}
			disabled={disabled}
		>
			{children ?? 'Submit'}{' '}
			{disabled && <span className="ml-2 animate-spin">⏳</span>}
		</Button>
	);
};
