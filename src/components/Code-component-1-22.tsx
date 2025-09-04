import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface Player {
  id: string;
  name: string;
  hasSelected: boolean;
  selectedValue?: number;
  isCurrentPlayer?: boolean;
}

interface PlayerAvatarProps {
  player: Player;
  showValue?: boolean;
  position: { x: number; y: number };
}

export function PlayerAvatar({ player, showValue = false, position }: PlayerAvatarProps) {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <Avatar className={`w-16 h-16 border-2 ${
            player.isCurrentPlayer 
              ? 'border-primary shadow-lg' 
              : 'border-border'
          }`}>
            <AvatarFallback className="text-sm font-medium">
              {player.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Selection status indicator */}
          {player.hasSelected && (
            <div className="absolute -top-1 -right-1">
              <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                {showValue && player.selectedValue ? player.selectedValue : '✓'}
              </Badge>
            </div>
          )}
        </div>
        
        <span className="text-xs font-medium text-center max-w-20 truncate">
          {player.name}
        </span>
      </div>
    </div>
  );
}