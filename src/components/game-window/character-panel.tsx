import { Shield, Heart } from 'lucide-react';
import { Portrait } from '../portrait';

export const CharacterPanel = () => {
    return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-6 h-full overflow-y-auto">
        <div className="text-center">
          <Portrait />
          <h2 className="text-xl font-bold text-amber-500">Ragnar Železný</h2>
          <p className="text-sm text-slate-400 italic">Trpaslík Bojovník (Lvl 1)</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-red-900/50">
            <Heart className="text-red-500" size={20} />
            <span className="font-bold text-red-200">12 / 12 HP</span>
          </div>
          <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-blue-900/50">
            <Shield className="text-blue-400" size={20} />
            <span className="font-bold text-blue-200">AC 16</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries({strength: 12, dexterity: 14, constitution: 16, intelligence: 10, wisdom: 8, charisma: 13}).map(([stat, val]) => (
            <StatBlock key={stat} stat={stat.slice(0, 3)} value={val} />
          ))}
        </div>
      </aside>
    );
};

const StatBlock = ({ stat, value }: { stat: string; value: number }) => (
    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
      <div className="uppercase text-slate-500">{stat}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
);

