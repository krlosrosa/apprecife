'use client'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dispatch, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CountedType } from "../types/countedType";
import { set } from "idb-keyval";

type Props = {
  removeItem: (index: number) => void;
  id: number;
}



export default function DeleteItem({removeItem, id}:Props){
  const [open, setOpen] = useState(false);
  function deleteItem (){
    removeItem(id)
    setOpen(false)
  }
  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <RiDeleteBin5Fill color="red" size={25}/>
      </DialogTrigger>
      <DialogContent>
        <div>Tem certeza que deseja deletar?</div>
        <div className="flex grid-cols-2 w-full justify-between">
          <button className="bg-red-300 px-8 py-2">Não</button>
          <button onClick={deleteItem} className="bg-green-800 px-8 py-2">Sim</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}