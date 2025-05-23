import { GetServerSidePropsContext } from "next";
import Link from "next/link";

interface Event {
    id: number;
    name: string;
    date: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;

    const res = await fetch(encodeURI(`http://backend:5000/events/${id}`), {
        cache: 'no-store', // prevent caching
    });

    if (!res.ok)
        return {
            redirect: {
                destination: '/events',
                permanent: false,
            },
        }

    const result = await res.json();

    if (result.length < 1)
        return {
            redirect: {
                destination: '/events',
                permanent: false,
            },
        }

    return {
        props: { event: result[0] },
    };
}

export default function EventDetailPage({ event }: { event: Event }) {
    return (
        <main style={{ padding: '2rem' }}>
            <h1>{event.name}</h1>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>ID: {event.id}</p>
            <Link href="/events">Go Back To Events Page</Link>
        </main>
    );
}