/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const finalDict = {}
    const usedWords = []
    for (let i = 0; i < this.words.length; i++) {
      if (i < this.words.length - 1) {
        if (usedWords.includes(this.words[i])) {
          if (finalDict[this.words[i]]) {
            finalDict[this.words[i]].push(this.words[i + 1])
          }
        }
        else {
          usedWords.push(this.words[i])
          finalDict[this.words[i]] = [this.words[i + 1]]
        }
      }
      else {
        if (finalDict[this.words[i]]) {
          finalDict[this.words[i]].push(null)
        }
        else {
          finalDict[this.words[i]] = [null]
        }
      }
    }
    return finalDict
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let finalText = ""
    let chains = this.makeChains();
    let randIndex = Math.floor(Math.random() * this.words.length)
    let randWord = this.words[randIndex]

    finalText += ` ${randWord} `
    let word = randWord
    let count = 0

    while (word && (count < numWords)) {
      if (count > 0) {
        finalText += `${word} `
      }
      word = chains[word][Math.floor(Math.random() * chains[word].length)]
      count += 1
    }
    if (!word && count < numWords) {
      finalText += this.makeText(numWords - count)
    }

    return finalText
  }
}


module.exports = { MarkovMachine }
