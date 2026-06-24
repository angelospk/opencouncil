"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Folder,
    Quote,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    PILOT_STATS,
    PROOF_CLUSTERS,
    SOURCING_TIERS,
} from "../_data/orestiada-dossiers";

const LEVEL_COLOR: Record<string, string> = {
    rich: "text-emerald-600",
    moderate: "text-blue-600",
    minimal: "text-amber-600",
    none: "text-muted-foreground",
};

function Slide({ kicker, title, children }: { kicker?: string; title: string; children?: ReactNode }) {
    return (
        <div className="flex h-full w-full flex-col justify-center">
            {kicker && (
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    <Folder className="h-4 w-4" />
                    {kicker}
                </div>
            )}
            <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{title}</h2>
            {children && <div className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">{children}</div>}
        </div>
    );
}

export function PitchDeck({ locale }: { locale: string }) {
    const slides: ReactNode[] = [
        <div key="title" className="flex h-full flex-col justify-center">
            <div className="mb-4 inline-flex items-center gap-2 text-base font-semibold uppercase tracking-widest text-primary">
                <Folder className="h-5 w-5" />
                OpenCouncil · Φάκελοι
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                Φάκελοι: από αρχείο σε ζωντανή δημοτική δημοσιογραφία
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground">
                Μια ονοματισμένη, διαμεσοσυνεδριακή αφήγηση με πηγές — «Full Coverage» για το δημοτικό
                συμβούλιο.
            </p>
        </div>,

        <Slide key="problem" kicker="Το πρόβλημα" title="Τα subjects είναι αποσυνδεδεμένα γεγονότα">
            <ul className="space-y-3">
                <li>Κάθε συνεδρίαση παράγει δεκάδες θέματα, αλλά το καθένα ζει απομονωμένο.</li>
                <li>
                    Η συνδρομή σε <em>topic</em> + <em>location</em> δεν αρκεί: ο πολίτης χάνει την εξέλιξη
                    μιας συγκεκριμένης υπόθεσης μέσα στον χρόνο.
                </li>
                <li>Η ιστορία ενός έργου ή ενός φορέα είναι σπαρμένη σε 5–10 διαφορετικές συνεδριάσεις.</li>
            </ul>
        </Slide>,

        <Slide key="insight" kicker="Η διαπίστωση" title="Λείπει ένα «named narrative object»">
            <p>
                Δεν λείπει ένα ακόμη φίλτρο. Λείπει <strong>η οντότητα που σε αφορά</strong>: το Πολύκεντρο,
                το καταφύγιο αδέσποτων, ο ποταμός Άρδας — με δικό της όνομα, δική της σελίδα και δική της
                ροή.
            </p>
        </Slide>,

        <Slide key="what" kicker="Ορισμός" title="Τι είναι ένας Φάκελος">
            <p>
                Ένα <strong>αντικειμενικό χρονολόγιο με πηγές</strong> που ακολουθεί μια οντότητα
                (οργανισμό, έργο, τόπο ή θέμα) σε πολλές συνεδριάσεις.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-base">
                <span className="rounded-lg border bg-muted/40 px-4 py-3 font-medium">210 subjects</span>
                <ArrowRight className="h-5 w-5 text-primary" />
                <span className="rounded-lg border bg-muted/40 px-4 py-3 font-medium">πολλοί Φάκελοι</span>
                <ArrowRight className="h-5 w-5 text-primary" />
                <span className="rounded-lg border border-primary/40 bg-primary/5 px-4 py-3 font-medium text-primary">
                    1 αφήγηση ανά οντότητα
                </span>
            </div>
            <p className="mt-4 text-base">
                Σχέση many-to-many: ένα subject μπορεί να ανήκει σε περισσότερους από έναν φακέλους.
            </p>
        </Slide>,

        <div key="proof" className="flex h-full flex-col justify-center">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
                <CheckCircle2 className="h-4 w-4" />
                Η απόδειξη
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Οι Φάκελοι προκύπτουν εμπειρικά από τα πραγματικά δεδομένα
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
                Ανάλυση των {PILOT_STATS.subjects} subjects του Δήμου Ορεστιάδας ({PILOT_STATS.meetings}{" "}
                συνεδριάσεις):
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                        <tr>
                            <th className="px-4 py-2">Cluster</th>
                            <th className="px-4 py-2">Τύπος</th>
                            <th className="px-4 py-2 text-right">Subjects</th>
                            <th className="px-4 py-2 text-right">Συνεδρ.</th>
                            <th className="px-4 py-2 text-center">#291</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PROOF_CLUSTERS.map((c) => (
                            <tr key={c.name} className="border-t">
                                <td className="px-4 py-2 font-medium">{c.name}</td>
                                <td className="px-4 py-2 text-muted-foreground">{c.type}</td>
                                <td className="px-4 py-2 text-right tabular-nums">{c.subjects}</td>
                                <td className="px-4 py-2 text-right tabular-nums">{c.meetings}</td>
                                <td className="px-4 py-2 text-center">{c.inIssue291 ? "✓" : "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-lg">
                <strong className="text-primary">{PILOT_STATS.citationPct}%</strong> των subjects έχουν{" "}
                <strong>ήδη</strong> πηγές · τα παραδείγματα του #291 <strong>δεν</strong> ήταν
                cherry-picked — προέκυψαν από τα ίδια τα δεδομένα.
            </p>
        </div>,

        <Slide key="objective" kicker="Αντικειμενικότητα" title="Πώς ο Φάκελος μένει αντικειμενικός">
            <ul className="space-y-3">
                <li>
                    <strong>NPOV συμβόλαιο:</strong> δηλώνουμε γεγονότα, αποδίδουμε απόψεις («Ο Χ
                    πρότεινε…»), χωρίς φορτισμένες λέξεις.
                </li>
                <li>
                    <strong>Δομημένες κάρτες:</strong> ημερομηνία + ουδέτερη σύνοψη + (προαιρετικά) δήλωση
                    με απόδοση + σύνδεσμος στην πρωτογενή πηγή.
                </li>
                <li className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-500" />
                    <span>Ορατή ένδειξη «Σύνοψη από AI · ελέγξτε τις πηγές».</span>
                </li>
            </ul>
        </Slide>,

        <div key="sources" className="flex h-full flex-col justify-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
                Κλιμάκωση πηγών
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Οι εξωτερικές πηγές κλιμακώνονται ανά τύπο οντότητας
            </h2>
            <div className="mt-5 overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                        <tr>
                            <th className="px-4 py-2">Οντότητα</th>
                            <th className="px-4 py-2">Πηγές</th>
                            <th className="px-4 py-2">Επίπεδο</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SOURCING_TIERS.map((t) => (
                            <tr key={t.entity} className="border-t align-top">
                                <td className="px-4 py-2 font-medium">{t.entity}</td>
                                <td className="px-4 py-2 text-muted-foreground">{t.sources}</td>
                                <td className={`px-4 py-2 font-semibold uppercase ${LEVEL_COLOR[t.level]}`}>
                                    {t.level}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-base text-muted-foreground">
                Σχολείο ή απλό τοπικό θέμα → καμία ή ελάχιστη εξωτερική πηγή, μόνο το εσωτερικό χρονολόγιο.
            </p>
        </div>,

        <Slide key="arch" kicker="Αρχιτεκτονική" title="Χτίζει πάνω σε ό,τι υπάρχει ήδη">
            <ul className="space-y-3">
                <li>
                    Το <code className="rounded bg-muted px-1.5 py-0.5 text-base">Subject.contextCitationUrls</code>{" "}
                    παράγεται ήδη από Claude web_search — {PILOT_STATS.withCitations}/{PILOT_STATS.subjects}{" "}
                    subjects το έχουν.
                </li>
                <li>
                    Το <code className="rounded bg-muted px-1.5 py-0.5 text-base">Subject</code> έχει ήδη{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-base">topicId</code>,{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-base">locationId</code>,{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-base">decision</code>.
                </li>
                <li>
                    Ο <strong>Φάκελος</strong> είναι ένα cross-meeting layer: ένα μοντέλο{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-base">Dossier</code> + join{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-base">DossierSubject</code>.
                </li>
            </ul>
        </Slide>,

        <Slide key="discovery" kicker="Ανακάλυψη" title="Πώς το βρίσκει ο πολίτης">
            <ul className="space-y-3">
                <li>
                    <strong>Trending score:</strong> linked subjects × λεπτά συζήτησης × συνδρομητές ×
                    recency → ενότητα «Ενεργοί Φάκελοι» στην αρχική.
                </li>
                <li>
                    <strong>Inline badge</strong> πάνω στο subject:{" "}
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-2 py-1 text-base font-medium text-primary">
                        <Folder className="h-4 w-4" /> Φάκελος: Πολύκεντρο
                    </span>
                </li>
                <li>
                    <strong>Subscribe → notify</strong> σε κάθε νέα καταχώρηση του φακέλου.
                </li>
            </ul>
        </Slide>,

        <Slide key="naming" kicker="Ονοματοδοσία" title="Γιατί «Φάκελος» κι όχι «Stories»">
            <div className="flex items-start gap-3">
                <Quote className="mt-1 h-8 w-8 shrink-0 text-primary/40" />
                <div>
                    <p>
                        Το «Stories» κουβαλά βάρος από το Instagram — εφήμερο, προσωπικό, ανάλαφρο. Ο{" "}
                        <strong>«Φάκελος»</strong> δηλώνει ακριβώς το αντίθετο: θεσμική μνήμη, σοβαρότητα,
                        τεκμηρίωση.
                    </p>
                    <p className="mt-3">Είναι η λέξη που χρησιμοποιεί ήδη η δημοσιογραφία για μια υπόθεση που εξελίσσεται.</p>
                </div>
            </div>
        </Slide>,

        <Slide key="scope" kicker="v1 scope (#291)" title="Τι παραδίδει το v1">
            <ul className="space-y-2 text-base">
                <li>· Μοντέλο <code className="rounded bg-muted px-1.5 py-0.5">Dossier</code> + many-to-many join.</li>
                <li>· AI σύνοψη NPOV + entity-level external context.</li>
                <li>· Σελίδα φακέλου με χρονολόγιο, πηγές, decisions.</li>
                <li>· Trending «Ενεργοί Φάκελοι» + inline badge + subscribe.</li>
            </ul>
            <Button asChild className="mt-6" size="lg">
                <Link href={`/${locale}/dev/dossiers`}>
                    Ανοίξτε το live demo (Ορεστιάδα)
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </Slide>,

        <div key="cta" className="flex h-full flex-col items-start justify-center">
            <Folder className="h-12 w-12 text-primary" />
            <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Ας δώσουμε στις δημοτικές υποθέσεις ένα όνομα και μια μνήμη.
            </h2>
            <p className="mt-5 text-xl text-muted-foreground">
                Τα δεδομένα υπάρχουν. Οι πηγές υπάρχουν. Λείπει μόνο η αφήγηση.
            </p>
            <Button asChild className="mt-8" size="lg">
                <Link href={`/${locale}/dev/dossiers`}>
                    Δείτε τους πραγματικούς Φακέλους Ορεστιάδας
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>,
    ];

    const total = slides.length;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const go = useCallback(
        (next: number) => {
            setIndex((curr) => {
                const clamped = Math.max(0, Math.min(total - 1, next));
                setDirection(clamped >= curr ? 1 : -1);
                return clamped;
            });
        },
        [total]
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (target) {
                const tag = target.tagName;
                if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable) {
                    return;
                }
            }
            if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
                e.preventDefault();
                go(index + 1);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                go(index - 1);
            } else if (e.key === "Home") {
                e.preventDefault();
                go(0);
            } else if (e.key === "End") {
                e.preventDefault();
                go(total - 1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go, index, total]);

    return (
        <div className="fixed inset-0 flex flex-col bg-background text-foreground">
            {/* dev banner */}
            <div className="flex items-center justify-between border-b px-4 py-2 text-xs">
                <span className="font-semibold text-amber-700">DEV-ONLY · Pitch deck</span>
                <Link href={`/${locale}/dev/dossiers`} className="text-muted-foreground hover:text-foreground">
                    → live demo
                </Link>
            </div>

            {/* slide area — click left/right halves to navigate */}
            <div className="relative flex-1 overflow-hidden">
                <button
                    type="button"
                    aria-label="Προηγούμενη διαφάνεια"
                    onClick={() => go(index - 1)}
                    className="absolute left-0 top-0 z-10 h-full w-1/4 cursor-w-resize"
                    tabIndex={-1}
                />
                <button
                    type="button"
                    aria-label="Επόμενη διαφάνεια"
                    onClick={() => go(index + 1)}
                    className="absolute right-0 top-0 z-10 h-full w-1/4 cursor-e-resize"
                    tabIndex={-1}
                />
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.section
                        key={index}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -60 }}
                        transition={{ duration: 0.32, ease: "easeOut" }}
                        className="mx-auto flex h-full max-w-3xl items-center px-6 sm:px-10"
                    >
                        <div className="w-full">{slides[index]}</div>
                    </motion.section>
                </AnimatePresence>
            </div>

            {/* controls */}
            <div className="flex items-center justify-between border-t px-4 py-3">
                <div className="flex items-center gap-1.5">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`Διαφάνεια ${i + 1}`}
                            onClick={() => go(i)}
                            className={`h-2 rounded-full transition-all ${
                                i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                            }`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="mr-2 text-xs tabular-nums text-muted-foreground">
                        {index + 1} / {total}
                    </span>
                    <Button variant="outline" size="icon" onClick={() => go(index - 1)} disabled={index === 0}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => go(index + 1)} disabled={index === total - 1}>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
