'use client';

import React from 'react';

import { CharacterPanel } from '@/components/game-window/character-panel';
import { Chat } from '@/components/game-window/chat';
import { InventoryPanel } from '@/components/game-window/invetory-panel';
import { defaultCharactes } from '@/test-data/characters';

export const GameWindow = () => (
	<div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-200">
		<CharacterPanel characters={defaultCharactes} />

		<Chat />

		<InventoryPanel />
	</div>
);
