/*
    Start by collecting your game data from your cookie(s) and assigning it to variable(s)...
    keep in mind that cookie data is stored as a string - be sure to use Number() if passing integers
    and JSON.parse if passing JSON as cookie data.
*/



let game = JSON.parse(Cookies.get('game'));
let cpu = game.cpu;
let player = game.player;
let log = [];


/*    
    Deal with your "battle sequence" by:
        - Subtracting player attack damage from the CPU's health.
        - Record this action in your "battlelog" (tip: an array works well for the battlelog)
        - Subtracting CPU attack damage from the Player's health.
        - Record this action in your "battlelog"
        - Determining if there has been a win, loss, or draw.
        - Record the result in your "battlelog"
        - Save the updated game state (ie. player/cpu pokemon and health) to a cookie(s)
*/

cpu.health -= player.pokemon.attack;
log.push('player attacks and does ' + player.pokemon.attack + 'damage');


player.health -= cpu.pokemon.attack;
log.push('cpu attacks and does ' + cpu.pokemon.attack + 'damage');

let fightAgain = false;
if(player.health <= 0 && cpu.health <= 0){
    log.push('<strong> The match was a Draw </strong>');
}else if(player.health <= 0){
    log.push('<strong> You have been Defeated </strong>');
}else if(cpu.health <= 0){
    log.push('<strong> you are Victorious </strong>');
}else{
    fightAgain = true;
}



/*
    - Use selectors to target and fill in the img, .name, and .health elements on battle.html
    - Display the .battlelog contents
    - If the battle is over, present the user with a button to go back to index.html to start a new round
      and also wipe the cookies. 
    - Otherwise, present the user with a button to refresh the page and complete the next battle sequence.
*/

document.querySelector('.player .name').innerHTML = player.pokemon.name;
document.querySelector('.player .health').innerHTML = player.health + '/' + player.pokemon.hp;
document.querySelector('.player img').src = player.pokemon.image;


document.querySelector('.cpu .name').innerHTML = cpu.pokemon.name;
document.querySelector('.cpu .health').innerHTML = cpu.health + '/' + cpu.pokemon.hp;
document.querySelector('.cpu img').src = cpu.pokemon.image;

let battlelog = document.querySelector('.battlelog');
log.map(function(line){
    battlelog.innerHTML += '<li>' + line + '</li>';
});

let footer = document.querySelector('footer');


if(fightAgain){
    player.pokemon.attacks.map(function(attack, index){
        let button = document.createElement('button');
        button.innerText = attack.name;
        button.addEventListener('click', function(){
            player.move = index;
            cpu.move = Math.floor(Math.random() * cpu.pokemon.attacks.length);
            cookies.set('game', JSON.stringify(game));
            location.reload();
        });
        footer.append(button);
    });
} else{
    let button = document.createElement('button');
    button.innerText = 'play a new round';
    button.addEventListener('click', function(){
        cookies.remove('game');
        location.href = 'index.html';
    });
    footer.append(button);
}


