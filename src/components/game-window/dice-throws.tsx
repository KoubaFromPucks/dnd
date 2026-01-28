import React, { useState } from 'react';
import { Button } from '../basic-components/button';

export const DiceThrows = () => {
	const diceTypes = [20, 12, 10, 8, 6, 4];
	const maxHistoryLength = 7;

	const [throwResult, setThrowResult] = useState<number>();
	const [history, setHistory] = useState<number[]>([]);

	return (
		<>
			<div className="grid grid-cols-2 gap-2">
				{diceTypes.map(sides => (
					<Button
						key={sides}
						variant={'outline'}
						onClick={() => {
							const result = Math.floor(Math.random() * sides) + 1;
							setThrowResult(result);
							setHistory(prevHistory =>
								[...prevHistory, result].slice(-maxHistoryLength)
							);
						}}
					>
						d{sides}
					</Button>
				))}
			</div>

			<div className="mt-4 text-center text-2xl font-bold text-amber-500">
				Result: {throwResult ?? '-'}
			</div>
			<div className="mt-4 text-center text-lg text-gray-400">
				{history.join(', ')}
			</div>
		</>
	);
};
