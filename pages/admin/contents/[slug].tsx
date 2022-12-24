import React from 'react';
import {useRouter} from "next/router";

// This gets called on every request
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`https://.../data`)
//     const data = await res.json()
//
//     // Pass data to the page via props
//     return {props: {data}}
// }

export default function Index() {
    const router = useRouter()
    const {slug} = router.query
    return (
        <div>
            <h2>Content: {slug}</h2>
        </div>
    );
}
