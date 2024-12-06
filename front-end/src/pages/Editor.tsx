//import MarkdownPreview from "./MarkdownPreviewer";

import React, { Suspense } from "react"

const Mark = React.lazy(() => import("./MarkdownPreviewer"))

export default function Simple() {
    return (
        <Suspense>
            <Mark/>
        </Suspense>
    )
}