import { resolvePluralitySubject } from './resolveSubject';

// Mock subject factories
function makeSubject(id: string) {
    return {
        id,
        name: `Subject ${id}`,
        description: `Description for ${id}`,
        cityId: 'city1',
        councilMeetingId: 'meeting1',
        topic: null,
    };
}

const subjectA = makeSubject('A');
const subjectB = makeSubject('B');

describe('resolvePluralitySubject', () => {
    it('returns the plurality subject when one subject appears more than others', () => {
        const utterances = [
            { discussionSubject: subjectA },
            { discussionSubject: subjectA },
            { discussionSubject: subjectA },
            { discussionSubject: subjectB },
        ];
        const result = resolvePluralitySubject(utterances);
        expect(result).toEqual(subjectA);
    });

    it('returns null when all utterances have discussionSubject = null', () => {
        const utterances = [
            { discussionSubject: null },
            { discussionSubject: null },
        ];
        const result = resolvePluralitySubject(utterances);
        expect(result).toBeNull();
    });

    it('returns the subject when a single utterance has a non-null subject', () => {
        const utterances = [
            { discussionSubject: subjectA },
        ];
        const result = resolvePluralitySubject(utterances);
        expect(result).toEqual(subjectA);
    });
});
