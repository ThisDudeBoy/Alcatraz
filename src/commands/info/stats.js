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
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
const Discord = require('discord.js')
const { utc } = require("moment");
const emojis = require('../../utils/emojis.json');

module.exports = class StatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      aliases: ['statistics', 'metrics'],
      usage: 'stats',
      description: 'Avoir les stats du bot.',
      type: client.types.INFO
    });
  }
  async run(message) {
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} jour` : `${d.days()} jours`;
    const hours = (d.hours() == 1) ? `${d.hours()} heure` : `${d.hours()} heures`;
    const clientStats = stripIndent`
      **• Serveurs:** ${message.client.guilds.cache.size}
      **• Membres:** ${message.client.users.cache.size}
      **• Salons:** ${message.client.channels.cache.size}
      **• Emojis:** ${message.client.emojis.cache.size}
      **• Ping:** ${Math.round(message.client.ws.ping)}ms
      **• En ligne depuis:** ${days} et ${hours}
    `;
    const { totalMemMb, usedMemMb } = await mem.info();
    const serverStats = stripIndent`
      **• Modèle:** ${cpu.model()}
      **• Cores:** ${cpu.count()}
      **• CPU:** ${await cpu.usage()} %
      **• RAM Total:** ${totalMemMb} MB
      **• RAM:** ${usedMemMb} MB 
      **• DiscordJS:** ${Discord.version} MB 
      **• NodeJS:** ${process.versions.node} MB 
    `;
    const embed = new MessageEmbed()
      .setTitle('Statistiques d\'Alcatraz')
      .setDescription(`● **Alcatraz** a été créé par **GalackQSM#0895** & **Alex.#7331**\n● Merci à [Flaticon](https://flaticon.com/) pour presque tous les emojis!\n● **Alcatraz** à été crée le **${utc(message.client.user.createdTimestamp).format('DD/MM/YYYY à HH:mm:ss')}**\n● **Alcatraz** est un bot open source développé par **GalackQSM#0895**!`)
      .addField('Commandes:', `\`${message.client.commands.size}\` commandes`, true)
      .addField('Aliases:', `\`${message.client.aliases.size}\` aliases`, true)
      .addField('Catégories:', `\`${Object.keys(message.client.types).length}\` catégories`, true)
      .addField('__Alcatraz__', `${clientStats}`)
      .addField('__Serveur__', `${serverStats}`)
      .addField(
        '**'+emojis.liens+' Liens**', 
        '**[Ajouter Alcatraz](https://chillbot.me/invite) | ' +
        '[Alcatraz Empire](https://chillbot.me/discord) | ' +
        '[Github](https://github.com/ThisDudeBoy)**'
      )
        .setImage('https://i.imgur.com/WP9d2Z2.png')
        .setFooter("© 2020 - Alcatraz | Projet open-source")
        .setTimestamp()
        .setColor("#2f3136");
    message.channel.send(embed);
  }
};
function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
  else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
  else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
  else if (bytes > 1) { bytes = bytes + " bytes"; }
  else if (bytes == 1) { bytes = bytes + " byte"; }
  else { bytes = "0 bytes"; }
  return bytes;
}
function convertMS(milliseconds) {
  var day, hour, minute, seconds;
  seconds = Math.floor(milliseconds / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return { day: day, hour: hour, minute: minute, seconds: seconds };
}
