/*To Do List
-
*/

const Discord = require("discord.js");

const bot = new Discord.Client();

const config = require("./config.json");

const fs = require('fs');

const sql = require('sqlite');

sql.open('./kills.sqlite');

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith(config.prefix + str);
}

var version = "V0.9.7 [In Dev]";

var ball = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "As I see it, yes", 
"Most likely", "Outlook good", "Yes", "Signs point to yes", "Don't count on it", 
"My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

var amv = ["8IQmUigD04E", "lQh046iFg70", "R_4BdeBOcdw", "p4g2sBbv8_8", "FdPKYug8eyU", "s02ue7vpooU", "5QMDaRSoZMU", "a2GujJZfXpg", "jTP6LUMyYRU"];

var op = ["m7_-RBl0lfY", "TyDGMpg-3BM", "7JOkgWJrttk", "wYxbshUtXac", "hA4na_3jT0", 
"ocQ6PDiP014", "NxGVgsDDopE", "Y9G20wV0KHE", "tvHqaimwcKE", "v9OhNoPAZJY", "gB5qUxR6ch4", 
"cZ7zQbMxm28", "YBhsDtFUgdM", "AgWI4EQ78ik", "osKkMKolWQ8", "A59xr7NwVtk", "ePEoNqecwlU", "oAXrRWLKzko", 
"F620o04858A", "reD36nDWGaM", "F_ycU-HoNGg", "PIEXGgeuB2k", "Msuu3b-L-2k", "BVgiC-2hohE", "ngxBe1vmDGA&spf", 
"rErpljP7nKk", "cZHIeyeZm2Y", "69LQ_WAddoA", "JGGpuDPVP2s", "ZVgHN8cfy1I", "45_4o_Stjmk", "VtfUrDwpo2E", 
"WHeJT7YGdt4", "DbqykQH1ZME", "0_36iNzrEn0", "IztZ2Ryf23g", "aZenmeRytEM", "atxYe-nOa9w", "2HBWWotRmYc",
"HJ0onJKSITA", "gZGmDKxEp-I", "t9CXmEUwvgM", "h6-kETedHFI", "WFUUmVlQO4w", "u3SzOzm8lmo", "7aMOurgDB-o",
"g1ARRcK4LVs"];

bot.on('ready', () => {
	console.log("Karp's Self Bot Ready for Commands");
  bot.user.setGame("with " + bot.guilds.size + " servers");
});

function clean(text) {
  if (typeof(text) === "string") {
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
      return text;
    }
}

fs.open('./data/', 'r', (err, fd) => {
  if(err) {
    if(err.code === 'ENOENT') {
      fs.mkdir('./data/', (err) => {
        console.log("Done");
      fs.close(fd, (err) => {
        if(err) throw err;
      });
      });
    }
  }
});

fs.open('./Log/', 'r', (err, fd) => {
  if(err) {
    if(err.code === 'ENOENT') {
      fs.mkdir('./data/', (err) => {
        console.log("Done");
      fs.close(fd, (err) => {
        if(err) throw err;
      });
      });
    }
  }
});



bot.on('message', message => {

if(message.channel.type === 'dm' || message.channel.type === 'group') return;

var date = new Date();

  if(message.guild.id === "196028709491310602") {
    fs.appendFile('./Log/' + date.toDateString() + '.txt', message.author.username + " or " + message.guild.member(message.author).nickname + ": " + message.cleanContent + '\n', (err) => {
      if(err) throw err;
    });
  } 
  

if(message.author === bot.user) {
	var args = message.content.split(/[ ]+/);

	if(commandIs("hello", message)) {
		message.channel.sendMessage("```Hello! As you can see I'm a robot living inside Karp. Only Karp can use me so don't try.```");
	}

	if(commandIs("8ball", message)) {
  		if(args.length === 1) {
  			message.channel.sendMessage("`Please ask a question`");
  		} else {
        delete args[0];
        var que = args.join(" ");
        
  			var ballRan = ball[Math.floor(Math.random()*ball.length)];
        const qdata = new Discord.RichEmbed()
          .setTitle('🎱 The Magic 8 Ball')
          .addField('Question', que)
          .addField('Answer', ballRan)
          .setFooter('Karp Self Bot ' + version);

        message.edit({embed: qdata});
  		}
  	}

  if(commandIs("servers", message)) {
  	message.channel.sendMessage(message.author.username + " is in **" + bot.guilds.size + "** servers.");
	}

	if(commandIs("lenny", message)) {
		message.edit("( ͡° ͜ʖ ͡°)");
	}

	if(commandIs("avatar", message)) {
		let avaUser = message.mentions.users.first();
  		if(message.author.avatarURL === null || avaUser.avatarURL === null) {
  			message.channel.sendMessage("`No avatar found.`");
  		} else if (!avaUser) {
    		message.channel.sendMessage(message.author.avatarURL);
  		} else {
  			message.channel.sendMessage(avaUser.avatarURL);
  		}
  	}

  	if(commandIs("data", message)) {
  		let dUser = message.mentions.users.first();

      if(message.channel.type === 'dm' || message.channel.type === 'group') {
        return message.channel.sendMessage("`DM support is unavailable`");
      }
  		
  		if (!dUser) {
  			message.channel.sendMessage("`Please define a user.`");
  			return;
  		}

      if(!message.guild.member(dUser).nickname) {
        dName = dUser.username;
      } else {
        dName = message.guild.member(dUser).nickname
      }

  		const userData = new Discord.RichEmbed()
  		.setTitle('Username:')
  		.setAuthor(dUser.username, dUser.displayAvatarURL)
  		.setColor(0x000000)
  		.setDescription(dName)
  		.setFooter('Karp Self Bot ' + version)
  		.addField('Created On', dUser.createdAt)
  		.addField('Id', dUser.id)
  		.addField('Current Status', dUser.presence.status)
  		.addField('Bot', dUser.bot)
  		.addField('Avatar URL', dUser.displayAvatarURL);
  		
  		message.edit({embed: userData});

      /*fs.writeFile(/data/dUser.username + ".txt", userData, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      */

  	}

    if(commandIs('log', message)) {
      let logu = message.mentions.users.first();

      if(args.length === 1) {
        message.channel.sendMessage("`Please define a user.`");
        return;
      }

      if(!message.guild.member(logu).nickname) {
        var uName = logu.username; 
      } else {
        uName = message.guild.member(logu).nickname;
      }

      fs.writeFile("./data/" + uName + ".txt", `
      Username: ${uName}
      Created on: ${logu.createdAt}
      Id: ${logu.id}
      Bot: ${logu.bot}
      Avatar URL: ${logu.displayAvatarURL}`, (err) => {
        if(err) throw err;
        console.log("The file has been saved!");
        message.channel.sendMessage("`File has been saved as " + uName + ".txt`");
      });    
    }

    if(commandIs("bday", message)) {
      const bDay = message.mentions.users.first();

      if(args.length === 1) {
        message.channel.sendMessage("`Please define a user.`");
      } else {
        message.edit(bDay.username + " was made on: " + bDay.createdAt);
      }
    }

    if(commandIs('version', message)) {
      message.channel.sendMessage(version);
    }
  	

    if(commandIs("wiki", message)) {
      message.edit("https://en.wikipedia.org/wiki/" + args.join("_").substring(6));
    }

    if(commandIs('tut', message)) {
      message.edit("https://www.youtube.com/watch?v=pO7ARNgo0dA");
    }

    if(commandIs('tri', message)) {
      message.delete();
      message.channel.sendCode('JavaScript' ,` ▲
▲‌ ▲`);
    }

    if(commandIs("amv", message)) {
      var amvRan = amv[Math.floor(Math.random()*amv.length)];
      message.edit("https://www.youtube.com/watch?v=" + amvRan);
    }

    if(commandIs("op", message)) {
      var opRan = op[Math.floor(Math.random()*op.length)];
      message.edit("https://www.youtube.com/watch?v=" + opRan);
    }

    if(commandIs("prefix", message)) {
      config.prefix = args.join(" ").substring(8);
      fs.writeFile('.config.join', JSON.stringify(config), (err) => {if(err) console.error(err)});
    }

    if(commandIs("quote", message)) {

      var quoteID = args[1];
      
      if(!quoteID) {
        returnmessage.channel.send("`Please put an ID`");
      }

      message.channel.fetchMessages({ around: quoteID, limit: 1 }).then(msg => {
      
      const quoteData = new Discord.RichEmbed()
        .setAuthor(msg.first().author.username, msg.first().author.displayAvatarURL)
        .setDescription(msg.first().cleanContent)
        .setTimestamp(msg.first().createdAt);


      message.edit({embed: quoteData});
      });
    }

    if(commandIs('checkmulti', message)) {
      let multiUser = message.mentions.users.first();
      var checkRan = Math.floor((Math.random() * 2) + 1);

      if(args.length === 1) {
        return message.channel.send('`Please mention a user or an ID`');
      }

      if(!multiUser) {
        const multiRan = new Discord.RichEmbed()
        .setDescription("Found " + checkRan + " linked accounts")
        .setFooter("Karp Self Bot " + version);
        message.edit({embed: multiRan});
      } else {

      const multiRan = new Discord.RichEmbed()
        .setAuthor(multiUser.username, multiUser.displayAvatarURL)
        .setDescription("Found " + checkRan + " linked accounts")
        .setFooter("Karp Self Bot " + version);

      message.channel.send({embed: multiRan});
    }
    }

    if(commandIs('eval', message)) {
      try {
      delete args[0];
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      const evRich = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor('#00FF00')
        .addField("⬅️ Input ", args)
        .addField("Output ➡️", clean(evaled))
        .setFooter("Karp Self Bot " + version);

      message.edit({embed: evRich});
    } catch (err) {
      const erRich = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor('#FF0000')
        .addField("⬅️ Input ", args)
        .addField("Output ➡️", clean(err))
        .setFooter("Karp Self Bot " + version);

        message.channel.send({embed: erRich});
    }
    }

  if(commandIs('kill', message)) {
    var killUser = message.mentions.users.first();

    sql.get(`SELECT * FROM kills WHERE userId = '${killUser.id}'`).then(row => {
      if(!row) {
        sql.run('INSERT INTO kills (userId, deaths) VALUES (?, ?)', [killUser.id, 1]);
        message.edit(message.author.username + " shoots and kills " + killUser.username);
      } else {
        sql.run(`UPDATE kills SET deaths = ${row.deaths + 1} WHERE userId = ${killUser.id}`);
        message.edit(message.author.username + " shoots and kills " + killUser.username);
      }
    }).catch(() => {
        console.error;
        sql.run('CREATE TABLE IF NOT EXISTS kills (userId TEXT, deaths INTERGER)').then(() => {
        sql.run('INSERT INTO kills (userId, deaths) VALUES (?, ?)', [killUser.id, 1]);
        message.edit(message.author.username + " shoots and kills " + killUser.username);
      });
    });

    if(args.length === 1) {
        message.channel.sendMessage("`Please define a user.`");
        return;
    }
  }

  if(commandIs('deaths', message)) {
    var killUser = message.mentions.users.first();

    if(args.length === 1) {
        message.channel.sendMessage("`Please define a user.`");
        return;
    }

    if(!message.guild.member(killUser).nickname) {
      var kName = killUser.username; 
    } else {
      kName = message.guild.member(killUser).nickname;
    }

    sql.get(`SELECT * FROM kills WHERE userId = '${killUser.id}'`).then(row => {
      if(!row) return message.channel.send(kName + " has never died");
      message.channel.send(`${kName} has died ${row.deaths} time(s)`);
    });
  }

  if(commandIs('bon', message)) {
    message.edit('ＵｎｍｏｄＢｏｎ２０１７');
  }

  if(commandIs('updates', message)) {
    message.channel.sendCode('', "The last update was a bunch of useless commands like this one");
  }

  if(commandIs('taw', message)) {
    message.delete();
    const tawEmbed = new Discord.RichEmbed()
      .setAuthor('The Art of Warfare', 'https://i.imgur.com/PCvfhXJ.png')
      .setTitle('The Art of Warefare [TAW]')
      .setDescription(`TAW is a community of loyal and enthusiastic members that hold the true meaning of teamwork and leadership. Our Paladins division is recruiting and looking for new loyal members. 

        For more information visit http://taw.net/ or contact me via Discord or CarpeFacinus@taw.net`)
      .addField('What You Need To Join', `Teamspeak 3
A working microphone
Be 15 years of age`)
      .addField('Features', `Casual Teams
Competitive Teams
NA | EU Divisions
Teamspeak 3 Server
In-House Tournaments`)
      .setFooter('The Paladins division stands at 50+ members strong.');

      message.channel.send({embed: tawEmbed});
  }

  if(commandIs('why', message)) {
    message.delete();
    message.channel.sendCode('',`Things I've Heard Already (and don't need to be heard again)
    
    • Your bot is stupid
    • Make your bot modular
    • Your a dirty weeb
    • When is that porno coming out
    • Why are your commands useless
    • How do I become cool like you?
    • You don't know how to do ____ (If you're not gonna teach me or give me the information to teach myself don't say this)`);
  }

  if(commandIs('type', message)) {
    message.delete();
    message.channel.startTyping();
  }

  if(commandIs('stoptype', message)) {
    message.delete();
    message.channel.stopTyping();
  }
}
});

bot.login(config.token);

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err);
});