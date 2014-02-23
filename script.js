// Generated by CoffeeScript 1.6.3
(function() {
  var background, cacheBoard, canvas, context, currentPixel, finSym, gameBoard, gameOver, gen, hearts, height, keyEvent, keys, level, level2, lives, loadPageVar, numbers, palette, pixelHeight, pixelSize, pixelWidth, render, renderHUD, renderSymbol, score, stroke, textColor, version, width;

  version = '201402232137';

  console.log(version);

  Array.prototype.remove = function(arg) {
    return this.splice(this.indexOf(arg), 1);
  };

  Array.prototype.remove2 = function(arg) {
    var i, index, _i, _ref;
    index = -1;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (JSON.stringify(this[i]) === JSON.stringify(arg)) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return -1;
    } else {
      return this.splice(index, 1);
    }
  };

  Array.prototype.count2 = function(arg) {
    var i, index, _i, _ref;
    index = 0;
    for (i = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (JSON.stringify(this[i]) === JSON.stringify(arg)) {
        index++;
      }
    }
    return index;
  };

  canvas = document.getElementById('canvas');

  context = canvas.getContext('2d');

  width = window.innerWidth;

  height = window.innerHeight;

  pixelSize = [15, 10];

  pixelWidth = Math.floor(width / pixelSize[0]) - 1;

  pixelHeight = Math.floor(height / pixelSize[1]) - 1;

  canvas.width = width;

  canvas.height = height;

  background = [255, 255, 255];

  stroke = ["rgb(0, 0, 0)", "rgb(255, 255, 255)"];

  palette = [[191, 0, 0], [239, 127, 0], [255, 191, 0], [0, 191, 0], [0, 191, 191], [31, 0, 191], [191, 0, 255], [255, 0, 191], [0, 0, 0]];

  textColor = [223, 223, 223];

  hearts = [[[0, 0, 0], [1, 0, 1], [1, 1, 1], [0, 1, 0], [0, 0, 0]]];

  finSym = [[[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 0], [1, 0, 0]], [[1, 1, 1], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]], [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1]]];

  numbers = [[[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]], [[1, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]], [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]], [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]], [[1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1]], [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]], [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]], [[1, 1, 1], [0, 0, 1], [0, 1, 1], [0, 0, 1], [0, 0, 1]], [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]], [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]]];

  context.fillStyle = "rgb(" + background[0] + ", " + background[1] + ", " + background[2] + ")";

  context.fillRect(0, 0, width, height);

  currentPixel = [0, 0];

  keys = {
    up: "U",
    down: "D",
    left: "L",
    right: "R"
  };

  loadPageVar = function(sVar) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  };

  level2 = parseInt(loadPageVar('level'));

  level = isNaN(level2) ? 5 : level2;

  gameOver = false;

  lives = 3;

  score = 0;

  gen = function(size, preventInvert) {
    var actions, i, moveset, pixelSet, _i;
    moveset = "";
    pixelSet = [];
    actions = [];
    currentPixel = [Math.floor(pixelWidth * 0.5), Math.floor(pixelHeight * 0.5)];
    for (i = _i = 0; 0 <= size ? _i < size : _i > size; i = 0 <= size ? ++_i : --_i) {
      actions = [keys.up, keys.down, keys.left, keys.right];
      if (currentPixel[1] === 0) {
        actions.remove(keys.up);
      } else if (currentPixel[1] === pixelHeight - 1) {
        actions.remove(keys.down);
      } else if (currentPixel[0] === 0) {
        actions.remove(keys.left);
      } else if (currentPixel[0] === pixelWidth - 1) {
        actions.remove(keys.right);
      }
      if (preventInvert && i > 0) {
        if (moveset[i - 1] === keys.up) {
          actions.remove(keys.down);
        } else if (moveset[i - 1] === keys.down) {
          actions.remove(keys.up);
        } else if (moveset[i - 1] === keys.left) {
          actions.remove(keys.right);
        } else if (moveset[i - 1] === keys.right) {
          actions.remove(keys.left);
        }
      }
      moveset += actions[Math.floor(Math.random() * actions.length)];
      if (moveset[i] === keys.up) {
        currentPixel[1]--;
      } else if (moveset[i] === keys.down) {
        currentPixel[1]++;
      } else if (moveset[i] === keys.left) {
        currentPixel[0]--;
      } else if (moveset[i] === keys.right) {
        currentPixel[0]++;
      }
      pixelSet.push([currentPixel[0], currentPixel[1]]);
    }
    return pixelSet;
  };

  renderSymbol = function(symbolset, number, offsetX, offsetY) {
    var i, j, k, numString, _i, _j, _k, _ref, _ref1, _ref2;
    context.fillStyle = "rgb(" + textColor[0] + ", " + textColor[1] + ", " + textColor[2];
    numString = number.toString();
    for (i = _i = 0, _ref = numString.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      for (j = _j = 0, _ref1 = symbolset[parseInt(numString[i])].length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
        for (k = _k = 0, _ref2 = symbolset[parseInt(numString[i])][j].length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; k = 0 <= _ref2 ? ++_k : --_k) {
          if (symbolset[parseInt(numString[i])][j][k] === 1) {
            context.fillRect((offsetX + i * (symbolset[parseInt(numString[i])][j].length + 1) + k) * pixelSize[0], (offsetY + j) * pixelSize[1], pixelSize[0], pixelSize[1]);
          }
        }
      }
    }
    return 0;
  };

  renderHUD = function() {
    var i, _i;
    if (gameOver) {
      context.fillStyle = "rgb(" + background[0] + ", " + background[1] + ", " + background[2] + ")";
      context.fillRect((Math.ceil(pixelWidth * .5 - 1.5 * (finSym[0][0].length + 1)) - 0.5) * pixelSize[0], (Math.ceil((pixelHeight - finSym[0].length) * .5) - 0.5) * pixelSize[1], (finSym[0][0].length + 1) * 3 * pixelSize[0], (finSym[0].length + 1) * pixelSize[1]);
      renderSymbol(finSym, 123, Math.ceil(pixelWidth * .5 - 1.5 * (finSym[0][0].length + 1)), Math.ceil((pixelHeight - finSym[0].length) * .5));
    }
    renderSymbol(numbers, level, 1, 1);
    renderSymbol(numbers, score, pixelWidth - (numbers[0][0].length + 1) * score.toString().length + 1, numbers[0].length + 2);
    for (i = _i = 0; 0 <= lives ? _i < lives : _i > lives; i = 0 <= lives ? ++_i : --_i) {
      renderSymbol(hearts, 0, pixelWidth - (hearts[0][0].length + 1) * (i + 1) + 1, 1);
    }
    return context.fillRect(pixelWidth * pixelSize[0], pixelHeight * pixelSize[1], pixelSize[0], pixelSize[1]);
  };

  render = function(pixelSet) {
    var i, j, _i, _ref;
    context.fillStyle = "rgb(" + background[0] + ", " + background[1] + ", " + background[2] + ")";
    context.fillRect(0, 0, width, height);
    renderHUD();
    for (i = _i = 0, _ref = pixelSet.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      j = pixelSet.slice(0, i).count2(pixelSet[i]);
      if (j > palette.length - 1) {
        j = palette.length - 1;
      }
      context.fillStyle = "rgb(" + palette[j][0] + ", " + palette[j][1] + ", " + palette[j][2] + ")";
      context.fillRect(pixelSet[i][0] * pixelSize[0] + 1, pixelSet[i][1] * pixelSize[1] + 1, pixelSize[0] - 2, pixelSize[1] - 2);
    }
    context.strokeStyle = stroke[0];
    context.strokeRect(currentPixel[0] * pixelSize[0] + 0.5, currentPixel[1] * pixelSize[1] + 0.5, pixelSize[0] - 1, pixelSize[1] - 1);
    context.strokeStyle = stroke[1];
    context.strokeRect(currentPixel[0] * pixelSize[0] + 1.5, currentPixel[1] * pixelSize[1] + 1.5, pixelSize[0] - 3, pixelSize[1] - 3);
    return 0;
  };

  gameBoard = gen(level, true);

  cacheBoard = gameBoard.slice(0);

  currentPixel = [gameBoard[0][0], gameBoard[0][1]];

  render(gameBoard);

  keyEvent = function(ee) {
    var currentPixel2, e, i, j, kc, key, _i, _ref;
    e = window.event ? window.event : ee;
    kc = e.keyCode;
    if (kc === 38) {
      key = keys.up;
    } else if (kc === 40) {
      key = keys.down;
    } else if (kc === 37) {
      key = keys.left;
    } else if (kc === 39) {
      key = keys.right;
    } else if (kc === 27 || kc === 32) {
      if (gameOver) {
        gameOver = false;
        lives = 3;
        level = isNaN(level2) ? 5 : level2;
        score = 0;
        gameBoard = gen(level, true);
        cacheBoard = gameBoard.slice(0);
        currentPixel = [gameBoard[0][0], gameBoard[0][1]];
        render(gameBoard);
        return -1;
      }
      if (lives > 0) {
        lives--;
        gameBoard = cacheBoard.slice(0);
        currentPixel = [gameBoard[0][0], gameBoard[0][1]];
        render(gameBoard);
        return -1;
      } else {
        gameOver = true;
        renderHUD();
        return -1;
      }
    }
    switch (key) {
      case keys.up:
        currentPixel2 = [currentPixel[0], currentPixel[1] - 1];
        break;
      case keys.down:
        currentPixel2 = [currentPixel[0], currentPixel[1] + 1];
        break;
      case keys.left:
        currentPixel2 = [currentPixel[0] - 1, currentPixel[1]];
        break;
      case keys.right:
        currentPixel2 = [currentPixel[0] + 1, currentPixel[1]];
        break;
      default:
        console.log("Input blocked: unknown key");
        return -1;
    }
    j = -1;
    for (i = _i = 0, _ref = gameBoard.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (currentPixel2[0] === gameBoard[i][0] && currentPixel2[1] === gameBoard[i][1]) {
        j = i;
        break;
      }
    }
    if (j === -1) {
      console.log("Input blocked: not valid tile");
      return -1;
    }
    gameBoard.remove2(currentPixel);
    currentPixel[0] = currentPixel2[0];
    currentPixel[1] = currentPixel2[1];
    score += level;
    if (gameBoard.length > 1) {
      render(gameBoard);
    } else {
      score += level * level;
      gameBoard = gen(++level, true);
      cacheBoard = gameBoard.slice(0);
      currentPixel = [gameBoard[0][0], gameBoard[0][1]];
      render(gameBoard);
    }
    return 0;
  };

  document.addEventListener('keyup', keyEvent, false);

  window.addEventListener('resize', function(e) {
    console.log("Resize");
    width = window.innerWidth;
    height = window.innerHeight;
    pixelWidth = Math.floor(width / pixelSize[0]) - 1;
    pixelHeight = Math.floor(height / pixelSize[1]) - 1;
    render(gameBoard);
    return 0;
  });

}).call(this);