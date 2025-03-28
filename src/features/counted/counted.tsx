"use client";
import { useState } from "react";
import { update, get } from "idb-keyval";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment-timezone";

export default function Counted() {
  const [data, setData] = useState("");
  const [endereco, setEndereco] = useState("");
  const [unidade, setUnidade] = useState("");
  const [peso, setPeso] = useState("");
  const [caixa, setCaixa] = useState("");
  const [lote, setLote] = useState("");
  const [sku, setSku] = useState("");
  const [vazio, setVazio] = useState(false);

  async function addCounted() {
    const infoAdd = {
      data: moment(new Date()).format("DD/MM/YYYY"),
      endereco,
      unidade: parseInt(unidade),
      peso: parseInt(peso),
      caixa: parseInt(caixa),
      lote,
      sku,
    };

    const infoAddVazio = {
      data: moment(new Date()).format("DD/MM/YYYY"),
      endereco,
    };
    const response = await get("listCounted");
    if (response) {
      await update("listCounted", (listCounted: any) => [
        ...response,
        vazio ? infoAddVazio : infoAdd,
      ]);
      setData("");
      setEndereco("");
      setUnidade("");
      setPeso("");
      setCaixa("");
      setLote("");
      setSku("");
      return;
    }
    await update("listCounted", (listCounted: any) => [
      vazio ? infoAddVazio : infoAdd,
    ]);
    setData("");
    setEndereco("");
    setUnidade("");
    setPeso("");
    setCaixa("");
    setLote("");
    setSku("");
  }

  function validate(): boolean {
    if (endereco.length !== 13) {
      return true;
    }

    if (!vazio && sku.length !== 9) {
      return true;
    }

    //600123123

    if (!vazio && lote === "") {
      return true;
    }

    if (!vazio && (unidade === "" || caixa === "")) {
      return true;
    }

    return false;
  }

  return (
    <div className="p-2">
      <Label>Endereço</Label>
      <Input value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      <Label>Sku</Label>
      <Input
        type="number"
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />
      <Label>Lote</Label>
      <Input
        value={lote}
        onChange={(e) => setLote(e.target.value)}
      />
      <Label>Caixa</Label>
      <Input
        type="number"
        value={caixa}
        onChange={(e) => setCaixa(e.target.value)}
      />

      <Label>Unidade</Label>
      <Input
        type="number"
        value={unidade}
        onChange={(e) => setUnidade(e.target.value)}
      />
      <Label>Peso</Label>
      <Input
        type="number"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />

      <div className="mt-4">
        <Checkbox onCheckedChange={(checked) => setVazio(!vazio)} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Vazio?
        </label>
      </div>
      <Button
        disabled={validate()}
        onClick={addCounted}
        className="w-full p-4 mt-8"
      >
        Add
      </Button>
    </div>
  );
}
