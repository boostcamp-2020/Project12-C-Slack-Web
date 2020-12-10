import { Reaction } from '../model/Reaction'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const addReaction = async ({ chatId, workspaceUserInfoId, emoticon }) => {
  verifyRequiredParams(chatId, workspaceUserInfoId, emoticon)
  const result = await dbErrorHandler(() =>
    Reaction.create({ chatId, workspaceUserInfoId, emoticon }),
  )
  return result
}

module.exports = { addReaction }
