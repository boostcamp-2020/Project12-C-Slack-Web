import React, { useState, useEffect, useRef } from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import {
  ContentState,
  EditorState,
  getDefaultKeyBinding,
  convertToRaw,
} from 'draft-js'
import styled from 'styled-components'
import 'draft-js/dist/Draft.css'
import { COLOR } from '../../constant/style'
import FileUploader from '../FileUploader'
import FilePreview from '../FilePreview'

function MessageEditor({ channelTitle, sendMessage }) {
  const plugins = useRef([createMarkdownShortcutsPlugin()])
  const [message, setMessage] = useState(EditorState.createEmpty())
  const [file, setFile] = useState(null)
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    if (file) setIsRender(true)
  }, [file])

  const keyBindingFn = e => {
    if (e.key === 'Enter') return 'send-message'
    return getDefaultKeyBinding(e)
  }

  const handleKey = command => {
    if (
      command === 'send-message' &&
      (message.getCurrentContent().hasText() || file)
    ) {
      sendMessage(
        JSON.stringify(convertToRaw(message.getCurrentContent())),
        file,
      )
      setMessage(
        EditorState.moveFocusToEnd(
          EditorState.push(
            message,
            ContentState.createFromText(''),
            'remove-range',
          ),
        ),
      )
      setFile(null)
      setIsRender(false)
    }
  }

  const renderPreview = () => {
    return (
      <FilePreview
        type="input"
        file={file}
        setFile={setFile}
        setIsRender={setIsRender}
      />
    )
  }

  return (
    <MessageEditorContainer>
      <MessageEditorArea>
        <Editor
          placeholder={`Send a message to #${channelTitle}`}
          editorState={message}
          onChange={setMessage}
          plugins={plugins.current}
          handleKeyCommand={handleKey}
          keyBindingFn={keyBindingFn}
        />
        <div>{isRender && renderPreview()}</div>
        <div>
          <FileUploader file={file} setFile={setFile} />
        </div>
        {/* TODO markdown, chat action 적용 필요 */}
      </MessageEditorArea>
    </MessageEditorContainer>
  )
}
const MessageEditorContainer = styled.div`
  padding: 20px;
  background-color: ${COLOR.WHITE};
`
const MessageEditorArea = styled.div`
  border: 1px solid ${COLOR.LIGHT_GRAY};
  padding: 10px;
  border-radius: 5px;
`
export default MessageEditor
