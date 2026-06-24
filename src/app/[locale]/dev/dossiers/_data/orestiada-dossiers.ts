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
  /** Per-subject primary-source citations already present in the DB. */
  citationUrls: string[];
  decision?: DossierDecision;
}

export interface Dossier {
  slug: string;
  cityId: string;
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
  /** Marks the four strongest examples for featured treatments. */
  featured: boolean;
  entries: DossierEntry[];
}

export interface DossierCity {
  id: string;
  name: string;
  dossierCount: number;
  subjectCount: number;
  featuredDossierSlugs: string[];
}

/**
 * Derive a short, human source label from a citation URL's host.
 * Pure — safe to call from server or client components.
 */
export function sourceLabel(url: string): string {
  let host = url;
  try {
    host = new URL(url).hostname.replace(/^www./, "");
  } catch {
    return url;
  }
  if (host.includes("diavgeia.gov.gr")) return "Διαύγεια";
  if (host.includes("wikipedia.org")) return "Wikipedia";
  if (host.endsWith("gov.gr")) return "gov.gr";
  if (host.includes("opengov.gr")) return "OpenGov";
  if (host.includes("kede.gr")) return "ΚΕΔΕ";
  if (host.includes("ypes.gr")) return "ΥΠΕΣ";
  if (
    host.includes("lawspot") ||
    host.includes("e-nomothesia") ||
    host.includes("kodiko") ||
    host.includes("taxheaven") ||
    host.includes("nomoskopio") ||
    host.includes("dsanet")
  ) {
    return "Νομοθεσία";
  }
  if (host.includes("dikepao.gr")) return "ΔΗΚΕΠΑΟ";
  if (host.includes("orestiada.gr")) return "Δήμος Ορεστιάδας";
  return host;
}

/** Broad source-kind for chip coloring. */
export function sourceKind(
  url: string,
): "diavgeia" | "wikipedia" | "official" | "legal" | "press" {
  const label = sourceLabel(url);
  if (label === "Διαύγεια") return "diavgeia";
  if (label === "Wikipedia") return "wikipedia";
  if (label === "Νομοθεσία") return "legal";
  if (
    [
      "gov.gr",
      "OpenGov",
      "ΚΕΔΕ",
      "ΥΠΕΣ",
      "ΔΗΚΕΠΑΟ",
      "Δήμος Ορεστιάδας",
    ].includes(label)
  )
    return "official";
  return "press";
}

// ─────────────────────────────────────────────────────────────────────────────
// The dossiers (real Orestiada data)
// ─────────────────────────────────────────────────────────────────────────────

export const DOSSIERS: Dossier[] = [
  {
    slug: "politistiko-polykentro",
    cityId: "orestiada",
    name: "Πολιτιστικό Πολύκεντρο Ορεστιάδας",
    type: "LOCATION",
    typeLabel: "Τοποθεσία",
    summary:
      "Ο φάκελος συγκεντρώνει παραχωρήσεις και εκμισθώσεις του Πολιτιστικού Πολύκεντρου σε σχολεία, συλλόγους, φορείς και ιδιώτες. Η επαναλαμβανόμενη συζήτηση δείχνει πώς ένας δημοτικός χώρος λειτουργεί ως υποδομή πολιτισμού, εκπαίδευσης και δημόσιων εκδηλώσεων. (14 πραγματικά subjects σε 5 συνεδριάσεις.)",
    externalContext:
      "Το Πολιτιστικό Πολύκεντρο ανήκει στο οικοσύστημα δημοτικών πολιτιστικών χώρων της Ορεστιάδας και χρησιμοποιείται για εκδηλώσεις, ημερίδες, σχολικές δράσεις και μισθώσεις. Για τις παραχωρήσεις εμφανίζονται συχνά πηγές για το θεσμικό πλαίσιο χρήσης δημοτικών χώρων.",
    sourcingLevel: "moderate",
    trendingScore: 96,
    subscribers: 148,
    minutesDiscussed: 214,
    featured: true,
    entries: [
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpyjy0v43sirrhy2jkzae",
        subjectName: "Έγκριση παραχώρησης Πολιτιστικού Πολύκεντρου",
        summary:
          "Έγκριση παραχώρησης στο Συνεταιρισμό Ρεζίων για χρήση των εκδηλώσεων του Πολιτιστικού Πολύκεντρου πραγματοποίηση ημερίδας με θέμα «Βρες το επαγγελματικό μονοπάτι που σου ταιριάζει».",
        citationUrls: [],
      },
      {
        date: "2025-12-05",
        meetingId: "dec5_2025",
        meetingName: "Δημοτικό Συμβούλιο 05/12/25",
        subjectId: "cmix7pltj02no7i2opzpziyi2",
        subjectName: "Εκμίσθωση αίθουσας Πολιτιστικού Πολύκεντρου",
        summary:
          "Εξέταση αιτήματος για την απευθείας εκμίσθωση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στον κ. Μεχλιζόγλου Θεόδωρο του Κωνσταντίνου. Η εκδήλωση έχει ζητηθεί για την ημερομηνία 7.12.2025.",
        citationUrls: [],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i4q0101b8q812fdh2ud",
        subjectName: "Εκμίσθωση Πολύκεντρου για θέατρο σκιών",
        summary:
          "Απευθείας εκμίσθωση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στην επιχείρηση «Υπηρεσίες Θεάματος Θεάτρου Σκιών» για δύο παραστάσεις στις 7 Φεβρουαρίου 2026. Ο Αστεριάδης εισηγήθηκε μίσθωμα 250 ευρώ πλέον ψηφιακού τέλους 3,6%.",
        citationUrls: [
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i5l010yb8q8ti9xgj0j",
        subjectName: "Εκμίσθωση Πολύκεντρου για παράσταση Μιχαηλίδου",
        summary:
          "Απευθείας εκμίσθωση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στην ατομική επιχείρηση Μιχαηλίδου Αναστασίας για μία παράσταση θεάτρου σκιών στις 28 Φεβρουαρίου 2026. Ο Αστεριάδης εισηγήθηκε μίσθωμα 150 ευρώ.",
        citationUrls: [
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://koinsep.org/%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-4555-2018-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%81%CE%AE%CF%83%CE%B7%CF%82-%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CF%8E%CE%BD-%CE%BA%CE%B1/",
          "https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i7p012tb8q8vpave866",
        subjectName: "Παραχώρηση Πολύκεντρου για εκδήλωση Kids Wallet",
        summary:
          "Δωρεάν παραχώρηση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στο Υπουργείο Ψηφιακής Διακυβέρνησης σε συνδιοργάνωση με τις Διευθύνσεις Εκπαίδευσης Έβρου, για εκδήλωση «Kids Wallet: Γονικός έλεγχος, η ασφάλεια που αξίζουν τα παιδιά μας» στις 29 Ιανουαρίου στις 17:30.",
        citationUrls: [
          "https://daily.nb.org/nomothesia-nomologia/nomothesia/eidiki-ilektroniki-efarmogi-kidswallet/",
          "https://oikogeneia.gov.gr/programs/efarmogi-gia-kinites-syskeves-kidswallet/",
          "https://www.gov.gr/ipiresies/polites-kai-kathemerinoteta/stoikheia-polite-kai-tautopoietika-eggrapha/KidsWallet",
          "https://www.gnomionline.gr/kids-wallet-gonikos-elegchos-prostasia-anilikon-sto-diadiktyo/",
          "https://www.alexpolisonline.com/2026/02/kids-wallet.html",
          "https://www.flash.gr/kidswallet-psifiako-freno-se-tsigara-alkool-kai-mpar-gia-anilikoys-ti-provlepei-to-neo-fek-1046306",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i8g0139b8q8ieu1pl71",
        subjectName: "Παραχώρηση Πολύκεντρου για διαγωνισμό ρομποτικής",
        summary:
          "Δωρεάν παραχώρηση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στον Σύλλογο Εκπαιδευτικής Ρομποτικής STEM και Ψηφιακών Δεξιοτήτων Robot Galaxy για τη διεξαγωγή του παγκόσμιου διαγωνισμού ρομποτικής RoboFest.",
        citationUrls: [
          "https://www.ertnews.gr/video/robofest-festival-diagonismon-rompotikis-gia-mathites-apo-6-eos-18-eton/",
          "https://live.robofesthellas.gr/",
          "https://malevizi.gov.gr/2025/01/22/malevizi-diagonismos-ekpaideytikis-rompotikis-robofest-hellas-2025/",
          "https://www.lavreotiki.gr/deltia-typoy/robofest-hellas-2026-amp-unknown-mission-league-i-keratea-filoxenei-dyo-koryfaies-diorganoseis-ekpaideytikis-rompotikis/",
          "https://www.trikalaola.gr/i-perifereia-thessalias-diorganonei-diagonismous-kainotomias-kai-robotikis/",
          "https://stem.edu.gr/panellinios-diagonismos-2026/",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i8v013ab8q82okgetpu",
        subjectName:
          "Παραχώρηση Πολύκεντρου για Γενική Συνέλευση Αγροτικού Συνεταιρισμού",
        summary:
          "Δωρεάν παραχώρηση αίθουσας εκδηλώσεων και φουαγιέ Πολιτιστικού Πολύκεντρου στον Αγροτικό Συνεταιρισμό Δημητριακών Ορεστιάδας «Η Ένωση» για σύγκληση γενικής συνέλευσης την Παρασκευή 23 Ιανουαρίου στις 9 το πρωί. Η Μπραϊκούδη εισηγήθηκε την παραχώρηση. Συζητήθηκε μαζί με τα θέματα 12 και 13.",
        citationUrls: [
          "https://easorest.gr/",
          "https://www.taxheaven.gr/law/4673/2020",
          "https://www.alikakou.gr/gr/el/articles/agrotikoi-synetairismoi-o-neos-nomos-46732020-fek-a-11-3-2020",
          "https://www.nomoskopio.gr/n_3463_06_185.php",
          "https://www.thrakinea.gr/archives/tag/%CE%B1%CE%B3%CF%81%CE%BF%CF%84%CE%B9%CE%BA%CE%BF%CF%83-%CF%83%CF%85%CE%BD%CE%B5%CF%84%CE%B1%CE%B9%CF%81%CE%B9%CF%83%CE%BC%CE%BF%CF%83-%CE%B4%CE%B7%CE%BC%CE%B7%CF%84%CF%81%CE%B9%CE%B1%CE%BA%CF%89%CE%BD",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85ic1016eb8q842ivjvfy",
        subjectName: "Παραχώρηση Πολύκεντρου για σεμινάρια διαιτητών",
        summary:
          "Έγκριση παραχώρησης αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στην Ένωση Ποδοσφαιρικών Σωματείων Έβρου για επιμορφωτικά σεμινάρια διαιτητών.",
        citationUrls: [
          "https://el.wikipedia.org/wiki/%CE%88%CE%BD%CF%89%CF%83%CE%B7_%CE%A0%CE%BF%CE%B4%CE%BF%CF%83%CF%86%CE%B1%CE%B9%CF%81%CE%B9%CE%BA%CF%8E%CE%BD_%CE%A3%CF%89%CE%BC%CE%B1%CF%84%CE%B5%CE%AF%CF%89%CE%BD_%CE%88%CE%B2%CF%81%CE%BF%CF%85",
          "https://eps-evrou.gr/scholi-diaitisias-podosfairou/",
          "https://www.politica.gr/athlitika/epo-proti-fora-poso-rekor-gia-ta-seminaria-ton-diaititon/",
          "https://www.gentikoule.gr/podosfairo/385291-tzortzoglou-se-g-panagopoulo-den-echete-problima-me-ta-apeilitika-minumata-pou-mou-stelnate",
          "https://www.myota.gr/2026/01/18/%CE%B4%CE%B9%CE%B5%CF%85%CE%BA%CF%81%CE%B9%CE%BD%CE%B9%CF%83%CF%84%CE%B9%CE%BA%CE%AE-%CE%B5%CE%B3%CE%BA%CF%8D%CE%BA%CE%BB%CE%B9%CE%BF%CF%82-%CE%B3%CE%B9%CE%B1-%CF%84%CE%B7%CE%BD-%CF%80%CE%B1%CF%81/",
          "https://www.dimotikiagoratislakonias.gr/dimoi/60280-paraxorisi-dimotikon-athlitikon-xoron-se-somateia",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6jh0dkb8oeeuamzjd3f",
        subjectName: "Παραχώρηση Πολύκεντρου για Αφιέρωμα Κατσαγώνη",
        summary:
          "Έγκριση παραχώρησης αίθουσας Πολιτιστικού Πολυκέντρου στον Σύλλογο Απογόνων Καραγατσιανών Αδριανοπολιτών «Η Ορεστιάδα» για πολιτιστική εκδήλωση αφιέρωμα στην ποιήτρια Βίκυ Κατσαγώνη. Συζητήθηκε μαζί με τα θέματα 13-15 και εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://sitalkisking.blogspot.com/2013/12/blog-post_3.html",
          "https://www.paratiritis-news.gr/aparatirita/1923-2023-100-chronia-apo-tin-idrysi-tis-neas-orestiadas-2/",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6jt0dkc8oees2su7zug",
        subjectName: "Παραχώρηση Πολύκεντρου για Ημερίδα ΕΕΠΦ",
        summary:
          "Έγκριση παραχώρησης αίθουσας Πολιτιστικού Πολυκέντρου στην Ελληνική Εταιρεία Προστασίας της Φύσης για ημερίδα σχετικά με γεωργικές πρακτικές και διατήρηση του Κιρκινεζιού (έργο LIFE for Lesser Kestrel). Η κα.",
        citationUrls: [
          "https://www.ecoschools.gr/about/eepf",
          "http://www.lifethemis.eu/el/program/partners/Hellenic-Society-for-the-Protection-of-Nature",
          "https://eepf.gr/%CE%BD%CE%AD%CE%BF-%CE%B5%CF%85%CF%81%CF%89%CF%80%CE%B1%CF%8A%CE%BA%CF%8C-%CE%AD%CF%81%CE%B3%CE%BF-life-%CF%84%CE%B7%CF%82-%CE%B5%CE%B5%CF%80%CF%86-%CE%B3%CE%B9%CE%B1-%CF%84%CE%BF-%CE%BA%CE%B9%CF%81/",
          "https://lesserkestrellife.greenbalkans.org/en/",
          "https://eepf.gr/%CF%84%CE%B5%CF%87%CE%BD%CE%B7%CF%84%CE%AD%CF%82-%CF%86%CF%89%CE%BB%CE%B9%CE%AD%CF%82-%CE%B3%CE%B9%CE%B1-%CF%84%CE%BF-%CE%BA%CE%B9%CF%81%CE%BA%CE%B9%CE%BD%CE%AD%CE%B6%CE%B9-%CF%83%CF%84%CE%B7%CE%BD/",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6lf0dkd8oeej46h42os",
        subjectName: "Παραχώρηση Πολύκεντρου για Παρουσίαση Βιβλίου",
        summary:
          "Έγκριση παραχώρησης αίθουσας Πολιτιστικού Πολυκέντρου στον Σύλλογο «ΟΙ ΘΡΑΚΕΣ» για παρουσίαση του βιβλίου του Κώστα Δούλια «Επαγγέλματα του περασμένου αιώνα στο Σουφλί». Συζητήθηκε μαζί με τα θέματα 12, 13, 15 και εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
          "https://orestiada.gr/dimos/politismos/politistikoi-syllogoi/",
          "https://bourouliti.gr/product/%CE%B5%CF%80%CE%B1%CE%B3%CE%B3%CE%AD%CE%BB%CE%BC%CE%B1%CF%84%CE%B1-%CF%84%CE%BF%CF%85-%CF%80%CE%B5%CF%81%CE%B1%CF%83%CE%BC%CE%AD%CE%BD%CE%BF%CF%85-%CE%B1%CE%B9%CF%8E%CE%BD%CE%B1-%CF%83%CF%84%CE%BF/",
          "https://epiloges.tv/lexeis-pou-xathikan-epaggelmata-pou-ezisan-mesa-apo-to-vivlio-me-122-epaggelmata-tou-perasmenou-aiona-sto-soufli/",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txca416ymz3nx0c2dmkdc",
        subjectName: "Εκμίσθωση αίθουσας Πολιτιστικού Πολύκεντρου",
        summary:
          "Θα εξεταστεί αίτημα (αρ. πρωτ. 8567/29.04.2026) για την απευθείας εκμίσθωση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου του Δήμου Ορεστιάδας στην κ. ΓΚΡΟΖΟΥ ΘΕΟΠΟΥΛΑ.",
        citationUrls: [
          "https://www.opengov.gr/ypes/?p=5770",
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txcdw16yuz3nxqpa6xryb",
        subjectName: "Παραχώρηση Πολύκεντρου για εκλογές ΔΟΕ",
        summary:
          "Παραχώρηση του προθαλάμου της αίθουσας εκδηλώσεων (φουαγιέ) του Πολιτιστικού Πολύκεντρου στον Σύλλογο Εκπαιδευτικών Πρωτοβάθμιας Εκπαίδευσης Ορεστιάδας για τη διεξαγωγή εκλογών ανάδειξης αντιπροσώπων στην 95η Γενική Συνέλευση της Διδασκαλικής Ομοσπονδίας Ελλάδας την Πέμπτη 4 Ιουνίου 2026, ώρα 11:…",
        citationUrls: [],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txcgx16z2z3nxdc1uulke",
        subjectName: "Ημερίδα Γκαγκαβούζηδων στο Πολύκεντρο",
        summary:
          "Παραχώρηση της αίθουσας υποδοχής (φουαγιέ) και της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στην Ένωση Συλλόγων Παράδοσης και Δημιουργίας «Οι Γκαγκαβούζηδες» για ημερίδα με θέμα «Λαϊκά δρώμενα των Γκαγκαβούζων» στις 11/09/2026 και ώρα 19:00. Εγκρίθηκε ομόφωνα. Ο [κ.",
        citationUrls: [
          "https://el.wikipedia.org/wiki/%CE%93%CE%BA%CE%B1%CE%B3%CE%BA%CE%B1%CE%B2%CE%BF%CF%8D%CE%B6%CE%B9%CE%BA%CE%B7_%CE%B3%CE%BB%CF%8E%CF%83%CF%83%CE%B1",
          "https://diafaneia.eu/%CE%B5%CE%AF%CE%BC%CE%B1%CF%83%CF%84%CE%B5-%CE%AD%CE%BB%CE%BB%CE%B7%CE%BD%CE%B5%CF%82-%CE%B1%CE%BA%CE%BF%CF%8D%CE%B5%CE%B9-%CE%BA%CE%B1%CE%BD%CE%B5%CE%AF%CF%82-%CF%85%CF%80%CE%BF%CE%B3%CF%81%CE%B1/",
          "https://folkdancefootnotes.org/culture/ethnicity-history-geography/gagauz-moldova-greece-bulgaria-ukraine/",
          "https://socalfolkdance.org/articles/greek_thrace_graziosi.htm",
          "https://www.evripidis.gr/product/115286/emeis-oi-gkagkaboyzides-/",
          "https://www.ejecs.org/index.php/JECS/article/download/1316/478/5220",
          "https://sitalkisking.blogspot.com/2010/03/blog-post_20.html",
        ],
      },
    ],
  },
  {
    slug: "dimotiko-theatro",
    cityId: "orestiada",
    name: "Δημοτικό/Υπαίθριο Θέατρο",
    type: "LOCATION",
    typeLabel: "Τοποθεσία",
    summary:
      "Οι σχετικές καταχωρήσεις παρακολουθούν τη χρήση θεατρικών χώρων για παραστάσεις, φεστιβάλ και εκμισθώσεις. Ο φάκελος δείχνει πότε οι πολιτιστικοί χώροι εμφανίζονται ως διοικητικό θέμα στο συμβούλιο. (7 πραγματικά subjects σε 4 συνεδριάσεις.)",
    externalContext:
      "Για τον συγκεκριμένο φάκελο η τεκμηρίωση στηρίζεται κυρίως στο εσωτερικό χρονολόγιο του συμβουλίου και στις πηγές κάθε subject.",
    sourcingLevel: "minimal",
    trendingScore: 63,
    subscribers: 42,
    minutesDiscussed: 81,
    featured: false,
    entries: [
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i4q0101b8q812fdh2ud",
        subjectName: "Εκμίσθωση Πολύκεντρου για θέατρο σκιών",
        summary:
          "Απευθείας εκμίσθωση αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στην επιχείρηση «Υπηρεσίες Θεάματος Θεάτρου Σκιών» για δύο παραστάσεις στις 7 Φεβρουαρίου 2026. Ο Αστεριάδης εισηγήθηκε [μίσθωμα 250 ευρώ πλέον ψηφιακού τέλους 3,6%.",
        citationUrls: [
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
        ],
      },
      {
        date: "2026-02-11",
        meetingId: "feb11_2026",
        meetingName: "Δημοτικό Συμβούλιο 11/02/26",
        subjectId: "cmljgfy6603utwvnfaouugtmg",
        subjectName: "Εκμίσθωση Θεάτρου για «ΘΕΑΜΑ ΜΑΡΤΑ»",
        summary:
          "Εκμίσθωση του υπαίθριου Δημοτικού Θεάτρου Ορεστιάδας στην εταιρεία Μάρκος Ταγάρης και ΣΙΑ ΕΕ για θεατρική παράσταση στις 10 Ιουλίου 2026, με μίσθωμα 250 ευρώ. Τα θέματα 10, 11 και 12 συζητήθηκαν μαζί.",
        citationUrls: [
          "https://koinsep.org/%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-4555-2018-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%81%CE%AE%CF%83%CE%B7%CF%82-%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CF%8E%CE%BD-%CE%BA%CE%B1/",
          "https://www.dionysos-net.gr/category/%CF%86%CE%B5%CF%83%CF%84%CE%B9%CE%B2%CE%AC%CE%BB/",
          "https://www.ertnews.gr/perifereiakoi-stathmoi/orestiada/i-ert-orestiadas-giortazei-melodika-ta-60-tis-xronia-me-ti-xorodia-kai-enniameles-mousiko-synolo-tis-ert/",
          "https://www.myota.gr/2023/01/18/%CF%80%CE%BF%CE%B9%CE%B5%CF%82-%CE%B1%CF%81%CE%BC%CE%BF%CE%B4%CE%B9%CF%8C%CF%84%CE%B7%CF%84%CE%B5%CF%82-%CE%B5%CF%80%CE%B1%CE%BD%CE%AD%CF%81%CF%87%CE%BF%CE%BD%CF%84%CE%B1%CE%B9-%CF%83%CF%84%CE%BF/",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%9A%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CE%BF%CF%85_%CE%A7%CF%8E%CF%81%CE%BF%CF%85_%CE%B3%CE%B9%CE%B1_%CE%95%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CE%B9%CF%82_%CE%A8%CF%85%CF%87%CE%B1%CE%B3%CF%89%CE%B3%CE%B9%CE%BA%CE%BF%CF%8D_%CE%A0%CE%B5%CF%81%CE%B9%CE%B5%CF%87%CE%BF%CE%BC%CE%AD%CE%BD%CE%BF%CF%85_%CE%BC%CE%B5_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1",
        ],
      },
      {
        date: "2026-02-11",
        meetingId: "feb11_2026",
        meetingName: "Δημοτικό Συμβούλιο 11/02/26",
        subjectId: "cmljgfy7b03vhwvnfra7jd53r",
        subjectName: "Εκμίσθωση για Θέατρο Σκιών",
        summary:
          "Εκμίσθωση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στην επιχείρηση Τέχνη και Ζωή ΕΕ για δύο παραστάσεις θεάτρου σκιών στις 27 Μαρτίου 2026, με μίσθωμα 250 ευρώ. Συζητήθηκε μαζί με τα θέματα 10 και 12. Εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://el.wikipedia.org/wiki/%CE%9A%CE%B1%CF%81%CE%B1%CE%B3%CE%BA%CE%B9%CF%8C%CE%B6%CE%B7%CF%82",
          "https://www.ert.gr/ert-arxeio/proforiki-paradosi-kai-omadiki-dimioyrgia-sto-theatro-skion/",
          "https://www.karagkiozis.com.gr/",
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://koinsep.org/%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-4555-2018-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%81%CE%AE%CF%83%CE%B7%CF%82-%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CF%8E%CE%BD-%CE%BA%CE%B1/",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6lr0dke8oee4dtxz2lu",
        subjectName: "Παραχώρηση Υπαιθρίου Θεάτρου για Φεστιβάλ",
        summary:
          "Έγκριση παραχώρησης Υπαίθριου Δημοτικού Θεάτρου στο Θεατρικό Εργαστήριο «Διόνυσος» για το 27ο Πανελλήνιο Φεστιβάλ Ερασιτεχνικού Θεάτρου (29 Αυγούστου - 5 Σεπτεμβρίου). Συζητήθηκε μαζί με τα θέματα 12-14 και εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "http://patounik-dionysos.blogspot.com/",
          "https://www.maroneiasapes.gov.gr/wp-content/uploads/2023/05/%CE%A0%CE%91%CE%9D%CE%95%CE%9B%CE%9B%CE%97%CE%9D%CE%99%CE%9F-%CE%A6%CE%95%CE%A3%CE%A4%CE%99%CE%92%CE%91%CE%9B-%CE%95%CE%A1%CE%91%CE%A3%CE%99%CE%A4%CE%95%CE%A7%CE%9D%CE%99%CE%9A%CE%9F%CE%A5-%CE%98%CE%95%CE%91%CE%A4%CE%A1%CE%9F%CE%A5-%CE%9D.-%CE%9F%CE%A1%CE%95%CE%A3%CE%A4%CE%99%CE%91%CE%94%CE%91%CE%A3.pdf",
          "https://www.dionysos-net.gr/",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CF%81%CF%8C%CF%83%CE%BA%CE%B1%CE%B9%CF%81%CE%B7_%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BA%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CF%89%CE%BD_%CF%87%CF%8E%CF%81%CF%89%CE%BD_%CF%87%CF%89%CF%81%CE%AF%CF%82_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CE%B3%CE%B9%CE%B1_%CE%B4%CE%B9%CE%B5%CE%BE%CE%B1%CE%B3%CF%89%CE%B3%CE%AE_%CE%B5%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CF%89%CE%BD",
          "https://www.enpolis.gr/en/2026/01/08/apo-12-eos-21-martiou-2026-tha-pragmatopoiithei-to-41o-panellinio-festival-erasitechnikou-theatrou-karditsas/",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txc9b16ykz3nx9g7yss38",
        subjectName: "Εκμίσθωση θεάτρου για θεατρική παράσταση",
        summary:
          "Θα εξεταστεί αίτημα (αρ. πρωτ. 8572/29.04.2026) για την απευθείας εκμίσθωση του υπαίθρου δημοτικού θεάτρου Ορεστιάδας από την εταιρεία Β. STAGE ΒΑΣΙΛΕΙΟΣ ΘΩΜΟΠΟΥΛΟΣ & ΣΙΑ Ε.Ε. για θεατρική παράσταση με τίτλο «Ο Επιθεωρητής Ντρέικ και η Μαύρη Χήρα» στις 7 Ιουλίου 2026.",
        citationUrls: [
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%91%CF%80%CE%B5%CF%85%CE%B8%CE%B5%CE%AF%CE%B1%CF%82_%CE%95%CE%BA%CE%BC%CE%AF%CF%83%CE%B8%CF%89%CF%83%CE%B7_%CE%91%CE%BA%CE%B9%CE%BD%CE%AE%CF%84%CE%BF%CF%85_%CE%94%CE%AE%CE%BC%CE%BF%CF%85",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/ypaithrio-dimotiko-theatro",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txc9p16ylz3nxvjoqri21",
        subjectName: "Εκμίσθωση θεάτρου για stand up comedy",
        summary:
          "Θα εξεταστεί αίτημα (αρ. πρωτ. 5577/17.03.2026) για την απευθείας εκμίσθωση του υπαίθρου δημοτικού θεάτρου Ορεστιάδας από τον κ. ΑΔΑΜΑΚΟ ΘΕΟΔΩΡΟ, για stand up comedy παράσταση με την Κατερίνα Βρανά στις 3 Ιουλίου 2026.",
        citationUrls: [
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/ypaithrio-dimotiko-theatro",
          "https://www.elinyae.gr/ethniki-nomothesia/n-42292014-fek-8a-1012014",
          "https://www.lifo.gr/podcasts/wraia-pragmata/h-skliri-alitheia-gia-tin-katerina-brana",
          "https://www.onlarissa.gr/2026/02/11/katerina-vrana-poia-einai-i-gynaika-pou-espase-ta-tampou-tis-anapirias-me-oplo-tis-to-stand-up-comedy/",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txcdh16ytz3nxlea0yolf",
        subjectName: "Εκμίσθωση θεάτρου για παιδική παράσταση",
        summary:
          "Απευθείας εκμίσθωση του υπαίθρου Δημοτικού Θεάτρου Ορεστιάδας στον Πευκώνα από το Θέατρο Τεχνόραμα για παιδική παράσταση «Ο Μάγος του Οζ» τη Δευτέρα 29 Ιουνίου 2026 και ώρα 21:00, με μίσθωμα 250 ευρώ. Εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://www.satirikotheatro.com/omagostouoz",
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/ypaithrio-dimotiko-theatro",
        ],
      },
    ],
  },
  {
    slug: "paidikoi-stathmoi",
    cityId: "orestiada",
    name: "Παιδικοί Σταθμοί & ΚΔΑΠ",
    type: "TOPIC",
    typeLabel: "Θέμα",
    summary:
      "Ο φάκελος ενώνει αποφάσεις για εγγραφές, διαγραφές, κενές θέσεις, λειτουργία παιδικών σταθμών και ΚΔΑΠ. Η εικόνα που προκύπτει είναι μια συνεχής διοικητική ροή γύρω από τη φροντίδα παιδιών και τις διαθέσιμες δομές. (18 πραγματικά subjects σε 10 συνεδριάσεις.)",
    externalContext:
      "Η εξωτερική τεκμηρίωση είναι περιορισμένη, επειδή τα περισσότερα θέματα είναι τοπικές διοικητικές πράξεις. Οι ανά subject πηγές παραμένουν ο βασικός έλεγχος.",
    sourcingLevel: "minimal",
    trendingScore: 91,
    subscribers: 131,
    minutesDiscussed: 196,
    featured: true,
    entries: [
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpyjm0v41sirrv31oy0ur",
        subjectName: "Διαγραφές νηπίων Παιδικούς Σταθμούς",
        summary:
          "Διαγραφές νηπίων στους Παιδικούς Σταθμούς Δήμου Ορεστιάδας για το σχολικό έτος 2024-2025. Το θέμα αφορά τη διαχείριση των εγγραφών στους παιδικούς σταθμούς του δήμου.",
        citationUrls: [],
      },
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpykm0v47sirrthm6nvpn",
        subjectName: "Έγκριση κάλυψης κενών θέσεων ΚΔΑΠ",
        summary:
          "Έγκριση κάλυψης κενών θέσεων της δομής ΚΔΑΠ Οινόης για το Σχολικό Έτος 2025 – 2026. Αφορά την κάλυψη κενών θέσεων στο Κέντρο Δημιουργικής Απασχόλησης Παιδιών.",
        citationUrls: [],
      },
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpys40vcisirrsp1jicny",
        subjectName: "Κάλυψη κενών θέσεων ΚΔΑΠ Οινόης",
        summary:
          "Έγκριση κάλυψης κενών θέσεων της δομής ΚΔΑΠ Οινόης για το σχολικό έτος 2025-2026. Αφορά την κάλυψη 26 θέσεων από παιδιά που δεν έχουν βάουτσερ αλλά έχουν ολοκληρωμένους φακέλους.",
        citationUrls: [],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80rsg00d6ypx4ij2g27xi",
        subjectName: "Παραχώρηση αίθουσας σε νηπιαγωγείο για παράσταση",
        summary:
          "Έγκριση δωρεάν παραχώρησης αίθουσας εκδηλώσεων Πολιτιστικού Πολύκεντρου στο 7ο Νηπιαγωγείο Ορεστιάδας για χριστουγεννιάτικη θεατρική παράσταση «Άλλος για το έλκηθρο». Η Μπραϊκούδη παρουσίασε το αίτημα για χρήση στις 18 Δεκεμβρίου, ώρες 17:30-20:30.",
        citationUrls: [
          "http://2dim-korinth.kor.sch.gr/old/images/pps%20-pdf/parahor_sxol_horon.pdf",
          "https://www.fa3.gr/nomothesia_2/nomoth_education/58-Paraxorisi-Xrisi-Sxol-Xoron-Aithouses-poll-xriseon.htm",
          "https://www.aeginaportal.gr/aftodioikisi/epitropes/34791-i-sepeda-gia-tin-paraxorisi-aithouson-kai-ayleion-xoron-ton-sxolikon-monadon-tis-aiginas-oi-oroi-kai-oi-proypotheseis-pou-apofasise-i-epitropi.html",
          "https://www.infokids.gr/14-theatrikes-omades-poy-anevaz/",
        ],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025_2",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 11/12/25",
        subjectId: "cmlh6w85s002yb8q8ehmt4rwv",
        subjectName: "Λειτουργία Παιδικού Σταθμού για τα χωριά του Τριγώνου",
        summary:
          "Ερώτημα για την επαναλειτουργία παιδικού σταθμού στα Δίκαια, που θα εξυπηρετεί τα απομακρυσμένα χωριά του Τριγώνου. Ο Βασιλειάδης Στράτος, Πρόεδρος Κοινότητας Ορμενίου, τόνισε ότι υπάρχει επιτακτική ανάγκη λόγω δημογραφικής κατάρρευσης και ζήτησε ενημέρω…",
        citationUrls: [
          "https://www.e-nomothesia.gr/autodioikese-demoi/proedriko-diatagma-99-2017-fek-141a-28-9-2017.html",
          "https://www.ieidiseis.gr/ellada/575634/vrefonipiakoi-stathmoi-paratasi-enos-etoys-gia-na-symmorfothoyn-pliros-stis-prodiagrafes-adeiodotisis/",
          "https://orthodoxostypos.gr/%CE%B1%CE%BD%CE%B1%CE%BB%CF%8D%CF%83%CE%B5%CE%B9%CF%82h-%CE%B4%CE%B7%CE%BC%CE%BF%CE%B3%CF%81%CE%B1%CF%86%CE%B9%CE%BA%CE%AE-%CE%BA%CE%B1%CF%84%CE%AC%CF%81%CF%81%CE%B5%CF%85%CF%83%CE%B7-%CF%83%CF%84/",
          "https://www.voria.gr/article/erimonoyn-ta-akritika-horia-toy-ebroy-pro-ton-pylon-i-dimografiki-katarreysi",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i69011mb8q8sj6pwuys",
        subjectName: "Εγγραφές νηπίων στους Παιδικούς Σταθμούς",
        summary:
          "Έγκριση 13 αιτήσεων εγγραφής νηπίων στους 6 δημοτικούς παιδικούς σταθμούς για το σχολικό έτος 2025-2026 (8 με voucher, 5 κανονικές). Η Γκιλιλούδη εισηγήθηκε διορθώνοντας τυπικό λάθος στην εισήγηση που ανέφερε 12 αντί 13 αιτήσεις.",
        citationUrls: [
          "https://www.galatsi.gov.gr/to-savvato-10-maiou-2025-xekinoun-oi-ilektronikes-engrafes-kai-epanengrafes-gia-tous-paidikous-vrefonipiakous-stathmous-dimou-galatsiou/",
          "https://pavlosmelas.gr/eggrafes_paidikoistathmoi/",
          "https://kekappa.gr/ori-ke-proypothesis-engrafis-stous-pedikous-stathmous/",
          "https://www.eetaa.gr/programma-proscholikis-agogis-kai-dimiourgikis-apascholisis-paidion-2025-2026/",
          "https://www.powergame.gr/ellada/1076939/paidikoi-stathmoi-espa-2025-2026-anakoinothikan-oi-oristikoi-dikaiouchoi-ti-ischyei-me-ta-voucher/",
          "https://www.powergame.gr/ellada/1212733/paidikoi-stathmoi-2025-2026-poioi-pairnoun-6-083-nea-voucher/",
          "https://www.powergame.gr/ellada/1027762/paidikoi-stathmoi-espa-2025-2026-poioi-kovontai-apo-to-voucher/",
          "https://www.kkpaado.gr/%CE%A0%CE%91%CE%99%CE%94%CE%99%CE%9A%CE%9F%CE%99-%CE%A3%CE%A4%CE%91%CE%98%CE%9C%CE%9F%CE%99",
        ],
      },
      {
        date: "2026-02-11",
        meetingId: "feb11_2026",
        meetingName: "Δημοτικό Συμβούλιο 11/02/26",
        subjectId: "cmljgfyb903wxwvnf1r1huw7a",
        subjectName: "Εγγραφές Παιδικών Σταθμών 2025-2026",
        summary:
          "Εγγραφές και διαγραφές νηπίων στους 6 δημοτικούς παιδικούς σταθμούς του Δήμου Ορεστιάδας για το σχολικό έτος 2025-2026. Η Γκιλιλούδη εισηγήθηκε 2 νέες εγγραφές (ωφελούμενα voucher) και 4 διαγραφές λόγω καθυστερημένης κοινοποίησης στα έσοδα, χωρίς οικονομ…",
        citationUrls: [
          "https://www.galatsi.gov.gr/to-savvato-10-maiou-2025-xekinoun-oi-ilektronikes-engrafes-kai-epanengrafes-gia-tous-paidikous-vrefonipiakous-stathmous-dimou-galatsiou/",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://kalamata.gr/el/enimerosi/news/27904-stis-10-maiou-2025-ksekinoyn-oi-eggrafes-se-dimotikoys-paidikoys-kai-vrefonipiakoys-stathmoys-gia-to-sxoliko-etos-2025-2026",
          "https://thermi.gov.gr/diefthynsi-proscholikis-agogis/engrafes-epanengrafes-paidion-morio/",
          "https://www.insider.gr/eidiseis/374733/paidikoi-stathmoi-espa-2025-2026-bgike-i-kya-xekinoyn-oi-aitiseis-gia-ta-vouchers",
          "https://www.newsit.gr/oikonomia/xristika/paidikoi-stathmoi-espa-2025-2026-deyteros-gyros-aitiseon-gia-voucher-ton-oktovrio/4478990/",
          "https://menoumealimo.gr/dimotikoi-paidikoi-stathmoi-alimou-2025-engrafes-dikaiologitika/",
        ],
      },
      {
        date: "2026-02-27",
        meetingId: "feb27_2026",
        meetingName: "Δημοτικό Συμβούλιο 27/02/26",
        subjectId: "cmm6lwkq305pn94xjva28an50",
        subjectName: "Παιδικός σταθμός στα Δίκαια",
        summary:
          "Ερώτημα της Κυρμάνη για την πορεία ίδρυσης και λειτουργίας παιδικού σταθμού στα Δίκαια, μετά από δημόσια δέσμευση μέλους της Δημοτικής Αρχής ότι τον Σεπτέμβριο θα λειτουργήσει κανονικά.",
        citationUrls: [
          "https://www.e-nomothesia.gr/autodioikese-demoi/proedriko-diatagma-99-2017-fek-141a-28-9-2017.html",
          "https://www.odigostoupoliti.eu/adeia-idrysis-kai-leitourgias-dimotikon-paidikon-kai-vrefonipiakon-stathmon/",
          "https://www.opengov.gr/ypes/?p=9277",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.haniotika-nea.gr/kanenas-paidikos-stathmos-sto-trigono-evroy-sto-spiti-ta-paidia/",
          "https://www.kkpaado.gr/%CE%A0%CE%91%CE%99%CE%94%CE%99%CE%9A%CE%9F%CE%99-%CE%A3%CE%A4%CE%91%CE%98%CE%9C%CE%9F%CE%99",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6db0dk18oee5o0mk0jc",
        subjectName: "Ίδρυση Παιδικού Σταθμού στα Δίκαια",
        summary:
          "Έγκριση ίδρυσης Παιδικού Σταθμού στην Κοινότητα Δικαίων (Ενότητα Τριγώνου), με χρηματοδότηση 250.000 ευρώ που καλύπτει και τη μεταστέγαση του Παιδικού Σταθμού Κυπρίνου. Η κα.",
        citationUrls: [
          "https://www.opengov.gr/ypes/?p=9277",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.espa.gr/el/Pages/NewsFS.aspx?item=1941",
          "https://www.haniotika-nea.gr/kanenas-paidikos-stathmos-sto-trigono-evroy-sto-spiti-ta-paidia/",
          "https://epiloges.tv/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6dm0dk28oeenng2eu4m",
        subjectName: "Μετατροπή Β' Παιδικού Σταθμού σε Βρεφονηπιακό",
        summary:
          "Έγκριση δημιουργίας βρεφικού τμήματος 12 θέσεων (6 μηνών - 2,5 ετών) στον Β' Παιδικό Σταθμό, ο οποίος λειτουργεί κάτω από τη δυναμική του (30-35 παιδιά αντί 55). Η κα.",
        citationUrls: [
          "https://www.elinyae.gr/ethniki-nomothesia/ya-d22oik-118282932017-fek-1157b-442017",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.ot.gr/2025/10/03/epikairothta/koinonia/elstat-nea-meiosi-42-stis-genniseis-to-2024/",
          "https://www.parapolitika.gr/ellada/article/1655072/dimografiko-sokaroun-ta-stoiheia-tis-elstat-gia-to-2024-diplasioi-oi-thanatoi-apo-tis-genniseis",
          "https://www.powergame.gr/ellada/1281595/paidikoi-stathmoi-espa-2026-2027-pote-anamenetai-na-anoixei-i-platforma/",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6m20dkf8oeecd2jp3lp",
        subjectName: "Παραχώρηση Χώρου Πευκώνα σε Νηπιαγωγείο",
        summary:
          "Έγκριση παραχώρησης χώρου στον Πευκώνα Ορεστιάδας στο 6ο Νηπιαγωγείο (Ευγενίδειο) για δύο ώρες. Ο κ. Χατζηπαναγιώτου εισηγείται σύντομα. Συζητήθηκε μαζί με το θέμα 17 και εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://www.fa3.gr/nomothesia_2/nomoth_education/58-Paraxorisi-Xrisi-Sxol-Xoron-Aithouses-poll-xriseon.htm",
          "https://www.greek-language.gr/greekLang/modern_greek/tools/lexica/search.html?lq=%CF%80%CE%B5%CF%85%CE%BA%CF%8E%CE%BD%CE%B1%CF%82",
          "https://orestiada.gr/dimos/ekpaidefsi/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o2q0a4010go5ckqqees",
        subjectName: "Ίδρυση παιδικού σταθμού Δικαίων",
        summary:
          "Ερώτημα του κ. Καζαλτζή για την ίδρυση παιδικού σταθμού στα Δίκαια. Ρωτά για το χρονοδιάγραμμα, αν βρέθηκε κτίριο σύμφωνα με το Προεδρικό Διάταγμα 99/2017, και σε ποιο στάδιο βρίσκονται οι αδειοδοτήσεις. Η κα.",
        citationUrls: [
          "https://www.e-nomothesia.gr/autodioikese-demoi/proedriko-diatagma-99-2017-fek-141a-28-9-2017.html",
          "https://kede.gr/egkyklios-ypes-gia-tin-adeiodotisi-ton-dimotikon-paidikon-kai-vrefonipiakon-stathmon/",
          "https://www.government.gov.gr/thespisi-proipotheseon-gia-tin-adiodotisi-ke-litourgia-ton-dimotikon-vrefikon-ke-pedikon-stathmon/",
          "https://kede.gr/paratasi-prosarmogis-ton-dimotikon-paidikon-stathmon-sto-pd-99-2017/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o4n0a4710gotxzvc3cl",
        subjectName: "Πορεία ίδρυσης Παιδικού Σταθμού Δίκαια",
        summary:
          "Το θέμα αφορά την πορεία ίδρυσης Παιδικού Σταθμού στα Δίκαια. Η κα. Κυρμάνη απέσυρε το ερώτημα δηλώνοντας ότι θα το ξαναφέρει στην επόμενη λογοδοσία.",
        citationUrls: [
          "https://www.opengov.gr/ypes/?p=9277",
          "https://www.kkpaado.gr/%CE%A0%CE%91%CE%99%CE%94%CE%99%CE%9A%CE%9F%CE%99-%CE%A3%CE%A4%CE%91%CE%98%CE%9C%CE%9F%CE%99",
          "https://www.haniotika-nea.gr/kanenas-paidikos-stathmos-sto-trigono-evroy-sto-spiti-ta-paidia/",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://epiloges.tv/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.powergame.gr/ellada/1281595/paidikoi-stathmoi-espa-2026-2027-pote-anamenetai-na-anoixei-i-platforma/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o6b0a4c10gobeqsay2y",
        subjectName: "Παιδικός Σταθμός Τριγώνου",
        summary:
          "Το θέμα αφορά τον Παιδικό Σταθμό Τριγώνου. Εισηγητής είναι ο κ. Αγγελακούδης. Αποσύρθηκε μαζί με τα θέματα 14 και 16.",
        citationUrls: [
          "https://www.evros-news.gr/2025/11/24/orestiada-kanenas-paidikos-stathmos-sto-trigono-spiti-ta-paidia-synantisi-dimarchou-goneon-gia-lysi/",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.enikos.gr/society/evros-choris-paidiko-stathmo-17-akritika-choria-sto-trigono-eimaste-oi-teleftaies-oikogeneies-pou-kratame-zontana-ta-synora/2493560/",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.kkpaado.gr/%CE%A0%CE%91%CE%99%CE%94%CE%99%CE%9A%CE%9F%CE%99-%CE%A3%CE%A4%CE%91%CE%98%CE%9C%CE%9F%CE%99",
          "https://www.alexpolisonline.com/2025/12/blog-post_39.html",
        ],
      },
      {
        date: "2026-04-28",
        meetingId: "apr28_3_2026",
        meetingName: "Δημοτικό Συμβούλιο 28/04/26",
        subjectId: "cmocwqpis0343grw5buelt85e",
        subjectName: "Διαγραφή παιδιού από ΚΔΑΠ Οινόης",
        summary:
          "Εγκρίθηκε ομόφωνα η διαγραφή φιλοξενούμενου παιδιού από το ΚΔΑΠ Οινόης (πρόγραμμα ΕΣΠΑ), κατόπιν αίτησης — το παιδί μετακινήθηκε σε ιδιωτικό ΚΔΑΠ. Ο κ.",
        citationUrls: [
          "https://www.e-schooling.gr/ti-einai-ta-kdap-kentra-dimiourgikis-apasxolisis-paidiwn/",
          "https://elarisa.gr/blog/kdap/kentra-dimiourgikis-apasxolisi-ti-einai-poia-ta-ofeli/",
          "https://www.agan.gov.gr/%CE%BA%CE%B4%CE%B1%CF%80",
          "https://www.espa.gr/el/Pages/NewsFS.aspx?item=1941",
          "https://www.trikalanews.gr/kinhtopoihseis-ergazomenoi-espa-trikala-kdap-stathmoi/",
          "https://olympiobima.gr/kinitopoiiseis-stin-katerini-gia-tous-ergazomenous-se-kdap-kai-paidikous/",
        ],
        decision: {
          ada: "ΨΤΣΧΩΞΒ-5ΔΥ",
          title:
            "Έγκριση διαγραφών φιλοξενουμένων παιδιών στο Κ.Δ.Α.Π. Οινόης του Δήμου Ορεστιάδας για το σχολικό έτος 2025-2026 μέσω του προγράμματος ΕΣΠΑ «Προώθηση και υποστήριξη παιδιών για την ένταξή τους στην προσχολική εκπαίδευση καθώς και για την πρόσβαση παιδιών σχολικής ηλικίας, εφήβων και ατόμων με αναπηρία, σε υπηρεσίες δημιουργικής απασχόλησης περιόδου 2025-2026»",
          pdfUrl: "https://diavgeia.gov.gr/doc/ΨΤΣΧΩΞΒ-5ΔΥ",
        },
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txc7816yfz3nx5iwk4ogn",
        subjectName: "Εγγραφές νηπίων σε Παιδικούς Σταθμούς",
        summary:
          "Εγγραφή 17 νέων νηπίων στους Παιδικούς Σταθμούς του Δήμου Ορεστιάδας για το σχολικό έτος 2025-2026, εκ των οποίων 9 μέσω ΕΣΠΑ και 8 με τροφεία. Εγκρίθηκε ομόφωνα. Η [κα.",
        citationUrls: [
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.galatsi.gov.gr/to-savvato-10-maiou-2025-xekinoun-oi-ilektronikes-engrafes-kai-epanengrafes-gia-tous-paidikous-vrefonipiakous-stathmous-dimou-galatsiou/",
          "https://www.radioevros.gr/paidikoi-stathmoi-aitseis-kritiria/",
          "https://www.espa.gr/el/Pages/NewsFS.aspx?item=1778",
          "https://www.powergame.gr/ellada/1336416/paidikoi-stathmoi-espa-2026-2027-oi-aitiseis-oi-prothesmies-ta-prosorina-kai-oristika-apotelesmata/",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txceo16ywz3nxmpvd4pes",
        subjectName: "Τροφεία Παιδικών Σταθμών 2025-2026",
        summary:
          "Καθορισμός τροφείων στους Παιδικούς Σταθμούς του Δήμου Ορεστιάδας χωρίς αλλαγές από τα προηγούμενα έτη. Εγκρίθηκε ομόφωνα. Κλίμακα τροφείων: 45 ευρώ μηνιαίως για εισόδημα έως 15.000, 60 για έως 25.000, 70 για έως 40.000 και 90 ευρώ για άνω των 40.000.",
        citationUrls: [],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txcgi16z1z3nxydg5f8wp",
        subjectName: "Καλοκαιρινή εκδήλωση 7ου Νηπιαγωγείου",
        summary:
          "Παραχώρηση της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου στο 7ο Νηπιαγωγείο Ορεστιάδας για καλοκαιρινή εκδήλωση στις 9 Ιουνίου 2026 (18:00-20:30) και πρόβες στις 4, 5 και 8 Ιουνίου. Εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://dikepao.gr/i-epixeirisi/xoroi-ekdiloseon/politistiko-polykentro",
          "https://coolweb.gr/pote-kleinoun-ta-sxoleia/",
          "https://diavouleusi.eu/diabouleyseis/%CE%BA%CE%B1%CE%BD%CE%BF%CE%BD%CE%B9%CF%83%CE%BC%CE%BF%CF%83-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%89%CF%81%CE%B7%CF%83%CE%B7%CF%83-%CF%87%CF%81%CE%B7%CF%83%CE%B7%CF%83-%CF%84%CF%89%CE%BD-%CF%83%CF%87/",
          "https://pavlosmelas.gr/%CE%B4%CE%BF%CE%BC%CE%AD%CF%82-%CE%B4%CF%81%CE%AC%CF%83%CE%B5%CE%B9%CF%82/%CF%80%CE%B1%CE%B9%CE%B4%CE%B5%CE%AF%CE%B1/%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%87%CF%8E%CF%81%CF%89%CE%BD-%CF%83%CF%87%CE%BF%CE%BB%CE%B9%CE%BA%CF%8E%CE%BD-%CE%BC%CE%BF%CE%BD%CE%AC%CE%B4%CF%89%CE%BD/",
          "https://www.proininews.gr/allazei-o-kanonismos-parachorisis-choron-scholeion/",
        ],
      },
    ],
  },
  {
    slug: "paidikos-stathmos-dikaion",
    cityId: "orestiada",
    name: "Παιδικός Σταθμός Δικαίων",
    type: "PROJECT",
    typeLabel: "Έργο",
    summary:
      "Ο φάκελος ακολουθεί την πορεία ίδρυσης παιδικού σταθμού στα Δίκαια, από ερωτήσεις για την ανάγκη της δομής μέχρι αποφάσεις και ενημερώσεις για τα επόμενα βήματα. Είναι παράδειγμα έργου που γίνεται κατανοητό μόνο όταν συνδεθούν διαδοχικές συνεδριάσεις. (4 πραγματικά subjects σε 3 συνεδριάσεις.)",
    externalContext:
      "Η υπόθεση συνδέεται με το πλαίσιο ίδρυσης και λειτουργίας δημοτικών δομών προσχολικής φροντίδας, ενώ το χρονολόγιο του συμβουλίου δείχνει την τοπική εξέλιξη.",
    sourcingLevel: "moderate",
    trendingScore: 84,
    subscribers: 86,
    minutesDiscussed: 105,
    featured: true,
    entries: [
      {
        date: "2026-02-27",
        meetingId: "feb27_2026",
        meetingName: "Δημοτικό Συμβούλιο 27/02/26",
        subjectId: "cmm6lwkq305pn94xjva28an50",
        subjectName: "Παιδικός σταθμός στα Δίκαια",
        summary:
          "Ερώτημα της Κυρμάνη για την πορεία ίδρυσης και λειτουργίας παιδικού σταθμού στα Δίκαια, μετά από δημόσια δέσμευση μέλους της Δημοτικής Αρχής ότι [τον Σεπτέμβριο θα λειτουργήσει κανονικά.",
        citationUrls: [
          "https://www.e-nomothesia.gr/autodioikese-demoi/proedriko-diatagma-99-2017-fek-141a-28-9-2017.html",
          "https://www.odigostoupoliti.eu/adeia-idrysis-kai-leitourgias-dimotikon-paidikon-kai-vrefonipiakon-stathmon/",
          "https://www.opengov.gr/ypes/?p=9277",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.haniotika-nea.gr/kanenas-paidikos-stathmos-sto-trigono-evroy-sto-spiti-ta-paidia/",
          "https://www.kkpaado.gr/%CE%A0%CE%91%CE%99%CE%94%CE%99%CE%9A%CE%9F%CE%99-%CE%A3%CE%A4%CE%91%CE%98%CE%9C%CE%9F%CE%99",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6db0dk18oee5o0mk0jc",
        subjectName: "Ίδρυση Παιδικού Σταθμού στα Δίκαια",
        summary:
          "Έγκριση ίδρυσης Παιδικού Σταθμού στην Κοινότητα Δικαίων (Ενότητα Τριγώνου), με χρηματοδότηση 250.000 ευρώ που καλύπτει και τη μεταστέγαση του Παιδικού Σταθμού Κυπρίνου. Η κα.",
        citationUrls: [
          "https://www.opengov.gr/ypes/?p=9277",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.espa.gr/el/Pages/NewsFS.aspx?item=1941",
          "https://www.haniotika-nea.gr/kanenas-paidikos-stathmos-sto-trigono-evroy-sto-spiti-ta-paidia/",
          "https://epiloges.tv/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o2q0a4010go5ckqqees",
        subjectName: "Ίδρυση παιδικού σταθμού Δικαίων",
        summary:
          "Ερώτημα του κ. Καζαλτζή για την ίδρυση παιδικού σταθμού στα Δίκαια. Ρωτά για το χρονοδιάγραμμα, αν βρέθηκε κτίριο σύμφωνα με το Προεδρικό Διάταγμα 99/2017, και σε ποιο στάδιο βρίσκονται οι αδειοδοτήσεις. Η κα.",
        citationUrls: [
          "https://www.e-nomothesia.gr/autodioikese-demoi/proedriko-diatagma-99-2017-fek-141a-28-9-2017.html",
          "https://kede.gr/egkyklios-ypes-gia-tin-adeiodotisi-ton-dimotikon-paidikon-kai-vrefonipiakon-stathmon/",
          "https://www.government.gov.gr/thespisi-proipotheseon-gia-tin-adiodotisi-ke-litourgia-ton-dimotikon-vrefikon-ke-pedikon-stathmon/",
          "https://kede.gr/paratasi-prosarmogis-ton-dimotikon-paidikon-stathmon-sto-pd-99-2017/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o4n0a4710gotxzvc3cl",
        subjectName: "Πορεία ίδρυσης Παιδικού Σταθμού Δίκαια",
        summary:
          "Το θέμα αφορά την πορεία ίδρυσης Παιδικού Σταθμού στα Δίκαια. Η κα. Κυρμάνη απέσυρε το ερώτημα δηλώνοντας ότι θα το ξαναφέρει στην επόμενη λογοδοσία.",
        citationUrls: [
          "https://www.opengov.gr/ypes/?p=9277",
          "https://www.kkpaado.gr/%CE%A0%CE%91%CE%99%CE%94%CE%99%CE%9A%CE%9F%CE%99-%CE%A3%CE%A4%CE%91%CE%98%CE%9C%CE%9F%CE%99",
          "https://www.haniotika-nea.gr/kanenas-paidikos-stathmos-sto-trigono-evroy-sto-spiti-ta-paidia/",
          "https://www.ertnews.gr/video/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://epiloges.tv/kanenas-paidikos-stathmos-sto-trigono-evrou-sto-spiti-ta-paidia/",
          "https://www.ypes.gr/thesmika-themata-organosis-kai-leitourgias-dimon/dps-egkyklioi-engrafa/",
          "https://www.powergame.gr/ellada/1281595/paidikoi-stathmoi-espa-2026-2027-pote-anamenetai-na-anoixei-i-platforma/",
        ],
      },
    ],
  },
  {
    slug: "katafygio-adespoton",
    cityId: "orestiada",
    name: "Καταφύγιο & αδέσποτα ζώα",
    type: "PROJECT",
    typeLabel: "Έργο",
    summary:
      "Ο φάκελος συγκεντρώνει την πορεία του καταφυγίου αδέσποτων και τις αποφάσεις για τη διαχείριση ζώων συντροφιάς. Περιλαμβάνει επανεκκίνηση σύμβασης, προσωρινή διακοπή, ερωτήματα νομιμότητας, επιτροπές και επιχειρησιακό πρόγραμμα. (5 πραγματικά subjects σε 5 συνεδριάσεις.)",
    externalContext:
      "Η διαχείριση αδέσποτων ζώων συντροφιάς ρυθμίζεται από ειδικό θεσμικό πλαίσιο και συχνά συνδέεται με χρηματοδοτήσεις, αδειοδοτήσεις και δημοτικές υποχρεώσεις. Γι αυτό ο φάκελος έχει πλούσιες εξωτερικές πηγές.",
    sourcingLevel: "rich",
    trendingScore: 88,
    subscribers: 203,
    minutesDiscussed: 167,
    featured: true,
    entries: [
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80rnt008jypx412tp0fi4",
        subjectName: "Επανέναρξη σύμβασης καταφυγίου αδέσποτων ζώων",
        summary:
          "Επανέναρξη σύμβασης κατασκευής και εξοπλισμού καταφυγίου αδέσποτων ζώων συντροφιάς αξίας 364.064€, ανατεθειμένης στην Αρχιμήδης Τεχνική ΑΕ. Ο Δημούτσης παρουσίασε τη θετική γνωμοδότηση της Επιτροπής Παραλαβής.",
        citationUrls: [
          "https://www.kodiko.gr/nomothesia/document/747098/nomos-4830-2021",
          "https://www.e-nomothesia.gr/kat-zoa-suntrophias-prostasia-zoon/nomos-4830-2021-phek-169a-18-9-2021.html",
          "https://www.opengov.gr/ypes/?p=7912",
          "https://www.opengov.gr/ypes/?p=7896",
          "https://eugo.gov.gr/services/987316",
          "https://www.minagric.gr/for-farmer-2/xorotajian/573-xorotajia-1/1967-nomikes-diatajhs-xorotajia",
          "https://www.pvaigaiou.gov.gr/%CE%B3%CE%B5%CF%89%CF%81%CE%B3%CE%B9%CE%BA%CE%AE-%CE%B3%CE%B7-%CF%85%CF%88%CE%B7%CE%BB%CE%AE%CF%82-%CF%80%CE%B1%CF%81%CE%B1%CE%B3%CF%89%CE%B3%CE%B9%CE%BA%CF%8C%CF%84%CE%B7%CF%84%CE%B1%CF%82-%CE%B4%CE%B1%CE%BF%CE%BA-%CF%80%CE%B5-%CF%83%CE%AC%CE%BC%CE%BF%CF%85/",
        ],
      },
      {
        date: "2026-02-11",
        meetingId: "feb11_2026",
        meetingName: "Δημοτικό Συμβούλιο 11/02/26",
        subjectId: "cmljgfyca03x6wvnfj38d92hm",
        subjectName: "Διακοπή Σύμβασης Καταφυγίου Αδέσποτων",
        summary:
          "Έγκριση προσωρινής διακοπής της σύμβασης κατασκευής καταφυγίου αδέσποτων ζώων συντροφιάς (364.064 ευρώ με ΦΠΑ) με την εταιρεία Αρχιμήδης Τεχνική ΑΕ, λόγω δυσμενών καιρικών συνθηκών. Ο Δημούτσης εισηγήθηκε βάσει θετικής γνωμοδότησης της Τριμελούς Επιτροπής Παραλαβής.",
        citationUrls: [
          "https://www.ypes.gr/politikes-kai-draseis/programma-filodimos-2/apofasis-entaksis-2/prosklisi-x",
          "https://www.aftodioikisi.gr/ota/dimoi/filodimos-ii-20-ekat-se-dimoys-gia-ta-adespota/",
          "https://www.taxheaven.gr/law/4412/2016",
        ],
      },
      {
        date: "2026-02-27",
        meetingId: "feb27_2026",
        meetingName: "Δημοτικό Συμβούλιο 27/02/26",
        subjectId: "cmm6lwkqs05qf94xjobvb1duj",
        subjectName: "Καταφύγιο αδέσποτων ζώων",
        summary:
          "Ερώτημα του Μαυρίδη για τη νομιμότητα του καταφυγίου αδέσποτων ζώων στο πρώην στρατόπεδο Νεοχωρίου. Ο Μαυρίδης ρωτά αν ήταν παράνομος ο τρόπος που έγινε ως προμήθεια αντί ως έργο, σε ποιον ανήκει ιδιοκτησιακά ο χώρος, αν βρίσκεται σε δασική περιοχή, και…",
        citationUrls: [
          "https://www.kodiko.gr/nomothesia/document/747098/nomos-4830-2021",
          "https://eugo.gov.gr/services/987316",
          "https://ecopress.gr/katafygia-zoon-syntrofias-ti-ischyei-g/",
          "https://www.opengov.gr/ypes/?p=7896",
        ],
      },
      {
        date: "2026-03-03",
        meetingId: "mar3_2_2026",
        meetingName: "Δημοτικό Συμβούλιο 03/03/26",
        subjectId: "cmmda3m4d019241yawrg4txgf",
        subjectName: "Εκπρόσωπος Επιτροπής Εκτίμησης Ζώων",
        summary:
          "Ορισμός εκπροσώπου Δήμου στην τριμελή Επιτροπή Εκτίμησης Ζώων της Κτηνιατρικής Περιφέρειας, για εκτίμηση αξίας ζώων που θανατώνονται λόγω ασθενειών στο πλαίσιο εξυγίανσης ζωικού κεφαλαίου 2026. Προτάθηκε ο Αντιδήμαρχος κ. Ναστούλης ως τακτικό μέλος και ο κ. Δημούτσης ως αναπληρωτής. Η κα.",
        citationUrls: [
          "https://www.taxheaven.gr/circulars/52265/44441-2026",
          "https://www.e-nomothesia.gr/law-news/ktenotrophoi-poioi-den-tha-laboun-apozemioseis.html",
          "https://www.e-nomothesia.gr/kat-agrotike-anaptukse/nomothesia-pathologias-zoon/kya-337680-2025.html",
          "https://agroekfrasi.gr/anastoli-kai-rythmisi-asfalistikon-eisforon-ktinotrofon-se-varos-ton-opoion-epivlithikan-ktiniatrika-metra-exygiansis-tou-zoikou-tous-kefalaiou/",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txc7m16ygz3nxcrln8lnc",
        subjectName: "Διαχείριση αδέσποτων ζώων Ορεστιάδας",
        summary:
          "Έγκριση Επιχειρησιακού προγράμματος διαχείρισης αδέσποτων ζώων βάσει του ν. 4830/2021 και του προγράμματος Άργος.",
        citationUrls: [
          "https://www.e-nomothesia.gr/kat-zoa-suntrophias-prostasia-zoon/nomos-4830-2021-phek-169a-18-9-2021.html",
          "https://www.kodiko.gr/nomothesia/document/747098/nomos-4830-2021",
          "https://www.elsyn.gr/sites/default/files/%CE%95%CE%9A%CE%98%CE%95%CE%A3%CE%97%20%CE%95%CE%9B%CE%95%CE%93%CE%A7%CE%9F%CE%A5%203%20%CE%91%CE%94%CE%95%CE%A3%CE%A0%CE%9F%CE%A4%CE%91%20%CE%96%CE%A9%CE%91_0.pdf",
          "https://vetsurgery.gr/%CF%80%CF%81%CF%8C%CE%B3%CF%81%CE%B1%CE%BC%CE%BC%CE%B1-%CE%B1%CF%81%CE%B3%CE%BF%CF%82/",
          "https://petstoday.gr/el/zoa-syntrofias-ti-problepei-o-neos-nomos-4830-2021/",
          "https://www.enikonomia.gr/economy/programma-argos-29-ekat-evro-se-18-dimou/409712/",
          "https://lawyersforanimals.dogsvoice.gr/animal-law/companion/strays/",
        ],
        decision: {
          ada: "ΨΟΨΒΩΞΒ-9ΟΝ",
          title:
            "ΔΑΠΑΝΗ ΓΙΑ ΤΗΝ ΠΑΡΟΧΗ ΥΠΗΡΕΣΙΑΣ ΜΕ ΤΙΤΛΟ: «ΦΙΛΟΞΕΝΙΑ - ΔΙΑΜΟΝΗ ΕΘΕΛΟΝΤΩΝ ΚΤΗΝΙΑΤΡΩΝ (ΕΔΚΕ) ΣΤΑ ΠΛΑΙΣΙΑ ΔΙΟΡΓΑΝΩΣΗΣ ΕΘΕΛΟΝΤΙΚΟΥ ΠΡΟΓΡΑΜΜΑΤΟΣ ΣΤΕΙΡΩΣΕΩΝ ΤΟΥ ΔΗΜΟΥ ΟΡΕΣΤΙΑΔΑΣ ΓΙΑ ΤΑ ΑΔΕΣΠΟΤΑ ΖΩΑ ΣΥΝΤΡΟΦΙΑΣ» (ΟΦΕΛΗ 2025)",
          pdfUrl: "https://diavgeia.gov.gr/doc/ΨΟΨΒΩΞΒ-9ΟΝ",
        },
      },
    ],
  },
  {
    slug: "diadimotiki-epixeirisi-arda",
    cityId: "orestiada",
    name: "Διαδημοτική Επιχείρηση Ποταμού Άρδα",
    type: "ORGANIZATION",
    typeLabel: "Οργανισμός",
    summary:
      "Ο φάκελος συνδέει οικονομικά θέματα της Διαδημοτικής Επιχείρησης με τη συζήτηση για τον ποταμό Άρδα, τις εκδηλώσεις και τα νερά που επηρεάζουν την περιοχή. Έτσι φαίνεται η σχέση ανάμεσα σε έναν φορέα και ένα ευρύτερο διασυνοριακό ζήτημα. (5 πραγματικά subjects σε 4 συνεδριάσεις.)",
    externalContext:
      "Ο Άρδας είναι παραπόταμος του Έβρου και η αξιοποίησή του αφορά άρδευση, τοπικές εκδηλώσεις και διαδημοτική συνεργασία. Η υπόθεση έχει εξωτερικές πηγές για τον ποταμό, τον φορέα και το θεσμικό πλαίσιο.",
    sourcingLevel: "rich",
    trendingScore: 71,
    subscribers: 96,
    minutesDiscussed: 119,
    featured: false,
    entries: [
      {
        date: "2024-10-07",
        meetingId: "oct8_2024",
        meetingName: "Δημοτικό Συμβούλιο 8/10/24",
        subjectId: "cm24olnv70fkn2jkv3uwuj4pm",
        subjectName: "Ισολογισμός Διαδημοτικής Επιχείρησης Άρδα 2023",
        summary:
          "Παρουσίαση και έγκριση του ισολογισμού και των αποτελεσμάτων χρήσης της Διαδημοτικής Επιχείρησης Αξιοποίησης και Ανάδειξης του Ποταμού Άρδα για το έτος 2023, με συζήτηση για τα οικονομικά αποτελέσματα και τη διαχείριση της επιχείρησης",
        citationUrls: [],
      },
      {
        date: "2024-10-07",
        meetingId: "oct8_2024",
        meetingName: "Δημοτικό Συμβούλιο 8/10/24",
        subjectId: "cm24olntu0fju2jkvctjjnh7y",
        subjectName: "Προϋπολογισμός Διαδημοτικής Επιχείρησης Άρδα",
        summary:
          "Συζήτηση και ψήφιση της πρώτης αναμόρφωσης του προϋπολογισμού της Διαδημοτικής Επιχείρησης Αξιοποίησης και Ανάδειξης του Ποταμού Άρδα για το 2024, με αύξηση τιμών και προγραμματισμό αγοράς νέου οχήματος",
        citationUrls: [],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85ico016tb8q8dx8segxm",
        subjectName: "Ενημέρωση για αγροτικές κινητοποιήσεις και νερά Άρδα",
        summary:
          "Ο Αγγελακούδης ενημέρωσε το σώμα για τις εξελίξεις στις αγροτικές κινητοποιήσεις. Ανέφερε ότι αποφασίστηκε η αποχώρηση τρακτέρ από το μπλόκο χωρίς υποχώρηση από τα αιτήματα. Στη συνάντηση με τον Πρωθυπουργό εκπροσώπησε τη Θράκη.",
        citationUrls: [
          "https://el.wikipedia.org/wiki/%CE%91%CE%B3%CF%81%CE%BF%CF%84%CE%B9%CE%BA%CE%AD%CF%82_%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CE%BF%CF%80%CE%BF%CE%B9%CE%AE%CF%83%CE%B5%CE%B9%CF%82_%CF%83%CF%84%CE%B7%CE%BD_%CE%95%CE%BB%CE%BB%CE%AC%CE%B4%CE%B1_2025",
          "https://el.wikipedia.org/wiki/%CE%91%CE%B3%CF%81%CE%BF%CF%84%CE%B9%CE%BA%CE%AD%CF%82_%CE%BA%CE%B9%CE%BD%CE%B7%CF%84%CE%BF%CF%80%CE%BF%CE%B9%CE%AE%CF%83%CE%B5%CE%B9%CF%82_%CF%83%CF%84%CE%B7%CE%BD_%CE%95%CE%BB%CE%BB%CE%AC%CE%B4%CE%B1_2025-26",
          "https://www.agrotypos.gr/thesmoi/synetairismoi-organoseis-agroton/ola-ta-neotera-gia-tis-agrotikes-kinitopoiiseis-kai-ta-mploka",
          "https://el.wikipedia.org/wiki/%CE%86%CF%81%CE%B4%CE%B1%CF%82",
          "https://www.gnomionline.gr/sigi-asyrmatou-apo-ellada-kai-voulgaria-gia-ta-nera-tou-arda/",
        ],
      },
      {
        date: "2026-03-03",
        meetingId: "mar3_2_2026",
        meetingName: "Δημοτικό Συμβούλιο 03/03/26",
        subjectId: "cmmda3m3b018x41yaoib08pqz",
        subjectName: "Προϋπολογισμός Διαδημοτικής Επιχείρησης Άρδα",
        summary:
          "Προϋπολογισμός 2026 της Διαδημοτικής Επιχείρησης Ποταμού Άρδα με έσοδα 320.000 ευρώ και έξοδα 282.636 ευρώ. Ο κ. Μαυρίδης αμφισβήτησε τον φορολογικό συντελεστή και πρότεινε αγορά καινούριου 4x4 αντί μεταχειρισμένου. Ο κ. Καζαλτζής θεώρησε λάθος το ποσό 1.",
        citationUrls: [
          "https://el.wikipedia.org/wiki/%CE%86%CF%81%CE%B4%CE%B1%CF%82",
          "https://orestiada.gr/dimos/perivallon/ydatikoi-poroi-stin-perioxi/",
          "https://dasarxeio.com/2025/05/21/144294/",
          "https://archive.apan.gr/gr/data/Geophysical-Item/1057",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txcd116ysz3nxfizxuxh5",
        subjectName: "Εκδηλώσεις Συνάντηση Νέων Άρδας 2026",
        summary:
          "Παραχώρηση θέσεων Κ1-Κ10 και Ψ1-Ψ2 για τις εκδηλώσεις «Συνάντηση Νέων Άρδας 2026» στις 30-31/07 και 1-2/08/2026, με τέλος 10.000 ευρώ για το σύνολο των ημερών. Εγκρίθηκε κατά πλειοψηφία, με υπερψήφιση από τον κ. Σουκουλδάνο και καταψήφιση από τις υπόλοιπες παρατάξεις. Κύρια ζητήματα: - Ο [κ.",
        citationUrls: [
          "https://dikepao.gr/ekdiloseis/synantisi-neon-ardas",
          "https://www.evros24.gr/30-chronia-ardas-festival-epistrefei-megali-gi/",
          "http://ardasfestivalfans.blogspot.com/p/blog-page_229.html",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%9A%CE%BF%CE%B9%CE%BD%CF%8C%CF%87%CF%81%CE%B7%CF%83%CF%84%CE%BF%CF%85_%CE%A7%CF%8E%CF%81%CE%BF%CF%85_%CE%B3%CE%B9%CE%B1_%CE%95%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CE%B9%CF%82_%CE%A8%CF%85%CF%87%CE%B1%CE%B3%CF%89%CE%B3%CE%B9%CE%BA%CE%BF%CF%8D_%CE%A0%CE%B5%CF%81%CE%B9%CE%B5%CF%87%CE%BF%CE%BC%CE%AD%CE%BD%CE%BF%CF%85_%CE%BC%CE%B5_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1",
          "https://eugo.gov.gr/services/802329",
        ],
      },
    ],
  },
  {
    slug: "dimotiki-radiotileorasi",
    cityId: "orestiada",
    name: "Δημοτική Ραδιοτηλεόραση (ΔΕΡΤΟ)",
    type: "ORGANIZATION",
    typeLabel: "Οργανισμός",
    summary:
      "Ο φάκελος παρακολουθεί ισολογισμούς, προϋπολογισμό, στοχοθεσία, ελεγκτές και επιχορήγηση της Δημοτικής Ραδιοτηλεόρασης. Η επαναλαμβανόμενη θεματική είναι η οικονομική λειτουργία και η βιωσιμότητα του δημοτικού μέσου. (5 πραγματικά subjects σε 4 συνεδριάσεις.)",
    externalContext:
      "Οι δημοτικές ραδιοτηλεοπτικές επιχειρήσεις έχουν ειδικό θεσμικό πλαίσιο και εξαρτώνται από δημοτική χρηματοδότηση, διαφημιστικά έσοδα και τεχνικές υποχρεώσεις μετάδοσης.",
    sourcingLevel: "moderate",
    trendingScore: 64,
    subscribers: 57,
    minutesDiscussed: 142,
    featured: false,
    entries: [
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80rmn007nypx4v5uurdbn",
        subjectName: "Ισολογισμός 2024 Δημοτικής Ραδιοτηλεόρασης",
        summary:
          "Έγκριση ισολογισμού οικονομικού έτους 2024 της Δημοτικής Ραδιοτηλεόρασης Ορεστιάδας. Ο Δόμπας παρουσίασε τον ισολογισμό που εγκρίθηκε από το Διοικητικό Συμβούλιο. Ο Καζαλτζής έθεσε τεχνικές ερωτήσεις για τις αποσβέσεις παγίων και τις [ζημίες χρήσεως 4.",
        citationUrls: [
          "https://orestiada.gr/nomika-prosopa/radiotileorasi-2/",
          "https://www.e-nomothesia.gr/enemerose-tupos-radiophono-teleorase/n-3592-2007.html",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A3%CF%8D%CE%BD%CF%84%CE%B1%CE%BE%CE%B7_%CE%BA%CE%B1%CE%B9_%CE%AD%CE%B3%CE%BA%CF%81%CE%B9%CF%83%CE%B7_%CE%B9%CF%83%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CF%83%CE%BC%CE%BF%CF%8D_%CE%94%CE%AE%CE%BC%CF%89%CE%BD",
          "https://www.dsanet.gr/Epikairothta/Nomothesia/n%204483.htm",
          "https://www.opengov.gr/digitalandbrief/?p=850",
        ],
      },
      {
        date: "2026-03-03",
        meetingId: "mar3_2_2026",
        meetingName: "Δημοτικό Συμβούλιο 03/03/26",
        subjectId: "cmmda3m3l018y41yas4otork7",
        subjectName: "Προϋπολογισμός Ραδιοτηλεόρασης Δήμου",
        summary:
          "Προϋπολογισμός 2026 της Ραδιοτηλεόρασης Δήμου Ορεστιάδας με συνολικά έσοδα περίπου 200.000 ευρώ, εκ των οποίων 180.000 επιχορήγηση από τον Δήμο και πενιχρά ίδια έσοδα. Εγκρίθηκε κατά πλειοψηφία. Ο κ.",
        citationUrls: [
          "https://www.e-nomothesia.gr/enemerose-tupos-radiophono-teleorase/n-3592-2007.html",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%9A%CE%B1%CF%84%CE%AC%CF%81%CF%84%CE%B9%CF%83%CE%B7,_%CF%88%CE%AE%CF%86%CE%B9%CF%83%CE%B7_%CE%BA%CE%B1%CE%B9_%CE%B4%CE%B7%CE%BC%CE%BF%CF%83%CE%AF%CE%B5%CF%85%CF%83%CE%B7_%CF%84%CE%BF%CF%85_%CF%80%CF%81%CE%BF%CF%8B%CF%80%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CF%83%CE%BC%CE%BF%CF%8D_%CF%84%CF%89%CE%BD_%CE%B4%CE%B7%CE%BC%CE%BF%CF%84%CE%B9%CE%BA%CF%8E%CE%BD_%CE%BD%CE%BF%CE%BC%CE%B9%CE%BA%CF%8E%CE%BD_%CF%80%CF%81%CE%BF%CF%83%CF%8E%CF%80%CF%89%CE%BD_%CE%B4%CE%B7%CE%BC%CE%BF%CF%83%CE%AF%CE%BF%CF%85_%CE%B4%CE%B9%CE%BA%CE%B1%CE%AF%CE%BF%CF%85",
          "https://www.dsanet.gr/Epikairothta/Nomothesia/yaoik2_84027.htm",
          "https://digitaltvinfo.gr/arthrografia/afieroma/chartis-tileoptikon-sychnotiton/",
          "https://typologies.gr/ritoriki-peri-teloys-tileorasis/",
        ],
      },
      {
        date: "2026-03-03",
        meetingId: "mar3_2_2026",
        meetingName: "Δημοτικό Συμβούλιο 03/03/26",
        subjectId: "cmmda3m3s018z41yazmrenqhj",
        subjectName: "Ορισμός ελεγκτών Δ.Ε.Ρ.Τ.Ο.",
        summary:
          "Ορισμός δύο ελεγκτών για τον τακτικό διαχειριστικό έλεγχο της Δ. Ε. Ρ. Τ. Ο. για τη διαχειριστική περίοδο 2025. Ο κ. Αστεριάδης πρότεινε ως τακτικούς ελεγκτές τους κ. Γκαλιμπούδη και κ. Μαντικίδη, με αμοιβή 500 ευρώ πλέον ΦΠΑ ανά ελεγκτή. Ο κ.",
        citationUrls: [
          "https://www.deya-ker.gr/",
          "https://www.opengov.gr/ypes/?p=1248",
          "https://www.businessnews.gr/politiki/item/221370-nea-nomothesia-gia-esoterikoys-elegktes-epixeiriseon",
          "https://www.deyaalex.gr/h-deyaa-menou/istoria-skopos-menou.html",
        ],
      },
      {
        date: "2026-03-23",
        meetingId: "mar23_2026",
        meetingName: "Δημοτικό Συμβούλιο 23/03/2026",
        subjectId: "cmmxin6b60dk08oeeqyo5qd05",
        subjectName: "Έγκριση Πινάκων Στοχοθεσίας Δημοτικής Ραδιοτηλεόρασης",
        summary:
          "Έγκριση πινάκων στοχοθεσίας οικονομικών αποτελεσμάτων 2026 της Δημοτικής Ραδιοτηλεόρασης. Η συζήτηση επεκτάθηκε στη γενικότερη κατάσταση του σταθμού, με όλες τις παρατάξεις να εκφράζουν ανησυχία για τη στασιμότητα και τον χαμηλό προϋπολογισμό. Εγκρίθηκε ομόφωνα. Κύρια ζητήματα: - Ο κ.",
        citationUrls: [
          "https://www.ypes.gr/oikonomiki-stochothesia-ota/",
          "https://karagilanis.gr/epikairotita/pinakes-katartisis-stochothesias-2025/",
          "https://kede.gr/ypes-odigies-pros-tous-dimous-gia-ton-elegcho-ton-oikonomikon-apotelesmaton/",
          "https://www.opengov.gr/ypes/?p=4368",
          "https://www.opengov.gr/digitalandbrief/?p=850",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txc6c16ycz3nxaqufuz98",
        subjectName: "Επιχορήγηση Ραδιοτηλεόρασης Δήμου 2026",
        summary:
          "Έγκριση επιχορήγησης 180.000 ευρώ στη Δημοτική Επιχείρηση «Ραδιοτηλεόραση Δήμου Ορεστιάδας» για το έτος 2026, βάσει του άρθρου 4 παρ. 3 του ΠΔ 25/1998. Εγκρίθηκε ομόφωνα. Κύρια ζητήματα: - Ο [κ.",
        citationUrls: [],
      },
    ],
  },
  {
    slug: "open-mall",
    cityId: "orestiada",
    name: "Open Mall",
    type: "PROJECT",
    typeLabel: "Έργο",
    summary:
      "Ο φάκελος συνδέει την παραχώρηση οδών για τα εγκαίνια με μεταγενέστερη ενημέρωση για την ολοκλήρωση του Open Mall. Παρότι έχει λίγες καταχωρήσεις, δείχνει πώς ένα έργο λιανικού κέντρου αποκτά δικό του χρονολόγιο. (2 πραγματικά subjects σε 2 συνεδριάσεις.)",
    externalContext:
      "Τα Open Mall είναι έργα αστικής και εμπορικής αναβάθμισης που συνήθως υλοποιούνται με συνεργασία δήμου και εμπορικού συλλόγου. Στο demo χρησιμοποιούνται οι υπάρχουσες πηγές των subjects.",
    sourcingLevel: "moderate",
    trendingScore: 47,
    subscribers: 39,
    minutesDiscussed: 44,
    featured: false,
    entries: [
      {
        date: "2024-10-07",
        meetingId: "oct8_2024",
        meetingName: "Δημοτικό Συμβούλιο 8/10/24",
        subjectId: "cm24olnq80fgs2jkvov3kph07",
        subjectName: "Παραχώρηση οδών για εγκαίνια Open Mall",
        summary:
          "Συζήτηση και ψήφιση για την παραχώρηση οδών στο κέντρο της Ορεστιάδας για την πραγματοποίηση της τελετής εγκαινίων του έργου 'Ανοιχτό Κέντρο Εμπορίου'",
        citationUrls: [],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o4a0a4610goumnll80o",
        subjectName: "Πορεία διαδικασιών ολοκλήρωσης Open Mall",
        summary:
          "Ερώτημα της κα. Κυρμάνη για την πορεία υλοποίησης του προγράμματος Open Mall (ΕΣΠΑ ~1,8 εκατ. ευρώ). Ο κ.",
        citationUrls: [
          "https://www.gnomionline.gr/i-orestiada-apokta-to-open-mall-tis/",
          "https://www.ertnews.gr/perifereiakoi-stathmoi/orestiada/orestiada-me-symmetoxi-76-epixeiriseon-dimiourgeitai-to-orestiada-open-mall/",
          "https://www.radioevros.gr/to-open-mall-orestiadas/",
          "https://openmallorestiada.gr/",
        ],
      },
    ],
  },
  {
    slug: "scholikes-monades",
    cityId: "orestiada",
    name: "Σχολικές μονάδες & Παιδεία",
    type: "TOPIC",
    typeLabel: "Θέμα",
    summary:
      "Ο φάκελος συγκεντρώνει θέματα για σχολικές μονάδες, ειδικότητες, μεταβολές, σχολικά συμβούλια και ανάγκες εκπαίδευσης. Η εικόνα είναι χρήσιμη για πολίτες που θέλουν να δουν συνολικά πώς κινείται η παιδεία στον δήμο. (10 πραγματικά subjects σε 5 συνεδριάσεις.)",
    externalContext:
      "Τα περισσότερα στοιχεία είναι τοπικές εισηγήσεις και αποφάσεις. Για αυτό το επίπεδο πηγών είναι ελάχιστο και η αξία βρίσκεται κυρίως στη σύνδεση των συμβουλιακών καταχωρήσεων.",
    sourcingLevel: "minimal",
    trendingScore: 68,
    subscribers: 104,
    minutesDiscussed: 134,
    featured: false,
    entries: [
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpyx10vm8sirrnodjq2zo",
        subjectName: "Διασφάλιση λειτουργίας σχολείων ακριτικών περιοχών",
        summary:
          "Λήψη απόφασης για τη διασφάλιση της συνέχισης λειτουργίας των σχολικών μονάδων της Δημοτικής Ενότητας Τριγώνου και Δημοτικής Ενότητας Ν. Βύσσας (Δίκαια, Ρέζια, Κυπρίνος, Νέα Βύσσα) κατ' εξαίρεση των κείμενων διατάξεων, λόγω αξιωμένου δημογραφικού προβλήματος.",
        citationUrls: [],
      },
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpyur0vg5sirryo7ykv43",
        subjectName: "Ορισμός εκπροσώπου Δήμου σε Σχολικά Συμβούλια",
        summary:
          "Τροποποίηση της υπ' αριθμόν 196 του 2024 απόφασης ΔΣ με θέμα ορισμός εκπροσώπου Δήμου Ορεστιάδας Σχολικού Συμβουλίου. Εισηγείται τον ορισμό της κυρίας Μπραϊκούδη Ευαγγελίας ως αιρετό εκπρόσωπο του Δήμου, η οποία θα είναι και αντιπρόεδρος του εκάστοτε σχολικού συμβουλίου.",
        citationUrls: [],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80rtp00ekypx43c8njymc",
        subjectName: "Ειδικότητες 2ου Εσπερινού ΕΠΑΛ Ορεστιάδας",
        summary:
          "Γνωμοδότηση για την προσθήκη τριών ειδικοτήτων στο 2ο Εσπερινό ΕΠΑΛ Ορεστιάδας για το σχολικό έτος 2026-2027: Βοηθός Νοσηλευτή, Βοηθός Φυσικοθεραπευτή (τομέας Υγείας-Πρόνοιας-Ευεξίας) και Υπάλληλος Αποθήκης/Εφοδιασμού (τομέας Διοίκησης-Οικονομίας).",
        citationUrls: [
          "https://paideianet.com/4581-2/",
          "https://www.alfavita.gr/ekpaideysi/482808_epal-oi-eidikotites-gia-kathe-sholeio-gia-ti-sholiki-hronia-2025-2026",
          "https://1epal-agioi-anargyroi.gr/eidikotites/ygeia/nosileutiki/",
          "http://1esp-epal-aigal.gr/index.php/%CE%BC%CE%B1%CE%B8%CE%AE%CE%BC%CE%B1%CF%84%CE%B1-%CE%B5%CE%B9%CE%B4%CE%B9%CE%BA%CF%8C%CF%84%CE%B7%CF%84%CE%B5%CF%82/%CE%B3-%CF%84%CE%B1%CE%BE%CE%B7%CF%82/%CE%BF%CE%BC%CE%B1%CE%B4%CE%B5%CF%82-%CF%80%CF%81%CE%BF%CF%83%CE%B1%CE%BD%CE%B1%CF%84%CE%BF%CE%BB%CE%B9%CF%83%CE%BC%CE%BF%CF%85-%CE%B3-%CF%84%CE%AC%CE%BE%CE%B7%CF%82/%CF%85%CE%B3%CE%B5%CE%AF%CE%B1%CF%82-%CF%80%CF%81%CF%8C%CE%BD%CE%BF%CE%B9%CE%B1%CF%82-%CE%B5%CF%85%CE%B5%CE%BE%CE%AF%CE%B1%CF%82-%CE%B3/%CE%B2%CE%BF%CE%B7%CE%B8%CF%8C%CF%82-%CE%BD%CE%BF%CF%83%CE%B7%CE%BB%CE%B5%CF%85%CF%84%CE%AE-%CE%B3",
        ],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80ruc00faypx4ndghsscy",
        subjectName: "Μεταβολές σχολείων ειδικής αγωγής δευτεροβάθμιας",
        summary:
          "Γνωμοδότηση για μεταβολές σχολικών μονάδων ειδικής αγωγής της Διεύθυνσης Δευτεροβάθμιας Εκπαίδευσης Έβρου για το σχολικό έτος 2026-2027.",
        citationUrls: [
          "https://www.dsanet.gr/Epikairothta/Nomothesia/n3699_08.htm",
          "https://www.e-nomothesia.gr/kat-ekpaideuse/n-3699-2008.html",
          "https://lifeisforall.gr/kedasy-analytikos-odigos-diadikasias-gnomateysis/",
          "https://autismap.gr/nomothesia/erotiseis-apantiseis/368-poia-einai-i-diadikasia-aksiologisis-apo-ta-ke-d-a-s-y",
          "https://www.minedu.gov.gr/news/62295-11-08-25-okto-nea-eidika-sxoleia-tha-leitourgisoun-tin-periodo-2025-2026-epipleon-2-tomeis-kai-6-eidikotites-sta-eniaia-eidika-epaggelmatika-gymnasia-lykeia",
          "https://www.eleftherostypos.gr/politiki/sofia-zacharaki-anavathmizoume-tin-eidiki-agogi-me-monimo-prosopiko-nea-ergaleia-kai-nea-filosofia",
        ],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80ruz00fxypx48njk8se8",
        subjectName: "Μεταβολές σχολείων ειδικής αγωγής πρωτοβάθμιας",
        summary:
          "Γνωμοδότηση για μεταβολές σχολικών μονάδων ειδικής αγωγής της Διεύθυνσης Πρωτοβάθμιας Εκπαίδευσης Έβρου για το σχολικό έτος 2026-2027.",
        citationUrls: [
          "https://www.e-nomothesia.gr/kat-ekpaideuse/n-3699-2008.html",
          "https://edu.klimaka.gr/sxoleia/eidikh-agwgh/806-metaboles-sxoleia-eidikhs-agwghs",
          "https://www.especial.gr/metavoles-sxolikwn-monadwn-2022-23-idriseis-katargiseis-proagwges-sygxwnefseis-egkyklios/",
          "https://blogs.sch.gr/1deidorest/",
          "https://edu.klimaka.gr/ekpaideytikoi/diorismoi-neodioristoi-ekpaideytikoi/323-diorismoi-ekpaidevtikwn",
          "https://specialeducation.gr/specialedu/tmimata-entaxis-2025-2026-to-neo-nomothetiko-plaisio-kai-to-neo-kathestos-stelehosis/",
        ],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80rvk00g9ypx4zgcufnr3",
        subjectName: "Μεταβολές σχολικών μονάδων πρωτοβάθμιας",
        summary:
          "Γνωμοδότηση για μεταβολές σχολικών μονάδων της Διεύθυνσης Πρωτοβάθμιας Εκπαίδευσης Έβρου για το σχολικό έτος 2026-2027. Η Μπραϊκούδη εισηγήθηκε ότι δεν προτείνονται μεταβολές στις σχολικές μονάδες, με δυνατότητα επανεξέτασης.",
        citationUrls: [
          "https://edu.klimaka.gr/sxoleia/dimotiko/1190-synenwseis-idryseis-scholikwn-monadwn",
          "https://www.e-nomothesia.gr/kat-ekpaideuse/protobathmia-ekpaideuse/",
          "https://www.especial.gr/metavoles-sxolikwn-monadwn-2022-23-idriseis-katargiseis-proagwges-sygxwnefseis-egkyklios/",
          "https://www.especial.gr/sighoneysis-sholeion-i-diadikasia-kai-i-anafora-stis-hiliometrikes-apostaseis-poy-dianyoyn-mathites/",
        ],
      },
      {
        date: "2026-02-11",
        meetingId: "feb11_2026",
        meetingName: "Δημοτικό Συμβούλιο 11/02/26",
        subjectId: "cmljgfy3u03u2wvnfvja7p3rh",
        subjectName: "Υπεύθυνοι Τραπεζικών Λογαριασμών Σχολείων",
        summary:
          "Ορισμός διευθυντών σχολικών μονάδων ως διαχειριστών τραπεζικών λογαριασμών παγίας προκαταβολής στην Τράπεζα Πειραιώς, βάσει απόφασης 11/2026 της Δημοτικής Επιτροπής.",
        citationUrls: [
          "https://www.ypes.gr/faqs/?faqsCategory=5369&ptype=faqs",
          "https://www.esos.gr/arthra/90184/allages-stin-pagia-prokataboli-stoysstis-dieythyntestries-sholikon-monadon",
          "https://kede.gr/ypes-afxanetai-i-pagia-prokatavoli-gia-ta-scholeia-analoga-me-ton-arithmo-ton-aithouson/",
          "https://www.alfavita.gr/ekpaideysi/463372_sholeia-shetika-tin-pagia-prokataboli-stoys-dieythyntes-ton-sholikon-monadon",
          "https://www.edweek.gr/pagia-prokataboli-stoys-diefthyntes-sholeion-tha-ananeonetai-molis-exantleitai/",
        ],
      },
      {
        date: "2026-04-28",
        meetingId: "apr28_3_2026",
        meetingName: "Δημοτικό Συμβούλιο 28/04/26",
        subjectId: "cmocwqpjz0346grw51kk2zwfn",
        subjectName: "Παραχώρηση αίθουσας για εκδήλωση σχολικού εκφοβισμού",
        summary:
          "Εγκρίθηκε ομόφωνα η δωρεάν παραχώρηση αίθουσας του Πολιτιστικού Πολύκεντρου στην ΚΟΙΝΣΕΠ Ι. Δ. Ε. Α. Τ. Ο. Βορείου Έβρου για εκδήλωση με θέμα τον σχολικό εκφοβισμό (03/05/2026), με ομιλήτριες την κα. Κοσμίδου και την κα. Νοτίου. Ο κ. Χατζηχαραλάμπους παρουσίασε την ΚΟΙΝΣΕΠ και την εκδήλωση. Η κα.",
        citationUrls: [
          "https://e-didaskalia.blogspot.com/2026/03/bullying.html",
          "https://www.e-nomothesia.gr/kat-ekpaideuse/n-5029-2023.html",
          "https://www.esos.gr/arthra/82351/fek-toy-neoy-nomoy-5029-1-3-23-gia-ti-sholiki-kai-allon-diataxeon-gia-tis-treis",
          "https://stop-bullying.gov.gr/",
          "https://cyclades24.gr/2026/03/otan-o-scholikos-ekfovismos-metaferetai-sto-diadiktyo-apo-tin-epistimoniki-omada-tou-mazi-gia-to-paidi/",
          "https://neaflorina.gr/2026/03/scholikos-ekfovismos-i-simasia-tis-prolipsis-kai-o-rolos-tis-scholikis-koinotitas/",
          "https://www.miaora.gr/%CF%84%CE%B9-%CE%B5%CE%AF%CE%BD%CE%B1%CE%B9-%CE%B7-%CE%BA%CE%BF%CE%B9%CE%BD%CF%83%CE%B5%CF%80/",
        ],
        decision: {
          ada: "ΨΩΛΡΩΞΒ-ΝΛΙ",
          title:
            "Έγκριση παραχώρησης της αίθουσας εκδηλώσεων του Πολιτιστικού Πολύκεντρου και της αίθουσας υποδοχής (φουαγιέ) για την πραγματοποίηση εκδήλωσης με θέμα  «σχολικός εκφοβισμός –παιδιά, γονείς, εκπαιδευτικοί » από την ΚΟΙΝΣΕΠ «ΙΔ.Ε.Α.Τ.Ο. ΒΟΡΕΙΟΥ ΕΒΡΟΥ ΚΟΙΝ. Σ.ΕΠ» την Κυριακή 03.05.2026  και ώρα 11.00 έως 14:00",
          pdfUrl: "https://diavgeia.gov.gr/doc/ΨΩΛΡΩΞΒ-ΝΛΙ",
        },
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txceb16yvz3nxea3yb1q9",
        subjectName: "Χρήση αύλειου χώρου Σχολείου Αμμοβούνου",
        summary:
          "Παραχώρηση του προαύλιου χώρου του πρώην Δημοτικού Σχολείου Αμμοβούνου στον Πολιτιστικό Σύλλογο Αμμοβούνου για την ετήσια πολιτιστική εκδήλωση την Κυριακή 31 Μαΐου 2026. Εγκρίθηκε ομόφωνα. Ο [κ.",
        citationUrls: [
          "https://www.lawspot.gr/nomika-nea/parahorisi-sholeion-gia-pragmatopoiisi-ekdiloseon",
          "https://www.especial.gr/eggrafo-dieykriniseis-gia-a3iopoiisi-sxolikwn-ktiriwn/",
          "https://diavouleusi.eu/diabouleyseis/%CE%BA%CE%B1%CE%BD%CE%BF%CE%BD%CE%B9%CF%83%CE%BC%CE%BF%CF%83-%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%89%CF%81%CE%B7%CF%83%CE%B7%CF%83-%CF%87%CF%81%CE%B7%CF%83%CE%B7%CF%83-%CF%84%CF%89%CE%BD-%CF%83%CF%87/",
          "https://www.egdy.gr/%CE%BD%CE%BF%CE%BC%CE%BF%CE%B8%CE%B5%CF%83%CE%AF%CE%B1/%CF%83%CF%87%CE%BF%CE%BB%CE%B9%CE%BA%CE%AD%CF%82-%CE%B5%CF%80%CE%B9%CF%84%CF%81%CE%BF%CF%80%CE%AD%CF%82/%CF%80%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7-%CF%83%CF%87%CE%BF%CE%BB%CE%B9%CE%BA%CF%8E%CE%BD-%CF%87%CF%8E%CF%81%CF%89%CE%BD/",
          "https://el.wikipedia.org/wiki/%CE%91%CE%BC%CE%BC%CF%8C%CE%B2%CE%BF%CF%85%CE%BD%CE%BF_%CE%88%CE%B2%CF%81%CE%BF%CF%85",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txch916z3z3nxrtj57nx9",
        subjectName: "Μαθητεία ΕΠΑ.Λ/ΕΠΑ.Σ 2026-2027",
        summary:
          "Καθορισμός αριθμού μαθητευόμενων Επαγγελματικής Εκπαίδευσης και Κατάρτισης για απασχόληση στον Δήμο Ορεστιάδας κατά το σχολικό έτος 2026-2027: [19 μαθητευόμενοι από ΕΠΑ. Λ και 17 από σχολές μαθητείας ΕΠΑ.",
        citationUrls: [
          "https://www.epiteliki.minedu.gov.gr/?p=6076&lang=el",
          "https://www.alfavita.gr/ekpaideysi/489560_mathiteia-epal-2025-2026-poy-kai-pos-tha-topothetithoyn-oi-3917-apofoitoi",
          "https://www.tanea.gr/2026/05/14/economy/mathiteia-2026-2027-ksekinise-i-ypovoli-theseon-apo-epixeiriseis/",
        ],
        decision: {
          ada: "ΨΠΛ1ΩΞΒ-ΑΡΖ",
          title:
            "ΑΑΥ 339/2026 - Αποδοχές και εργοδοτικές εισφορές ασκούμενων μαθητών ΕΠΑΛ και ΕΠΑΣ μαθητείας ΟΑΕΔ",
          pdfUrl: "https://diavgeia.gov.gr/doc/ΨΠΛ1ΩΞΒ-ΑΡΖ",
        },
      },
    ],
  },
  {
    slug: "kapi-frontida-ilikiomenon",
    cityId: "orestiada",
    name: "ΚΑΠΗ & Φροντίδα Ηλικιωμένων",
    type: "TOPIC",
    typeLabel: "Θέμα",
    summary:
      "Ο φάκελος παρακολουθεί κανονισμούς, μισθώσεις, κυλικεία, σίτιση και συζητήσεις για δομές φροντίδας ηλικιωμένων. Συνδέει μικρές διοικητικές πράξεις σε μια πιο καθαρή εικόνα κοινωνικής πολιτικής. (5 πραγματικά subjects σε 4 συνεδριάσεις.)",
    externalContext:
      "Η υπόθεση βασίζεται κυρίως στο εσωτερικό χρονολόγιο του συμβουλίου και σε ανά subject πηγές, επειδή αφορά τοπικές δομές και λειτουργικές αποφάσεις.",
    sourcingLevel: "minimal",
    trendingScore: 55,
    subscribers: 73,
    minutesDiscussed: 79,
    featured: false,
    entries: [
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80roi009gypx4e9qocdzc",
        subjectName: "Τροποποίηση κανονισμού Κέντρου Φροντίδας Ηλικιωμένων",
        summary:
          "Τροποποίηση της απόφασης 242/2024 για τον κανονισμό λειτουργίας του Κέντρου Ημερήσιας Φροντίδας Ηλικιωμένων στην Καβίλη, κατόπιν παρατηρήσεων της διαχειριστικής αρχής. Ο Καδόγλου ανέφερε ότι [η βασικότερη αλλαγή είναι η αφαίρεση της ειδικότητας ιατρού.",
        citationUrls: [
          "https://www.stereaellada.gr/proskliseis/kentra-imerisias-frontidas-ilikiomenon-kifi-nees-draseis",
          "https://pepa.attica.gov.gr/kentra-imerisias-frontidas-ilikiomenon/",
          "https://www.koropi.gr/%CE%BA%CE%AD%CE%BD%CF%84%CF%81%CE%B1-%CE%B1%CE%BD%CE%BF%CE%B9%CE%BA%CF%84%CE%AE%CF%82-%CF%80%CF%81%CE%BF%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82-%CE%B7%CE%BB%CE%B9%CE%BA%CE%B9%CF%89%CE%BC%CE%AD/",
          "https://korydallos.gr/koinoniki-politiki/%CE%BA%CE%AD%CE%BD%CF%84%CF%81%CE%BF-%CE%B7%CE%BC%CE%B5%CF%81%CE%AE%CF%83%CE%B9%CE%B1%CF%82-%CF%86%CF%81%CE%BF%CE%BD%CF%84%CE%AF%CE%B4%CE%B1%CF%82-%CE%B7%CE%BB%CE%B9%CE%BA%CE%B9%CF%89%CE%BC%CE%AD/",
          "https://e-ependyseis.com.gr/%CF%80%CF%81%CE%BF%CE%B3%CF%81%CE%AC%CE%BC%CE%BC%CE%B1%CF%84%CE%B1/%CE%B5%CF%83%CF%80%CE%B1-2021-2027/",
        ],
      },
      {
        date: "2025-12-11",
        meetingId: "dec11_2025",
        meetingName: "Δημοτικό Συμβούλιο 11/12/25",
        subjectId: "cmlh80rql00bvypx4ul66tefl",
        subjectName: "Παράταση μίσθωσης ΚΑΠΗ Πενταλόφου",
        summary:
          "Έγκριση παράτασης μίσθωσης ακινήτου που στεγάζεται το ΚΑΠΗ Πενταλόφου. Ο Δημούτσης εξήγησε ότι η μίσθωση λήγει στις 31/12/2025 και το συμφωνητικό δίνει δυνατότητα παράτασης τριών ετών. Ο Μαυρίδης και ο Καζαλτζής συμφώνησαν. Εγκρίθηκε ομόφωνα.",
        citationUrls: [
          "https://el.wikipedia.org/wiki/%CE%9A%CE%AD%CE%BD%CF%84%CF%81%CE%BF_%CE%91%CE%BD%CE%BF%CE%B9%CF%87%CF%84%CE%AE%CF%82_%CE%A0%CF%81%CE%BF%CF%83%CF%84%CE%B1%CF%83%CE%AF%CE%B1%CF%82_%CE%97%CE%BB%CE%B9%CE%BA%CE%B9%CF%89%CE%BC%CE%AD%CE%BD%CF%89%CE%BD",
          "https://www.opengov.gr/ypes/?p=5770",
          "https://www.lawspot.gr/nomikes-plirofories/nomothesia/n-4555-2018/arthro-196-nomos-4555-2018-ekmisthosi-akiniton-ton-dimon",
          "https://el.wikipedia.org/wiki/%CE%A0%CE%B5%CE%BD%CF%84%CE%AC%CE%BB%CE%BF%CF%86%CE%BF%CF%82_%CE%88%CE%B2%CF%81%CE%BF%CF%85",
        ],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85i3t00zlb8q8g4mfd2bl",
        subjectName: "Εκμίσθωση κυλικείου ΚΑΠΗ Κομάρων",
        summary:
          "Έγκριση εκμίσθωσης κυλικείου ΚΑΠΗ στο πνευματικό κέντρο Κομάρων μέσω πλειοδοτικής δημοπρασίας. Ο Αστεριάδης εισηγήθηκε ότι το συμφωνητικό λήγει στις 31 Ιανουαρίου και υπάρχει σύμφωνη γνώμη της τοπικής κοινότητας.",
        citationUrls: [
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%A0%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%BC%CE%B5_%CE%B4%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1_%CF%84%CE%BF%CF%85_%CE%B4%CE%B9%CE%BA%CE%B1%CE%B9%CF%8E%CE%BC%CE%B1%CF%84%CE%BF%CF%82_%CE%B5%CE%BA%CE%BC%CE%B5%CF%84%CE%AC%CE%BB%CE%BB%CE%B5%CF%85%CF%83%CE%B7%CF%82_%CE%BA%CF%85%CE%BB%CE%B9%CE%BA%CE%B5%CE%AF%CF%89%CE%BD_%CE%B5%CE%BD%CF%84%CF%8C%CF%82_%CE%BA%CF%84%CE%B7%CF%81%CE%AF%CF%89%CE%BD_%CF%8C%CF%80%CE%BF%CF%85_%CF%83%CF%84%CE%B5%CE%B3%CE%AC%CE%B6%CE%BF%CE%BD%CF%84%CE%B1%CE%B9_%CF%85%CF%80%CE%B7%CF%81%CE%B5%CF%83%CE%AF%CE%B5%CF%82_%CE%9F%CE%A4%CE%91_%CE%91_%CE%B2%CE%B1%CE%B8%CE%BC%CE%BF%CF%8D",
          "https://www.thermaikos.gr/thermaikos_media/2024/03/%CE%A3%CE%A7%CE%95%CE%94%CE%99%CE%9F-%CE%9A%CE%91%CE%9D%CE%9F%CE%9D%CE%99%CE%A3%CE%9C%CE%9F%CE%A3-%CE%9B%CE%95%CE%99%CE%A4%CE%9F%CE%A5%CE%A1%CE%93%CE%99%CE%91%CE%A3-%CE%9A%CE%91%CE%A0%CE%97.pdf",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%95%CE%BA%CE%BC%CE%AF%CF%83%CE%B8%CF%89%CF%83%CE%B7_%CE%91%CE%BA%CE%B9%CE%BD%CE%AE%CF%84%CE%BF%CF%85_%CE%94%CE%AE%CE%BC%CE%BF%CF%85_%CE%BC%CE%B5_%CE%94%CE%B7%CE%BC%CE%BF%CF%80%CF%81%CE%B1%CF%83%CE%AF%CE%B1",
        ],
      },
      {
        date: "2026-02-11",
        meetingId: "feb11_2026",
        meetingName: "Δημοτικό Συμβούλιο 11/02/26",
        subjectId: "cmljgfy5103uewvnf0jmpgrmn",
        subjectName: "Παράταση Μίσθωσης Κέντρου Σίτισης",
        summary:
          "Έγκριση παράτασης μίσθωσης του ακινήτου στην οδό Βίτση 28 στην Ορεστιάδα, όπου στεγάζεται το Κέντρο Σίτισης και η Δομή Σίτισης. Ο Δημούτσης εισηγήθηκε παράταση τριών ετών (1. 3. 2026 – 28. 2. 2029) με μηνιαίο μίσθωμα 480 ευρώ.",
        citationUrls: [
          "https://orestiada.gr/dimos/ygeia-koinoniki-merimna/domi-sitisis-dimou-orestiadas/",
          "https://www.anagnostis.org/2025/11/24/synecheia-chrimatodotisis-eos-to-2029-gia-tis-koinonikes-domes-i-megali-symfonia-pou-allazei-to-topio-se-dimous-kai-foreis/",
          "https://www.serrespost.gr/2025/12/16/statheri-politiki-koinonikis-allilengyis-apo-tin-perifereia-amth-synechizetai-i-chrimatodotisi-gia-kentra-koinotitas-domes-sitisis-kai-kentra-frontidas-ilikiomenon-se-dimous-me-apofasi-tou-perifereia/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o550a4910gomobqc7s2",
        subjectName: "Δημιουργία γηροκομείου",
        summary:
          "Ερώτημα του κ. Αγγελακούδη για τη δημιουργία γηροκομείου, θέμα που είχε τεθεί από τον κ. Καζαλτζή τον Απρίλιο 2024. Ο κ.",
        citationUrls: [
          "https://oikogeneia.gov.gr/programs/monades-frontidas-ilikiomenon/",
          "https://orthodoxostypos.gr/%CE%BF-%CE%AD%CE%B2%CF%81%CE%BF%CF%82-%CF%83%CF%84%CE%BF-%CF%84%CE%AD%CE%BB%CE%BF%CF%82-%CF%84%CE%BF%CF%85-%CE%AD%CF%84%CE%BF%CF%85%CF%82-%CE%AE-%CE%B7-%CE%B1%CE%BD%CE%B1%CE%B3%CE%AD%CE%BD%CE%BD%CE%B7/",
          "https://pelop.gr/dimografiko-ta-3-senaria-gia-tis-genniseis-to-2050-poies-perioches-pou-ekpeboun-sos/",
        ],
      },
    ],
  },
  {
    slug: "texniko-programma",
    cityId: "orestiada",
    name: "Τεχνικό Πρόγραμμα Δήμου",
    type: "TOPIC",
    typeLabel: "Θέμα",
    summary:
      "Ο φάκελος συγκεντρώνει εγκρίσεις και τροποποιήσεις τεχνικού προγράμματος. Δείχνει πώς μεταβάλλεται ο προγραμματισμός έργων μέσα στη χρονιά και πότε επανέρχεται στο δημοτικό συμβούλιο. (4 πραγματικά subjects σε 3 συνεδριάσεις.)",
    externalContext:
      "Το τεχνικό πρόγραμμα είναι τυπικό εργαλείο προγραμματισμού έργων δήμου. Στο demo η τεκμηρίωση μένει κυρίως στις συνεδριάσεις και στις πηγές κάθε καταχώρησης.",
    sourcingLevel: "minimal",
    trendingScore: 59,
    subscribers: 91,
    minutesDiscussed: 118,
    featured: false,
    entries: [
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpyec0um3sirrex19iz21",
        subjectName: "Έγκριση Τεχνικού Προγράμματος 2026",
        summary:
          "Έγκριση του Τεχνικού Προγράμματος του Δήμου Ορεστιάδας για το έτος 2026. Το πρόγραμμα περιλαμβάνει 33 κωδικούς έργων με συνολικό προϋπολογισμό 13.594. 000 ευρώ, εκ των οποίων το 75% είναι συνεχιζόμενα έργα από προηγούμενες θητείες.",
        citationUrls: [],
      },
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpymu0v4jsirrkkjdx4sr",
        subjectName: "6η τροποποίηση τεχνικού προγράμματος 2025",
        summary:
          "Έγκριση της 6ης τροποποίησης του τεχνικού προγράμματος 2025 που αφορά το έργο της ΣΒΑΑ. Η τροποποίηση περιλαμβάνει αύξηση του προϋπολογισμού από 7.202.000 ευρώ στα 7.861.000 ευρώ και ενσωματώνει ολοκληρωτικά τον φωτισμό του έργου της ΣΒΑΑ.",
        citationUrls: [],
      },
      {
        date: "2026-01-21",
        meetingId: "jan21_2026",
        meetingName: "Δημοτικό Συμβούλιο 21/01/26",
        subjectId: "cmlh85hyn00u2b8q8g03meilt",
        subjectName: "Τροποποίηση τεχνικού προγράμματος 2026",
        summary:
          "Πρώτη τροποποίηση του τεχνικού προγράμματος 2026 με εγγραφή δύο νέων έργων: ανάπλαση άλσους Αδριανουπόλεως (287.200€ από Interreg Next Black Sea, διασυνοριακό πρόγραμμα) και εξωραϊσμός πλατείας Φυλακίου (40.000€ από Υπουργείο Μετανάστευσης και Ασύλου). Ο Καδόγλου εισηγήθηκε τα δύο έργα.",
        citationUrls: [
          "https://sierafm.gr/%CE%B5%CE%B3%CE%BA%CF%81%CE%AF%CE%B8%CE%B7%CE%BA%CE%B5-%CF%84%CE%BF-%CF%84%CE%B5%CF%87%CE%BD%CE%B9%CE%BA%CF%8C-%CF%80%CF%81%CF%8C%CE%B3%CF%81%CE%B1%CE%BC%CE%BC%CE%B1-%CF%84%CE%BF%CF%85-%CE%B4%CE%AE/",
          "https://eordaialive.com/topikes-eidhseis/egkrithike-to-techniko-programma-toy-dimoy-servion-gia-to-2026/",
          "https://www.blacksea-cbc.net/",
          "https://migration.gov.gr/en/ris/perifereiakes-monades/kyt-domes/k-y-t-orestiadas/",
          "https://www.sofokleousin.gr/sygkentrosi-diamartyrias-stin-orestiada-gia-tin-epektasi-tou-kyt-",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txc6m16ydz3nxgjsdr02l",
        subjectName: "Τροποποίηση τεχνικού προγράμματος 2026",
        summary:
          "2η τροποποίηση τεχνικού προγράμματος που περιλαμβάνει εγγραφή 1 εκατ. ευρώ από το Ταμείο Αλληλεγγύης (Υπουργείο Μετανάστευσης) για ασφαλτοστρώσεις, αύξηση 2.",
        citationUrls: [
          "http://www.nomoskopio.gr/n_3463_06_208.php?toc=0",
          "https://migration.gov.gr/en/tag/tameio-allileggyis/",
          "https://migration.gov.gr/en/chrimatodotisi-me-925-000-eyro-tessaron-dimon-apo-to-tameio-allileggyis-toy-ypoyrgeioy-metanasteysis-kai-asyloy/",
          "https://pameevro.gr/orestiada-1-ekatommyrio-odopoiia-keletsis-dermentzopoulos-kyt-fylakiou/",
          "https://migration.gov.gr/en/ris/perifereiakes-monades/kyt-domes/k-y-t-orestiadas/",
          "https://www.evros-news.gr/2024/03/25/%CE%B5%CE%B2%CF%81%CE%BF%CF%82-%CE%BE%CE%B5%CE%BA%CE%AF%CE%BD%CE%B7%CF%83%CE%B5-%CE%BD%CE%B1-%CE%BB%CE%B5%CE%B9%CF%84%CE%BF%CF%85%CF%81%CE%B3%CE%B5%CE%AF-%CF%84%CE%BF-%CE%BD%CE%AD%CE%BF-%CE%BA%CF%85/",
        ],
      },
    ],
  },
  {
    slug: "oinoi",
    cityId: "orestiada",
    name: "Οινόη (κοινότητα)",
    type: "LOCATION",
    typeLabel: "Τοποθεσία",
    summary:
      "Ο φάκελος συνδέει θέματα που αφορούν την Οινόη, από ΚΔΑΠ και κοιμητήρια μέχρι χρήση πλατείας. Είναι παράδειγμα τοπικού φακέλου όπου η αξία είναι η συγκέντρωση διάσπαρτων αναφορών σε μία κοινότητα. (4 πραγματικά subjects σε 4 συνεδριάσεις.)",
    externalContext:
      "Η εξωτερική τεκμηρίωση είναι ελάχιστη, επειδή ο φάκελος αφορά τοπικά διοικητικά θέματα με βασική πηγή το χρονολόγιο του συμβουλίου.",
    sourcingLevel: "minimal",
    trendingScore: 52,
    subscribers: 64,
    minutesDiscussed: 67,
    featured: false,
    entries: [
      {
        date: "2025-11-21",
        meetingId: "nov21_2025",
        meetingName: "Δημοτικό Συμβούλιο 21/11/25",
        subjectId: "cmifzpys40vcisirrsp1jicny",
        subjectName: "Κάλυψη κενών θέσεων ΚΔΑΠ Οινόης",
        summary:
          "Έγκριση κάλυψης κενών θέσεων της δομής ΚΔΑΠ Οινόης για το σχολικό έτος 2025-2026. Αφορά την κάλυψη 26 θέσεων από παιδιά που δεν έχουν βάουτσερ αλλά έχουν ολοκληρωμένους φακέλους.",
        citationUrls: [],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o2c0a3z10gogql8lhkk",
        subjectName: "Επέκταση κοιμητηρίων Άνω Οινόης",
        summary:
          "Ερώτημα του κ. Καζαλτζή για την επέκταση των κοιμητηρίων της Άνω Οινόης, όπου δεν υπάρχει πλέον χώρος για ενταφιασμό. Ο κ. Καδόγλου αναφέρει ότι υπάρχουν [150.",
        citationUrls: [
          "https://www.tetravivlos.com/news/608",
          "https://kede.gr/ypes-ta-koimitiria-anikoun-stin-apokleistiki-armodiotita-ton-dimon/",
          "http://www.nomoskopio.gr/pd_14_7_99_190.php",
          "https://www.lawspot.gr/nomothesia/n-4495-2017/arthro-148-nomos-4495-2017-tropopoiisi-diataxeon/",
          "https://geosynolo.gr/index.php?option=com_content&view=article&id=30&Itemid=143&lang=el",
        ],
      },
      {
        date: "2026-04-28",
        meetingId: "apr28_3_2026",
        meetingName: "Δημοτικό Συμβούλιο 28/04/26",
        subjectId: "cmocwqpis0343grw5buelt85e",
        subjectName: "Διαγραφή παιδιού από ΚΔΑΠ Οινόης",
        summary:
          "Εγκρίθηκε ομόφωνα η διαγραφή φιλοξενούμενου παιδιού από το ΚΔΑΠ Οινόης (πρόγραμμα ΕΣΠΑ), κατόπιν αίτησης — το παιδί μετακινήθηκε σε ιδιωτικό ΚΔΑΠ. Ο κ.",
        citationUrls: [
          "https://www.e-schooling.gr/ti-einai-ta-kdap-kentra-dimiourgikis-apasxolisis-paidiwn/",
          "https://elarisa.gr/blog/kdap/kentra-dimiourgikis-apasxolisi-ti-einai-poia-ta-ofeli/",
          "https://www.agan.gov.gr/%CE%BA%CE%B4%CE%B1%CF%80",
          "https://www.espa.gr/el/Pages/NewsFS.aspx?item=1941",
          "https://www.trikalanews.gr/kinhtopoihseis-ergazomenoi-espa-trikala-kdap-stathmoi/",
          "https://olympiobima.gr/kinitopoiiseis-stin-katerini-gia-tous-ergazomenous-se-kdap-kai-paidikous/",
        ],
        decision: {
          ada: "ΨΤΣΧΩΞΒ-5ΔΥ",
          title:
            "Έγκριση διαγραφών φιλοξενουμένων παιδιών στο Κ.Δ.Α.Π. Οινόης του Δήμου Ορεστιάδας για το σχολικό έτος 2025-2026 μέσω του προγράμματος ΕΣΠΑ «Προώθηση και υποστήριξη παιδιών για την ένταξή τους στην προσχολική εκπαίδευση καθώς και για την πρόσβαση παιδιών σχολικής ηλικίας, εφήβων και ατόμων με αναπηρία, σε υπηρεσίες δημιουργικής απασχόλησης περιόδου 2025-2026»",
          pdfUrl: "https://diavgeia.gov.gr/doc/ΨΤΣΧΩΞΒ-5ΔΥ",
        },
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmp5txcbh16ypz3nxcmwch3v1",
        subjectName: "Παραχώρηση Πλατείας Παλιάς Οινόης",
        summary:
          "Θα εξεταστεί η παραχώρηση του χώρου Πλατείας Παλιάς Οινόης από το Υπουργείο Αγροτικής Ανάπτυξης και Τροφίμων για Πολιτιστική & Περιβαλλοντική Αξιοποίηση.",
        citationUrls: [
          "http://www.nomoskopio.gr/n_3463_06_185.php?toc=0",
          "https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%94%CF%89%CF%81%CE%B5%CE%AC%CE%BD_%CE%A0%CE%B1%CF%81%CE%B1%CF%87%CF%8E%CF%81%CE%B7%CF%83%CE%B7_%CE%A7%CF%81%CE%AE%CF%83%CE%B7%CF%82_%CE%94%CE%B7%CE%BC%CE%BF%CF%84%CE%B9%CE%BA%CE%BF%CF%8D_%CE%91%CE%BA%CE%B9%CE%BD%CE%AE%CF%84%CE%BF%CF%85",
        ],
      },
    ],
  },
  {
    slug: "pyrosvestiki-politiki-prostasia",
    cityId: "orestiada",
    name: "Πυροσβεστική & Πολιτική Προστασία",
    type: "ORGANIZATION",
    typeLabel: "Οργανισμός",
    summary:
      "Ο φάκελος ενώνει θέματα εκπαίδευσης, παραχώρησης χώρου και εξοπλισμού πολιτικής προστασίας. Δείχνει πώς οι υπηρεσίες ετοιμότητας εμφανίζονται σε διαφορετικές αποφάσεις του συμβουλίου. (3 πραγματικά subjects σε 3 συνεδριάσεις.)",
    externalContext:
      "Η πολιτική προστασία και η πυροσβεστική συνεργασία έχουν θεσμικό υπόβαθρο, αλλά οι συγκεκριμένες καταχωρήσεις παραμένουν κυρίως τοπικές αποφάσεις.",
    sourcingLevel: "moderate",
    trendingScore: 49,
    subscribers: 58,
    minutesDiscussed: 61,
    featured: false,
    entries: [
      {
        date: "2026-03-03",
        meetingId: "mar3_2_2026",
        meetingName: "Δημοτικό Συμβούλιο 03/03/26",
        subjectId: "cmmda3m51019641ya194ybvjd",
        subjectName: "Εκπαίδευση Πυροσβεστικής Υπηρεσίας",
        summary:
          "Παραχώρηση αίθουσας Πολιτιστικού Πολύκεντρου στην Πυροσβεστική Υπηρεσία Ορεστιάδας για εκπαίδευση πρώτων βοηθειών από κλιμάκιο ΕΚΑΒ Αλεξανδρούπολης στις 26.3.2026, 8:30-14:00. Εγκρίθηκε ομόφωνα μαζί με τα θέματα 9 και 10.",
        citationUrls: [
          "https://www.ekab.gr/ekpedefsi/",
          "https://www.ekab.gr/ekpedefsi/ekpedefsi-kinonikon-omadon/",
          "https://dete.gr/triimeri-ekpaidefsi-kai-askiseis-etoimotitas-apo-tin-pyrosvestiki-ypiresia-kalavryton/",
          "https://www.powergame.gr/ellada/1315248/scholes-pyrosvestikis-i-prokiryxi-kai-pote-anoigoun-oi-aitiseis/",
          "https://www.radioevros.gr/ekpedeysis-led-orestiadas/",
        ],
      },
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o3t0a4410gozz2ouajt",
        subjectName: "Παραχώρηση τμήματος οικοπέδου στην Πυροσβεστική",
        summary:
          "Ερώτημα του κ. Περιστεράκη για την πορεία της απόφασης παραχώρησης οικοπέδου στην Πυροσβεστική Υπηρεσία Ορεστιάδας (9 Ιουλίου 2025). Ρωτά αν στάλθηκε στην Αποκεντρωμένη για έλεγχο νομιμότητας, αν επέστρεψε και αν κοινοποιήθηκε. Ο Δήμαρχος κ.",
        citationUrls: [
          "https://www.m-t.gov.gr/en/q-amp-atdopierias/",
          "https://www.prevedourou.gr/%CE%BF-%CE%AD%CE%BB%CE%B5%CE%B3%CF%87%CE%BF%CF%82-%CE%BD%CE%BF%CE%BC%CE%B9%CE%BC%CF%8C%CF%84%CE%B7%CF%84%CE%B1%CF%82-%CF%84%CF%89%CE%BD-%CF%80%CF%81%CE%AC%CE%BE%CE%B5%CF%89%CE%BD-%CF%84%CF%89%CE%BD/",
          "https://pameevro.gr/politiki-prostasia-orestiada-pyrkagies-2026/",
          "https://www.pomida.gr/pyroprostasia.php",
        ],
      },
      {
        date: "2026-04-28",
        meetingId: "apr28_3_2026",
        meetingName: "Δημοτικό Συμβούλιο 28/04/26",
        subjectId: "cmocwqpl8034agrw5ofwej2z1",
        subjectName: "Εγκατάσταση GPS στα οχήματα πολιτικής προστασίας",
        summary:
          "Εγκρίθηκε ομόφωνα η εγκατάσταση συστημάτων γεωεντοπισμού (GPS) στα οχήματα και μηχανήματα έργου του Δήμου για ενίσχυση της πολιτικής προστασίας. Ο κ.",
        citationUrls: [
          "https://www.ktpae.gr/erga/systima-diacheirisis-stolou-ochimaton-gps-pyrosvestikou-somatos-ochimaton-politikis-prostasias-perifereion-kai-dimon/",
          "https://ecozen.gr/2026/04/o-dimos-varis-voulas-vouliagmenis-enonei-tis-dynameis-tou-me-ti-hellas-sat-gia-tin-politiki-prostasia/",
          "https://www.formedia.gr/2026/01/04/thessalia-neos-stolos-43-ochimaton-kai-ektetamenes-ependyseis-politikis-prostasias-se-23-dimous-analytika-o-exoplismos-ana-dimo/",
          "https://www.pineiosnews.gr/2026/01/04/thessalia-neos-stolos-43-ochimaton-kai-ektetamenes-ependyseis-politikis-prostasias-se-23-dimous/",
          "https://kede.gr/interaigis-2026-sto-proskinio-politiki-prostasia-kai-ota/",
        ],
        decision: {
          ada: "961ΗΩΞΒ-6ΡΓ",
          title:
            "Επιχειρησιακή ανάγκη εγκατάστασης συστημάτων γεωεντοπισμού (GPS) στον στόλο οχημάτων και μηχανημάτων έργου για την ενίσχυση της πολιτικής προστασίας του Δήμου Ορεστιάδας",
          pdfUrl: "https://diavgeia.gov.gr/doc/961ΗΩΞΒ-6ΡΓ",
        },
      },
    ],
  },
  {
    slug: "roma-entaxi",
    cityId: "orestiada",
    name: "Ένταξη Ρομά",
    type: "TOPIC",
    typeLabel: "Θέμα",
    summary:
      "Ο φάκελος συγκεντρώνει έργα και παρεμβάσεις που σχετίζονται με υποδομές και ένταξη Ρομά. Με λίγες αλλά σαφείς καταχωρήσεις, δείχνει πώς ένα κοινωνικό θέμα μπορεί να αποκτήσει παρακολουθήσιμο χρονολόγιο. (2 πραγματικά subjects σε 2 συνεδριάσεις.)",
    externalContext:
      "Η ένταξη Ρομά συνδέεται με δημόσιες πολιτικές κοινωνικής ένταξης και υποδομών. Οι πηγές του demo προέρχονται κυρίως από τα subjects και τις σχετικές αποφάσεις.",
    sourcingLevel: "moderate",
    trendingScore: 41,
    subscribers: 46,
    minutesDiscussed: 55,
    featured: false,
    entries: [
      {
        date: "2026-04-27",
        meetingId: "apr27_2026",
        meetingName: "Ειδική Συνεδρίαση Λογοδοσίας 27/04/26",
        subjectId: "cmocw9o5i0a4a10go9tevkkqg",
        subjectName: "Βελτίωση υποδομών λαϊκών αγορών Ρωμά",
        summary:
          "Το θέμα αφορά τη βελτίωση υποδομών λαϊκών αγορών στον οικισμό Κλεισσούς. Εισηγητής είναι ο κ. Αγγελακούδης.",
        citationUrls: [
          "https://www.laikesagores.gr/",
          "https://www.e-nomothesia.gr/kat-emporeio/ypaithrio-emporio-laikes-agores/",
          "https://www.myota.gr/2021/11/08/4849-%CE%BF-%CE%BD%CE%AD%CE%BF%CF%82-%CE%BD%CF%8C%CE%BC%CE%BF%CF%82-%CE%B3%CE%B9%CE%B1-%CF%84%CE%B9%CF%82-%CE%BB%CE%B1%CF%8A%CE%BA%CE%AD%CF%82-%CE%B1%CE%B3%CE%BF%CF%81%CE%AD%CF%82/",
          "https://www.egnomi.gr/article/147451/apografi_2021_posoi_einai_oi_roma_stin_ellada_pws_katanemetai_plithysmos.html",
          "https://www.lifo.gr/articles/roma-polla-ta-kondylia-mikri-i-ensomatosi",
          "https://www.tanea.gr/2026/04/20/economy/anoigoun-ksana-oi-adeies-gia-tis-laikes-agores-stin-attiki-ti-allazei-me-to-neo-nomosxedio/",
        ],
      },
      {
        date: "2026-05-18",
        meetingId: "may18_2026",
        meetingName: "Δημοτικό Συμβούλιο 18/05/26",
        subjectId: "cmpfk2ccu0v2a11vdt1c6lk3m",
        subjectName: "Έργο Ρομά Ζαρύφη και αντικατάσταση λαμπτήρων",
        summary:
          "Ο κ. Παπαδόπουλος ανακοινώνει την έναρξη εργασιών για το έργο των Ρομά (Ζαρύφη) και την πρόοδο της διαδικασίας αντικατάστασης λαμπτήρων, με την έγκριση της αποθήκης παραλαβής.",
        citationUrls: [],
      },
    ],
  },
];

export const DOSSIER_CITIES: DossierCity[] = [
  {
    id: "orestiada",
    name: "Ορεστιάδα",
    dossierCount: DOSSIERS.length,
    subjectCount: 88,
    featuredDossierSlugs: DOSSIERS.filter((d) => d.featured).map((d) => d.slug),
  },
];

export function getDossierCities(): DossierCity[] {
  return DOSSIER_CITIES;
}

export function getDossierCity(cityId: string): DossierCity | undefined {
  return DOSSIER_CITIES.find((city) => city.id === cityId);
}

export function getDossiers(cityId = "orestiada"): Dossier[] {
  // Sorted by mock trending score, descending — mirrors «Ενεργοί Φάκελοι».
  return DOSSIERS.filter((d) => d.cityId === cityId).sort(
    (a, b) => b.trendingScore - a.trendingScore,
  );
}

export function getFeaturedDossiers(cityId = "orestiada"): Dossier[] {
  return getDossiers(cityId).filter((d) => d.featured);
}

export function getGlobalTrendingDossiers(): Dossier[] {
  return [...DOSSIERS]
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, 6);
}

export function getDossierBySlug(
  cityId: string,
  slug: string,
): Dossier | undefined {
  return DOSSIERS.find((d) => d.cityId === cityId && d.slug === slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// PROOF: empirically-found clusters (from analyzing the real subject names)
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
  {
    name: "Πολιτιστικό Πολύκεντρο",
    type: "LOCATION / ORGANIZATION",
    subjects: 14,
    meetings: 5,
    inIssue291: true,
  },
  {
    name: "Παιδικοί σταθμοί / νήπια",
    type: "TOPIC / ORGANIZATION",
    subjects: 18,
    meetings: 10,
    inIssue291: true,
  },
  {
    name: "Αδέσποτα ζώα",
    type: "PROJECT",
    subjects: 5,
    meetings: 5,
    inIssue291: true,
  },
  {
    name: "Διαδημοτική Επιχείρηση Άρδα",
    type: "ORGANIZATION",
    subjects: 5,
    meetings: 4,
    inIssue291: true,
  },
  {
    name: "Ραδιοτηλεόραση / τοπικός σταθμός",
    type: "ORGANIZATION",
    subjects: 5,
    meetings: 4,
    inIssue291: true,
  },
  {
    name: "Οινόη (κοινότητα)",
    type: "LOCATION",
    subjects: 4,
    meetings: 4,
    inIssue291: true,
  },
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
  {
    entity: "Οργανισμός / επιχείρηση κοινής ωφέλειας",
    sources: "Wikipedia + Διαύγεια + ΦΕΚ + νομοθεσία",
    level: "rich",
  },
  {
    entity: "Έργο / προμήθεια",
    sources: "Απόφαση Διαύγεια + διαγωνισμός ΚΗΜΔΗΣ",
    level: "moderate",
  },
  {
    entity: "Τοποθεσία / φορέας με νομικό πλαίσιο",
    sources: "Σχετική νομοθεσία + φορέας διαχείρισης",
    level: "moderate",
  },
  {
    entity: "Σχολείο / απλό τοπικό θέμα",
    sources: "Μόνο το εσωτερικό χρονολόγιο του συμβουλίου",
    level: "minimal",
  },
];
