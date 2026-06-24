import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters/time";
import {
  getDossierBySlug,
  getDossierCity,
} from "../../_data/orestiada-dossiers";
import { InlineBadge } from "../../_components/bits";
import { SourceChips } from "../../_components/SourceChips";

const PREVIEW_LINKS = [
  {
    dossierSlug: "politistiko-polykentro",
    subjectId: "cmlh85i7p012tb8q8vpave866",
    minutes: 8,
    speakers: 2,
  },
  {
    dossierSlug: "paidikos-stathmos-dikaion",
    subjectId: "cmocw9o2q0a4010go5ckqqees",
    minutes: 14,
    speakers: 4,
  },
];

export const metadata = {
  title: "Φάκελος badge subject preview — Demo (dev)",
};

export function generateStaticParams() {
  return [{ city: "orestiada" }];
}

export default async function SubjectPreviewPage(props: {
  params: Promise<{ locale: string; city: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { locale, city } = await props.params;
  const dossierCity = getDossierCity(city);
  if (!dossierCity) {
    notFound();
  }

  const previews = PREVIEW_LINKS.map((preview) => {
    const dossier = getDossierBySlug(city, preview.dossierSlug);
    const entry = dossier?.entries.find(
      (item) => item.subjectId === preview.subjectId,
    );
    return dossier && entry
      ? { dossier, entry, minutes: preview.minutes, speakers: preview.speakers }
      : null;
  }).filter(
    (preview): preview is NonNullable<typeof preview> => preview !== null,
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <Link
        href={`/${locale}/dev/dossiers/${city}`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Φάκελοι {dossierCity.name}
      </Link>

      <header className="mt-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          DEV-ONLY DEMO · inline badge mock
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Πώς φαίνεται ο Φάκελος μέσα σε subject
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Δύο πραγματικά subjects της Ορεστιάδας, σε faithful mock της σημερινής
          κάρτας subject, με το inline badge στη θέση όπου ο πολίτης διαβάζει το
          θέμα.
        </p>
      </header>

      <div className="mt-8 space-y-5">
        {previews.map(({ dossier, entry, minutes, speakers }) => (
          <Card key={entry.subjectId} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="border-b bg-muted/30 px-4 py-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    {entry.meetingName}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{dossierCity.name}</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(new Date(entry.date), undefined, locale)}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-5">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {minutes} λεπτά
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {speakers} ομιλητές
                  </Badge>
                  {entry.decision && (
                    <Badge className="gap-1.5 bg-amber-100 text-amber-900 hover:bg-amber-100">
                      <FileText className="h-3.5 w-3.5" />
                      Απόφαση {entry.decision.ada}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold leading-tight">
                      {entry.subjectName}
                    </h2>
                    <Link
                      href={`/${locale}/dev/dossiers/${city}/${dossier.slug}`}
                    >
                      <InlineBadge name={dossier.name} />
                    </Link>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {entry.summary}
                  </p>
                  <SourceChips urls={entry.citationUrls} />
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium">
                  <Link
                    href={`/${locale}/${city}/${entry.meetingId}/subjects/${entry.subjectId}`}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Άνοιγμα πραγματικού subject
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={`/${locale}/dev/dossiers/${city}/${dossier.slug}`}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    Άνοιγμα φακέλου
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
