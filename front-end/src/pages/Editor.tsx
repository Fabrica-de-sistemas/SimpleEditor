import React, { Suspense } from "react"

const Mark = React.lazy(() => import("./MarkdownPreviewer"))

import "./editor/style.css";
import MainTab from "./editor/view/Main_tab";
import NotesTab from "./editor/view/Notes_tab";
import ProfileTab from "./editor/view/Profile_tab";

export default function Simple() {
    // return (


    //     <Suspense fallback={<Loading/>}>
    //         <Mark/>
    //     </Suspense>
    // )

    return (
      <main className="editor-main">
        <ProfileTab></ProfileTab>
        <MainTab></MainTab>
        <NotesTab></NotesTab>
      </main>
    )
}

function Loading() {
    return (<span>Carregando...</span>)
}