type SubjectWithTopic = {
    id: string;
    name: string;
    description: string;
    cityId: string;
    councilMeetingId: string;
    topic: { id: string; name: string; colorHex: string; icon: string | null } | null;
};

/**
 * Given an array of utterances (each with an optional discussionSubject),
 * returns the subject that appears most frequently (plurality). Returns null
 * if all utterances have no subject.
 */
export function resolvePluralitySubject(
    utterances: { discussionSubject: SubjectWithTopic | null }[]
): SubjectWithTopic | null {
    const counts = new Map<string, { subject: SubjectWithTopic; count: number }>();
    for (const u of utterances) {
        if (u.discussionSubject == null) continue;
        const existing = counts.get(u.discussionSubject.id);
        if (existing) {
            existing.count += 1;
        } else {
            counts.set(u.discussionSubject.id, { subject: u.discussionSubject, count: 1 });
        }
    }
    if (counts.size === 0) return null;
    let best: SubjectWithTopic | null = null;
    let bestCount = 0;
    for (const { subject, count } of counts.values()) {
        if (count > bestCount) {
            best = subject;
            bestCount = count;
        }
    }
    return best;
}
