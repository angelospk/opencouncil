import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/formatters/time";
import { getDossierBySlug, getDossiers } from "../_data/orestiada-dossiers";
import { AiDisclosure, InlineBadge, TrendingBadge, TypeChip } from "../_components/bits";
import { SourceChips } from "../_components/SourceChips";
import { SubscribeButton } from "../_components/SubscribeButton";

const CITY_ID = "orestiada";

const SOURCING_NOTE: Record<string, string> = {
    rich: "Πλούσιες εξωτερικές πηγές: νομοθεσία, Διαύγεια, Wikipedia και επίσημοι φορείς.",
    moderate: "Μέτριες εξωτερικές πηγές: σχετική νομοθεσία και ο φορέας διαχείρισης.",
    minimal: "Ελάχιστες εξωτερικές πηγές — κυρίως το εσωτερικό χρονολόγιο του συμβουλίου.",
    none: "Χωρίς εξωτερικές πηγές — μόνο το εσωτερικό χρονολόγιο του συμβουλίου.",
};

export function generateStaticParams() {
    return getDossiers().map((d) => ({ slug: d.slug }));
}

export default async function DossierPage(props: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    const { locale, slug } = await props.params;
    const dossier = getDossierBySlug(slug);
    if (!dossier) {
        notFound();
    }

    // Entity-level source chips: unique citation hosts across all entries.
    const entitySources = Array.from(new Set(dossier.entries.flatMap((e) => e.citationUrls))).slice(0, 8);

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
            <Link
                href={`/${locale}/dev/dossiers`}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Όλοι οι Φάκελοι
            </Link>

            {/* Header */}
            <header className="mt-4">
                <div className="flex flex-wrap items-center gap-2">
                    <TypeChip type={dossier.type} label={dossier.typeLabel} />
                    <TrendingBadge score={dossier.trendingScore} />
                </div>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{dossier.name}</h1>

                <div className="mt-4 rounded-lg border bg-muted/30 p-4">
                    <AiDisclosure />
                    <p className="mt-2 text-[15px] leading-relaxed">{dossier.summary}</p>
                </div>

                {dossier.externalContext && (
                    <div className="mt-4">
                        <h2 className="text-sm font-semibold text-muted-foreground">Εξωτερικό πλαίσιο</h2>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {dossier.externalContext}
                        </p>
                        <p className="mt-2 text-xs italic text-muted-foreground">
                            {SOURCING_NOTE[dossier.sourcingLevel]}
                        </p>
                        <SourceChips urls={entitySources} className="mt-2" />
                    </div>
                )}

                <div className="mt-5 flex flex-wrap items-center gap-3">
                    <SubscribeButton subscribers={dossier.subscribers} />
                    <span className="text-xs text-muted-foreground">
                        {dossier.entries.length} καταχωρήσεις · {dossier.minutesDiscussed}′ συζήτησης
                    </span>
                </div>
            </header>

            {/* Inline-badge example */}
            <div className="mt-8 rounded-lg border border-dashed p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Πώς θα εμφανιζόταν σε ένα subject
                </p>
                <InlineBadge name={dossier.name} />
            </div>

            <Separator className="my-8" />

            {/* Timeline */}
            <h2 className="mb-6 text-xl font-semibold">Χρονολόγιο</h2>
            <ol className="relative border-l border-border pl-6">
                {dossier.entries.map((entry, i) => (
                    <li key={entry.subjectId} className={i === dossier.entries.length - 1 ? "" : "mb-8"}>
                        <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
                        <Card>
                            <CardContent className="pt-5">
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <time dateTime={entry.date}>{formatDate(new Date(entry.date), undefined, locale)}</time>
                                    <span>·</span>
                                    <span>{entry.meetingName}</span>
                                </div>

                                <h3 className="mt-2 text-base font-semibold leading-snug">{entry.subjectName}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{entry.summary}</p>

                                {entry.decision && (
                                    <a
                                        href={entry.decision.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-2.5 text-xs text-amber-900 transition-colors hover:bg-amber-100"
                                    >
                                        <FileText className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span>
                                            <span className="font-semibold">Απόφαση (Διαύγεια {entry.decision.ada})</span>
                                            <br />
                                            {entry.decision.title}
                                        </span>
                                    </a>
                                )}

                                <SourceChips urls={entry.citationUrls} className="mt-3" />

                                <Link
                                    href={`/${locale}/${CITY_ID}/${entry.meetingId}/subjects/${entry.subjectId}`}
                                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                >
                                    Δείτε το subject στη συνεδρίαση
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Link>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ol>
        </main>
    );
}
