import { notFound } from "next/navigation";
import Link from "next/link";
import { Bell, ChevronRight, FileText, Presentation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getDossiers, PILOT_STATS } from "./_data/orestiada-dossiers";
import { TrendingBadge, TypeChip } from "./_components/bits";

export const metadata = {
    title: "Φάκελοι — Demo (dev)",
};

export default async function DossiersIndexPage(props: {
    params: Promise<{ locale: string }>;
}) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    const { locale } = await props.params;
    const dossiers = getDossiers();

    return (
        <main className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                DEV-ONLY DEMO · Δήμος Ορεστιάδας
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ενεργοί Φάκελοι</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
                Ένας <strong>Φάκελος</strong> είναι μια ονοματισμένη, διαμεσοσυνεδριακή αφήγηση που
                ακολουθεί μια συγκεκριμένη οντότητα — έναν οργανισμό, ένα έργο, έναν τόπο ή ένα θέμα —
                σε πολλές συνεδριάσεις του δημοτικού συμβουλίου. Αντικειμενικό χρονολόγιο, με πηγές.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                    <Link href={`/${locale}/dev/dossiers/pitch`}>
                        <Presentation className="mr-2 h-4 w-4" />
                        Δείτε το pitch deck
                    </Link>
                </Button>
                <span className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    {PILOT_STATS.subjects} subjects · {PILOT_STATS.meetings} συνεδριάσεις ·{" "}
                    {PILOT_STATS.citationPct}% με πηγές
                </span>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-4">
                {dossiers.map((d) => (
                    <Link key={d.slug} href={`/${locale}/dev/dossiers/${d.slug}`} className="group block">
                        <Card className="transition-colors group-hover:border-primary/50 group-hover:bg-muted/30">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-3">
                                    <CardTitle className="text-xl leading-tight">{d.name}</CardTitle>
                                    <TrendingBadge score={d.trendingScore} />
                                </div>
                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                    <TypeChip type={d.type} label={d.typeLabel} />
                                    <span className="text-xs text-muted-foreground">
                                        {d.entries.length} subjects σε{" "}
                                        {new Set(d.entries.map((e) => e.meetingId)).size} συνεδριάσεις
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-2 text-sm text-muted-foreground">{d.summary}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <Bell className="h-3.5 w-3.5" />
                                        {d.subscribers} συνδρομητές
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                        Άνοιγμα φακέλου
                                        <ChevronRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    );
}
