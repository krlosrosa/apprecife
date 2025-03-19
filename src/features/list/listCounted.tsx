"use client";
import { get, del, update } from "idb-keyval";
import { useEffect, useState } from "react";
import { CountedType } from "../types/countedType";
import apiClient from "@/config/axios";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ItemCounted from "./item";

export default function ListCounted() {
  const [listCounted, setListCounted] = useState<CountedType[]>([]);

  const loadListCounted = async () => {
    const response = await get("listCounted");
    if (response) {
      setListCounted(response);
    }
  };

  async function removeItem(index: number) {
    const response = await get("listCounted");
    if (response) {
      response.splice(index, 1);
      await del("listCounted");
      await update("listCounted", () => response);
      setListCounted(response);
    }
  }

  async function addCounted() {
    await apiClient
      .post(
        "/cadastrarcontagem",
        listCounted
      )
      .then((response) => {
        del("listCounted");
        setListCounted([]);
      })
      .catch();
  }

  useEffect(() => {
    loadListCounted();
  }, []);

  return (
    <div>
      <Button onClick={addCounted}>Sincronizar</Button>
      {listCounted?.map((counted, index) => (
        <ItemCounted removeItem={removeItem} key={index} counted={counted} id={index} />
      ))} 
    </div>
  );
}
