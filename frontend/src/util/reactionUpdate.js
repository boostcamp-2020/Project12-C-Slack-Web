import produce from 'immer'

export const chageReactionState = (messages, reaction, workspaceUserInfoId) =>
  produce(messages, draft => {
    let done = false
    if (reaction.type === false) return

    draft.forEach(chat => {
      if (chat._id === reaction.chatId) {
        chat.reactions.forEach((element, index) => {
          if (element.emoji === reaction.emoji) {
            if (reaction.type) {
              element.users.push({
                _id: reaction.workspaceUserInfoId,
                displayName: reaction.displayName,
              })
              if (reaction.workspaceUserInfoId === workspaceUserInfoId._id)
                element.set = true
            } else {
              element.users.forEach((user, idx) => {
                if (user._id === reaction.workspaceUserInfoId) {
                  element.users.splice(idx, 1)
                  if (reaction.workspaceUserInfoId === workspaceUserInfoId._id)
                    element.set = false
                }
              })
              if (element.users.length === 0) {
                chat.reactions.splice(index, 1)
              }
            }
            done = true
          }
        })
        if (!done && reaction.type === 1) {
          chat.reactions.push({
            emoji: reaction.emoji,
            users: [
              {
                _id: reaction.workspaceUserInfoId,
                displayName: reaction.displayName,
              },
            ],
            set:
              reaction.workspaceUserInfoId === workspaceUserInfoId._id
                ? true
                : false,
          })
        }
      }
    })
  })

export const hasMyReaction = (messages, workspaceUserInfo) =>
  produce(messages, draft => {
    draft?.forEach(message => {
      if (message?.reactions?.length === 0) return
      message.reactions.forEach(reaction => {
        reaction.set = false
        if (reaction.users.length === 0) return

        const result = reaction.users.every(user => {
          return user?._id !== workspaceUserInfo?._id
        })
        if (!result) reaction.set = true
      })
    })
  })
