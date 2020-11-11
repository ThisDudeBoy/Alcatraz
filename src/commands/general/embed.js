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


module.exports = class EmbedCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'embed',
      usage: 'embed <message>',
      description: 'Envoie votre message en tant que embed',
      type: client.types.GENERAL,
      examples: ['embed Alcatraz the best!']
    });
  }
  run(message, args) {
    const msg = args.join(' ');
    if (!msg) return this.sendErrorMessage(message, 0, 'Veuillez fournir un message.');
    const embed = new MessageEmbed()
      .setDescription(`${msg}`)
      .setFooter("© 2020 - Alcatraz | Projet open-source")
      .setTimestamp()
      .setColor("#2f3136");
    message.channel.send(embed);
  }
};