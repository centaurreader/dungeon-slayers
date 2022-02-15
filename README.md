# Dungeon Slayers

Crawl scenario-based castles and slay everything in your path.

- Explore ancient, evil castles
- Unlock and upgrade your powers
- Combine powers to slay everything

## Architecture

UIScene
1. HTML Template
2. CSS
3. UIScene class instance
    - Template Getter `() => document.getElementById('*_template')`
    - onRender Handler `(instance: HTMLElement, state: GameState) => void`

GameState
1. scenes
    - changeScene `(scene: UIScene) => void`

## TODO
- [ ] main menu
    - [x] start game
        - [x] name character
        - [x] persist save file
    - [ ] display save slots
    - [ ] load game
- [ ] game
    - [ ] display name
    - [ ] allow "quit"
    - [ ] scroll map inside viewport
