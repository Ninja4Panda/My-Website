# My-Website
A personal website created using vanilla javascript, bootstrap 4 and expresjs hosting on a raspberry pi

## **Security Concerns**
- [ ] Implement Content Security Policy(CSP)

## **Main Page**
Main page for the portfolio

### TODO
- [ ] Change carousel of recipe 
- Currently using game page photos 

## **Recipe Page**
Mom's recipes using local mongoDB database

### TODO
- [ ] Implement mtls admin page for updating recipes

- [ ] Storing photo with gridFS

- [ ] Implement search functionaity

- [x] Implement categories *30/01/2021*

## **Game Page**
Recreating the classic Mafia game using socket-io 

### Design Tradeoffs
Due to weak processing power of the server, a lot of workload are handled on frontend. 

Server caches all sockets in a game for faster lookup even though they are all in a socket-io room.  

During voting phase, if the last player that hasn't voted yet disconnected, voting phase will not be skipped hence mafia has to wait for time to pass but no major issue.

During voting phase, if a player that got voted disconnected, voting phase will not be skipped as there won't be enough votes but no major issue. This is due the clean up of disconnection removing disconnected players from the voted array.

### TODO
- [ ] Implement webrtc to allow audio connection between clients
- Because all clients need to talk to each other a mesh network is needed.
- Using MCU can work but not possible for a personal project.

- [ ] Change implementation of uid 
- Changing the uid to be numbers instead of randomly generated value to allow easier communication

- [x] Implement spectator *22/09/2020*
- Players that already died should be able to see what is going on but can't talk 

- [x] Dead players implementation *22/09/2020*
- Dead array implemented for dead players in [dead_socket, dead_player] 
- Dead players will be added back in after the game finished so they can talk again 

- [x] Test for players that trys to change the img.id to alive from dead *22/09/2020*
- Should show that they voted for no one 

- [x] Implement clickable avator *20/09/2020*

- [x] Implement nurse logic *12/09/2020*
- Nurse finds out the potenially dead person in game.votes when he still has a revive potion

- [x] Implement disconnection *4/09/2020*

### Known bugs
- Auto scroll feature for chat not functioning as well as anticipated when a big paragraph gets send
- ~A player disconnected after being picked as kill target doesn't work correctly.~ (Fixed by putting a check inside died function *22/09/2020*)
- ~If a player disconnect right at the moment when another player vote him the voting player will be disconnected.~ (Fixed by changing operations in the catch *22/09/2020*)
- ~Start Game doesn't work when there is only one person in the room(It shouldn't work anyways. During testing, when there is only one person in the room, the room will not function correctly)~ (Fixed by putting the start chat event outside of join room callback *20/09/2020*)
- ~Roomid & uid can be number sometimes which makes holes array~ (Fixed by adding checks *6/09/2020*)