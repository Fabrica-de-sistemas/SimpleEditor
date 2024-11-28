import { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

export default function Simple() {
    const [ editor ] = useState(() => withReact(createEditor()))
    const initalValue = [
        {
            type: "paragraph",
            children: [
                {
                    text: ""
                }
            ],
        },
    ]
    return (
        <Slate editor={editor} initialValue={initalValue}>
            <Editable />
        </Slate>
    )
}