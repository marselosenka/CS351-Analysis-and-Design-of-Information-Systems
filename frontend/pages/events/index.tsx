import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";

interface Event {
    id: number;
    name: string;
    date: string;
}


const addEvent = async (eventName: string, eventDate: Date) => {
    //here it is localhost and not backend because it runs on client side
    const response = await fetch(encodeURI('http://localhost:5000/events'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: eventName,
            date: eventDate.toISOString(), // Convert date to ISO string format
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to add event: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const res = await fetch(encodeURI('http://backend:5000/events'), {
        method: 'GET',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch events');
    }

    const events: Event[] = await res.json();

    return {
        props: { events },
    };
}

export default function EventsPage({ events }: { events: Event[] }) {
    const [newEventName, setNewEventName] = useState('');
    const [newEventDate, setNewEventDate] = useState('');

    const handleAddEvent = async () => {
        if (!newEventName || !newEventDate) return;

        try {
            await addEvent(newEventName, new Date(newEventDate));
            setNewEventName('');
            setNewEventDate('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main>
            <h1>Events</h1>
            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <ol>
                    {events.map((event) => (
                        <li key={event.id}>
                            <Link href={`/events/${event.id}`}>
                                {event.name} – {new Date(event.date).toLocaleDateString()}
                            </Link>
                        </li>
                    ))}
                </ol>
            )}

            <h2>Add Event</h2>

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="New event name"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <button onClick={handleAddEvent}>Add Event</button>
            </div>

            <Link style={{ marginTop: '50px' }} href="/">Go Back To Home Page</Link>
        </main>
    );
}