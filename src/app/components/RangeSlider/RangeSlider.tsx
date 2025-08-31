"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const RangeSlider = ({
  min,
  max,
  value,
  onChange,
}: RangeSliderProps) => {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMinVal(value[0]);
    setMaxVal(value[1]);
  }, [value]);

  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max],
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (minValRef.current && maxValRef.current) {
      onChange([minVal, maxVal]);
    }
  }, [minVal, maxVal, onChange]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(event.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(event.target.value), minVal + 1);
    setMaxVal(value);
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      const newMin = Math.min(value, maxVal);
      setMinVal(newMin);
    }
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      const newMax = Math.max(value, minVal);
      setMaxVal(newMax);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4 space-x-2">
        <input
          type="number"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinInputChange}
          className="w-1/2 p-2 rounded-lg border border-gray-300 text-center"
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxInputChange}
          className="w-1/2 p-2 rounded-lg border border-gray-300 text-center"
        />
      </div>
      <div className="relative h-12">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={handleMinChange}
          className="thumb-range-slider absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-30"
          style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={handleMaxChange}
          className="thumb-range-slider absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-30"
        />
        <div className="relative w-full">
          <div className="absolute top-0 h-1 rounded-lg bg-gray-300 w-full z-10" />
          <div
            ref={range}
            className="absolute top-0 h-1 rounded-lg bg-blue-500 z-20"
          />
        </div>
      </div>
    </div>
  );
};
