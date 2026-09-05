import React from 'react';
import { useComandaStore } from '@/store/useComandaStore';
import { PriceTag } from '@/components/atoms/PriceTag';
import { Badge } from '@/components/atoms/Badge';
import { BarChart3, Box, CheckCircle, ToggleLeft, ToggleRight, ArrowUpRight } from 'lucide-react';

export const AdminTemplate: React.FC = () => {
  const { dishes, toggleAvailability, setAdminView } = useComandaStore();

  const totalViews = dishes.reduce((acc, curr) => acc + curr.views3dCount, 0);
  const totalOrders = dishes.reduce((acc, curr) => acc + curr.ordersCount, 0);
  const conversionRate = totalViews > 0 ? ((totalOrders / totalViews) * 100).toFixed(1) : '0.0';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="ar">Admin & Analytics</Badge>
            <span className="text-xs text-stone-400 font-mono">Terminal Gerencial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 mt-1">
            Panel de Control del Restaurante
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Métricas de engagement 3D/AR, disponibilidad de platos y conversión en tiempo real.
          </p>
        </div>

        <button
          onClick={() => setAdminView(false)}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Volver al Menú de Comensales</span>
        </button>
      </div>

      {/* Tarjetas KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Visualizaciones 3D / AR
            </span>
            <Box className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-stone-100 mt-2 font-mono">{totalViews}</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            ↑ +34% comensales usaron AR sobre la mesa hoy
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Comandas Emitidas
            </span>
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-stone-100 mt-2 font-mono">{totalOrders}</p>
          <p className="text-[11px] text-stone-400 mt-1">Platos ordenados desde la web app</p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Conversión 3D → Pedido
            </span>
            <BarChart3 className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-amber-400 mt-2 font-mono">{conversionRate}%</p>
          <p className="text-[11px] text-stone-400 mt-1">
            Visualizar el plato en AR incrementó la conversión en 2.4x
          </p>
        </div>
      </div>

      {/* Tabla Catálogo */}
      <div className="rounded-2xl bg-stone-900/40 border border-stone-800 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-200">Catálogo de Platos y Recursos 3D</h3>
            <p className="text-xs text-stone-400">Activa o pausa platos al instante según inventario en cocina.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 uppercase font-semibold text-[11px]">
                <th className="p-4">Plato</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Modelo 3D</th>
                <th className="p-4">Vistas 3D</th>
                <th className="p-4">Pedidos</th>
                <th className="p-4 text-right">Disponibilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {dishes.map((item) => (
                <tr key={item.id} className="hover:bg-stone-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <span className="font-semibold text-stone-200 block">{item.name}</span>
                        <span className="text-[11px] text-stone-400 line-clamp-1">{item.tagline}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 uppercase text-stone-400 font-medium text-xs">{item.category}</td>
                  <td className="p-4 font-bold text-amber-400"><PriceTag amount={item.price} size="sm" /></td>
                  <td className="p-4">
                    {item.model3dUrl ? (
                      <Badge variant="arSolid" icon="ar">Activo (.glb)</Badge>
                    ) : (
                      <span className="text-stone-500 text-xs italic">Sin 3D</span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-stone-300">{item.views3dCount}</td>
                  <td className="p-4 font-mono text-stone-300">{item.ordersCount}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleAvailability(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                        item.isAvailable
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {item.isAvailable ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-emerald-400" />
                          <span>Disponible</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-red-400" />
                          <span>Agotado</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
