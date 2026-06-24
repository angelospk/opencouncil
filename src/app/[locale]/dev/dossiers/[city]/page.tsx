import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bell, ChevronRight, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getDossierCity,
  getDossiers,
  PILOT_STATS,
} from "../_data/orestiada-dossiers";
import { TrendingBadge, TypeChip } from "../_components/bits";

export const metadata = {
  title: "Φάκελοι πόλης — Demo (dev)",
};

export function generateStaticParams() {
  return [{ city: "orestiada" }];
}

export default async function CityDossiersPage(props: {
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

  const dossiers = getDossiers(city);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <Link
        href={`/${locale}/dev/dossiers`}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Global Φάκελοι
      </Link>

      <div className="mt-6 mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
        DEV-ONLY DEMO · Δήμος {dossierCity.name}
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Ενεργοί Φάκελοι {dossierCity.name}
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Όλοι οι φάκελοι παρακάτω έχουν πραγματικά subjects από τη βάση της
        Ορεστιάδας. Οι βαθμολογίες trending και οι συνδρομητές είναι mock, τα
        subject counts και οι πηγές είναι πραγματικά.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href={`/${locale}/dev/dossiers/${city}/subject-preview`}>
            <Eye className="mr-2 h-4 w-4" />
            Δείτε subject preview
          </Link>
        </Button>
        <span className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          {dossierCity.dossierCount} φάκελοι · {dossierCity.subjectCount} linked
          subjects · {PILOT_STATS.citationPct}% των Orestiada subjects με πηγές
        </span>
      </div>

      <Separator className="my-8" />

      <div className="grid gap-4">
        {dossiers.map((dossier) => (
          <Link
            key={dossier.slug}
            href={`/${locale}/dev/dossiers/${city}/${dossier.slug}`}
            className="group block"
          >
            <Card className="transition-colors group-hover:border-primary/50 group-hover:bg-muted/30">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-xl leading-tight">
                    {dossier.name}
                  </CardTitle>
                  <TrendingBadge score={dossier.trendingScore} />
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <TypeChip type={dossier.type} label={dossier.typeLabel} />
                  {dossier.featured && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      featured
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {dossier.entries.length} subjects σε{" "}
                    {
                      new Set(dossier.entries.map((entry) => entry.meetingId))
                        .size
                    }{" "}
                    συνεδριάσεις
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {dossier.summary}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Bell className="h-3.5 w-3.5" />
                    {dossier.subscribers} συνδρομητές
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
