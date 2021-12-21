# Dungeon Slayers

Crawl scenario-based dungeons and slay everything in your path.

## TODO
- [x] Display abilities of current player/monster turn
- [x] Turn order
    - [x] display turn order
    - [x] adjust turn order on turn end
- [ ] Allow player to select their move(s)
    - [x] highlight on move
    - [x] display invalid move
    - [x] feat: trigger on valid move
        - [x] refactor: update arena instead of replacing so click listeners remain?
    - [ ] feat: select abilities to power move
        - [ ] update UI to reflect used ability
    - [ ] feat: reset turn
- [ ] feat: Evaluate monster moves
    - [ ] feat: always move closer
    - [ ] feat: always attack nearest
- [ ] feat: Design encounter object
- [ ] feat: Draw actual maps
    - [ ] feat: polygons (not just squares, rects)
    - [ ] feat: scroll the map with the mouse / player movement
