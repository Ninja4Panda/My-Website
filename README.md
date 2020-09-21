# My-Website
A Website that I created using vanilla javascript, bootstrap and expresjs

## **Security Concerns**
- [ ] Implement Content Security Policy(CSP)

## **Main Page**
Main page for the portfolio

## **Cook Page**
Database of Mom's recipes

## **Game Page**
Recreating the classic Mafia game using socket-io 

### Design Tradeoffs
Due to weak processing power of the server, a lot of workload are handled on frontend. 

Server caches all sockets in a game for faster lookup even though they are all in a socket-io room.  

If the last mafia that hasn't voted yet but then disconnected, mafia turn will not be skipped hence mafia has to wait for time to pass. But no major issue.(Same principle for all kinds of voting)

### TODO
- [ ] Implement webrtc to allow audio connection between clients
- Because all clients need to talk to each other a mesh network is needed.
- Using MCU can work but not possible for a personal project.

- [x] Implement disconnection *4/09/2020*

- [ ] Change implementation of uid 
- Changing the uid to be numbers instead of randomly generated value to allow easier communication

- [x] Implement clickable avator *20/09/2020*

- [ ] Implement spectator 
- Players that already died should be able to see what is going on but can't talk 

- [ ] Dead players operation

- [ ] Test for players that trys to change the img.id to alive from dead
- Should show that they voted for no one 

- [x] Implement nurse logic *12/09/2020*
- Nurse finds out the potenially dead person in game.votes when he still has a revive potion

### Known bugs
- ~Roomid & uid can be number sometimes which makes holes array~(Fixed by adding checks*6/09/2020*)
- ~Start Game doesn't work when there is only one person in the room(It shouldn't work anyways. During testing, when there is only one person in the room, the room will not function correctly)~(Fixed by putting the start chat event outside of join room callback *20/09/2020*)
- ~A player disconnected after being picked as kill target doesn't work correctly.~(Fixed by putting a check inside died function *22/09/2020*)
- ~If a player disconnect right at the moment when another player vote him the voting player will be disconnected.~(Fixed by changing operations in the catch *22/09/2020*)