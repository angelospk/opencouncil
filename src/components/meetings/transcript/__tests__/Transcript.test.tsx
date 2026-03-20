import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transcript from '../Transcript';
import { useCouncilMeetingData } from '../../CouncilMeetingDataContext';
import { useTranscriptOptions } from '../../options/OptionsContext';
import { useVideo } from '../../VideoProvider';
import { useHighlight } from '../../HighlightContext';
import { Transcript as TranscriptType } from '@/lib/db/transcript';

jest.mock('../SpeakerSegment', () => ({
    __esModule: true,
    default: ({ segment }: { segment: { id: string } }) => <div data-testid={`segment-${segment.id}`}>{segment.id}</div>
}));

jest.mock('../UnverifiedTranscriptBanner', () => ({
    __esModule: true,
    BANNER_HEIGHT_FULL: 0,
    UnverifiedTranscriptBanner: () => null
}));

jest.mock('../../CouncilMeetingDataContext', () => ({
    useCouncilMeetingData: jest.fn()
}));

jest.mock('../../options/OptionsContext', () => ({
    useTranscriptOptions: jest.fn()
}));

jest.mock('../../VideoProvider', () => ({
    useVideo: jest.fn()
}));

jest.mock('../../HighlightContext', () => ({
    useHighlight: jest.fn()
}));

jest.mock('next/navigation', () => ({
    useSearchParams: () => ({
        get: () => null
    })
}));

const makeSegment = (id: string, startTimestamp: number, endTimestamp: number): TranscriptType[number] => ({
    id,
    startTimestamp,
    endTimestamp,
    speakerTagId: `tag-${id}`,
    utterances: [],
    speakerTag: { id: `tag-${id}`, label: 'Speaker', personId: null, createdAt: new Date(), updatedAt: new Date() },
    topicLabels: [],
    summary: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    meetingId: 'meeting',
    cityId: 'city'
});

describe('Transcript', () => {
    let transcriptData: TranscriptType = [];

    const mockIntersectionObservers: { callback: IntersectionObserverCallback }[] = [];

    beforeAll(() => {
        class MockIntersectionObserver {
            callback: IntersectionObserverCallback;
            constructor(callback: IntersectionObserverCallback) {
                this.callback = callback;
                mockIntersectionObservers.push(this);
            }
            observe() { }
            unobserve() { }
            disconnect() { }
        }

        Object.defineProperty(window, 'IntersectionObserver', {
            writable: true,
            value: MockIntersectionObserver
        });
    });

    afterEach(() => {
        mockIntersectionObservers.length = 0;
        jest.useRealTimers();
    });

    beforeEach(() => {
        transcriptData = [
            makeSegment('seg-a', 10, 20),
            makeSegment('seg-b', 20, 30)
        ];

        (useCouncilMeetingData as jest.Mock).mockImplementation(() => ({
            transcript: transcriptData,
            getHighlight: jest.fn(),
            taskStatus: { humanReview: true }
        }));

        (useTranscriptOptions as jest.Mock).mockReturnValue({
            options: { editable: true }
        });

        (useVideo as jest.Mock).mockReturnValue({
            setCurrentScrollInterval: jest.fn(),
            currentTime: 0
        });

        (useHighlight as jest.Mock).mockReturnValue({
            enterEditMode: jest.fn()
        });
    });

    it('uses stable DOM ids based on segment ids across transcript insertions', () => {
        const { rerender } = render(<Transcript />);

        expect(document.getElementById('speaker-segment-seg-a')).toBeInTheDocument();
        expect(document.getElementById('speaker-segment-seg-b')).toBeInTheDocument();

        transcriptData = [
            makeSegment('seg-new', 5, 9),
            ...transcriptData
        ];

        rerender(<Transcript />);

        expect(document.getElementById('speaker-segment-seg-new')).toBeInTheDocument();
        expect(document.getElementById('speaker-segment-seg-a')).toBeInTheDocument();
        expect(document.getElementById('speaker-segment-seg-b')).toBeInTheDocument();
        expect(document.getElementById('speaker-segment-0')).not.toBeInTheDocument();
    });

    it('updates visibleSegments and currentScrollInterval based on IntersectionObserver callback', () => {
        jest.useFakeTimers();
        const mockSetCurrentScrollInterval = jest.fn();
        (useVideo as jest.Mock).mockReturnValue({
            setCurrentScrollInterval: mockSetCurrentScrollInterval,
            currentTime: 0
        });

        render(<Transcript />);

        expect(mockIntersectionObservers.length).toBeGreaterThan(0);
        const latestObserverCallback = mockIntersectionObservers[mockIntersectionObservers.length - 1].callback;

        // Simulate IntersectionObserver callback saying seg-a is visible
        act(() => {
            latestObserverCallback([
                {
                    target: { id: 'speaker-segment-seg-a' },
                    isIntersecting: true
                } as any,
                {
                    target: { id: 'speaker-segment-seg-b' },
                    isIntersecting: false
                } as any
            ], {} as any);
        });

        // Fast-forward debounce timer (500ms) inside act to resolve states
        act(() => {
            jest.advanceTimersByTime(500);
        });

        // calculateTimeInterval looks at [validSegments[0].startTimestamp, validSegments[last].endTimestamp]
        // validSegments is seg-a: startTimestamp: 10, endTimestamp: 20
        expect(mockSetCurrentScrollInterval).toHaveBeenCalledWith([10, 20]);
    });
});
