import { formatFromSatang } from "../../utils/currency";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartItems({ items }) {
  return (
    <ScrollArea className="max-h-[40vh]">
      <ul className="divide-y">
        {items.map((it) => (
          <li key={it.key} className="flex gap-3 p-4">
            <img
              src={it.image}
              alt={it.name}
              className="h-16 w-16 rounded-md border object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="font-medium leading-tight">{it.name}</div>
                <div className="text-sm text-gray-500">
                  {formatFromSatang(it.unitPriceSatang)}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {it.options?.color && <>Color: {it.options.color} • </>}
                Qty: {it.quantity}
              </div>
              <div className="mt-1 text-sm">
                Total: {formatFromSatang(it.unitPriceSatang * it.quantity)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
