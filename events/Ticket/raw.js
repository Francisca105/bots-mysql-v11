const db = require("../../database/database.js")
const Ticket = require("../../models/Ticket.js")
const ready = require("../client/ready.js")

module.exports = async (payload) => {
    let eventName = payload.t;
    if(eventName === 'MESSAGE_REACTION_ADD') {
        let msgId = payload.d.message_id;
        if(msgId === '694548525786202172') {
            let channelId = payload.d.channel_id;
            let channel = client.channels.get(channelId);
            if(channel) {
                if(channel.messages.has(msgId))
                    return;
                else {
                    try {
                        let msg = await channel.fetchMessage(msgId);
                        let reaction = msg.reactions.get('🎫');
                        let user = client.users.get(payload.d.user_id);
                        client.emit('messageReactionAdd', reaction, user);
                    }
                    catch(ex) {
                        console.log(ex);
                        return;
                    }
                }
            }
        }
    }
}