import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
    Landmark,
    ExternalLink,
    FileText,
    ScrollText,
    CheckSquare,
    ArrowLeft,
    Search,
    CheckCircle2,
    Clock,
} from "lucide-react";

/**
 * DEV-ONLY mockup page for choosing how to surface a Subject's linked
 * government Decision (απόφαση / Διαύγεια) higher on the subject page.
 *
 * Renders several placement + style variants in a realistic page skeleton so
 * we can screenshot them and pick a direction. Not a real feature — deleted
 * before the PR that implements the chosen variant merges.
 *
 * Hard-guarded: 404 in production. The route file still ships in the bundle,
 * so we do NOT rely on the URL being secret.
 */

const BRAND = "#fc550a";

// ---- Realistic sample data (incl. edge cases) -----------------------------
const DECISION = {
    ada: "9Ω8ΔΩΡ1Φ-Φ2Κ",
    protocolNumber: "1234/2024",
    title:
        "Έγκριση μελέτης και τευχών δημοπράτησης για την ανάπλαση της κεντρικής πλατείας και των πέριξ οδών του δημοτικού διαμερίσματος, συμπεριλαμβανομένων των δικτύων ομβρίων υδάτων και ηλεκτροφωτισμού",
    pdfUrl: "https://diavgeia.gov.gr/decision/view/9Ω8ΔΩΡ1Φ-Φ2Κ",
    publishDate: "18 Νοε 2024",
};

const VOTE_LABEL = "Εγκρίθηκε κατά πλειοψηφία 21–4";

// =====================================================================
// Small presentational pieces
// =====================================================================

function GradientCard({
    children,
    active = false,
    className = "",
}: {
    children: React.ReactNode;
    active?: boolean;
    className?: string;
}) {
    return (
        <div className={`rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div
                className="w-full h-full rounded-lg p-[1.5px] bg-gradient-to-r"
                style={{
                    borderRadius: "0.5rem",
                    backgroundImage: active
                        ? `linear-gradient(to right, ${BRAND}4d, #a4c0e14d, ${BRAND}4d)`
                        : "linear-gradient(to right, rgba(209,213,219,0.4), rgba(229,231,235,0.3), rgba(209,213,219,0.4))",
                }}
            >
                <div
                    className="w-full h-full bg-card"
                    style={{ borderRadius: "calc(0.5rem - 1.5px)" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function MetaChip({ label, value }: { label: string; value: string }) {
    return (
        <span className="inline-flex items-baseline gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium tabular-nums">{value}</span>
        </span>
    );
}

function DiavgeiaLink({ subtle = false }: { subtle?: boolean }) {
    return (
        <a
            href={DECISION.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
                subtle
                    ? "inline-flex items-center gap-1 text-xs font-medium hover:underline"
                    : "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted/40"
            }
            style={{ color: BRAND }}
        >
            <span>Προβολή στη Διαύγεια</span>
            <ExternalLink className="h-3.5 w-3.5" />
        </a>
    );
}

// ---- Shared bits of the real page (for context in the screenshots) --------

function Breadcrumb() {
    return (
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <ArrowLeft className="h-4 w-4 shrink-0" />
                <span>14η Τακτική Συνεδρίαση Δημοτικού Συμβουλίου</span>
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">Δήμος Χανίων</span>
            <span className="text-muted-foreground">18 Νοεμβρίου 2024</span>
        </nav>
    );
}

function QuickStats({ withDecisionCard = false }: { withDecisionCard?: boolean }) {
    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <GradientCard className="flex-grow">
                <div className="p-3 md:p-4">
                    <h3 className="text-sm font-semibold mb-2">Παρατάξεις</h3>
                    <div className="flex items-start gap-3">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[10px] border-muted">
                            <div className="flex flex-col items-center">
                                <div className="text-xl font-semibold">42</div>
                                <div className="text-[10px] text-muted-foreground">λεπτά</div>
                            </div>
                        </div>
                        <div className="flex-grow min-w-0 space-y-2">
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                {["Δύναμη Δημιουργίας", "Ενότητα Πολιτών"].map((p, i) => (
                                    <div key={p} className="flex items-center gap-1.5 text-xs">
                                        <div
                                            className="w-3 h-3 rounded-sm shrink-0"
                                            style={{ backgroundColor: i === 0 ? BRAND : "#3b82f6" }}
                                        />
                                        <span className="font-medium">{p}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-xs text-muted-foreground">7 ομιλητές</div>
                        </div>
                    </div>
                </div>
            </GradientCard>

            <GradientCard className="shrink-0 md:max-w-[40%]">
                <div className="p-3 md:p-4">
                    <h3 className="text-sm font-semibold mb-2">Εισηγητής</h3>
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-muted" />
                        <div className="text-sm">
                            <div className="font-medium">Μ. Παπαδάκης</div>
                            <div className="text-xs text-muted-foreground">Αντιδήμαρχος</div>
                        </div>
                    </div>
                </div>
            </GradientCard>

            {withDecisionCard && <DecisionStatCard />}
        </div>
    );
}

function SummaryCard() {
    return (
        <GradientCard>
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">Περίληψη</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                    Το σώμα συζήτησε την ανάπλαση της κεντρικής πλατείας. Παρουσιάστηκε η
                    μελέτη και τα τεύχη δημοπράτησης, με αναφορά στα δίκτυα ομβρίων και
                    στον ηλεκτροφωτισμό. Ακολούθησε τοποθέτηση των παρατάξεων…
                </p>
            </div>
        </GradientCard>
    );
}

function CollapsedRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <GradientCard>
            <div className="w-full p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{icon}</span>
                    <span className="font-medium text-sm">{label}</span>
                </div>
                <span className="text-muted-foreground">⌄</span>
            </div>
        </GradientCard>
    );
}

// =====================================================================
// VARIANT A — slim hero banner, just below the quick-stats row
// =====================================================================
function VariantA() {
    return (
        <GradientCard active>
            <div className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${BRAND}1a`, color: BRAND }}
                    >
                        <Landmark className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-grow space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                Απόφαση
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                Ελήφθη
                            </span>
                        </div>
                        <p className="text-sm font-medium leading-snug line-clamp-2">
                            {DECISION.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <MetaChip label="ΑΔΑ" value={DECISION.ada} />
                            <MetaChip label="Πρωτ." value={DECISION.protocolNumber} />
                            <MetaChip label="Ανάρτηση" value={DECISION.publishDate} />
                        </div>
                    </div>
                    <div className="shrink-0 md:pt-1">
                        <DiavgeiaLink />
                    </div>
                </div>
            </div>
        </GradientCard>
    );
}

// =====================================================================
// VARIANT B — decision as a 3rd card in the quick-stats row
// =====================================================================
function DecisionStatCard() {
    return (
        <GradientCard active className="shrink-0 md:max-w-[34%]">
            <div className="p-3 md:p-4">
                <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                    <Landmark className="h-4 w-4" style={{ color: BRAND }} />
                    Απόφαση
                </h3>
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Ελήφθη
                    </span>
                    <div className="text-xs text-muted-foreground">
                        ΑΔΑ <span className="font-medium text-foreground">{DECISION.ada}</span>
                    </div>
                    <DiavgeiaLink subtle />
                </div>
            </div>
        </GradientCard>
    );
}

// =====================================================================
// VARIANT C — ultra-discreet status pill, right under the breadcrumb
// =====================================================================
function VariantC() {
    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md bg-muted/50 px-3 py-1.5 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Ελήφθη απόφαση
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
                ΑΔΑ <span className="font-medium text-foreground">{DECISION.ada}</span>
            </span>
            <span className="text-muted-foreground">·</span>
            <DiavgeiaLink subtle />
        </div>
    );
}

// =====================================================================
// VARIANT D — combined "Αποτέλεσμα" card (vote outcome + decision)
// =====================================================================
function VariantD() {
    return (
        <GradientCard active>
            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Αποτέλεσμα</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {VOTE_LABEL}
                    </span>
                </div>
                <div className="flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                        <Landmark className="h-4 w-4 shrink-0" style={{ color: BRAND }} />
                        <span className="text-sm text-muted-foreground">Απόφαση</span>
                        <span className="truncate text-sm font-medium">ΑΔΑ {DECISION.ada}</span>
                    </div>
                    <DiavgeiaLink subtle />
                </div>
            </div>
        </GradientCard>
    );
}

// =====================================================================
// No-decision treatments
// =====================================================================
function NoDecHidden() {
    return (
        <div className="rounded-md border border-dashed border-muted-foreground/30 px-3 py-4 text-center text-xs text-muted-foreground">
            (τίποτα — η ενότητα δεν εμφανίζεται καθόλου)
        </div>
    );
}

function NoDecMuted() {
    return (
        <p className="text-sm italic text-muted-foreground">
            Δεν έχει συνδεθεί ακόμα απόφαση από τη Διαύγεια.
        </p>
    );
}

function NoDecPill({ withSearch = false }: { withSearch?: boolean }) {
    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md bg-muted/40 px-3 py-1.5 text-sm">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Απόφαση σε εκκρεμότητα
            </span>
            {withSearch && (
                <>
                    <span className="text-muted-foreground">·</span>
                    <button className="inline-flex items-center gap-1 text-xs font-medium hover:underline" style={{ color: BRAND }}>
                        <Search className="h-3 w-3" />
                        Αναζήτηση
                    </button>
                </>
            )}
        </div>
    );
}

// =====================================================================
// Edge-case variants of A
// =====================================================================
function VariantANoAda() {
    return (
        <GradientCard active>
            <div className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${BRAND}1a`, color: BRAND }}>
                        <Landmark className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-grow space-y-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Απόφαση</span>
                        <p className="text-sm font-medium leading-snug line-clamp-2">{DECISION.title}</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <MetaChip label="Ανάρτηση" value={DECISION.publishDate} />
                        </div>
                    </div>
                    <div className="shrink-0 md:pt-1"><DiavgeiaLink /></div>
                </div>
            </div>
        </GradientCard>
    );
}

function VariantANoPdf() {
    return (
        <GradientCard active>
            <div className="p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${BRAND}1a`, color: BRAND }}>
                        <Landmark className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-grow space-y-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Απόφαση</span>
                        <p className="text-sm font-medium leading-snug line-clamp-2">{DECISION.title}</p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <MetaChip label="ΑΔΑ" value={DECISION.ada} />
                            <MetaChip label="Ανάρτηση" value={DECISION.publishDate} />
                        </div>
                    </div>
                    <div className="shrink-0 text-xs italic text-muted-foreground md:pt-1">
                        Το έγγραφο δεν είναι ακόμα διαθέσιμο
                    </div>
                </div>
            </div>
        </GradientCard>
    );
}

// =====================================================================
// Layout helpers
// =====================================================================
function VariantBlock({
    tag,
    title,
    note,
    children,
}: {
    tag: string;
    title: string;
    note?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-3">
            <div className="flex items-baseline gap-3">
                <span
                    className="rounded px-2 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: BRAND }}
                >
                    {tag}
                </span>
                <h2 className="text-base font-semibold">{title}</h2>
            </div>
            {note && <p className="text-sm text-muted-foreground">{note}</p>}
            <div className="rounded-xl border bg-background p-3 md:p-4">{children}</div>
        </section>
    );
}

// =====================================================================
// Page
// =====================================================================
export default async function DecisionMockupsPage(props: {
    params: Promise<{ locale: string }>;
}) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }
    const { locale } = await props.params;
    setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl space-y-10 px-3 py-6 md:px-4 md:py-8">
                <header className="space-y-1">
                    <h1 className="text-xl font-bold">
                        Απόφαση στη σελίδα θέματος — εναλλακτικές
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Πώς να εμφανίζουμε τη συνδεδεμένη απόφαση (Διαύγεια) ψηλότερα,
                        διακριτικά και όμορφα. Κάθε εναλλακτική φαίνεται στη θέση που
                        προτείνεται, μέσα στον σκελετό της πραγματικής σελίδας.
                    </p>
                </header>

                {/* A */}
                <VariantBlock
                    tag="A"
                    title="Λεπτό banner κάτω από τα στατιστικά"
                    note="Διακριτικό αλλά ευδιάκριτο. Τίτλος σε 2 γραμμές, μετα-στοιχεία ως chips, ενέργεια δεξιά."
                >
                    <div className="space-y-4">
                        <Breadcrumb />
                        <QuickStats />
                        <VariantA />
                        <SummaryCard />
                    </div>
                </VariantBlock>

                {/* B */}
                <VariantBlock
                    tag="B"
                    title="Ως 3η κάρτα στη σειρά στατιστικών"
                    note="Πολύ συμπαγές. Κίνδυνος: μοιάζει με ακόμη μία «μετρική» αντί για επίσημη πράξη."
                >
                    <div className="space-y-4">
                        <Breadcrumb />
                        <QuickStats withDecisionCard />
                        <SummaryCard />
                    </div>
                </VariantBlock>

                {/* C */}
                <VariantBlock
                    tag="C"
                    title="Πολύ διακριτικό pill κάτω από το breadcrumb"
                    note="Ελάχιστο. Καλό αν η απόφαση είναι δευτερεύον metadata — ίσως όμως υπερβολικά «αόρατο»."
                >
                    <div className="space-y-4">
                        <Breadcrumb />
                        <VariantC />
                        <QuickStats />
                        <SummaryCard />
                    </div>
                </VariantBlock>

                {/* D */}
                <VariantBlock
                    tag="D"
                    title="Ενιαία κάρτα «Αποτέλεσμα» (ψήφος + απόφαση)"
                    note="Αν το νοητικό μοντέλο είναι «έκβαση»: συνδυάζει αποτέλεσμα ψηφοφορίας και τελική απόφαση."
                >
                    <div className="space-y-4">
                        <Breadcrumb />
                        <QuickStats />
                        <VariantD />
                        <SummaryCard />
                    </div>
                </VariantBlock>

                {/* No-decision */}
                <VariantBlock
                    tag="∅"
                    title="Όταν δεν υπάρχει συνδεδεμένη απόφαση"
                    note="Τρεις χειρισμοί, από τον πιο σιωπηλό στον πιο ρητό."
                >
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">1 · Κρυφό (καμία ένδειξη)</div>
                            <NoDecHidden />
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">2 · Διακριτικό disclaimer</div>
                            <NoDecMuted />
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">3 · Pill «σε εκκρεμότητα» (με ενέργεια για συντάκτες)</div>
                            <NoDecPill />
                            <NoDecPill withSearch />
                        </div>
                    </div>
                </VariantBlock>

                {/* Edge cases */}
                <VariantBlock
                    tag="±"
                    title="Ακραίες περιπτώσεις (πάνω στην εναλλακτική A)"
                    note="Χωρίς ΑΔΑ → παραλείπεται το chip. Χωρίς PDF → καμία «νεκρή» ενέργεια, μόνο ένδειξη."
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">Χωρίς ΑΔΑ</div>
                            <VariantANoAda />
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground">Χωρίς διαθέσιμο PDF</div>
                            <VariantANoPdf />
                        </div>
                    </div>
                </VariantBlock>

                {/* Mobile */}
                <VariantBlock
                    tag="📱"
                    title="Σε πλάτος κινητού (εναλλακτική A)"
                    note="Στοίβαξη: εικονίδιο/κατάσταση, τίτλος, chips, ενέργεια."
                >
                    <div className="mx-auto w-[360px] max-w-full space-y-4 rounded-lg border p-3">
                        <Breadcrumb />
                        <VariantA />
                    </div>
                </VariantBlock>

                {/* Collapsed sections that follow (context) */}
                <div className="space-y-3 opacity-60">
                    <div className="text-xs font-medium text-muted-foreground">
                        (ακολουθούν οι υπόλοιπες ενότητες, αναδιπλωμένες)
                    </div>
                    <CollapsedRow icon={<ScrollText className="h-4 w-4" />} label="Τοποθετήσεις (7)" />
                    <CollapsedRow icon={<CheckSquare className="h-4 w-4" />} label="Ψηφοφορία" />
                </div>
            </div>
        </div>
    );
}
