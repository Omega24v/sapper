import React, { Component } from "react";
import styled, { css } from "styled-components";

const StyledTile = styled.div`
    background: #507a90;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-color: #507a90;
    font-family: "Arial", sans-serif;
    font-weight: 900;
    color: #fff;
    cursor: pointer;
    transition: 100ms all ease-in;
    ${props =>
        props.explored &&
        css`
            border-color: none;
            background: #024161;
        `}
`;

class Tile extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        let flagged = this.props.tile.flagged;
        const rightClick = e.type === "contextmenu";
        if (rightClick) flagged = !flagged;
        this.props.updateGame(this.props.tile, flagged, rightClick);
    }
    getValue() {
        if (this.props.gameOver) {
            this.props.tile.explore();
        }

        if (!this.props.tile.explored) {
            return this.props.tile.flagged ? "🚩" : null;
        }

        if (this.props.tile.bombed) {
            return "☢️";
        }

        if (this.props.tile.adjacentBombCount() === 0) {
            return null;
        }

        return this.props.tile.adjacentBombCount();
    }
    render() {
        return (
            <StyledTile
                onContextMenu={this.handleClick}
                onClick={this.handleClick}
                explored={this.props.reveal}
            >
                {this.getValue()}
            </StyledTile>
        );
    }
}

export default Tile;
