const Discord = require('discord.js');
const client = new Discord.Client();
const { Permissions } = require('discord.js');
const permissions = new Permissions(1207959552);
const http = require('http');
const server = http.createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
  });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  
});

client.on('message', msg => {
    try {
        if (!msg.guild) return;
        if((msg.author == client.user)){
            return;
        }   
        if (msg.content.startsWith(".")) {
            processCommand(msg);
        
        }

    }catch(err){
        console.log(err.message);
    }

    
});
function multiplicar(receivedMessage, arguments){
    let x=1;
    for(i=0; i<arguments.length;i++){
        x*=arguments[i];
    }
    receivedMessage.channel.send("Resultado: "+ x);

}
function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments
    if (primaryCommand == "pingpong"){
        pingPong(receivedMessage, arguments);
        console.log("ping pong")
    }else if(primaryCommand == "help"){
        help(receivedMessage);
    }else if(primaryCommand == "multip"){
        multiplicar(receivedMessage,arguments);
    }else if(primaryCommand == "tag"){
        tag(receivedMessage,arguments);
    }
}
function essas (x){
	let y;
	for(i=1;i<=x.length;i++){
		y+=x[i]
		y+=" "
	}
	return y;
}
function tag(receivedMessage, arguments){
    if(receivedMessage.member.roles.find(r => r.name === "NOVATO")){
        receivedMessage.channel.send("Você é um novato, peça para um OFFICER mudar a sua tag");
        return;
    }
    if(!(receivedMessage.guild.roles.find(role => role.name === "HEALER"))){
        receivedMessage.guild.createRole({
            name: "HEALER",
            color: "RED",
          }).catch(console.error)
    }
    if(!(receivedMessage.guild.roles.find(role => role.name === "RANGED DPS"))){
        receivedMessage.guild.createRole({
            name: "RANGED DPS",
            color: "PURPLE",
          }).catch(console.error)
    }
    if(!(receivedMessage.guild.roles.find(role => role.name === "MEELE DPS"))){
        receivedMessage.guild.createRole({
            name: "MEELE DPS",
            color: "BLACK",
          }).catch(console.error)
    }
    if(!(receivedMessage.guild.roles.find(role => role.name === "TANK"))){
        receivedMessage.guild.createRole({
            name: "TANK",
            color: "WHITE",
          }).catch(console.error)
    }
    

    
    


    let x = arguments[0]
    let healer=receivedMessage.guild.roles.find(role => role.name === "HEALER");
    let rdps = receivedMessage.guild.roles.find(role => role.name === "RANGED DPS");
    let mdps=receivedMessage.guild.roles.find(role => role.name === "MEELE DPS");
    let tank = receivedMessage.guild.roles.find(role => role.name === "TANK");
    if(x.toUpperCase()==("HEALER")){
        var roleHealer = receivedMessage.guild.roles.find(role => role.name === "HEALER");
        receivedMessage.member.addRole(healer);
        receivedMessage.member.setNickname("[HEALER] "+arguments[1]);
        receivedMessage.member.removeRole(rdps).catch(console.error);
        receivedMessage.member.removeRole(mdps).catch(console.error);
        receivedMessage.member.removeRole(tank).catch(console.error);
    }else if(x.toUpperCase()==("RDPS")){
        var roleHealer = receivedMessage.guild.roles.find(role => role.name === "RDPS");
        receivedMessage.member.addRole(rdps);
        receivedMessage.member.setNickname("[RDPS] "+arguments[1]);
        receivedMessage.member.removeRole(healer).catch(console.error);
        receivedMessage.member.removeRole(mdps).catch(console.error);
        receivedMessage.member.removeRole(tank).catch(console.error);
    }else if(x.toUpperCase()==("MDPS")){
        var roleHealer = receivedMessage.guild.roles.find(role => role.name === "MDPS");
        receivedMessage.member.addRole(mdps);
        receivedMessage.member.setNickname("[MDPS] "+arguments[1]);
        receivedMessage.member.removeRole(healer).catch(console.error);
        receivedMessage.member.removeRole(rdps).catch(console.error);
        receivedMessage.member.removeRole(tank).catch(console.error);
    }else if(x.toUpperCase()==("TANK")){
        var roleHealer = receivedMessage.guild.roles.find(role => role.name === "TANK");
        receivedMessage.member.addRole(tank);
        receivedMessage.member.setNickname("[TANK] "+arguments[1]);
        receivedMessage.member.removeRole(rdps).catch(console.error);
        receivedMessage.member.removeRole(mdps).catch(console.error);
        receivedMessage.member.removeRole(healer).catch(console.error);
    }else{
        return;
    }

}
client.on('guildMemberAdd', member => {
    if(!(member.guild.roles.find(role => role.name === "NOVATO"))){
    member.guild.createRole({
        name: 'NOVATO',
        color: 'BLUE',
      }).catch(console.error)
    }
    // Send the message to a designated channel on a server:
    let channel = member.guild.channels.find(ch => ch.name === 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    member.setNickname(`[NOVATO] ${member.displayName}`);
    member.addRole(member.guild.roles.find('name' ,  "NOVATO"));
    channel.send(`Bem vindo ao servidor, ${member}, use !help para conseguir um cargo.`);
  });
function help(receivedMessage){
    receivedMessage.channel.send("```.tag Para pegar uma tag, a sintaxe: \n.tag (role) (nome) \nRole: Healer, RDPS,MDPS,TANK.```");
}
function pingPong(receivedMessage,arguments){
    console.log("ping pong")
    if(arguments.length>1){
        return;
    }

    if(arguments.length == 0 ){
        receivedMessage.channel.send(client.ping);
    }
    else{
        
            
            for (i = 0; i < arguments[0]; i++) {
                receivedMessage.channel.send("Ping pong");
            } 
    }
}
server.listen(process.env.PORT, '0.0.0.0');
client.login(process.env.token);
