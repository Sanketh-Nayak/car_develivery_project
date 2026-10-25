import {useEffect,useState} from "react";
import type {FormEvent} from "react";
import type {Vehicle} from "../api/client";
type Props={initialVehicle:Vehicle|null;saving:boolean;onSave:(v:Omit<Vehicle,"id"|"_id">)=>Promise<void>;onCancel:()=>void};
const emptyVehicle={make:"",model:"",year:new Date().getFullYear(),price:0,quantity:1,imageUrl:"",description:""};
export default function VehicleForm({initialVehicle,saving,onSave,onCancel}:Props){
 const [form,setForm]=useState(emptyVehicle);
 useEffect(()=>{setForm(initialVehicle?{make:initialVehicle.make,model:initialVehicle.model,year:initialVehicle.year,price:initialVehicle.price,quantity:initialVehicle.quantity,imageUrl:initialVehicle.imageUrl||"",description:initialVehicle.description||""}:{...emptyVehicle});},[initialVehicle]);
 function change(field:keyof typeof emptyVehicle,value:string){setForm(p=>({...p,[field]:["year","price","quantity"].includes(field)?Number(value):value}));}
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();await onSave(form);}
 return <form onSubmit={submit} className="space-y-4"><h2 className="text-xl font-bold">{initialVehicle?"Edit vehicle":"Add a vehicle"}</h2><div className="grid gap-4 sm:grid-cols-2">
 {(["make","model"] as const).map(field=><label key={field} className="text-sm font-medium capitalize">{field}<input required value={form[field]} onChange={e=>change(field,e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"/></label>)}
 <label className="text-sm font-medium">Year<input required type="number" min="1886" max={new Date().getFullYear()+1} value={form.year} onChange={e=>change("year",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
 <label className="text-sm font-medium">Price (₹)<input required type="number" min="0.01" step="0.01" value={form.price} onChange={e=>change("price",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
 <label className="text-sm font-medium sm:col-span-2">Quantity<input required type="number" min="0" step="1" value={form.quantity} onChange={e=>change("quantity",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
 <label className="text-sm font-medium sm:col-span-2">Image URL<input type="url" value={form.imageUrl} onChange={e=>change("imageUrl",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2"/></label>
 <label className="text-sm font-medium sm:col-span-2">Description<textarea rows={3} value={form.description} onChange={e=>change("description",e.target.value)} className="mt-1 w-full rounded-lg border px-3 py-2"/></label></div>
 <div className="flex gap-3"><button disabled={saving} className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white">{saving?"Saving...":"Save vehicle"}</button><button type="button" onClick={onCancel} className="rounded-lg border px-5 py-2.5 font-semibold">Cancel</button></div></form>;
}
