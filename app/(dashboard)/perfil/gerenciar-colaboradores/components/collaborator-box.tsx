import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export function CollaboratorBox() {
  return (
    <div className="w-full bg-card p-8 flex items-center justify-between gap-6">
      <span className="text-xl font-semibold text-white line-clamp-1">Giselli Galhardo</span>

      <div className="flex items-center gap-4">
        <Button variant="link" size="icon" className="text-white/70 hover:text-white">
          <Edit />
        </Button>

        <Button variant="link" size="icon" className="text-white/70 hover:text-white">
          <Trash />
        </Button>
      </div>
    </div>
  );
}
