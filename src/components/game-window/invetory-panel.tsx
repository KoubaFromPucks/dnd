import { MessageSquare, Shield, Heart, Zap, Backpack, Dices } from 'lucide-react';

export const InventoryPanel = () => (
<aside className="w-72 bg-slate-900 border-l border-slate-800 p-6 flex flex-col gap-6 h-full overflow-y-auto">
        <section>
          <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4 flex items-center gap-2">
            <Backpack size={16} /> Inventář
          </h3>
          <div className="space-y-2">
            {['Dlouhý meč', 'Štít', 'Lektvar léčení'].map(item => (
                <InventoryItem key={item} name={item} quantity={1} />
            ))}
          </div>
        </section>

        <section className="mt-auto">
          <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-4 flex items-center gap-2">
            <Dices size={16} /> Rychlé Hody
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[20, 12, 10, 8, 6, 4].map(sides => (
              <button key={sides} className="p-2 bg-slate-950 border border-slate-700 rounded text-amber-500 font-bold hover:bg-slate-800 transition-colors">
                d{sides}
              </button>
            ))}
          </div>
        </section>
      </aside>
);

const InventoryItem = ({ name, quantity }: { name: string; quantity: number }) => (
    <div className="p-2 bg-slate-800 rounded border border-slate-700 text-sm flex justify-between hover:border-amber-900 cursor-pointer">
      {name} <span className="text-slate-600">{quantity}x</span>
    </div>
);