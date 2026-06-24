import { notFound } from "next/navigation";
import { PitchDeck } from "../_components/PitchDeck";

export const metadata = {
    title: "Φάκελοι — Pitch (dev)",
};

export default async function PitchPage(props: {
    params: Promise<{ locale: string }>;
}) {
    if (process.env.NODE_ENV === "production") {
        notFound();
    }

    const { locale } = await props.params;
    return <PitchDeck locale={locale} />;
}
