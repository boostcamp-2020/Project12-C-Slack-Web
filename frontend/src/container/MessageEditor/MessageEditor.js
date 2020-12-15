import React, { useState } from 'react'
import Editor from 'draft-js-plugins-editor'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import {
  ContentState,
  EditorState,
  getDefaultKeyBinding,
  convertToRaw,
} from 'draft-js'

const plugins = [createMarkdownShortcutsPlugin()]

function MessageEditor({ channelTitle, sendMessage }) {
  const [message, setMessage] = useState(EditorState.createEmpty())
  const handleInput = e => {
    setMessage(e)
  }

  const keyBindingFn = e => {
    if (e.key === 'Enter') return 'send-message'
    return getDefaultKeyBinding(e)
  }
  const handleKey = command => {
    if (command === 'send-message' && message.getCurrentContent().hasText()) {
      sendMessage(JSON.stringify(convertToRaw(message.getCurrentContent())))
      setMessage(
        EditorState.moveFocusToEnd(
          EditorState.push(
            message,
            ContentState.createFromText(''),
            'remove-range',
          ),
        ),
      )
    }
  }

  return (
    <div>
      <Editor
        placeholder={`Send a message to #${channelTitle}`}
        editorState={message}
        onChange={handleInput}
        plugins={plugins}
        handleKeyCommand={handleKey}
        keyBindingFn={keyBindingFn}
      />

      {/* TODO markdown, chat action 적용 필요 */}
    </div>
  )
}

export default MessageEditor
