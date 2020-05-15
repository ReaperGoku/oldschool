const db = require("quick.db")
const discord = require('discord.js');
const Canvas = require('canvas');
const { getGetOrdinal } = require('../../functions.js')

module.exports = async(client, member) => {

	let wChan = db.fetch(`${member.guild.id}`)
  
	if(wChan == null) return;
	  
	if(!wChan) return;

	const channel = member.guild.channels.cache.get(wChan);

	if(member.user.bot){
		member.kick('Bot not allowed');
		channel.send(`\*\*\*${member} is Bot & Kicked by Admin\*\*\*`);
		return;
	};

	let count = member.guild.memberCount;
	let suffixed = getGetOrdinal(count);

	if (!channel) return;

	const canvas = Canvas.createCanvas(2560, 1440);
	const ctx = canvas.getContext('2d');

	try{
	const background = await Canvas.loadImage('https://i.pinimg.com/originals/5b/0e/20/5b0e20a5a38065defccc52acfab2c18b.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 50;
	ctx.strokeRect(150, 420, 600, 600);

	ctx.strokeStyle = '#ad0909';
	ctx.lineWidth = 30;
	ctx.strokeRect(5, 5, 2550, 1430);

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 150, 420, 600, 600);
	} catch(error) {
		console.log(error);
	}

	try{
	const attachment = new discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}`+ "\n" + 
	`You are the **${suffixed}** member!`+ "\n" +
	`📌 Dont forgot to read ${member.guild.channels.cache.get('709072820428079545').toString()}` + "\n" +
	`📌 Check ${member.guild.channels.cache.get('709970370148433960').toString()} for Role 👑`, attachment ); // {files: [attachment] }
	} catch(error) {
		console.log(error);
	}
};