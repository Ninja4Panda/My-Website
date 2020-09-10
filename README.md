# My-Website
A Website that I created using pure javascript and expresjs

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

### TODO
- [ ] Implement webrtc to allow audio connection between clients
- Because all clients need to talk to each other a mesh network is needed.
- Using MCU can work but not possible for a personal project.

- [x] Implement disconnection *4/09/2020*

- [ ] Change implementation of uid 
- Changing the uid to be numbers instead of randomly generated value to allow easier communication

- [ ] Implement clickable avator

- [ ] Implement spectator 
- Players that already died should be able to see what is going on 

- [ ] Implement doctor logic
- Doctor finds out the potenially dead person in game.votes when he still has a revive potion

### Known bugs
- Roomid & uid can be number sometimes which makes holes array 