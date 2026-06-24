import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { sourceKind, sourceLabel } from "../_data/orestiada-dossiers";

const KIND_STYLES: Record<ReturnType<typeof sourceKind>, string> = {
    diavgeia: "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200",
    wikipedia: "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200",
    official: "bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200",
    legal: "bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200",
    press: "bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200",
};

/**
 * Renders a row of source chips from raw citation URLs.
 * Each chip opens the primary source in a new tab.
 */
export function SourceChips({ urls, className }: { urls: string[]; className?: string }) {
    if (urls.length === 0) {
        return null;
    }
    return (
        <div className={cn("flex flex-wrap gap-1.5", className)}>
            {urls.map((url) => (
                <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                        KIND_STYLES[sourceKind(url)]
                    )}
                >
                    {sourceLabel(url)}
                    <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
            ))}
        </div>
    );
}
