const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/music')

module.exports =  {
    name:'play',
    description:'Plays Music In a Channel',
    options:[

        {
        name:'song',
        description:'Song to Play(YouTube or Spotify Link)',
        type:'STRING',
        required:true
        }
    ],

    run: async(client, interaction) => {
        const vc = interaction.member.voice.channel

        if(!vc) return interaction.followUp({content:'Must be in VC to play command'})

        const query = interaction.options.getString('song')

        let queue = client.player.createQueue(interaction.guild.id);
        await queue.join(vc)
        let song = await queue.play(query).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });

        if(song.isFirst){
            const embed = new MessageEmbed()
            .setTitle(`Playing Track`)
            .setDescription(`[${song.name}](${song.url}) - ${song.duration}`)
            .setThumbnail(song.thumbnail)
            .setColor(queue.guild.me.displayColor || "#00FFFF");
         interaction.followUp({ embeds: [embed], allowedMentions: { repliedUser: false } })
        }


        

        await Schema.findOne({Guild: interaction.guild.id}, async(err, data) => {
            if(data) data.delete()


            new Schema({
                Guild:interaction.guild.id,
                Channel:interaction.channel.id

            }).save()



        })



        
    }
}