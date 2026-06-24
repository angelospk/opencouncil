import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  Building2,
  ChevronRight,
  FileText,
  Presentation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getDossierCities,
  getGlobalTrendingDossiers,
  PILOT_STATS,
} from "./_data/orestiada-dossiers";
import { TrendingBadge, TypeChip } from "./_components/bits";

export const metadata = {
  title: "Φάκελοι — Demo (dev)",
};

export default async function DossiersGlobalPage(props: {
  params: Promise<{ locale: string }>;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { locale } = await props.params;
  const cities = getDossierCities();
  const trending = getGlobalTrendingDossiers();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
        DEV-ONLY DEMO · Global Φάκελοι
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Φάκελοι</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Ένας <strong>Φάκελος</strong> είναι μια συνεχής αφήγηση ανά υπόθεση:
        ένας οργανισμός, ένα έργο, ένας τόπος ή ένα θέμα που επανέρχεται σε
        πολλές συνεδριάσεις. Το global σημείο δείχνει ποιες πόλεις έχουν
        ενεργούς φακέλους και ποια νήματα κινούνται τώρα.
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
          Ορεστιάδα: {PILOT_STATS.subjects} subjects · {PILOT_STATS.meetings}{" "}
          συνεδριάσεις · {PILOT_STATS.citationPct}% με πηγές
        </span>
      </div>

      <Separator className="my-8" />

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Ενεργοί Φάκελοι</h2>
            <p className="text-sm text-muted-foreground">
              Συγκεντρωτικό trending strip από όλες τις πόλεις.
            </p>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {trending.map((dossier) => (
            <Link
              key={`${dossier.cityId}-${dossier.slug}`}
              href={`/${locale}/dev/dossiers/${dossier.cityId}/${dossier.slug}`}
              className="group block"
            >
              <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-muted/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-base leading-tight">
                      {dossier.name}
                    </CardTitle>
                    <TrendingBadge score={dossier.trendingScore} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2">
                    <TypeChip type={dossier.type} label={dossier.typeLabel} />
                    <span className="text-xs text-muted-foreground">
                      {dossier.entries.length} subjects
                    </span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Άνοιγμα
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      <section>
        <h2 className="text-xl font-semibold">Πόλεις με Φακέλους</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${locale}/dev/dossiers/${city.id}`}
              className="group block"
            >
              <Card className="transition-colors group-hover:border-primary/50 group-hover:bg-muted/30">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Building2 className="h-5 w-5 text-primary" />
                        {city.name}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {city.dossierCount} φάκελοι · {city.subjectCount}{" "}
                        πραγματικές καταχωρήσεις
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
