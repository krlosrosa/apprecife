import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Counted from "@/features/counted/counted";
import ListCounted from "@/features/list/listCounted";

export default function Home() {
  return (
    <main className="">
      <Tabs defaultValue="counted">
        <TabsList className="w-full">
          <TabsTrigger value="counted">Contagem</TabsTrigger>
          <TabsTrigger value="list">Lista</TabsTrigger>
        </TabsList>
        <TabsContent value="counted">
          <Counted/>
        </TabsContent>
        <TabsContent value="list">
          <ListCounted/>
        </TabsContent>
      </Tabs>
    </main>
  );
}
