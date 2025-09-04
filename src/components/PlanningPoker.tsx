import React, { useState, useEffect } from 'react';
import { FibonacciSelector } from './FibonacciSelector';
import { GameBoard } from './GameBoard';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Player {
  id: string;
  name: string;
  hasSelected: boolean;
  selectedValue?: number;
  isCurrentPlayer?: boolean;
}

export function PlanningPoker() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameRound, setGameRound] = useState(1);

  // Mock players data - in real app this would come from Supabase
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'You', hasSelected: false, isCurrentPlayer: true },
    { id: '2', name: 'Alice', hasSelected: false },
    { id: '3', name: 'Bob', hasSelected: false },
    { id: '4', name: 'Charlie', hasSelected: false },
    { id: '5', name: 'Diana', hasSelected: false },
  ]);

  // Simulate other players selecting values after current player selects
  useEffect(() => {
    if (selectedValue !== null) {
      const timer = setTimeout(() => {
        setPlayers(prev => 
          prev.map(player => 
            player.isCurrentPlayer 
              ? { ...player, hasSelected: true, selectedValue }
              : { 
                  ...player, 
                  hasSelected: true, 
                  selectedValue: Math.floor(Math.random() * 8) + 1 // Random selection
                }
          )
        );
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedValue]);

  const allPlayersSelected = players.every(player => player.hasSelected);

  const handleFibonacciSelect = (value: number) => {
    setSelectedValue(value);
  };

  const handleReveal = () => {
    setCountdown(3);
  };

  const handleNewRound = () => {
    setSelectedValue(null);
    setShowResults(false);
    setCountdown(null);
    setGameRound(prev => prev + 1);
    setPlayers(prev => prev.map(player => ({ 
      ...player, 
      hasSelected: false, 
      selectedValue: undefined 
    })));
  };

  // Countdown logic
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        // Show results after countdown
        setShowResults(true);
        setCountdown(null);
      }
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Planning Poker</h1>
          <Badge variant="outline">Round {gameRound}</Badge>
        </div>
        {showResults && (
          <Button onClick={handleNewRound} variant="outline">
            New Round
          </Button>
        )}
      </div>

      {/* Game Board */}
      <GameBoard
        players={players}
        allPlayersSelected={allPlayersSelected}
        onReveal={handleReveal}
        showResults={showResults}
        countdown={countdown}
      />

      {/* Fibonacci Selector */}
      <FibonacciSelector
        selectedValue={selectedValue}
        onSelect={handleFibonacciSelect}
        disabled={showResults || countdown !== null}
      />
    </div>
  );
}