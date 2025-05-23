
import Head from 'next/head'
import CreateNewEvent from '../components/CreateNewEvent'

export default function CreateEventPage() {
    return (
        <>
            <Head>
                <title>Create New Event</title>
            </Head>
            <CreateNewEvent />
        </>
    )
}
