import React from "react";
import "./StartMenu.css";

interface StartMenuProps {
  onStart(): void;
  onControls(): void;
  onSettings(): void;
}

export function StartMenu({ onStart, onControls, onSettings }: StartMenuProps) {
  return (
    <div className="start-menu">
      {/* Logo or title */}
      <img src="/game.png" alt="Game Logo" className="menu-logo" />

      {/* Buttons */}
      <ul className="menu-buttons">
        <li>
          <button onClick={onStart}>Start Game</button>
        </li>

        <li>
          <button onClick={onControls}>Controls Guide</button>
        </li>
        <li>
          <button onClick={onSettings}>Settings</button>
        </li>
      </ul>
    </div>
  );
}
