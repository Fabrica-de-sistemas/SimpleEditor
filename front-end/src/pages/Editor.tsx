import React, { Suspense } from "react"

const Mark = React.lazy(() => import("./MarkdownPreviewer"))

export default function Simple() {
    return (
        <Suspense fallback={<Loading/>}>
            <Mark/>
        </Suspense>
    )
}

function Loading() {
    return (<span>Carregando...</span>)
}