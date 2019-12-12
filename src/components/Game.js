import React, { Component } from "react";
import styled from "styled-components";
import * as Minesweeper from "../lib/sapper";
import Board from "./Board";

const StyledGame = styled.div`
    h1 {
        font-size: 24px;
        color: #1a1a1a;
        font-family: "Arial", sans-serif;
        text-align: center;
    }
`;

const Modal = styled.div`
    flex-wrap: wrap;
    background: #0f2949;
    color: #fff;
    font-family: "Arial", sans-serif;
    margin-bottom: 41px;
    text-align: center;
    padding: 22px;
    transition: 300ms all ease-in;
    h3 {
        letter-spacing: 1px;
        font-size: 2.5rem;
        margin: 0;
    }
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        width: 50%;
        height: 40%;
    }
    button {
        background: red;
        color: #fff;
        border: none;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: 1.2rem;
        font-weight: 900;
        outline: none;
        padding: 10px 15px;
        margin: 20px auto 10px;
        cursor: pointer;
        display: none;
        &.visible {
            display: block;
        }
    }
`;

class Game extends Component {
    constructor() {
        super();
        this.state = {
            board: new Minesweeper.Board(9, 9),
            isModalOpen: false,
            status: "Try your luck!😁"
        };
        this.updateGame = this.updateGame.bind(this);
        this.checkGame = this.checkGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.openModal = this.openModal.bind(this);
        this.revealBoard = this.revealBoard.bind(this);
    }
    updateGame(tile, flagged, rightClick) {
        if (tile.explored) return null;
        if (rightClick) tile.toggleFlag();
        if (!flagged && !rightClick) tile.explore();
        this.setState(() => ({
            board: this.state.board
        }));
        this.checkGame();
    }
    checkGame() {
        const lost = this.state.board.lost();
        const won = this.state.board.won();

        if (lost) {
            this.openModal("You Lost.");
        }

        if (won) {
            this.openModal("You Win!");
        }
    }
    revealBoard() {
        return this.state.board.lost() || this.state.board.won();
    }
    openModal(status) {
        this.setState(() => ({
            isModalOpen: true,
            status
        }));
    }
    resetGame() {
        this.setState(() => ({
            board: new Minesweeper.Board(9, 9),
            status: "Game in Progress"
        }));
    }
    render() {
        return (
            <StyledGame>
                <Modal>
                    <h3>{this.state.status}</h3>
                    <button
                        className={this.revealBoard() ? "visible" : ""}
                        onClick={this.resetGame}
                    >
                        Restart
                    </button>
                </Modal>
                <Board
                    board={this.state.board}
                    updateGame={this.updateGame}
                    revealBoard={this.revealBoard}
                />
            </StyledGame>
        );
    }
}

export default Game;
