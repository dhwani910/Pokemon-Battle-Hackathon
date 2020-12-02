/*
    Start by collecting your game data from your cookie(s) and assigning it to variable(s)...
    keep in mind that cookie data is stored as a string - be sure to use Number() if passing integers
    and JSON.parse if passing JSON as cookie data.
*/



let game = JSON.parse(Cookies.get('game'));

let cpu = game.cpu;
let cpuName = cpu.name;
let cpuHp = Number(cpu.hp);
let cpuAttack = Number(cpu.attack);
let cpuImage = cpu.image;


let player = game.player;
let PlayerName = player.name;
let playerHp = Number(player.hp);
let PlayerAttack = Number(player.attack);
let playerImage = player.image;

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

// cpu.health -= player.pokemon.attack;
// log.push('player attacks and does ' + player.pokemon.attack + 'damage');


// player.health -= cpu.pokemon.attack;
// log.push('cpu attacks and does ' + cpu.pokemon.attack + 'damage');

// let fightAgain = false;
// if(player.health <= 0 && cpu.health <= 0){
//     log.push('<strong> The match was a Draw </strong>');
// }else if(player.health <= 0){
//     log.push('<strong> You have been Defeated </strong>');
// }else if(cpu.health <= 0){
//     log.push('<strong> you are Victorious </strong>');
// }else{
//     fightAgain = true;
// }


function battle(){
    if(playerHp > 0 && cpuHp > 0){
        cpuHp = cpuHp - PlayerAttack;
        playerHp = playerHp - cpuAttack;
        document.querySelector('.player .health').innerHTML = playerHp;
        document.querySelector('.cpu .health').innerHTML = cpuHp;

    }else if(playerHp <= 0){
        document.querySelector('.statement').innerHTML = "cpu wins";
            
            
    }else if(cpuHp <= 0){
        document.querySelector('.statement').innerHTML = "player wins";
           
            
    }else if(playerHp <= 0 && cpuHp <= 0){
        document.querySelector('.statement').innerHTML = "Draw";
     }else{
         null
     }
}


let attackButton = document.querySelector('.game-button');
attackButton.innerHTML = "attack";
attackButton.addEventListener('click', function(){
    battle();
    
});






/*
    - Use selectors to target and fill in the img, .name, and .health elements on battle.html
    - Display the .battlelog contents
    - If the battle is over, present the user with a button to go back to index.html to start a new round
      and also wipe the cookies. 
    - Otherwise, present the user with a button to refresh the page and complete the next battle sequence.
*/

document.querySelector('.player .name').innerHTML = PlayerName;
document.querySelector('.player .health').innerHTML = PlayerAttack + '/' + playerHp;
document.querySelector('.player img').src = playerImage;


document.querySelector('.cpu .name').innerHTML = cpuName;
document.querySelector('.cpu .health').innerHTML = cpuAttack + '/' + cpuHp;
document.querySelector('.cpu img').src = cpuImage;

let battlelog = document.querySelector('.battlelog');

log.map(function(line){
    battlelog.innerHTML += '<li>' + line + '</li>';
});

let footer = document.querySelector('footer');


// if(fightAgain){
//     player.pokemon.attacks.map(function(attack, index){
//         let button = document.createElement('button');
//         button.innerText = attack.name;
//         button.addEventListener('click', function(){
//             player.move = index;
//             cpu.move = Math.floor(Math.random() * cpu.pokemon.attacks.length);
//             cookies.set('game', JSON.stringify(game));
//             location.reload();
//         });
//         footer.append(button);
//     });
// } else{
//     let button = document.createElement('button');
//     button.innerText = 'play a new round';
//     button.addEventListener('click', function(){
//         cookies.remove('game');
//         location.href = 'index.html';
//     });
//     footer.append(button);
// }


let playAgain = document.createElement('button');
playAgain.innerText = 'Play Again';
playAgain.addEventListener('click', function () {
    Cookies.remove('game');
    location.href = 'index.html';
});
footer.append(playAgain);

