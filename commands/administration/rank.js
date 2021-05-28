const RankSchema = require("../../schemas/ranks")
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'rank',
    description:'Singular Rank Display',

    async execute(message,args,client){


        const rankName = args.join(" ")
        if(!rankName) return message.channel.send('Please specify a rank')

        RankSchema.findOne({Guild: message.guild.id}, async(err, data) => {

            if(!data) return message.channel.send('Rank does not exist')

            message.member.roles.add(data.Role)

            return message.channel.send(`You have received <@&${data.Role}`)
            
        })

    }
}
