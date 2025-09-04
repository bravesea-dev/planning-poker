import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PlayerAvatar } from './PlayerAvatar';

interface Player {
  id: string;
  name: string;
  hasSelected: boolean;
  selectedValue?: number;
  isCurrentPlayer?: boolean;
}

interface GameBoardProps {
  players: Player[];
  allPlayersSelected: boolean;
  onReveal: () => void;
  showResults: boolean;
  countdown: number | null;
}

export function GameBoard({ players, allPlayersSelected, onReveal, showResults, countdown }: GameBoardProps) {
  // Calculate positions for players in a circle
  const getPlayerPosition = (index: number, totalPlayers: number) => {
    const centerX = 50;
    const centerY = 50;
    const radius = 35; // Percentage of container
    
    // Start from top and go clockwise
    const angle = (index * (360 / totalPlayers) - 90) * (Math.PI / 180);
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl h-96 relative">
        <CardHeader className="text-center pb-2">
          <CardTitle>Planning Poker</CardTitle>
        </CardHeader>
        <CardContent className="h-full relative">
          {/* Players positioned in circle */}
          {players.map((player, index) => (
            <PlayerAvatar
              key={player.id}
              player={player}
              showValue={showResults}
              position={getPlayerPosition(index, players.length)}
            />
          ))}
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {countdown !== null ? (
                <div className="text-6xl font-bold text-primary animate-pulse">
                  {countdown === 0 ? "Reveal!" : countdown}
                </div>
              ) : showResults ? (
                <div>
                  <h3 className="text-lg font-medium mb-2">Results</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {players.map((player) => (
                      player.selectedValue && (
                        <span key={player.id} className="text-sm bg-secondary px-2 py-1 rounded">
                          {player.name}: {player.selectedValue}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">
                    {players.filter(p => p.hasSelected).length} of {players.length} players ready
                  </p>
                  <Button 
                    onClick={onReveal}
                    disabled={!allPlayersSelected}
                    className="px-8"
                  >
                    {allPlayersSelected ? 'Reveal Cards' : 'Waiting for players...'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}