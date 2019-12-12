import React, { Component } from "react";
import styled from "styled-components";
import Tile from "./Tile";

const StyledBoard = styled.div`
    background: #0f2949;
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 22px;
    box-shadow: 4px 5px 20px 0px rgba(200, 200, 200, 1);
    border-style: inset;
    border-color: #507a90;
    border-width: 5px;
`;

class Board extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <StyledBoard>
                {this.props.board.grid.map((gridrow, topIdx) => {
                    return gridrow.map((tile, idx) => {
                        return (
                            <Tile
                                key={idx}
                                tile={tile}
                                reveal={
                                    tile.explored || this.props.revealBoard()
                                }
                                updateGame={this.props.updateGame}
                                gameOver={this.props.revealBoard()}
                            />
                        );
                    });
                })}
            </StyledBoard>
        );
    }
}

export default Board;
