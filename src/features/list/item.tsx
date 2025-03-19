import { CountedType } from "../types/countedType";
import DeleteItem from "./deteleItems";

type Props = {
  counted: CountedType;
  id: number;
  removeItem: (index: number) => void;
};

export default function ItemCounted({ counted, id, removeItem }: Props) {
  return (
    <div key={id} className="p-2 border m-2 rounded">
      <div>Endereço: {counted.endereco}</div>
      <div className="flex justify-between">
        <div>Sku: {counted.sku}</div>
        <div>Lote: {counted.lote}</div>
      </div>
      <div>
        CXS: {counted.caixa && isNaN(counted.caixa) ? "" : counted.caixa} | UND:{" "}
        {counted.unidade && isNaN(counted.unidade) ? "" : counted.unidade} | Peso:{" "}
        {counted.peso && isNaN(counted.peso) ? "" : counted.peso}{" "}
      </div>
      <div className="flex justify-end">
      <DeleteItem id={id} removeItem={removeItem}/>
      </div>
    </div>
  );
}
