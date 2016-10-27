;(() => {
  'use strict'

  function recoverSecret (triplets) {
    let rules = {}

    triplets.forEach((triplet) => {
      let [f, s, t] = triplet

      if (!rules.hasOwnProperty(f)) {
        rules[f] = {
          before: new Set(),
          after: new Set()
        }
        rules[f].before.add(s)
        rules[f].before.add(t)
      } else {
        rules[f].before.add(s)
        rules[f].before.add(t)
      }

      if (!rules.hasOwnProperty(s)) {
        rules[s] = {
          before: new Set(),
          after: new Set()
        }
        rules[s].before.add(t)
        rules[s].after.add(f)
      } else {
        rules[s].before.add(t)
        rules[s].after.add(f)
      }

      if (!rules.hasOwnProperty(t)) {
        rules[t] = {
          before: new Set(),
          after: new Set()
        }
        rules[t].after.add(f)
        rules[t].after.add(s)
      } else {
        rules[t].after.add(f)
        rules[t].after.add(s)
      }
    })

    for (let letter in rules) {
      rules[letter].before = Array.from(rules[letter].before)
      rules[letter].after = Array.from(rules[letter].after)
    }
    console.log(rules)

    return generateWord(rules)
  }

  function generateWord (rules) {
    let word = []
    let reverse = []
    let before = ''
    let after = ''
    for (let letter in rules) {
      if (rules[letter].after.length === 0) {
        word.push(letter)
        after = letter
      }
    }
    let hasEntered = true
    while (hasEntered) {
      for (let letter in rules) {
        if (rules[letter].after.length === 1 && rules[letter].after[0] === after) {
          word.push(letter)
          after = letter
          hasEntered = true
          continue
        }
        hasEntered = false
      }
    }

    for (let letter in rules) {
      if (rules[letter].before.length === 0) {
        reverse.push(letter)
        before = letter
      }
    }
    hasEntered = true
    while (hasEntered) {
      for (let letter in rules) {
        console.log(letter, before)
        if ((rules[letter].before.length === 1) && (rules[letter].before[0] === before)) {
          reverse.push(letter)
          before = letter
          console.log(before)
          hasEntered = true
          continue
        }
        hasEntered = false
      }
    }

    return word + reverse.reverse()
  }

  let triplets = [
    ['t', 'u', 'p'],
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['w', 'h', 's']
  ]

  console.log(recoverSecret(triplets))
})()
