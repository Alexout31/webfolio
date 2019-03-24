class tikTakToe {
    constructor(gameSpace) {
        this.gameSpace = gameSpace;
        this.status = 'playing';
        this.mapValues = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.phase = 'X';
    }

    init() {
        this._renderGame();
        this._initEventHandlers();
    }

    _renderGame() {
        $(this.gameSpace).append($('<h2>Крестики-нолики!</h2>'));
        const $table = $('<table/>', {
            id: 'tikTakToe'
        });
        this._infoField();
        $(this.gameSpace).append($table);
        for (let row = 0; row < 3; row++) {
            let $row = $('<tr/>');
            $row.appendTo($table);

            for (let col = 0; col < 3; col++) {
                let $col = $('<td/>');
                $col.attr('data-row', row);
                $col.attr('data-col', col);
                $col.appendTo($row);
            }
        }
        this._reloadGame()
    }

    _initEventHandlers() {
        $(this.gameSpace).on('click', (e) => {
            this._cellClickHandler(e);
        })
    }

    _cellClickHandler(e) {
        if (!this._isCorrectClick(e)) {
            return;
        }
        this._fillCell(e);
        if (this._hasWon()) {
            this._changeStatus();
            this._sayWonPhase();
        } else {
            this._togglePhase();
        }
    }

    _isCorrectClick(e) {
        return this._isStatusPlaying() && this._isClickByCell(e) && this._isCellEmpty(e);
    }

    _isClickByCell(e) {
        return e.target.tagName === 'TD';
    }

    _isCellEmpty(e) {
        const row = +e.target.dataset.row;
        const col = +e.target.dataset.col;
        return this.mapValues[row][col] === '';
    }

    _fillCell(e) {
        const row = +e.target.dataset.row;
        const col = +e.target.dataset.col;
        this.mapValues[row][col] = this.phase;
        $(e.target).text(this.phase);
    }

    _clearCells() {
        for (let row = 0; row < 3; row++) {
            const $value = $('#tikTakToe').find(`[data-row=${row}]`);
            for (let col = 0; col < 3; col++) {
                $($value[col]).text('');
            }
        }
    }

    _togglePhase() {
        if (this.phase === 'X') {
            this.phase = 'O';
            $('.game-info').text('Ходят нолики');
        } else if (this.phase === 'O'){
            this.phase = 'X';
            $('.game-info').text('Ходят крестики');
        }
    }

    _isLineWon(a, b, c) {
        const value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === 'OOO';
    }

    _hasWon() {
        return this._isLineWon({x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}) ||
            this._isLineWon({x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}) ||
            this._isLineWon({x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}) ||
            this._isLineWon({x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}) ||
            this._isLineWon({x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}) ||
            this._isLineWon({x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}) ||
            this._isLineWon({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}) ||
            this._isLineWon({x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2});
    }

    _changeStatus() {
        this.status = this.status === 'playing' ? 'stopped' : 'playing';
    }

    _isStatusPlaying() {
        return this.status === 'playing';
    }

    _sayWonPhase() {
        const player = this.phase === 'X' ? 'крестики' : 'нолики';
        $('.game-info').text(`Победили ${player}`);
    }

    _infoField() {
        $(this.gameSpace).append($(`<p class="game-info">Ходят крестики</p>`));
    }

    _reloadGame() {
        let $btns = $('<div/>', {
            class: 'btns'
        });
        $btns.insertAfter(this.gameSpace);
        let $newGameBtn = $('<button/>', {
            class: 'btn',
            text: 'Начать заного'
        });
        $btns.append($newGameBtn);
        let $homePageBtn = $('<button/>', {
            class: 'btn',
            text: 'На главную'
        });
        $btns.append($homePageBtn);

        $btns.on('click', (e) => {
            if ($(e.target).is($homePageBtn)) {
                location.href = "index.php";
            }
            if ($(e.target).is($newGameBtn)) {
                this.mapValues = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ];
                this._clearCells();
                this.status = 'playing';
                this.phase = 'X';
                $('.game-info').text('Ходят крестики');
            }
        })
    }
}