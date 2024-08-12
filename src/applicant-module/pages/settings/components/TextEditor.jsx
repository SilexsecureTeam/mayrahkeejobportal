import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { editorModules, editorFormats } from '../../../../utils/textEditorConstant';

const TextEditor = ({handleText, textValue}) => {
    return (
        <div>
            <ReactQuill
                id="outlines"
                onChange={handleText}
                value={textValue}
                modules={editorModules}
                formats={editorFormats}
            />
        </div>
    )
}

export default TextEditor