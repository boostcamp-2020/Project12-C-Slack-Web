import { Reaction } from '../model/Reaction'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const addReaction = async ({ chatId, workspaceUserInfoId, emoticon }) => {
  verifyRequiredParams(chatId, workspaceUserInfoId, emoticon)
  const isExist = await dbErrorHandler(() =>
    Reaction.find({ chatId, workspaceUserInfoId, emoticon }),
  )
  if (isExist.length === 0) {
    await dbErrorHandler(() =>
      Reaction.create({ chatId, workspaceUserInfoId, emoticon }),
    )
  }
  return isExist.length === 0
}

const removeReaction = async ({ chatId, workspaceUserInfoId, emoticon }) => {
  verifyRequiredParams(chatId, workspaceUserInfoId, emoticon)
  const result = await dbErrorHandler(() =>
    Reaction.findOneAndDelete({ chatId, workspaceUserInfoId, emoticon }),
  )

  return result && true
}

module.exports = { addReaction, removeReaction }
