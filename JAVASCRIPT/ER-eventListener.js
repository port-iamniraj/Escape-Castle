window.addEventListener("keydown", (event) =>{
    if(player.preventInput){
        return;
    }

    switch (event.key){
        case " " :
            for(i = 0; i < doors.length; i++){
                const door = doors[i];
                if(player.hitBox.position.x + player.hitBox.width <= door.position.x + door.width &&
                    player.hitBox.position.x >= door.position.x &&
                    player.hitBox.position.y + player.hitBox.height >= door.position.y &&
                    player.hitBox.position.y <= door.position.y + door.height){
                        player.velocity.x = 0;
                        player.velocity.y = 0;
                        player.preventInput = true;
                        player.switchSprite("enterDoor");
                        door.play();
                        return;
                    }
            }

            if(player.velocity.y === 0 )
            {
                player.velocity.y = -20;
            }
        break;
        case "ArrowRight" :
            keys.ArrowRight.pressed = true;
        break;
        case "ArrowLeft" :
            keys.ArrowLeft.pressed = true;
        break;
   } 
});

window.addEventListener("keyup", (event) =>{
   switch (event.key){
    case "ArrowRight" :
        keys.ArrowRight.pressed = false;
    break;
    case "ArrowLeft" :
        keys.ArrowLeft.pressed = false;
    break;
   } 
});