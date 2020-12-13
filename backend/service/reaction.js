import { Reaction } from '../model/Reaction'
import { verifyRequiredParams, dbErrorHandler } from '../util'

const updateReaction = async ({ chatId, workspaceUserInfoId, emoticon }) => {
  verifyRequiredParams(chatId, workspaceUserInfoId, emoticon)
  const isExist = await dbErrorHandler(() =>
    Reaction.find({ chatId, workspaceUserInfoId, emoticon }),
  )
  if (isExist.length === 0) {
    await dbErrorHandler(() =>
      Reaction.create({ chatId, workspaceUserInfoId, emoticon }),
    )
  } else {
    await dbErrorHandler(() =>
      Reaction.deleteOne({ chatId, workspaceUserInfoId, emoticon }),
    )
  }
  return isExist.length === 0
}

module.exports = { updateReaction }
