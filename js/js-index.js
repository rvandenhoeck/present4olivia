const matchDict = ["momofuku"];

const wordDict = ["momofuku","absolute","academic","accident","accurate","activist","activity","actually","addition","adequate","advanced","advocate","aircraft","alliance","although","analysis","announce","anything","anywhere","apparent","approach","approval","argument","artistic","athletic","attitude","audience","bathroom","behavior","birthday","boundary","building","business","campaign","capacity","category","ceremony","champion","changing","civilian","clinical","clothing","collapse","complain","complete","comprise","computer","conclude","concrete","conflict","confront","confused","congress","consider","constant","consumer","continue","contract","contrary","contrast","convince","corridor","coverage","covering","creation","creative","creature","criminal","criteria","critical","crossing","cultural","currency","customer","darkness","database","daughter","daylight","deadline","deciding","decision","decrease","deferred","definite","delicate","delivery","describe","designer","detailed","diabetes","dialogue","diameter","directly","director","disabled","disagree","disaster","disclose","discount","discover","disorder","disposal","distance","distinct","district","dividend","division","doctrine","document","domestic","dominant","dominate","doubtful","dramatic","dressing","dropping","duration","dynamics","earnings","economic","educated","educator","efficacy","eighteen","election","electric","eligible","emerging","emission","emphasis","employee","employer","endeavor","engaging","engineer","enormous","entirely","entrance","envelope","equality","equation","estimate","evaluate","eventual","everyday","everyone","evidence","exchange","exciting","exercise","existing","explicit","exposure","extended","external","facility","familiar","favorite","featured","feedback","festival","fighting","finished","firewall","flagship","flexible","floating","football","foothill","forecast","foremost","formerly","fourteen","fraction","franklin","frequent","friendly","frontier","function","generate","generous","genomics","goodwill","governor","graduate","graphics","grateful","greatest","guardian","guidance","handling","hardware","headline","heritage","highland","historic","homeless","homepage","hospital","humanity","identify","identity","ideology","imperial","incident","included","increase","indicate","indirect","industry","informal","informed","inherent","initiate","innocent","inspired","instance","integral","intended","interact","interest","interior","internal","internet","interval","intimate","intranet","invasion","investor","involved","isolated","judgment","judicial","junction","keyboard","landlord","language","laughter","learning","leverage","lifetime","lighting","likewise","limiting","literary","location","magazine","magnetic","maintain","majority","marginal","marriage","material","maturity","maximize","meantime","measured","medicine","medieval","memorial","merchant","midnight","military","minimize","minister","ministry","minority","mobility","modeling","moderate","momentum","monetary","moreover","mortgage","mountain","mounting","movement","multiple","musician","national","negative","neighbor","nineteen","normally","northern","notebook","numerous","observer","occasion","offering","official","offshore","operator","opponent","opposite","optimism","optional","ordinary","organize","original","overcome","overhead","overlook","overseas","overview","painting","parallel","parental","patented","patience","peaceful","perceive","periodic","personal","persuade","petition","physical","pipeline","planning","platform","pleasant","pleasure","politics","portable","portrait","position","positive","possible","possibly","pounding","powerful","practice","precious","pregnant","presence","preserve","pressing","pressure","previous","princess","printing","priority","prisoner","probable","probably","producer","profound","progress","properly","property","proposal","proposed","prospect","protocol","provided","provider","province","publicly","purchase","pursuant","quantity","question","rational","reaction","received","receiver","recently","recovery","regional","register","regulate","relation","relative","relevant","reliable","reliance","religion","remember","renowned","repeated","reporter","republic","required","research","resemble","reserved","resident","resigned","resource","response","restrict","revision","rigorous","romantic","sampling","sanction","scenario","schedule","scrutiny","seasonal","secondly","security","sensible","sentence","separate","sequence","sergeant","shipping","shooting","shopping","shortage","shoulder","simplify","situated","slightly","software","solution","somebody","somewhat","southern","speaking","specific","spectrum","spending","sporting","standard","standing","standout","sterling","straight","stranger","strategy","strength","striking","strongly","struggle","stunning","suburban","suddenly","suitable","superior","supposed","surgical","surprise","surround","survival","survivor","sweeping","swimming","symbolic","sympathy","syndrome","tactical","tailored","takeover","tangible","taxation","taxpayer","teaching","teaspoon","teenager","tendency","terminal","terrible","thinking","thirteen","thorough","thousand","threaten","together","tomorrow","touching","tracking","training","transfer","traveled","treasury","triangle","tropical","turnover","ultimate","umbrella","universe","unlawful","unlikely","vacation","valuable","variable","vertical","victoria","violence","volatile","warranty","weakness","weighted","whatever","whenever","wherever","wildlife","wireless","withdraw","woodland","workshop","yourself"];

const numWords = matchDict.length;
function getRandomWord() {
  const idx = Math.floor(numWords * Math.random());
  return matchDict[idx];
}

const wordLength = 8;
const maxGuesses = 6;

function Tile() {
  const element = document.createElement('div');
  element.classList.add('tile-container');
  
  const tile = document.createElement('div');
  tile.classList.add('tile');
  element.appendChild(tile)
  
  let value = ''
  let state = 'tbd'
  
  function get() {
    return value;
  }
  
  function set(letter) {
    tile.innerHTML = letter
    value = letter
  }
  
  function clear (letter) {
    tile.innerHTML = '';
    value = '';
    tile.classList.remove('correct','oop','wrong');
  }
  
  const stateActions = {
    'correct': setCorrect,
    'oop': setOutOfPlace,
    'wrong': setWrong
  }
  
  function setCorrect() 
  {
    tile.classList.add('correct');
  }
  
  function setOutOfPlace() 
  {
    tile.classList.add('oop');
  }
  
  function setWrong() 
  {
    tile.classList.add('wrong');
  }
  
  function setState(newState) {
    state = newState
    if(stateActions[state])
       stateActions[state]();
  }
  
  function getState() {
    return state
  }
  
  return {
    element,
    get,
    set,
    clear,
    setState,
    getState
  }
}

function createGuessRow() {
  // Create container
  const element = document.createElement('div');
  element.classList.add('guess');
  
  let idx = 0

  // Add tiles
  let tiles = [];
  let i = 0;
  for(;i<wordLength;i++) {
    const tile = Tile();
    element.appendChild(tile.element);
    tiles.push(tile);
  }
  
  function appendLetter(letter) {
    if(idx >= wordLength) return
    tiles[idx].set(letter)
    idx++
  }
  
  function deleteLetter() {
    if(idx <= 0) return
    idx--
    tiles[idx].clear()
  }
  
  function getWord() {
    return tiles.reduce((prevValue, curTile) => {
      return prevValue += curTile.get()
    }, '')
  }
  
  function clear() {
    tiles.forEach(tile => tile.clear())
    idx = 0
  }
  
  return {
    element,
    tiles,
    appendLetter,
    deleteLetter,
    getWord,
    clear
  }
}

function createGameBoard() {
  // Create container
  const element = document.createElement('div')
  element.classList.add('board')
  
  // Add rows
  let guesses = [];
  let i = 0;
  for(;i<maxGuesses;i++) {
    const guess = createGuessRow();
    element.appendChild(guess.element);
    guesses.push(guess);
  }
  
  function clear() {
    guesses.forEach(guess => guess.clear())
  }
  
  return {
    element,
    guesses,
    clear
  }
}

// Keyboard
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const keyboardLayout = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['enter','z','x','c','v','b','n','m','delete']]

function createKey(letter, onClick) {
  const element = document.createElement('button');
  element.classList.add('key');
  element.dataset.value = letter
  element.innerHTML = letter.toUpperCase();
  
  element.addEventListener('click', onClick)
  let state = 'tbd'
  
  const stateActions = {
    'correct': setCorrect,
    'oop': setOutOfPlace,
    'wrong': setWrong
  }
  
  function setCorrect() 
  {
    clear()
    element.classList.add('correct');
  }
  
  function setOutOfPlace() 
  {
    clear()
    element.classList.add('oop');
  }
  
  function setWrong() 
  {
    clear()
    element.classList.add('wrong');
  }
  
  function setState(newState) {
    state = newState
    
    if(stateActions[state])
      stateActions[state]()
  }
  
  function getState() {
    return state
  }
  
  function clear() {
    element.classList.remove('correct', 'oop', 'wrong');
  }
  
  return {
    letter,
    element,
    setState,
    getState,
    clear
  }
}

function createKeyboardRow(row, onClick) {
  const element = document.createElement('div')
  element.classList.add('keyboard-row')
  
  const keys = {}
  row.forEach(letter => {
    const key = createKey(letter, onClick);
    keys[letter] = key;
    element.appendChild(key.element);
  })
  
  return { 
    element,
    keys
  }
}

function createKeyboad() {
  const element = document.createElement('div')
  element.classList.add('keyboard')
  
  const keyMap = {}
  keyboardLayout.forEach(keyRow => {
    const row = createKeyboardRow(keyRow, handleClick)
    element.appendChild(row.element)
    Object.assign(keyMap, row.keys)
  })
  
  let callback;
  
  function handleClick(value) {
    if(!callback) return;
    callback(value.srcElement)
  }
  
  function addClickCallback(fn) {
  if(!(fn && typeof fn === 'function')) return
    callback = fn
  }
  
  function removeClickCallback() {
    callback = undefined
  }
  
  function clear() {
    Object.keys(keyMap).forEach(key => keyMap[key].clear())
  }
  
  return {
    element,
    keyMap,
    addClickCallback,
    removeClickCallback,
    clear
  }
}

const keyboard = createKeyboad();

const keyboardElement = document.getElementById('keyboard')
keyboardElement.appendChild(keyboard.element)

// Game Element
const gameEl = document.getElementById('game')

// Messages
function MessageDisplay() {
  const element = document.createElement('div');
  element.classList.add('message', 'hide');
  
  const text = document.createElement('h4');
  text.classList.add('text');
  
  element.appendChild(text);
  
  let isVisible = false;
  const duration = 1500;
  
  function show(value, keep) {
    if(isVisible) return;
    
    if(!(value && typeof value === 'string')) return;
       
    text.innerHTML = value;
    
    element.classList.remove('hide');
    element.classList.add('show');
    isVisible = true;

		if (!keep) setTimeout(hide, duration);    
  }

  function hide() {
    element.classList.remove('show');
    element.classList.add('hide');
    isVisible = false;
  }
  
  return {
    element,
    show
  }
}

// Gameplay
function Game() {
  let curGuessIndex = 0;
  let curGuessLetterIndex = 0;
  let curGuessWord = ''
  
  // Create Game Board
  const gameBoard = createGameBoard();

  function GuessIterator() {
    const guesses = gameBoard.guesses
    const maxIdx = guesses.length-1
    let idx = -1
    let guess = guesses[idx]
    return {
      next: function() {
        if (idx >= maxIdx) return { 
          value: undefined,
          done: true
        }

        idx++
        guess = guesses[idx]
        return { 
          value: guess,
          done: false
        }
      }
    }
  }
  
  let guessItr, guess, gameRunning = false;
  
  let matchWord = ''
  function setMatchWord() {
    matchWord = getRandomWord()
  }
  
  // Render
  const container = document.getElementById('game-container');
  container.appendChild(gameBoard.element);
  
  const message = MessageDisplay()
  container.appendChild(message.element)

  function appendGuessEntry(letter) {    
    if(!guess.value) return
      
    if(!(letter && typeof letter === 'string')) return;

    guess.value.appendLetter(letter)
  }

  function deleteGuessEntry() {
    if(!guess.value) return
    guess.value.deleteLetter()
  }

  function submitGuess() {
    const word = guess.value.getWord();
    
    if(word.length !== wordLength) {
      handleShortWord();
      return
    }
    
    if(!(wordDict.includes(word) || matchDict.includes(word))) {
      handleInvalidWord();
      return ;
    }
    
    const correctGuess = evaluateTiles()
    
    if(!correctGuess) {
      guess = guessItr.next();
      
       if(guess.done === true)
         message.show(matchWord.toUpperCase())
      
      return;
    }
    
    handleCorrectGuess();
    endGame();
  }
  
  function evaluateTiles() {
    let matchLetters = [...matchWord],
        unmatchedLetters,
        matchLetter,
        tileValue,
        unmatched,
        correctLetters = 0
    
    unmatchedLetters = matchLetters.reduce((obj, letter) => {
      if(obj[letter]) {
        obj[letter]++;
        return obj;
      }
      
      obj[letter] = 1;
      return obj;
    }, {})
    
    // Step through the tiles
    const tilesToReEvaluate = []
    guess.value.tiles.forEach((tile, idx) => {
        tileValue = tile.get();
        // Letter at the same index in the match word
        matchLetter = matchLetters[idx];
      
        // Is it a match?
        if(tileValue === matchLetter) {
          tile.setState('correct');
          updateKeyboard(tileValue, 'correct');
          unmatchedLetters[tileValue]--;
          correctLetters++;
          return;
        }
      
        tilesToReEvaluate.push(tile)
    })
    
    tilesToReEvaluate.forEach((tile, idx) => {
        tileValue = tile.get();
      
        // Letter at the same index in the match word
        matchLetter = matchLetters[idx];
      
        // Out of place?
        if(unmatchedLetters[tileValue] > 0) {
          tile.setState('oop');
          updateKeyboard(tileValue, 'oop')
          unmatchedLetters[tileValue]--;
          return;
        }

        tile.setState('wrong');
        updateKeyboard(tileValue, 'wrong');
    })
    
    if(correctLetters === wordLength)
       return true;
    
    return false;
  }
  
  const keyboardStatePriority = {
    'correct': 0,
    'oop': 1,
    'wrong': 2,
    'tbd': 3
  }
  function updateKeyboard(key, state) {
    const curState = keyboard.keyMap[key].getState();
    
    const curPriority = keyboardStatePriority[curState];
    const newPriority = keyboardStatePriority[state];
    
    if(newPriority >= curPriority) return;
    
    keyboard.keyMap[key].setState(state);
  }
  
  function handleShortWord() {
    message.show(`You need ${wordLength} letters, asshole`)
  }
  
  function handleInvalidWord() {
    message.show("I don't like this word, asshole")
  }
  
  function handleCorrectGuess() {
    message.show(`Amazing! We're fine-dining at Momofuku Ko in January 🎅🏻🍣🎉`, true)
  }
  
  function startGame() {
    gameBoard.clear();
    removeListseners();
    keyboard.clear();

    
    guessItr = new GuessIterator();
    guess = guessItr.next();
    
    setMatchWord();
    addListeners();
  }
  
  function endGame() {
    removeListseners();
		document.querySelector('audio').play();
  }
  
  function addListeners() {
    keyboard.addClickCallback(onKeyboardClick)
    window.addEventListener('keydown', onButtonClick)
  }
  
  function removeListseners() {
    keyboard.removeClickCallback()
    window.removeEventListener('keydown', onButtonClick)
  }
  
  let actions = {
    'delete': deleteGuessEntry,
    'backspace': deleteGuessEntry,
    'enter': submitGuess,
    'guess': value => {
      appendGuessEntry(value)
    }
  }

  // Handle io click
  function onButtonClick(evt) {
    parseAction(evt.key)
  }
  
  // Handle Keyboard Letter Click
  function onKeyboardClick(el) {
    parseAction(el.dataset.value);
  }

  function parseAction(key) {
    if(alphabet.includes(key)) {
      actions.guess(key);
      return;
    }

    const action = key.toLowerCase()
    if(!actions[action]) return;

    actions[action]();
  }

  return {
    startGame
  }
}

theGame = new Game();
theGame.startGame();

newGameButton.addEventListener('click', (e) => { 
  theGame.startGame();
  e.target.blur()
});