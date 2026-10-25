import { CarFront, ShoppingCart } from "lucide-react";
import type { Vehicle } from "../api/client";
type Props = { vehicle:Vehicle; isAdmin:boolean; purchasing:boolean; onPurchase:(v:Vehicle)=>void; onEdit:(v:Vehicle)=>void; onDelete:(v:Vehicle)=>void };
export default function VehicleCard({vehicle,isAdmin,purchasing,onPurchase,onEdit,onDelete}:Props) {
 const unavailable=vehicle.quantity<=0;
 return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">{vehicle.imageUrl?<img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} className="h-full w-full object-cover"/>:<CarFront size={76} strokeWidth={1.2} className="text-slate-400"/>}</div>
  <div className="space-y-4 p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-widest text-blue-600">{vehicle.year}</p><h3 className="mt-1 text-lg font-bold">{vehicle.make} {vehicle.model}</h3></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${unavailable?"bg-red-50 text-red-700":"bg-emerald-50 text-emerald-700"}`}>{unavailable?"Out of stock":`${vehicle.quantity} available`}</span></div>
  {vehicle.description&&<p className="text-sm text-slate-500">{vehicle.description}</p>}<p className="text-2xl font-extrabold">{new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(vehicle.price)}</p>
  <button disabled={unavailable||purchasing} onClick={()=>onPurchase(vehicle)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300"><ShoppingCart size={18}/>{purchasing?"Processing...":unavailable?"Sold out":"Purchase"}</button>
  {isAdmin&&<div className="flex gap-2"><button onClick={()=>onEdit(vehicle)} className="flex-1 rounded-lg border px-3 py-2 text-sm">Edit</button><button onClick={()=>onDelete(vehicle)} className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600">Delete</button></div>}</div>
 </article>;
}
