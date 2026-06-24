import { Building2, Hammer, MapPin, Sparkles, Tag, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DossierType } from "../_data/orestiada-dossiers";

const TYPE_ICON: Record<DossierType, typeof Building2> = {
    ORGANIZATION: Building2,
    PROJECT: Hammer,
    LOCATION: MapPin,
    TOPIC: Tag,
};

/** Type chip for a dossier (e.g. «Οργανισμός», «Έργο»). */
export function TypeChip({ type, label }: { type: DossierType; label: string }) {
    const Icon = TYPE_ICON[type];
    return (
        <Badge variant="secondary" className="gap-1.5">
            <Icon className="h-3.5 w-3.5" />
            {label}
        </Badge>
    );
}

/** Trending badge for the index / header. */
export function TrendingBadge({ score }: { score: number }) {
    return (
        <Badge variant="outline" className="gap-1 border-orange-300 bg-orange-50 text-orange-700">
            <TrendingUp className="h-3.5 w-3.5" />
            {score}
        </Badge>
    );
}

/** "AI-generated summary" disclosure shown next to NPOV summaries. */
export function AiDisclosure({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-medium text-violet-700 ring-1 ring-inset ring-violet-200",
                className
            )}
        >
            <Sparkles className="h-3 w-3" />
            Σύνοψη από AI · ελέγξτε τις πηγές
        </span>
    );
}

/** The inline badge as it would appear on a Subject in the live app. */
export function InlineBadge({ name }: { name: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-2 py-1 text-sm font-medium text-primary">
            <span aria-hidden="true">📁</span>
            Φάκελος: {name}
        </span>
    );
}
