/**
 * DEV-ONLY fixture for the «Φάκελοι» (Dossiers) demo.
 *
 * Real data from Δήμος Ορεστιάδας (cityId `orestiada`), pulled read-only from the
 * dev database and baked here so the demo renders without a live DB connection.
 * Summaries are lightly trimmed from the real Subject.description / .context, kept
 * neutral (NPOV): facts asserted, opinions attributed, loaded words removed.
 *
 * Not imported by any production code path — only by the dev routes under
 * `src/app/[locale]/dev/dossiers/`.
 */

export type DossierType = "ORGANIZATION" | "PROJECT" | "LOCATION" | "TOPIC";

/** How much external (beyond-council) sourcing an entity type warrants. */
export type SourcingLevel = "rich" | "moderate" | "minimal" | "none";

export interface DossierDecision {
    /** Διαύγεια ΑΔΑ (unique decision id) */
    ada: string;
    title: string;
    pdfUrl: string;
}

export interface DossierEntry {
    /** ISO date of the meeting, `YYYY-MM-DD` */
    date: string;
    meetingId: string;
    meetingName: string;
    subjectId: string;
    subjectName: string;
    /** Neutral, NPOV summary of the discussion. */
    summary: string;
    decision?: DossierDecision;
    /** Per-subject primary-source citations already present in the DB. */
    citationUrls: string[];
}

export interface Dossier {
    slug: string;
    name: string;
    type: DossierType;
    /** Short type label in Greek for the chip. */
    typeLabel: string;
    /** AI-generated, NPOV running summary of the whole dossier. */
    summary: string;
    /** Entity-level external context (optional — empty for simple entities). */
    externalContext?: string;
    sourcingLevel: SourcingLevel;
    /** Mock discovery metrics for the demo. */
    trendingScore: number;
    subscribers: number;
    minutesDiscussed: number;
    entries: DossierEntry[];
}

/**
 * Derive a short, human source label from a citation URL's host.
 * Pure — safe to call from server or client components.
 */
export function sourceLabel(url: string): string {
    let host = url;
    try {
        host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return url;
    }
    if (host.includes("diavgeia.gov.gr")) return "Διαύγεια";
    if (host.includes("wikipedia.org")) return "Wikipedia";
    if (host.endsWith("gov.gr")) return "gov.gr";
    if (host.includes("opengov.gr")) return "OpenGov";
    if (host.includes("kede.gr")) return "ΚΕΔΕ";
    if (host.includes("ypes.gr")) return "ΥΠΕΣ";
    if (host.includes("lawspot") || host.includes("e-nomothesia") || host.includes("kodiko") || host.includes("taxheaven") || host.includes("nomoskopio") || host.includes("dsanet")) {
        return "Νομοθεσία";
    }
    if (host.includes("dikepao.gr")) return "ΔΗΚΕΠΑΟ";
    if (host.includes("orestiada.gr")) return "Δήμος Ορεστιάδας";
    return host;
}

/** Broad source-kind for chip coloring. */
export function sourceKind(url: string): "diavgeia" | "wikipedia" | "official" | "legal" | "press" {
    const label = sourceLabel(url);
    if (label === "Διαύγεια") return "diavgeia";
    if (label === "Wikipedia") return "wikipedia";
    if (label === "Νομοθεσία") return "legal";
    if (["gov.gr", "OpenGov", "ΚΕΔΕ", "ΥΠΕΣ", "ΔΗΚΕΠΑΟ", "Δήμος Ορεστιάδας"].includes(label)) return "official";
    return "press";
}

// ─────────────────────────────────────────────────────────────────────────────
// The dossiers (real Orestiada data)
// ─────────────────────────────────────────────────────────────────────────────

const polykentro: Dossier = {
    slug: "politistiko-polykentro",
    name: "Πολιτιστικό Πολύκεντρο Ορεστιάδας",
    type: "LOCATION",
    typeLabel: "Τοποθεσία / Φορέας",
    summary:
        "Το Πολιτιστικό Πολύκεντρο είναι ο πιο συχνά εμφανιζόμενος χώρος στα δεδομένα του Δήμου Ορεστιάδας: ο φάκελος συγκεντρώνει 34 σχετικές αναφορές για παραχωρήσεις, εκμισθώσεις, εκδηλώσεις και χρήσεις του χώρου. Ο φάκελος παρακολουθεί κάθε απόφαση παραχώρησης ή εκμίσθωσης, καθώς και τη διαρκή συζήτηση για το αν η αρμοδιότητα πρέπει να μεταφερθεί στην Οικονομική Επιτροπή για ταχύτερες αποφάσεις.",
    externalContext:
        "Το Πολιτιστικό Πολύκεντρο ανήκει στη ΔΗΚΕΠΑΟ (Δημοτική Κοινωφελής Επιχείρηση Πολιτιστικής Ανάπτυξης Ορεστιάδας) και στεγάζει το Δημοτικό Ωδείο, τη Φιλαρμονική, τη Σχολή Εικαστικών και τη Σχολή Χορού· το αμφιθέατρό του έχει περίπου 120 θέσεις. Η εκμίσθωση δημοτικών χώρων ρυθμίζεται από το άρθρο 196 του ν. 4555/2018 («Κλεισθένης Ι»), που επιτρέπει απευθείας εκμίσθωση χωρίς δημοπρασία όταν η ετήσια πρόσοδος δεν υπερβαίνει τα 2.000 ευρώ.",
    sourcingLevel: "moderate",
    trendingScore: 92,
    subscribers: 148,
    minutesDiscussed: 214,
    entries: [
        {
            date: "2024-10-07",
            meetingId: "oct8_2024",
            meetingName: "Δημοτικό Συμβούλιο 8/10/24",
            subjectId: "cm24olo1e0fqf2jkvz31ailxs",
            subjectName: "Παραχώρηση χώρων για εκδηλώσεις",
            summary: "Συζήτηση και έγκριση για την παραχώρηση χώρων του Δήμου για διάφορες εκδηλώσεις, συμπεριλαμβανομένου του εργαστηρίου μαγειρικής και αιθουσών του Πολιτιστικού Πολύκεντρου",
            citationUrls: [],
        },
        {
            date: "2025-11-21",
            meetingId: "nov21_2025",
            meetingName: "Δημοτικό Συμβούλιο 21/11/25",
            subjectId: "cmifzpyo70v5qsirrwh0i4qnx",
            subjectName: "Ανακοινώσεις έργων και χρηματοδοτήσεων",
            summary: "Ανακοινώσεις του Δημάρχου για την υπογραφή συμβάσεων έργων: αναβάθμιση υποδομών στην περιοχή Οινόης Κλεισσού (πρόγραμμα Ρομά) και επέκταση Δημοτικού Σχολείου Πύργου. Επίσης ανακοινώσεις για προηγούμενη διά περιφοράς συνεδρίαση με θέματα παραχωρήσεων χώρων του Πολιτιστικού Πολύκεντρου.",
            citationUrls: [],
        },
        {
            date: "2025-11-21",
            meetingId: "nov21_2025",
            meetingName: "Δημοτικό Συμβούλιο 21/11/25",
            subjectId: "cmifzpyk90v45sirrwvq0r8nw",
            subjectName: "Έγκριση παραχώρησης αίθουσας εκδηλώσεων",
            summary: "Έγκριση παραχώρησης της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στο Νηπιαγωγείο Ορεστιάδας για την πραγματοποίηση της Χριστουγεννιάτικης εκδήλωσης.",
            citationUrls: [],
        },
        {
            date: "2025-11-21",
            meetingId: "nov21_2025",
            meetingName: "Δημοτικό Συμβούλιο 21/11/25",
            subjectId: "cmifzpyjy0v43sirrhy2jkzae",
            subjectName: "Έγκριση παραχώρησης Πολιτιστικού Πολύκεντρου",
            summary: "Έγκριση παραχώρησης στο Συνεταιρισμό Ρεζίων για χρήση των εκδηλώσεων του Πολιτιστικού Πολύκεντρου πραγματοποίηση ημερίδας με θέμα «Βρες το επαγγελματικό μονοπάτι που σου ταιριάζει».",
            citationUrls: [],
        },
        {
            date: "2025-11-21",
            meetingId: "nov21_2025",
            meetingName: "Δημοτικό Συμβούλιο 21/11/25",
            subjectId: "cmifzpyq60vacsirrgq4grlu1",
            subjectName: "Ημερίδα επαγγελματικού προσανατολισμού",
            summary: "Έγκριση παραχώρησης του Πολιτιστικού Πολύκεντρου στο Συνεταιρισμό Ρεζίων για την πραγματοποίηση ημερίδας με θέμα «Βρες το επαγγελματικό μονοπάτι που σου ταιριάζει». Η ημερίδα αφορά τον επαγγελματικό προσανατολισμό των παιδιών και θα ενημερώσει πολλά σχολεία για τις επαγγελματικές επιλογές και την τεχνολογική εκπαίδευση.",
            citationUrls: [],
        },
        {
            date: "2025-11-21",
            meetingId: "nov21_2025",
            meetingName: "Δημοτικό Συμβούλιο 21/11/25",
            subjectId: "cmifzpyr30vbbsirrcnl0ewa1",
            subjectName: "Παραχώρηση αίθουσας για χριστουγεννιάτικη εκδήλωση",
            summary: "Έγκριση παραχώρησης των αιθουσών εκδηλώσεων του Πολιτιστικού Πολύκεντρου στο 7ο Νηπιαγωγείο Ορεστιάδας για την πραγματοποίηση χριστουγεννιάτικης εκδήλωσης στις 17 Δεκεμβρίου. Συζητήθηκε η διαδικασία παραχώρησης και η ανάγκη των νηπιαγωγείων για μεγαλύτερους χώρους λόγω του πλήθους των επισκεπτών.",
            citationUrls: [],
        },
        {
            date: "2025-12-05",
            meetingId: "dec5_2025",
            meetingName: "Δημοτικό Συμβούλιο 05/12/25",
            subjectId: "cmix7pltj02no7i2opzpziyi2",
            subjectName: "Εκμίσθωση αίθουσας Πολιτιστικού Πολύκεντρου",
            summary: "Εξέταση αιτήματος για την απευθείας εκμίσθωση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στον κ. Μεχλιζόγλου Θεόδωρο του Κωνσταντίνου. Η εκδήλωση έχει ζητηθεί για την ημερομηνία 7.12.2025.",
            citationUrls: [],
        },
        {
            date: "2025-12-11",
            meetingId: "dec11_2025",
            meetingName: "Δημοτικό Συμβούλιο 11/12/25",
            subjectId: "cmlh80rrv00ctypx46yu1jfia",
            subjectName: "Εκμίσθωση αίθουσας για χριστουγεννιάτικη γιορτή",
            summary: "Εξέταση αιτήματος απευθείας εκμίσθωσης αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στο κέντρο ξένων γλωσσών AIMING HIGH Τσομπανίδου για χριστουγεννιάτικη γιορτή. Ο Αστεριάδης εισηγήθηκε θετικά για εκμίσθωση στις 20 Δεκεμβρίου 2025, ώρες 18:00-20:00, έναντι 50 ευρώ πλέον ψηφιακού τέλους 3,6%. Ο Μαυρίδης συμφώνησε αλλά επαναφέρει πρόταση για κανονισμό μεταφοράς αρμοδιότητας στην Οικονομική Επιτροπή ως πιο ευέλικτο όργανο. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon","https://koinsep.org/%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-4555-2018-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%81%CE%AE%CF%83%CE%B7%CF%82-%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CF%8E%CE%BD-%CE%BA%CE%B1/","https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%91%CF%80%CE%B5%CF%85%CE%B8%CE%B5%CE%AF%CE%B1%CF%82_%CE%95%CE%BA%CE%BC%CE%AF%CF%83%CE%B8%CF%89%CF%83%CE%B7_%CE%91%CE%BA%CE%B9%CE%BD%CE%AE%CF%84%CE%BF%CF%85_%CE%94%CE%AE%CE%BC%CE%BF%CF%85","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro","http://www.opengov.gr/ypes/?p=6856"],
        },
        {
            date: "2025-12-11",
            meetingId: "dec11_2025",
            meetingName: "Δημοτικό Συμβούλιο 11/12/25",
            subjectId: "cmlh80rsg00d6ypx4ij2g27xi",
            subjectName: "Παραχώρηση αίθουσας σε νηπιαγωγείο για παράσταση",
            summary: "Έγκριση δωρεάν παραχώρησης αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στο 7ο Νηπιαγωγείο Ορεστιάδας για χριστουγεννιάτικη θεατρική παράσταση «Άλλος για το έλκηθρο». Η Μπραϊκούδη παρουσίασε το αίτημα για χρήση στις 18 Δεκεμβρίου, ώρες 17:30-20:30. Ο Μαυρίδης ρώτησε αν είναι δωρεάν και η Μπραϊκούδη επιβεβαίωσε. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["http://2dim-korinth.kor.sch.gr/old/images/pps%20-pdf/parahor_sxol_horon.pdf","https://www.fa3.gr/nomothesia_2/nomoth_education/58-Paraxorisi-Xrisi-Sxol-Xoron-Aithouses-poll-xriseon.htm","https://www.aeginaportal.gr/aftodioikisi/epitropes/34791-i-sepeda-gia-tin-paraxorisi-aithouson-kai-ayleion-xoron-ton-sxolikon-monadon-tis-aiginas-oi-oroi-kai-oi-proypotheseis-pou-apofasise-i-epitropi.html","https://www.infokids.gr/14-theatrikes-omades-poy-anevaz/"],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85i4q0101b8q812fdh2ud",
            subjectName: "Εκμίσθωση Πολύκεντρου για θέατρο σκιών",
            summary: "Απευθείας εκμίσθωση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στην επιχείρηση «Υπηρεσίες Θεάματος Θεάτρου Σκιών» για δύο παραστάσεις στις 7 Φεβρουαρίου 2026. Ο Αστεριάδης εισηγήθηκε μίσθωμα 250 ευρώ πλέον ψηφιακού τέλους 3,6%. Ο Αγγελακούδης ρώτησε γιατί τα θέματα 8 και 9 έχουν διαφορετικό μίσθωμα ενώ αφορούν μία μέρα. Η Μπραϊκούδη και ο Αστεριάδης εξήγησαν ότι η διαφορά οφείλεται στη μεγαλύτερη χρονική διάρκεια και τα λειτουργικά έξοδα.",
            citationUrls: ["https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon","https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro"],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85i5l010yb8q8ti9xgj0j",
            subjectName: "Εκμίσθωση Πολύκεντρου για παράσταση Μιχαηλίδου",
            summary: "Απευθείας εκμίσθωση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στην ατομική επιχείρηση Μιχαηλίδου Αναστασίας για μία παράσταση θεάτρου σκιών στις 28 Φεβρουαρίου 2026. Ο Αστεριάδης εισηγήθηκε μίσθωμα 150 ευρώ. Ο Περιστεράκης πρότεινε ενιαίο ημερήσιο μίσθωμα αντί διαφοροποίησης ανά αριθμό παραστάσεων. Ο Καζαλτζής ψήφισε θετικά αλλά ζήτησε βελτίωση όρων σε μελλοντικές δημοπρασίες. Η Κυρμάνη συμφώνησε με ενιαίο μίσθωμα για λόγους δικαιοσύνης.",
            citationUrls: ["https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon","https://koinsep.org/%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-4555-2018-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%81%CE%AE%CF%83%CE%B7%CF%82-%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CF%8E%CE%BD-%CE%BA%CE%B1/","https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro"],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85i8v013ab8q82okgetpu",
            subjectName: "Παραχώρηση Πολύκεντρου για Γενική Συνέλευση Αγροτικού Συνεταιρισμού",
            summary: "Δωρεάν παραχώρηση αίθουσας εκδηλώσεων και φουαγιέ Πολιτιστικού Πολύκεντρου στον Αγροτικό Συνεταιρισμό Δημητριακών Ορεστιάδας «Η Ένωση» για σύγκληση γενικής συνέλευσης την Παρασκευή 23 Ιανουαρίου στις 9 το πρωί. Η Μπραϊκούδη εισηγήθηκε την παραχώρηση. Συζητήθηκε μαζί με τα θέματα 12 και 13. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://easorest.gr/","https://www.taxheaven.gr/law/4673/2020","https://www.alikakou.gr/gr/el/articles/agrotikoi-synetairismoi-o-neos-nomos-46732020-fek-a-11-3-2020","https://www.nomoskopio.gr/n_3463_06_185.php","https://www.thrakinea.gr/archives/tag/%CE%B1%CE%B3%CF%81%CE%BF%CF%84%CE%B9%CE%BA%CE%BF%CF%83-%CF%83%CF%85%CE%BD%CE%B5%CF%84%CE%B1%CE%B9%CF%81%CE%B9%CF%83%CE%BC%CE%BF%CF%83-%CE%B4%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%B9%CE%B1%CE%BA%CF%89%CE%BD"],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85i8g0139b8q8ieu1pl71",
            subjectName: "Παραχώρηση Πολύκεντρου για διαγωνισμό ρομποτικής",
            summary: "Δωρεάν παραχώρηση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στον Σύλλογο Εκπαιδευτικής Ρομποτικής STEM και Ψηφιακών Δεξιοτήτων Robot Galaxy για τη διεξαγωγή του παγκόσμιου διαγωνισμού ρομποτικής RoboFest. Η Μπραϊκούδη ανέφερε ότι είναι η τρίτη χρονιά συμμετοχής της Ελλάδας και γίνεται ταυτόχρονα σε λίγες πόλεις. Συζητήθηκε μαζί με τα θέματα 12 και 14. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://www.ertnews.gr/video/robofest-festival-diagonismon-rompotikis-gia-mathites-apo-6-eos-18-eton/","https://live.robofesthellas.gr/","https://malevizi.gov.gr/2025/01/22/malevizi-diagonismos-ekpaideytikis-rompotikis-robofest-hellas-2025/","https://www.lavreotiki.gr/deltia-typoy/robofest-hellas-2026-amp-unknown-mission-league-i-keratea-filoxenei-dyo-koryfaies-diorganoseis-ekpaideytikis-rompotikis/","https://www.trikalaola.gr/i-perifereia-thessalias-diorganonei-diagonismous-kainotomias-kai-robotikis/"],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85i7p012tb8q8vpave866",
            subjectName: "Παραχώρηση Πολύκεντρου για εκδήλωση Kids Wallet",
            summary: "Δωρεάν παραχώρηση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στο Υπουργείο Ψηφιακής Διακυβέρνησης σε συνδιοργάνωση με τις Διευθύνσεις Εκπαίδευσης Έβρου, για εκδήλωση «Kids Wallet: Γονικός έλεγχος, η ασφάλεια που αξίζουν τα παιδιά μας» στις 29 Ιανουαρίου στις 17:30. Η Μπραϊκούδη εισηγήθηκε την παραχώρηση. Τα θέματα 12, 13 και 14 συζητήθηκαν μαζί κατόπιν πρότασης Περιστεράκη. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://daily.nb.org/nomothesia-nomologia/nomothesia/eidiki-ilektroniki-efarmogi-kidswallet/","https://oikogeneia.gov.gr/programs/efarmogi-gia-kinites-syskeves-kidswallet/","https://www.gov.gr/ipiresies/polites-kai-kathemerinoteta/stoikheia-polite-kai-tautopoietika-eggrapha/KidsWallet","https://www.gnomionline.gr/kids-wallet-gonikos-elegchos-prostasia-anilikon-sto-diadiktyo/","https://www.alexpolisonline.com/2026/02/kids-wallet.html"],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85ic1016eb8q842ivjvfy",
            subjectName: "Παραχώρηση Πολύκεντρου για σεμινάρια διαιτητών",
            summary: "Έγκριση παραχώρησης αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στην Ένωση Ποδοσφαιρικών Σωματείων Έβρου για επιμορφωτικά σεμινάρια διαιτητών. Η Μπραϊκούδη εισηγήθηκε ότι τα σεμινάρια θα γίνουν σε τρεις περιόδους: 2-16 Φεβρουαρίου, 2-16 Μαρτίου και 6-27 Απριλίου, ώρες 17:30-19:00. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://el.wikipedia.org/wiki/%CE%88%CE%BD%CF%89%CF%83%CE%B7_%CE%A0%CE%BF%CE%B4%CE%BF%CF%83%CF%86%CE%B1%CE%B9%CF%81%CE%B9%CE%BA%CF%8E%CE%BD_%CE%A3%CF%89%CE%BC%CE%B1%CF%84%CE%B5%CE%AF%CF%89%CE%BD_%CE%88%CE%B2%CF%81%CE%BF%CF%85","https://eps-evrou.gr/scholi-diaitisias-podosfairou/","https://www.politica.gr/athlitika/epo-proti-fora-poso-rekor-gia-ta-seminaria-ton-diaititon/","https://www.gentikoule.gr/podosfairo/385291-tzortzoglou-se-g-panagopoulo-den-echete-problima-me-ta-apeilitika-minumata-pou-mou-stelnate","https://www.myota.gr/2026/01/18/%CE%B4%CE%B9%CE%B5%CF%85%CE%BA%CF%81%CE%B9%CE%BD%CE%B9%CF%83%CF%84%CE%B9%CE%BA%CE%AE-%CE%B5%CE%B3%CE%BA%CF%8D%CE%BA%CE%BB%CE%B9%CE%BF%CF%82-%CE%B3%CE%B9%CE%B1-%CF%84%CE%B7%CE%BD-%CF%80%CE%B1%CF%81/"],
        },
        {
            date: "2026-02-11",
            meetingId: "feb11_2026",
            meetingName: "Δημοτικό Συμβούλιο 11/02/26",
            subjectId: "cmljgfy7b03vhwvnfra7jd53r",
            subjectName: "Εκμίσθωση για Θέατρο Σκιών",
            summary: "Εκμίσθωση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στην επιχείρηση Τέχνη και Ζωή ΕΕ για δύο παραστάσεις θεάτρου σκιών στις 27 Μαρτίου 2026, με μίσθωμα 250 ευρώ. Συζητήθηκε μαζί με τα θέματα 10 και 12. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82","https://www.ert.gr/ert-arxeio/proforiki-paradosi-kai-omadiki-dimioyrgia-sto-theatro-skion/","https://www.karagkiozis.com.gr/","https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon","https://koinsep.org/%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-4555-2018-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%81%CE%AE%CF%83%CE%B7%CF%82-%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CF%8E%CE%BD-%CE%BA%CE%B1/"],
        },
        {
            date: "2026-02-11",
            meetingId: "feb11_2026",
            meetingName: "Δημοτικό Συμβούλιο 11/02/26",
            subjectId: "cmljgfy8303vjwvnfyfma3pr7",
            subjectName: "Παραχώρηση για Γιορτή της Γυναίκας",
            summary: "Παραχώρηση αίθουσας εκδηλώσεων και φουαγιέ του Πολιτιστικού Πολύκεντρου στην Επιτροπή Ισότητας Φύλων (μέσω Περιφερειακής Ένωσης) για εκδήλωση γιορτής γυναίκας στις 7 Μαρτίου 2026, ώρα 16:00-20:00. Τα θέματα 13, 14 και 15 συζητήθηκαν μαζί. Η Μπραϊκούδη εισηγήθηκε και τα τρία. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://el.wikipedia.org/wiki/%CE%A0%CE%B1%CE%B3%CE%BA%CF%8C%CF%83%CE%BC%CE%B9%CE%B1_%CE%B7%CE%BC%CE%AD%CF%81%CE%B1_%CF%84%CE%B7%CF%82_%CE%B3%CF%85%CE%BD%CE%B1%CE%AF%CE%BA%CE%B1%CF%82","https://adedy.gr/8-%CE%BC%CE%B1%CF%81%CF%84%CE%AF%CE%BF%CF%85%CF%80%CE%B1%CE%B3%CE%BA%CF%8C%CF%83%CE%BC%CE%B9%CE%B1-%CE%B7%CE%BC%CE%AD%CF%81%CE%B1-%CF%84%CE%B7%CF%82-%CE%B3%CF%85%CE%BD%CE%B1%CE%AF%CE%BA%CE%B1/","https://irunmag.gr/news/anakoinosi-segas-athens-half/","https://www.segas.gr/anakoinosi-segas-gia-tin-telesi-toy-im/","https://penteli.gov.gr/%CE%B4%CE%B7%CE%BC%CE%BF%CF%84%CE%B9%CE%BA%CE%AE-%CE%B5%CF%80%CE%B9%CF%84%CF%81%CE%BF%CF%80%CE%AE-%CE%B9%CF%83%CF%8C%CF%84%CE%B7%CF%84%CE%B1%CF%82/"],
        },
        {
            date: "2026-02-11",
            meetingId: "feb11_2026",
            meetingName: "Δημοτικό Συμβούλιο 11/02/26",
            subjectId: "cmljgfy9f03vuwvnf624rz5yy",
            subjectName: "Παραχώρηση για Έκθεση Ελληνικής Επανάστασης",
            summary: "Παραχώρηση φουαγιέ του Πολιτιστικού Πολύκεντρου στον Μυλωνά Ευστράτιο για έκθεση πυρογραφίας, ομοιωμάτων, λαβάρων και έργων με θέμα την Ελληνική Επανάσταση 1821, σε συνεργασία με τους Χειμερινούς Κολυμβητές, από 21 έως 30 Μαρτίου 2026, ώρα 18:00-21:00. Συζητήθηκε μαζί με τα θέματα 13 και 14. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD","https://www.dsanet.gr/Epikairothta/Nomothesia/ya357180_2018.htm"],
        },
        {
            date: "2026-02-11",
            meetingId: "feb11_2026",
            meetingName: "Δημοτικό Συμβούλιο 11/02/26",
            subjectId: "cmljgfy9203vtwvnfuon85al5",
            subjectName: "Παραχώρηση για Έκθεση Ζωγραφικής",
            summary: "Παραχώρηση φουαγιέ του Πολιτιστικού Πολύκεντρου στον Σύλλογο Δημιουργών και Καλλιτεχνών Ορεστιάδας για έκθεση ζωγραφικής στις 7-8 Μαρτίου 2026, ώρα 17:00-21:00. Συζητήθηκε μαζί με τα θέματα 13 και 15. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro"],
        },
        {
            date: "2026-03-03",
            meetingId: "mar3_2_2026",
            meetingName: "Δημοτικό Συμβούλιο 03/03/26",
            subjectId: "cmmda3m4p019441yaiixczg4l",
            subjectName: "Εκδήλωση Επιτροπής Ισότητας Φύλων",
            summary: "Παραχώρηση αίθουσας Πολιτιστικού Πολύκεντρου στο Europe Direct σε συνεργασία με την Επιτροπή Ισότητας Φύλων Περιφέρειας και το Δημοκρίτειο Πανεπιστήμιο, για εκδήλωση με θέμα «Ισότητα, Πρόληψη, Μύθοι και Στερεότυπα» στις 6.3.2026, απευθυνόμενη σε μαθητές λυκείου. Εγκρίθηκε ομόφωνα μαζί με τα θέματα 10 και 11.",
            citationUrls: ["https://europedirect.duth.gr/i-evropaiki-epitropi-parousiazei-ti-nea-stratigiki-gia-tin-isotita-ton-fylon-2026-2030-gia-mia-pio-isotimi-synektiki-kai-epitychimeni-evropi/","https://csrnews.gr/114484/eyropaiki-epitropi-nea-stratigiki-gia-tin-isotita-ton-fylon-2026-2030","https://europedirect.duth.gr/","https://europedirect.pde.gov.gr/%CF%84%CE%B9-%CE%B5%CE%AF%CE%BD%CE%B1%CE%B9-%CF%84%CE%BF-europe-direct","https://rethnea.gr/ypografi-tis-anatheorimenis-evropaikis-chartas-gia-tin-isotita-ton-fylon-stis-topikes-koinonies/"],
        },
        {
            date: "2026-03-03",
            meetingId: "mar3_2_2026",
            meetingName: "Δημοτικό Συμβούλιο 03/03/26",
            subjectId: "cmmda3m51019641ya194ybvjd",
            subjectName: "Εκπαίδευση Πυροσβεστικής Υπηρεσίας",
            summary: "Παραχώρηση αίθουσας Πολιτιστικού Πολύκεντρου στην Πυροσβεστική Υπηρεσία Ορεστιάδας για εκπαίδευση πρώτων βοηθειών από κλιμάκιο ΕΚΑΒ Αλεξανδρούπολης στις 26.3.2026, 8:30-14:00. Εγκρίθηκε ομόφωνα μαζί με τα θέματα 9 και 10.",
            citationUrls: ["https://www.ekab.gr/ekpedefsi/","https://www.ekab.gr/ekpedefsi/ekpedefsi-kinonikon-omadon/","https://dete.gr/triimeri-ekpaidefsi-kai-askiseis-etoimotitas-apo-tin-pyrosvestiki-ypiresia-kalavryton/","https://www.powergame.gr/ellada/1315248/scholes-pyrosvestikis-i-prokiryxi-kai-pote-anoigoun-oi-aitiseis/","https://www.radioevros.gr/ekpedeysis-led-orestiadas/"],
        },
        {
            date: "2026-03-03",
            meetingId: "mar3_2_2026",
            meetingName: "Δημοτικό Συμβούλιο 03/03/26",
            subjectId: "cmmda3m4u019541yamuul98k1",
            subjectName: "Ημερίδα για ασφάλεια στο διαδίκτυο",
            summary: "Παραχώρηση αίθουσας Πολιτιστικού Πολύκεντρου στο 1ο Γυμνάσιο Ορεστιάδας για ημερίδα «Ασφάλεια των παιδιών στο διαδίκτυο» στις 4.3.2026, 18:00-21:00. Εγκρίθηκε ομόφωνα μαζί με τα θέματα 9 και 11.",
            citationUrls: ["https://www.safeline.gr/blueprint/","https://www.sch.gr/sid2026","https://www.nationalcoalition.gov.gr/article/panellinios-mathitikos-diagonismos-g/","https://www.politic.gr/politiki/i-anagki-gia-ameses-draseis-gia-tin-asfaleia-ton-paidion-sto-diadiktyo/"],
        },
        {
            date: "2026-03-23",
            meetingId: "mar23_2026",
            meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
            subjectId: "cmmxin6jh0dkb8oeeuamzjd3f",
            subjectName: "Παραχώρηση Πολύκεντρου για Αφιέρωμα Κατσαγώνη",
            summary: "Έγκριση παραχώρησης αίθουσας Πολιτιστικού Πολυκέντρου στον Σύλλογο Απογόνων Καραγατσιανών Αδριανοπολιτών «Η Ορεστιάδα» για πολιτιστική εκδήλωση αφιέρωμα στην ποιήτρια Βίκυ Κατσαγώνη. Συζητήθηκε μαζί με τα θέματα 13-15 και εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://sitalkisking.blogspot.com/2013/12/blog-post_3.html","https://www.paratiritis-news.gr/aparatirita/1923-2023-100-chronia-apo-tin-idrysi-tis-neas-orestiadas-2/","https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD"],
        },
        {
            date: "2026-03-23",
            meetingId: "mar23_2026",
            meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
            subjectId: "cmmxin6jt0dkc8oees2su7zug",
            subjectName: "Παραχώρηση Πολύκεντρου για Ημερίδα ΕΕΠΦ",
            summary: "Έγκριση παραχώρησης αίθουσας Πολιτιστικού Πολυκέντρου στην Ελληνική Εταιρεία Προστασίας της Φύσης για ημερίδα σχετικά με γεωργικές πρακτικές και διατήρηση του Κιρκινεζιού (έργο LIFE for Lesser Kestrel). Η κα. Μπραϊκούδη ανακοίνωσε αλλαγή ημερομηνίας από Πέμπτη 23 σε Παρασκευή 24 Απριλίου. Συζητήθηκε μαζί με τα θέματα 12, 14, 15 και εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://www.ecoschools.gr/about/eepf","http://www.lifethemis.eu/el/program/partners/Hellenic-Society-for-the-Protection-of-Nature","https://eepf.gr/%CE%BD%CE%AD%CE%BF-%CE%B5%CF%85%CF%81%CF%89%CF%80%CE%B1%CF%8A%CE%BA%CF%8C-%CE%AD%CF%81%CE%B3%CE%BF-life-%CF%84%CE%B7%CF%82-%CE%B5%CE%B5%CF%80%CF%86-%CE%B3%CE%B9%CE%B1-%CF%84%CE%BF-%CE%BA%CE%B9%CF%81/","https://lesserkestrellife.greenbalkans.org/en/","https://eepf.gr/%CF%84%CE%B5%CF%87%CE%BD%CE%B7%CF%84%CE%AD%CF%82-%CF%86%CF%89%CE%BB%CE%B9%CE%AD%CF%82-%CE%B3%CE%B9%CE%B1-%CF%84%CE%BF-%CE%BA%CE%B9%CF%81%CE%BA%CE%B9%CE%BD%CE%AD%CE%B6%CE%B9-%CF%83%CF%84%CE%B7%CE%BD/"],
        },
        {
            date: "2026-03-23",
            meetingId: "mar23_2026",
            meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
            subjectId: "cmmxin6lf0dkd8oeej46h42os",
            subjectName: "Παραχώρηση Πολύκεντρου για Παρουσίαση Βιβλίου",
            summary: "Έγκριση παραχώρησης αίθουσας Πολιτιστικού Πολυκέντρου στον Σύλλογο «ΟΙ ΘΡΑΚΕΣ» για παρουσίαση του βιβλίου του Κώστα Δούλια «Επαγγέλματα του περασμένου αιώνα στο Σουφλί». Συζητήθηκε μαζί με τα θέματα 12, 13, 15 και εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro","https://orestiada.gr/dimos/politismos/politistikoi-syllogoi/","https://bourouliti.gr/product/%CE%B5%CF%80%CE%B1%CE%B3%CE%B3%CE%AD%CE%BB%CE%BC%CE%B1%CF%84%CE%B1-%CF%84%CE%BF%CF%85-%CF%80%CE%B5%CF%81%CE%B1%CF%83%CE%BC%CE%AD%CE%BD%CE%BF%CF%85-%CE%B1%CE%B9%CF%8E%CE%BD%CE%B1-%CF%83%CF%84%CE%BF/","https://epiloges.tv/lexeis-pou-xathikan-epaggelmata-pou-ezisan-mesa-apo-to-vivlio-me-122-epaggelmata-tou-perasmenou-aiona-sto-soufli/"],
        },
        {
            date: "2026-04-28",
            meetingId: "apr28_3_2026",
            meetingName: "Δημοτικό Συμβούλιο 28/04/26",
            subjectId: "cmocwqpjc0344grw52266pcbl",
            subjectName: "Εκμίσθωση αίθουσας για ρεσιτάλ βιολιού",
            summary: "Εγκρίθηκε ομόφωνα η εκμίσθωση της αίθουσας του Πολιτιστικού Πολύκεντρου στην κα. Κάκου Βασιλική για ρεσιτάλ βιολιού της κόρης της, στις 17/05/2026, με μίσθωμα 50 ευρώ.",
            decision: {
                ada: "9Ι6ΜΩΞΒ-20Ψ",
                title: "Έγκριση της απευθείας εκμίσθωσης της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου του Δήμου Ορεστιάδας στην Βασιλική Κάκου, ιδιώτη, για την πραγματοποίηση ρεσιτάλ Βιολιού την Κυριακή 17 Μαΐου 2026»",
                pdfUrl: "https://diavgeia.gov.gr/doc/9Ι6ΜΩΞΒ-20Ψ",
            },
            citationUrls: ["https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro","https://www.radioevros.gr/se-mia-perioxi-pou-kleinoun-sxoleia-i-orestiada-etoimazetai-na-anoiksei-ena/"],
        },
        {
            date: "2026-04-28",
            meetingId: "apr28_3_2026",
            meetingName: "Δημοτικό Συμβούλιο 28/04/26",
            subjectId: "cmocwqpjn0345grw5wuokoyhz",
            subjectName: "Παραχώρηση αίθουσας για βράβευση μαθητών",
            summary: "Εγκρίθηκε ομόφωνα η παραχώρηση της αίθουσας του Πολιτιστικού Πολύκεντρου στο Παράρτημα Έβρου της Ελληνικής Μαθηματικής Εταιρείας για βράβευση μαθητών στις 13/06/2026. Ο κ. Μαυρίδης ανέφερε τη διάκριση του κ. Δαγρέση σε μαθηματικό διαγωνισμό και ζήτησε ο Δήμος να βραβεύει τέτοια παιδιά.",
            decision: {
                ada: "ΨΜΨ2ΩΞΒ-ΦΗ3",
                title: "Έγκριση παραχώρησης της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στο Παράρτημα Έβρου της Ελληνικής Μαθηματικής Εταιρείας για την πραγματοποίηση εκδήλωση βράβευσης των διακριθέντων μαθητών και μαθητριών στους διαγωνισμούς της ΕΜΕ το Σάββατο 13.06.2026",
                pdfUrl: "https://diavgeia.gov.gr/doc/ΨΜΨ2ΩΞΒ-ΦΗ3",
            },
            citationUrls: ["https://el.wikipedia.org/wiki/%CE%95%CE%BB%CE%BB%CE%B7%CE%BD%CE%B9%CE%BA%CE%AE_%CE%9C%CE%B1%CE%B8%CE%B7%CE%BC%CE%B1%CF%84%CE%B9%CE%BA%CE%AE_%CE%95%CF%84%CE%B1%CE%B9%CF%81%CE%B5%CE%AF%CE%B1","http://emepatras.gr/","https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%94%CF%89%CF%81%CE%B5%CE%AC%CE%BD_%CE%A0%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%A7%CF%81%CE%AE%CF%83%CE%B7%CF%82_%CE%94%CE%B7%CE%BC%CE%BF%CF%84%CE%B9%CE%BA%CE%BF%CF%8D_%CE%91%CE%BA%CE%B9%CE%BD%CE%AE%CF%84%CE%BF%CF%85","http://www.nomoskopio.gr/n_3463_06_185.php?toc=0","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro"],
        },
        {
            date: "2026-04-28",
            meetingId: "apr28_3_2026",
            meetingName: "Δημοτικό Συμβούλιο 28/04/26",
            subjectId: "cmocwqpjz0346grw51kk2zwfn",
            subjectName: "Παραχώρηση αίθουσας για εκδήλωση σχολικού εκφοβισμού",
            summary: "Εγκρίθηκε ομόφωνα η δωρεάν παραχώρηση αίθουσας του Πολιτιστικού Πολύκεντρου στην ΚΟΙΝΣΕΠ Ι.Δ.Ε.Α.Τ.Ο. Βορείου Έβρου για εκδήλωση με θέμα τον σχολικό εκφοβισμό (03/05/2026), με ομιλήτριες την κα. Κοσμίδου και την κα. Νοτίου. Ο κ. Χατζηχαραλάμπους παρουσίασε την ΚΟΙΝΣΕΠ και την εκδήλωση. Η κα. Κυρμάνη πρότεινε ο Δήμος να ξεκινήσει ευρύτερη καμπάνια κατά του σχολικού εκφοβισμού.",
            decision: {
                ada: "ΨΩΛΡΩΞΒ-ΝΛΙ",
                title: "Έγκριση παραχώρησης της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου και της αίθουσας υποδοχής (φουαγιέ) για την πραγματοποίηση εκδήλωσης με θέμα «σχολικός εκφοβισμός –παιδιά, γονείς, εκπαιδευτικοί » από την ΚΟΙΝΣΕΠ «ΙΔ.Ε.Α.Τ.Ο. ΒΟΡΕΙΟΥ ΕΒΡΟΥ ΚΟΙΝ. Σ.",
                pdfUrl: "https://diavgeia.gov.gr/doc/ΨΩΛΡΩΞΒ-ΝΛΙ",
            },
            citationUrls: ["https://e-didaskalia.blogspot.com/2026/03/bullying.html","https://www.e-nomothesia.gr/kat-ekpaideuse/n-5029-2023.html","https://www.esos.gr/arthra/82351/fek-toy-neoy-nomoy-5029-1-3-23-gia-ti-sholiki-kai-allon-diataxeon-gia-tis-treis","https://stop-bullying.gov.gr/","https://cyclades24.gr/2026/03/otan-o-scholikos-ekfovismos-metaferetai-sto-diadiktyo-apo-tin-epistimoniki-omada-tou-mazi-gia-to-paidi/"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txc5u16ybz3nx97m5yeyy",
            subjectName: "Απολογισμός Δημοτικής Αρχής 2025",
            summary: "Καθορισμός χώρου και χρόνων ομιλίας για την Ειδική Συνεδρίαση απολογισμού πεπραγμένων της Δημοτικής Αρχής έτους 2025. Προτείνεται η αίθουσα του Πολιτιστικού Πολύκεντρου και χρόνοι 20 λεπτά για επικεφαλής και 10 λεπτά για τους υπόλοιπους. Η αντιπολίτευση ζητά να οριστεί και η ημερομηνία και να αυξηθούν οι χρόνοι.",
            decision: {
                ada: "ΨΕΩΖΩΞΒ-7ΑΘ",
                title: "Γνωμοδότηση προς Δημοτική Επιτροπή, σχετικά με την παραχώρηση των οδών Βασιλέως Κων/νου, από την οδό Κων/πόλεως έως την οδό Αναγεννήσεως για την διοργάνωση της 6ης Έκθεσης Αυτοκινήτου – Μοτοσυκλέτας – Τρακτέρ 2026 του αθλητικού σωματείου Action Club Evrou",
                pdfUrl: "https://diavgeia.gov.gr/doc/ΨΕΩΖΩΞΒ-7ΑΘ",
            },
            citationUrls: ["https://www.taxheaven.gr/circulars/49448/2804-20-01-2025","https://lawnet.gr/law-news/ellada/ste-g%CE%84-2401-2025-o-apologismos-pepragmenon-dimotikis-archis-echei-ektelesto-charaktira/","https://www.lawspot.gr/nomika-nea/apologismos-pepragmenon-demotikes-arkhes-apokleistike-e-prothesmia-kata-ten-opoia-to-keimeno-tou-apologismou-tithetai-ste-diathese-ton-parataxeon-ste-24012025/","https://www.anavathmisi.gr/en/%CE%B5%CE%B9%CE%B4%CE%B9%CE%BA%CE%AE-%CF%83%CF%85%CE%BD%CE%B5%CE%B4%CF%81%CE%AF%CE%B1%CF%83%CE%B7-%CE%BB%CE%BF%CE%B3%CE%BF%CE%B4%CE%BF%CF%83%CE%AF%CE%B1%CF%82-%CE%B4%CE%B7%CE%BC%CE%BF%CF%84%CE%B9/"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txcf216yxz3nx5hmqr7at",
            subjectName: "Ειρηνική πορεία Ποντίων 19 Μαΐου",
            summary: "Πραγματοποίηση ειρηνικής πορείας του Συλλόγου Ποντίων Βορείου Έβρου «Ο Διγενής» από την Κεντρική Πλατεία Ορεστιάδας με προορισμό το Μνημείο στο Πολιτιστικό Πολύκεντρο την Τρίτη 19 Μαΐου 2026 και ώρα 19:00, με σύμφωνη γνώμη της αστυνομίας και της τοπικής κοινότητας. Εγκρίθηκε ομόφωνα.",
            decision: {
                ada: "9ΚΓ7ΩΞΒ-ΓΥΕ",
                title: "Έγκριση πραγματοποίησης ειρηνικής πορείας του Συλλόγου Ποντίων Βορείου Έβρου «Ο Διγενής» από την Κεντρική Πλατεία Ορεστιάδας με προορισμό το Μνημείο στο Πολιτιστικό Πολύκεντρο Δήμου Ορεστιάδας την Τρίτη 19 Μαΐου 2026 και ώρα 19:00",
                pdfUrl: "https://diavgeia.gov.gr/doc/9ΚΓ7ΩΞΒ-ΓΥΕ",
            },
            citationUrls: ["https://el.wikipedia.org/wiki/%CE%93%CE%B5%CE%BD%CE%BF%CE%BA%CF%84%CE%BF%CE%BD%CE%AF%CE%B1_%CF%84%CF%89%CE%BD_%CE%95%CE%BB%CE%BB%CE%AE%CE%BD%CF%89%CE%BD_%CF%84%CE%BF%CF%85_%CE%A0%CF%8C%CE%BD%CF%84%CE%BF%CF%85","https://www.sansimera.gr/worldays/278","https://www.sansimera.gr/articles/140","https://pameevro.gr/genoktonia-pontion-19-maiou-istoria-mnimi/"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txca416ymz3nx0c2dmkdc",
            subjectName: "Εκμίσθωση αίθουσας Πολιτιστικού Πολύκεντρου",
            summary: "Θα εξεταστεί αίτημα (αρ. πρωτ. 8567/29.04.2026) για την απευθείας εκμίσθωση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου του Δήμου Ορεστιάδας στην κ. ΓΚΡΟΖΟΥ ΘΕΟΠΟΥΛΑ.",
            citationUrls: ["https://www.opengov.gr/ypes/?p=5770","https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon","https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txcgx16z2z3nxdc1uulke",
            subjectName: "Ημερίδα Γκαγκαβούζηδων στο Πολύκεντρο",
            summary: "Παραχώρηση της αίθουσας υποδοχής (φουαγιέ) και της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στην Ένωση Συλλόγων Παράδοσης και Δημιουργίας «Οι Γκαγκαβούζηδες» για ημερίδα με θέμα «Λαϊκά δρώμενα των Γκαγκαβούζων» στις 11/09/2026 και ώρα 19:00. Εγκρίθηκε ομόφωνα. Ο κ. Μαυρίδης σχολίασε ότι ο ίδιος σύλλογος εμφανίζεται άλλοτε με αγγλικό και άλλοτε με ελληνικό τίτλο, με την κα. Μπραϊκούδη να διευκρινίζει ότι τα αιτήματα έρχονται από τους ίδιους τους συλλόγους.",
            citationUrls: ["https://el.wikipedia.org/wiki/%CE%93%CE%BA%CE%B1%CE%B3%CE%BA%CE%B1%CE%B2%CE%BF%CF%8D%CE%B6%CE%B9%CE%BA%CE%B7_%CE%B3%CE%BB%CF%8E%CF%83%CF%83%CE%B1","https://diafaneia.eu/%CE%B5%CE%AF%CE%BC%CE%B1%CF%83%CF%84%CE%B5-%CE%AD%CE%BB%CE%BB%CE%B7%CE%BD%CE%B5%CF%82-%CE%B1%CE%BA%CE%BF%CF%8D%CE%B5%CE%B9-%CE%BA%CE%B1%CE%BD%CE%B5%CE%AF%CF%82-%CF%85%CF%80%CE%BF%CE%B3%CF%81%CE%B1/","https://folkdancefootnotes.org/culture/ethnicity-history-geography/gagauz-moldova-greece-bulgaria-ukraine/","https://socalfolkdance.org/articles/greek_thrace_graziosi.htm","https://www.evripidis.gr/product/115286/emeis-oi-gkagkaboyzides-/"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txcgi16z1z3nxydg5f8wp",
            subjectName: "Καλοκαιρινή εκδήλωση 7ου Νηπιαγωγείου",
            summary: "Παραχώρηση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στο 7ο Νηπιαγωγείο Ορεστιάδας για καλοκαιρινή εκδήλωση στις 9 Ιουνίου 2026 (18:00-20:30) και πρόβες στις 4, 5 και 8 Ιουνίου. Εγκρίθηκε ομόφωνα.",
            citationUrls: ["https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro","https://coolweb.gr/pote-kleinoun-ta-sxoleia/","https://diavouleusi.eu/diabouleyseis/%CE%BA%CE%B1%CE%BD%CE%BF%CE%BD%CE%B9%CF%83%CE%BC%CE%BF%CF%83-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%89%CF%81%CE%B7%CF%83%CE%B7%CF%83-%CF%87%CF%81%CE%B7%CF%83%CE%B7%CF%83-%CF%84%CF%89%CE%BD-%CF%83%CF%87/","https://pavlosmelas.gr/%CE%B4%CE%BF%CE%BC%CE%AD%CF%82-%CE%B4%CF%81%CE%AC%CF%83%CE%B5%CE%B9%CF%82/%CF%80%CE%B1%CE%B9%CE%B4%CE%B5%CE%AF%CE%B1/%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%8E%CF%81%CF%89%CE%BD-%CF%83%CF%87%CE%BF%CE%BB%CE%B9%CE%BA%CF%8E%CE%BD-%CE%BC%CE%BF%CE%BD%CE%AC%CE%B4%CF%89%CE%BD/","https://www.proininews.gr/allazei-o-kanonismos-parachorisis-choron-scholeion/"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txcdw16yuz3nxqpa6xryb",
            subjectName: "Παραχώρηση Πολύκεντρου για εκλογές ΔΟΕ",
            summary: "Παραχώρηση του προθαλάμου της αίθουσας εκδηλώσεων (φουαγιέ) του Πολιτιστικού Πολύκεντρου στον Σύλλογο Εκπαιδευτικών Πρωτοβάθμιας Εκπαίδευσης Ορεστιάδας για τη διεξαγωγή εκλογών ανάδειξης αντιπροσώπων στην 95η Γενική Συνέλευση της Διδασκαλικής Ομοσπονδίας Ελλάδας την Πέμπτη 4 Ιουνίου 2026, ώρα 11:00-17:30. Εγκρίθηκε ομόφωνα. Ο κ. Μαυρίδης προτείνει να ληφθεί γενική απόφαση παραχώρησης του φουαγιέ για εκλογικές διαδικασίες ώστε να μην απαιτείται κάθε φορά ξεχωριστή απόφαση.",
            citationUrls: [],
        },

    ],
};

const adespota: Dossier = {
    slug: "katafygio-adespoton",
    name: "Καταφύγιο αδέσποτων ζώων",
    type: "PROJECT",
    typeLabel: "Έργο",
    summary:
        "Το καταφύγιο αδέσποτων ζώων συντροφιάς (σύμβαση 364.064 ευρώ με την Αρχιμήδης Τεχνική ΑΕ, χρηματοδότηση Φιλόδημος 2) είναι ένα έργο που επανέρχεται συνεχώς στο συμβούλιο: επανέναρξη, προσωρινή διακοπή λόγω καιρού, αμφισβητήσεις νομιμότητας και ιδιοκτησιακού καθεστώτος, και τελικά έγκριση επιχειρησιακού προγράμματος διαχείρισης. Ο φάκελος συνδέει τις διαδοχικές αποφάσεις σε μία αφήγηση που αλλιώς θα ήταν διάσπαρτη σε τέσσερις συνεδριάσεις.",
    externalContext:
        "Τα δημοτικά καταφύγια αδέσποτων ζώων συντροφιάς αποτελούν υποχρέωση των δήμων βάσει του ν. 4830/2021 και του προγράμματος «Άργος». Το πρόγραμμα «Φιλόδημος 2» χρηματοδοτεί την κατασκευή με ανώτατο ποσό 300.000 ευρώ πλέον ΦΠΑ ανά ΟΤΑ. Η χωροθέτηση σε γη υψηλής παραγωγικότητας ή δασική έκταση εγείρει πρόσθετες αδειοδοτικές απαιτήσεις (ΠΕΧΩΠ, Δασαρχείο).",
    sourcingLevel: "rich",
    trendingScore: 88,
    subscribers: 203,
    minutesDiscussed: 167,
    entries: [
        {
            date: "2025-12-11",
            meetingId: "dec11_2025",
            meetingName: "Δημοτικό Συμβούλιο 11/12/25",
            subjectId: "cmlh80rnt008jypx412tp0fi4",
            subjectName: "Επανέναρξη σύμβασης καταφυγίου αδέσποτων ζώων",
            summary: "Επανέναρξη σύμβασης κατασκευής και εξοπλισμού καταφυγίου αδέσποτων ζώων συντροφιάς αξίας 364.064€, ανατεθειμένης στην Αρχιμήδης Τεχνική ΑΕ. Ο Δημούτσης παρουσίασε τη θετική γνωμοδότηση της Επιτροπής Παραλαβής. Ο Μαυρίδης υπενθύμισε ότι η σύμβαση υπογράφτηκε τον Δεκέμβριο 2023 και σεβάστηκαν τη διαδικασία αλλαγής χωροθέτησης. Ο Περιστεράκης έθεσε ερώτημα για τη δυνατότητα δόμησης σε γη υψηλής παραγωγικότητας και την ανάγκη έγκρισης ΠΕΧΩΠ.",
            citationUrls: ["https://www.kodiko.gr/nomothesia/document/747098/nomos-4830-2021","https://www.e-nomothesia.gr/kat-zoa-suntrophias-prostasia-zoon/nomos-4830-2021-phek-169a-18-9-2021.html","https://www.opengov.gr/ypes/?p=7912","https://www.opengov.gr/ypes/?p=7896","https://eugo.gov.gr/services/987316"],
        },
        {
            date: "2026-02-11",
            meetingId: "feb11_2026",
            meetingName: "Δημοτικό Συμβούλιο 11/02/26",
            subjectId: "cmljgfyca03x6wvnfj38d92hm",
            subjectName: "Διακοπή Σύμβασης Καταφυγίου Αδέσποτων",
            summary: "Έγκριση προσωρινής διακοπής της σύμβασης κατασκευής καταφυγίου αδέσποτων ζώων συντροφιάς (364.064 ευρώ με ΦΠΑ) με την εταιρεία Αρχιμήδης Τεχνική ΑΕ, λόγω δυσμενών καιρικών συνθηκών. Ο Δημούτσης εισηγήθηκε βάσει θετικής γνωμοδότησης της Τριμελούς Επιτροπής Παραλαβής. Ο Καραγιάννης επέκρινε τις συνεχείς καθυστερήσεις από την αρχή της θητείας, σχολιάζοντας ότι ένα τόσο σημαντικό θέμα δεν πρέπει να μπαίνει τελευταίο στη διάταξη, και ανακοίνωσε καταψήφιση.",
            citationUrls: ["https://www.ypes.gr/politikes-kai-draseis/programma-filodimos-2/apofasis-entaksis-2/prosklisi-x","https://www.aftodioikisi.gr/ota/dimoi/filodimos-ii-20-ekat-se-dimoys-gia-ta-adespota/","https://www.taxheaven.gr/law/4412/2016"],
        },
        {
            date: "2026-02-27",
            meetingId: "feb27_2026",
            meetingName: "Δημοτικό Συμβούλιο 27/02/26",
            subjectId: "cmm6lwkqs05qf94xjobvb1duj",
            subjectName: "Καταφύγιο αδέσποτων ζώων",
            summary: "Ερώτημα του Μαυρίδη για τη νομιμότητα του καταφυγίου αδέσποτων ζώων στο πρώην στρατόπεδο Νεοχωρίου. Ο Μαυρίδης ρωτά αν ήταν παράνομος ο τρόπος που έγινε ως προμήθεια αντί ως έργο, σε ποιον ανήκει ιδιοκτησιακά ο χώρος, αν βρίσκεται σε δασική περιοχή, και αν υπήρχε άδεια ίδρυσης.",
            citationUrls: ["https://www.kodiko.gr/nomothesia/document/747098/nomos-4830-2021","https://eugo.gov.gr/services/987316","https://ecopress.gr/katafygia-zoon-syntrofias-ti-ischyei-g/","https://www.opengov.gr/ypes/?p=7896"],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txc7m16ygz3nxcrln8lnc",
            subjectName: "Διαχείριση αδέσποτων ζώων Ορεστιάδας",
            summary: "Έγκριση Επιχειρησιακού προγράμματος διαχείρισης αδέσποτων ζώων βάσει του ν. 4830/2021 και του προγράμματος Άργος. Το πρόγραμμα περιλαμβάνει περισυλλογή, ηλεκτρονική σήμανση, στειρώσεις, κτηνιατρική περίθαλψη, υιοθεσίες και επανένταξη. Ο κ. Μαυρίδης ζητά οικονομικά στοιχεία για τις ετήσιες δράσεις και ενημέρωση για την πορεία του καταφυγίου αδέσποτων. Ο κ. Σουκουλδάνος δηλώνει στήριξη στις προσπάθειες του αντιδημάρχου.",
            decision: {
                ada: "ΨΟΨΒΩΞΒ-9ΟΝ",
                title: "ΔΑΠΑΝΗ ΓΙΑ ΤΗΝ ΠΑΡΟΧΗ ΥΠΗΡΕΣΙΑΣ ΜΕ ΤΙΤΛΟ: «ΦΙΛΟΞΕΝΙΑ - ΔΙΑΜΟΝΗ ΕΘΕΛΟΝΤΩΝ ΚΤΗΝΙΑΤΡΩΝ (ΕΔΚΕ) ΣΤΑ ΠΛΑΙΣΙΑ ΔΙΟΡΓΑΝΩΣΗΣ ΕΘΕΛΟΝΤΙΚΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ ΣΤΕΙΡΩΣΕΩΝ ΤΟΥ ΔΗΜΟΥ ΟΡΕΣΤΙΑΔΑΣ ΓΙΑ ΤΑ ΑΔΕΣΠΟΤΑ ΖΩΑ ΣΥΝΤΡΟΦΙΑΣ» (ΟΦΕΛΗ 2025)",
                pdfUrl: "https://diavgeia.gov.gr/doc/ΨΟΨΒΩΞΒ-9ΟΝ",
            },
            citationUrls: ["https://www.e-nomothesia.gr/kat-zoa-suntrophias-prostasia-zoon/nomos-4830-2021-phek-169a-18-9-2021.html","https://www.kodiko.gr/nomothesia/document/747098/nomos-4830-2021","https://www.elsyn.gr/sites/default/files/%CE%95%CE%9A%CE%98%CE%95%CE%A3%CE%97%20%CE%95%CE%9B%CE%95%CE%93%CE%A7%CE%9F%CE%A5%203%20%CE%91%CE%94%CE%95%CE%A3%CE%A0%CE%9F%CE%A4%CE%91%20%CE%96%CE%A9%CE%91_0.pdf","https://vetsurgery.gr/%CF%80%CF%81%CF%8C%CE%B3%CF%81%CE%B1%CE%BC%CE%BC%CE%B1-%CE%B1%CF%81%CE%B3%CE%BF%CF%82/","https://petstoday.gr/el/zoa-syntrofias-ti-problepei-o-neos-nomos-4830-2021/"],
        },

    ],
};

const arda: Dossier = {
    slug: "diadimotiki-epixeirisi-arda",
    name: "Διαδημοτική Επιχείρηση Ποταμού Άρδα",
    type: "ORGANIZATION",
    typeLabel: "Οργανισμός",
    summary:
        "Η Διαδημοτική Επιχείρηση Αξιοποίησης και Ανάδειξης του Ποταμού Άρδα επανέρχεται στο συμβούλιο για προϋπολογισμούς, ισολογισμούς, την ετήσια «Συνάντηση Νέων Άρδας» και το διασυνοριακό ζήτημα της παροχής νερού από τη Βουλγαρία. Ο φάκελος ενώνει τα οικονομικά της επιχείρησης με την ευρύτερη υπόθεση των υδάτων του Άρδα που αφορά την άρδευση χιλιάδων στρεμμάτων του βόρειου Έβρου.",
    externalContext:
        "Ο Άρδας είναι παραπόταμος του Έβρου, συνολικού μήκους 290 χλμ, εκ των οποίων τα 49 διασχίζουν ελληνικό έδαφος. Η παροχή νερού καθορίζεται από διμερή συμφωνία Ελλάδας–Βουλγαρίας (αρχικά του 1964, που προβλέπει 186 εκατ. κυβικά μέτρα ετησίως)· νέα πενταετής συμφωνία υπεγράφη το 2025. Τα αρδευτικά δίκτυα της λεκάνης καλύπτουν περίπου 55.000 στρέμματα βόρεια και 67.100 νότια του ποταμού.",
    sourcingLevel: "rich",
    trendingScore: 71,
    subscribers: 96,
    minutesDiscussed: 119,
    entries: [
        {
            date: "2024-10-07",
            meetingId: "oct8_2024",
            meetingName: "Δημοτικό Συμβούλιο 8/10/24",
            subjectId: "cm24olnv70fkn2jkv3uwuj4pm",
            subjectName: "Ισολογισμός Διαδημοτικής Επιχείρησης Άρδα 2023",
            summary:
                "Παρουσίαση και έγκριση του ισολογισμού και των αποτελεσμάτων χρήσης της Διαδημοτικής Επιχείρησης για το έτος 2023.",
            citationUrls: [],
        },
        {
            date: "2026-01-21",
            meetingId: "jan21_2026",
            meetingName: "Δημοτικό Συμβούλιο 21/01/26",
            subjectId: "cmlh85ico016tb8q8dx8segxm",
            subjectName: "Ενημέρωση για αγροτικές κινητοποιήσεις και νερά Άρδα",
            summary:
                "Ο Αγγελακούδης ενημέρωσε το σώμα για τις αγροτικές κινητοποιήσεις και τα νερά του Άρδα. Ανέφερε ότι δεν υπάρχει υπογεγραμμένη συμφωνία με τη Βουλγαρία παρά μόνο πλαίσιο, και ότι η πολιτική αστάθεια στη γείτονα δυσκολεύει τις διαπραγματεύσεις. Ο Πρωθυπουργός δεσμεύτηκε για απάντηση έως το τέλος Ιανουαρίου.",
            citationUrls: [
                "https://el.wikipedia.org/wiki/%CE%86%CF%81%CE%B4%CE%B1%CF%82",
                "https://www.gnomionline.gr/sigi-asyrmatou-apo-ellada-kai-voulgaria-gia-ta-nera-tou-arda/",
            ],
        },
        {
            date: "2026-03-03",
            meetingId: "mar3_2_2026",
            meetingName: "Δημοτικό Συμβούλιο 03/03/26",
            subjectId: "cmmda3m3b018x41yaoib08pqz",
            subjectName: "Προϋπολογισμός Διαδημοτικής Επιχείρησης Άρδα 2026",
            summary:
                "Προϋπολογισμός 2026 με έσοδα 320.000 ευρώ και έξοδα 282.636 ευρώ. Ο Μαυρίδης πρότεινε αγορά καινούριου οχήματος 4x4 αντί μεταχειρισμένου. Ο Καζαλτζής ζήτησε διαφανή κριτήρια προσλήψεων. Ο Περιστεράκης αμφισβήτησε τη νομιμότητα προμήθειας ζεόλιθου μετά από ακυρωτική απόφαση. Ο δήμαρχος Παπαδόπουλος ανέφερε ότι ο Δήμος εισπράττει 106.000 ευρώ ενοίκιο για πρώτη φορά.",
            citationUrls: [
                "https://el.wikipedia.org/wiki/%CE%86%CF%81%CE%B4%CE%B1%CF%82",
                "https://orestiada.gr/dimos/perivallon/ydatikoi-poroi-stin-perioxi/",
            ],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txcd116ysz3nxfizxuxh5",
            subjectName: "Εκδηλώσεις «Συνάντηση Νέων Άρδας 2026»",
            summary:
                "Παραχώρηση θέσεων για τις εκδηλώσεις «Συνάντηση Νέων Άρδας 2026» (30 Ιουλίου – 2 Αυγούστου) με τέλος 10.000 ευρώ συνολικά. Ο Μαυρίδης πρότεινε διπλασιασμό του τέλους· η Μπραϊκούδη εξήγησε ότι το ποσό προέκυψε μετά από έρευνα αγοράς. Εγκρίθηκε κατά πλειοψηφία.",
            citationUrls: [
                "https://dikepao.gr/ekdiloseis/synantisi-neon-ardas",
                "https://www.evros24.gr/30-chronia-ardas-festival-epistrefei-megali-gi/",
            ],
        },
    ],
};

const radio: Dossier = {
    slug: "dimotiki-radiotileorasi",
    name: "Δημοτική Ραδιοτηλεόραση Ορεστιάδας",
    type: "ORGANIZATION",
    typeLabel: "Οργανισμός",
    summary:
        "Η Δημοτική Ραδιοτηλεόραση Ορεστιάδας επανέρχεται στο συμβούλιο κάθε φορά που εγκρίνεται ισολογισμός, προϋπολογισμός, στοχοθεσία ή επιχορήγηση. Σε όλες τις συνεδριάσεις επανέρχεται το ίδιο διακύβευμα: η μεγάλη δυσαναλογία εσόδων–εξόδων και η βιωσιμότητα του δημοτικού μέσου ενόψει νέου ραδιοτηλεοπτικού νομοσχεδίου. Ο φάκελος καθιστά ορατή αυτή την επαναλαμβανόμενη συζήτηση.",
    externalContext:
        "Οι δημοτικές ραδιοτηλεοράσεις λειτουργούν βάσει του ΠΔ 25/1998 ως επιχειρήσεις ΟΤΑ με ειδικό σκοπό. Χρηματοδοτούνται κυρίως από επιχορήγηση του δήμου (εδώ 180.000 ευρώ ετησίως) και σε μικρό βαθμό από διαφημίσεις. Σημαντικό κόστος αποτελούν τα τέλη της DIGEA για τη μετάδοση του σήματος. Νέο νομοσχέδιο σε διαβούλευση φαίνεται να επιβάλλει αυστηρότερες προδιαγραφές προσωπικού και τεχνολογίας.",
    sourcingLevel: "moderate",
    trendingScore: 64,
    subscribers: 57,
    minutesDiscussed: 142,
    entries: [
        {
            date: "2025-12-11",
            meetingId: "dec11_2025",
            meetingName: "Δημοτικό Συμβούλιο 11/12/25",
            subjectId: "cmlh80rmn007nypx4v5uurdbn",
            subjectName: "Ισολογισμός 2024 Δημοτικής Ραδιοτηλεόρασης",
            summary:
                "Έγκριση ισολογισμού 2024. Ο Καζαλτζής επισήμανε τη δυσαναλογία εσόδων 17.112 ευρώ έναντι εξόδων 183.128 ευρώ και ζήτησε σχέδιο αύξησης εσόδων. Ο Δόμπας αναφέρθηκε στις δυσκολίες της τοπικής αγοράς και τη μείωση κρατικών διαφημιστικών προγραμμάτων. Εγκρίθηκε ομόφωνα.",
            citationUrls: [
                "https://orestiada.gr/nomika-prosopa/radiotileorasi-2/",
                "https://www.e-nomothesia.gr/enemerose-tupos-radiophono-teleorase/n-3592-2007.html",
            ],
        },
        {
            date: "2026-03-03",
            meetingId: "mar3_2_2026",
            meetingName: "Δημοτικό Συμβούλιο 03/03/26",
            subjectId: "cmmda3m3l018y41yas4otork7",
            subjectName: "Προϋπολογισμός Ραδιοτηλεόρασης Δήμου 2026",
            summary:
                "Προϋπολογισμός 2026 με συνολικά έσοδα περίπου 200.000 ευρώ, εκ των οποίων 180.000 επιχορήγηση από τον Δήμο. Εγκρίθηκε κατά πλειοψηφία. Η αντιπρόεδρος Μανάβη προειδοποίησε ότι τα τέλη της DIGEA μπορεί να ξεπεράσουν τις 100.000 ευρώ.",
            citationUrls: [
                "https://www.e-nomothesia.gr/enemerose-tupos-radiophono-teleorase/n-3592-2007.html",
                "https://digitaltvinfo.gr/arthrografia/afieroma/chartis-tileoptikon-sychnotiton/",
            ],
        },
        {
            date: "2026-03-23",
            meetingId: "mar23_2026",
            meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
            subjectId: "cmmxin6b60dk08oeeqyo5qd05",
            subjectName: "Έγκριση Πινάκων Στοχοθεσίας Δημοτικής Ραδιοτηλεόρασης",
            summary:
                "Έγκριση πινάκων στοχοθεσίας οικονομικών αποτελεσμάτων 2026. Όλες οι παρατάξεις εξέφρασαν ανησυχία για τη στασιμότητα και τον χαμηλό προϋπολογισμό. Ο δήμαρχος Παπαδόπουλος πρότεινε επενδύσεις και αύξηση του διαφημιστικού μεριδίου. Εγκρίθηκε ομόφωνα.",
            citationUrls: [
                "https://www.ypes.gr/oikonomiki-stochothesia-ota/",
                "https://kede.gr/ypes-odigies-pros-tous-dimous-gia-ton-elegcho-ton-oikonomikon-apotelesmaton/",
            ],
        },
        {
            date: "2026-05-18",
            meetingId: "may18_2026",
            meetingName: "Δημοτικό Συμβούλιο 18/05/26",
            subjectId: "cmp5txc6c16ycz3nxaqufuz98",
            subjectName: "Επιχορήγηση Ραδιοτηλεόρασης Δήμου 2026",
            summary:
                "Έγκριση επιχορήγησης 180.000 ευρώ για το 2026 βάσει του άρθρου 4 παρ. 3 του ΠΔ 25/1998. Συζητήθηκε το νέο ραδιοτηλεοπτικό νομοσχέδιο: ο Αγγελακούδης το χαρακτήρισε απαιτητικό (15 άτομα προσωπικό, 4 δημοσιογράφοι, high definition) και ο Τσελεμπής έθεσε σκέψη ενοικίασης της συχνότητας. Εγκρίθηκε ομόφωνα.",
            citationUrls: [],
        },
    ],
};

export const DOSSIERS: Dossier[] = [polykentro, adespota, arda, radio];

export function getDossiers(): Dossier[] {
    // Sorted by mock trending score, descending — mirrors «Ενεργοί Φάκελοι».
    return [...DOSSIERS].sort((a, b) => b.trendingScore - a.trendingScore);
}

export function getDossierBySlug(slug: string): Dossier | undefined {
    return DOSSIERS.find((d) => d.slug === slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// PROOF: empirically-found clusters (from analyzing the 210 real subject names)
// ─────────────────────────────────────────────────────────────────────────────

export interface ProofCluster {
    name: string;
    type: string;
    subjects: number;
    meetings: number;
    /** Was this one of the hand-picked examples in issue #291? */
    inIssue291: boolean;
}

export const PROOF_CLUSTERS: ProofCluster[] = [
    { name: "Πολιτιστικό Πολύκεντρο", type: "LOCATION / ORGANIZATION", subjects: 34, meetings: 10, inIssue291: true },
    { name: "Παιδικοί σταθμοί / νήπια", type: "TOPIC / ORGANIZATION", subjects: 15, meetings: 9, inIssue291: true },
    { name: "Διαδημοτική Επιχείρηση Άρδα", type: "ORGANIZATION", subjects: 5, meetings: 4, inIssue291: true },
    { name: "Αδέσποτα ζώα", type: "TOPIC / PROJECT", subjects: 4, meetings: 4, inIssue291: true },
    { name: "Ραδιοτηλεόραση / τοπικός σταθμός", type: "ORGANIZATION", subjects: 4, meetings: 4, inIssue291: true },
    { name: "Οινόη (κοινότητα)", type: "LOCATION", subjects: 8, meetings: 6, inIssue291: true },
];

/** Aggregate, real stats for Δήμος Ορεστιάδας. */
export const PILOT_STATS = {
    meetings: 19,
    subjects: 210,
    topics: 14,
    geocoded: 78,
    withCitations: 158,
    get citationPct(): number {
        return Math.round((this.withCitations / this.subjects) * 100);
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// How external sources scale by entity type
// ─────────────────────────────────────────────────────────────────────────────

export interface SourcingTier {
    entity: string;
    sources: string;
    level: SourcingLevel;
}

export const SOURCING_TIERS: SourcingTier[] = [
    { entity: "Οργανισμός / επιχείρηση κοινής ωφέλειας", sources: "Wikipedia + Διαύγεια + ΦΕΚ + νομοθεσία", level: "rich" },
    { entity: "Έργο / προμήθεια", sources: "Απόφαση Διαύγεια + διαγωνισμός ΚΗΜΔΗΣ", level: "moderate" },
    { entity: "Τοποθεσία / φορέας με νομικό πλαίσιο", sources: "Σχετική νομοθεσία + φορέας διαχείρισης", level: "moderate" },
    { entity: "Σχολείο / απλό τοπικό θέμα", sources: "Μόνο το εσωτερικό χρονολόγιο του συμβουλίου", level: "minimal" },
];
