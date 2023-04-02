module.exports = async (client) => {
  
  // Reaction for Rules Channel
  rulesChannel = await client.channels.fetch('1089518852695666780')
  rulesMessage = await rulesChannel.messages.fetch('1091710863095910500')
  await rulesChannel.messages.cache.set(rulesMessage.id, rulesMessage);

  //--//--- All messages now registered in cache.
  console.log('[🧠] All messages registered in cache memory.')

};