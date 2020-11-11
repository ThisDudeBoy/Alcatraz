//  ______   __                      __                                  
// /      \ |  \                    |  \                                 
//|  $$$$$$\| $$  _______  ______  _| $$_     ______   ______   ________ 
//| $$__| $$| $$ /       \|      \|   $$ \   /      \ |      \ |        \
//| $$    $$| $$|  $$$$$$$ \$$$$$$\\$$$$$$  |  $$$$$$\ \$$$$$$\ \$$$$$$$$
//| $$$$$$$$| $$| $$      /      $$ | $$ __ | $$   \$$/      $$  /    $$ 
//| $$  | $$| $$| $$_____|  $$$$$$$ | $$|  \| $$     |  $$$$$$$ /  $$$$_ 
//| $$  | $$| $$ \$$     \\$$    $$  \$$  $$| $$      \$$    $$|  $$    \
// \$$   \$$ \$$  \$$$$$$$ \$$$$$$$   \$$$$  \$$       \$$$$$$$ \$$$$$$$$
//=======================================================================                                                                      
//● Crée par GalackQSM#0895 le 09 novembre 2020
//● Serveur Discord: https://discord.gg/HPtTfqDdMr
//● Github: https://github.com/GalackQSM/Alcatraz                                                  
//=======================================================================                                                                      
                                                                       
const Command = require('../Alcatraz.js');
const { MessageEmbed } = require('discord.js');
const { success } = require('../../utils/emojis.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class SetFarewellChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setleavechannel',
      aliases: ['setfc', 'sfc'],
      usage: 'setfarewellchannel <#salon/ID>',
      description: oneLine`
        Définit le salon de texte du message d'adieu pour votre serveur.
        Ne fournissez aucun salon pour effacer le \`salon d'adieu\` actuel.
        Un \`message d'adieu\` doit également être défini pour activer les messages d'adieu.
      `,
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setleavechannel #bye']
    });
  }
  run(message, args) {
    let { farewell_channel_id: farewellChannelId, farewell_message: farewellMessage } = 
      message.client.db.settings.selectFarewells.get(message.guild.id);
    const oldFarewellChannel = message.guild.channels.cache.get(farewellChannelId) || '`Aucun`';

    const oldStatus = message.client.utils.getStatus(farewellChannelId, farewellMessage);

    if (farewellMessage && farewellMessage.length > 1024) farewellMessage = farewellMessage.slice(0, 1021) + '...';
    
    const embed = new MessageEmbed()
      .setTitle('Paramètres: `Salon d\'au revoir`')
      .setDescription(`Le \`Salon d\'au revoir\` a été mis à jour avec succès. ${success}`)
      .addField('Message', message.client.utils.replaceKeywords(farewellMessage) || '`Aucun`')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter("© 2020 - Alcatraz | Projet open-source")
      .setTimestamp()
      .setColor("#2f3136");

    if (args.length === 0) {
      message.client.db.settings.updateFarewellChannelId.run(null, message.guild.id);

      const status = 'désactivé';
      const statusUpdate = (oldStatus != status) ? `\`${oldStatus}\` ➔ \`${status}\`` : `\`${oldStatus}\``; 
      
      return message.channel.send(embed
        .spliceFields(0, 0, { name: 'Salon', value: `${oldFarewellChannel} ➔ \`Aucun\``, inline: true })
        .spliceFields(1, 0, { name: 'Statut', value: statusUpdate, inline: true })
      );
    }

    const farewellChannel = this.getChannelFromMention(message, args[0]) || message.guild.channels.cache.get(args[0]);
    if (!farewellChannel || (farewellChannel.type != 'text' && farewellChannel.type != 'news') || !farewellChannel.viewable) 
      return this.sendErrorMessage(message, 0, stripIndent`
        Veuillez mentionner un texte ou un salon d'annonce accessible ou fournir un identifiant de salon de texte ou d'annonce valide
      `);

    const status =  message.client.utils.getStatus(farewellChannel, farewellMessage);
    const statusUpdate = (oldStatus != status) ? `\`${oldStatus}\` ➔ \`${status}\`` : `\`${oldStatus}\``;

    message.client.db.settings.updateFarewellChannelId.run(farewellChannel.id, message.guild.id);
    message.channel.send(embed
      .spliceFields(0, 0, { name: 'Salon', value: `${oldFarewellChannel} ➔ ${farewellChannel}`, inline: true})
      .spliceFields(1, 0, { name: 'Statut', value: statusUpdate, inline: true})
    );
  }
};
