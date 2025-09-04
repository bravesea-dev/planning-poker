import React from 'react';
import { Card } from './ui/card';

interface FibonacciSelectorProps {
  selectedValue: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
}

export function FibonacciSelector({ selectedValue, onSelect, disabled = false }: FibonacciSelectorProps) {
  const fibonacciNumbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className="p-4 bg-white/95 backdrop-blur-sm border shadow-lg">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-muted-foreground mr-2">
            Select your estimate:
          </span>
          {fibonacciNumbers.map((number) => (
            <button
              key={number}
              onClick={() => !disabled && onSelect(number)}
              disabled={disabled}
              className={`
                w-12 h-12 rounded-lg border-2 transition-all
                ${selectedValue === number
                  ? 'border-primary bg-primary text-primary-foreground shadow-md'
                  : 'border-border bg-card text-card-foreground hover:border-primary/50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
              `}
            >
              {number}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}