'use client';

import React from "react";
import { CharacterPanel } from '@/components/game-window/character-panel';
import { Chat } from '@/components/game-window/chat';
import { InventoryPanel } from '@/components/game-window/invetory-panel';

export const GameWindow = () => (
    <div className="flex h-full w-full bg-slate-950 overflow-hidden text-slate-200">
    <CharacterPanel />

	<Chat />
      
	  <InventoryPanel />
      </div>
);