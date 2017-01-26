;(() => {
  'use strict'

  const Sudoku = function (data) {
    const isValidInput = (input) => {
      let length = input[0].length
      return Array.isArray(input) && input.reduce((prev, curr) => {
        let result = prev && curr.length === length
        return result
      }, true)
    }

    let sudoku = data
    let isValid = isValidInput(data)

    let size, root
    if (isValid) {
      size = data[0].length
      root = parseInt(Math.sqrt(size))
    }

    const getHorizontals = () => {
      return sudoku
    }

    /**
     * Get the verticals lines
     *
     * @return {[type]}
     */
    const getVerticals = () => {
      let verticals = []
      let row = []

      for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
          row.push(sudoku[i][j])
        }
        verticals.push(row)
        row = []
      }

      return verticals
    }

    const getSquares = () => {
      let square = []
      let liner = []
      let smallLiner = []

      for (let i = 0; i < size; i += root) {
        for (let j = 0; j < size; j += root) {
          for (let k = i; k < i + root; k++) {
            for (let m = j; m < j + root; m++) {
              smallLiner.push(sudoku[k][m])
            }
            liner = liner.concat(smallLiner)
            smallLiner = []
          }
          square.push(liner)
          liner = []
        }
      }

      return square
    }

    const isOk = (line) => {
      const generateCompleter = () => {
        let obj = {}
        for (let x = 1; x <= size; x++) {
          obj[x] = 0
        }

        return obj
      }

      let completer = generateCompleter()

      line.forEach(item => completer[item]++)

      for (let x in completer) {
        if (completer[x] === 0 || completer[x] === undefined) return false
      }

      return true
    }

    return {
      isValid: function () {
        if (isValid) {
          let liners = []

          liners = getVerticals()
          liners = liners.concat(getHorizontals())
          liners = liners.concat(getSquares())

          return liners.reduce((prev, curr) => {
            return prev && isOk(curr)
          }, true)
        } else {
          return false
        }
      }
    }
  }

  let sudoku = new Sudoku([
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1]
  ])

  sudoku.isValid()
})()
