import { Card, CardContent } from "@/components/ui/card";
import { cn, getPartyFromRoles, formatTimestamp } from "@/lib/utils";
import { PersonBadge } from "../persons/PersonBadge";
import { SegmentWithRelations } from "@/lib/db/speakerSegments";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { el, enUS } from "date-fns/locale";
import { CollapsibleCard } from "@/components/ui/collapsible-card";

function TopicTag({ name, colorHex }: { name: string; colorHex: string }) {
    return (
        <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
                backgroundColor: `${colorHex}22`,
                color: colorHex,
                border: `1px solid ${colorHex}44`
            }}
        >
            {name}
        </span>
    );
}

export function Result({ result, className }: { result: SegmentWithRelations, className?: string }) {
    const locale = useLocale();
    const t = useTranslations('Person');

    const party = result.person ? getPartyFromRoles(result.person.roles) : null;
    const borderColor = party?.colorHex || '#D3D3D3';
    const timeParam = `t=${Math.floor(result.startTimestamp)}`;
    const transcriptUrl = `/${result.meeting.city.id}/${result.meeting.id}/transcript?${timeParam}`;

    const hasSubject = result.subject != null;

    return (
        <Card
            className={cn("hover:shadow-md transition-shadow", className)}
        >
            <CardContent className="p-4 flex flex-col space-y-4 relative">
                {/* Colored left bar */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] sm:w-1"
                    style={{
                        backgroundColor: borderColor,
                        borderTopLeftRadius: 'calc(0.5rem - 1.5px)',
                        borderBottomLeftRadius: 'calc(0.5rem - 1.5px)'
                    }}
                />
                <div className="pl-3 sm:pl-4">
                    <div className="flex flex-col space-y-2">
                        {/* Header row: city + date + timestamp */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <Link
                                href={`/${result.meeting.city.id}`}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                {result.meeting.city.name}
                            </Link>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Link
                                    href={`/${result.meeting.city.id}/${result.meeting.id}`}
                                    className="hover:text-foreground"
                                >
                                    {format(new Date(result.meeting.dateTime), 'PPP', { locale: locale === 'el' ? el : enUS })}
                                </Link>
                                <span>•</span>
                                <span>{formatTimestamp(result.startTimestamp)}</span>
                            </div>
                        </div>

                        <PersonBadge
                            person={result.person || undefined}
                        />
                    </div>

                    {hasSubject ? (
                        /* Subject-first layout */
                        <div className="flex flex-col space-y-3 mt-3">
                            {/* Subject title + inline topic badge */}
                            <div className="flex flex-wrap items-center gap-2">
                                <Link
                                    href={`/${result.meeting.city.id}/${result.meeting.id}/subjects/${result.subject!.id}`}
                                    className="font-semibold text-foreground hover:underline"
                                >
                                    {result.subject!.name}
                                </Link>
                                {result.subject!.topic && (
                                    <TopicTag
                                        name={result.subject!.topic.name}
                                        colorHex={result.subject!.topic.colorHex}
                                    />
                                )}
                            </div>

                            {/* Subject description */}
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {result.subject!.description}
                            </p>

                            {/* Topic tags row */}
                            {result.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {result.topics.map(topic => (
                                        <TopicTag
                                            key={topic.id}
                                            name={topic.name}
                                            colorHex={topic.colorHex}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Collapsible full transcript text */}
                            <CollapsibleCard title={t('whatTheySaid')} defaultOpen={false}>
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                        {result.text}
                                    </p>
                                </div>
                            </CollapsibleCard>
                        </div>
                    ) : (
                        /* Legacy layout: summary + expandable text */
                        <div className="mt-3 flex flex-col space-y-2">
                            {result.summary && (
                                <div className="pl-4 border-l-2 border-muted mb-2">
                                    <p className="text-muted-foreground">
                                        {result.summary.text}
                                    </p>
                                </div>
                            )}
                            {result.topics.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-1">
                                    {result.topics.map(topic => (
                                        <TopicTag
                                            key={topic.id}
                                            name={topic.name}
                                            colorHex={topic.colorHex}
                                        />
                                    ))}
                                </div>
                            )}
                            <CollapsibleCard title={t('whatTheySaid')} defaultOpen={false}>
                                <div className="p-4">
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                        {result.text}
                                    </p>
                                </div>
                            </CollapsibleCard>
                        </div>
                    )}

                    <div className="flex justify-end mt-3">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                        >
                            <Link href={transcriptUrl}>
                                <FileText className="h-4 w-4 mr-2" />
                                Απομαγνητοφώνηση
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}