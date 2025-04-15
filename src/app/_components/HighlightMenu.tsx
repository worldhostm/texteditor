'use client';
import React,{ useEffect, useRef, useState } from "react";
import SVGIcon from "./SVGIcon";

interface HighlightMenuProps {
    onSelect: (color: string) => void;
    isActive: boolean;
    activeColor?: string;
}

const highlightColors = [
    { label: 'Black', color: '#000000' },
    { label: 'Dark Gray', color: '#333333' },
    { label: 'Gray', color: '#666666' },
    { label: 'Light Gray', color: '#9d9d9d' },
    { label: 'Soft Gray', color: '#dddddd' },
    { label: 'White', color: '#ffffff' },
    { label: 'Red', color: '#ee2323' },
    { label: 'Orange', color: '#f89009' },
    { label: 'Yellow', color: '#f3c000' },
    { label: 'Teal', color: '#009a87' },
    { label: 'Blue', color: '#006dd7' },
    { label: 'Purple', color: '#8a3db6' },
    { label: 'Steel Blue', color: '#7e98b1' },
    { label: 'Pink', color: '#ffc1c8' },
    { label: 'Peach', color: '#ffc9af' },
    { label: 'Light Yellow', color: '#f6e199' },
    { label: 'Mint', color: '#9feec3' },
    { label: 'Sky Blue', color: '#99cefa' },
    { label: 'Lavender', color: '#c1bef9' },
    { label: 'Pale Blue', color: '#c0d1e7' },
    { label: 'Coral Pink', color: '#ef5369' },
    { label: 'Salmon', color: '#ef6f53' },
    { label: 'Lime Green', color: '#a6bc00' },
    { label: 'Leaf Green', color: '#409d00' },
    { label: 'Cyan', color: '#0593d3' },
    { label: 'Indigo', color: '#6164c6' },
    { label: 'Cool Gray', color: '#8cb3be' },
    { label: 'Wine', color: '#781b33' },
    { label: 'Brick Red', color: '#953b34' },
    { label: 'Olive', color: '#5f6d2b' },
    { label: 'Forest Green', color: '#1b711d' },
    { label: 'Navy', color: '#1a5490' },
    { label: 'Violet', color: '#5733b1' },
    { label: 'Slate', color: '#456771' },
  ];
  
  
  export function HighlightMenu({ onSelect, isActive, activeColor }: HighlightMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    return (
      <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={isActive ? 'is-active' : ''}
          style={{
            outline:'none',
            border:'none',
            background:'white'
          }}
        >
          <SVGIcon id="ink-highlighter" />
        </button>
  
        {open && (
          <div
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              background: 'white',
              border: '1px solid #ccc',
              padding: '8px',
              borderRadius: '4px',
              zIndex: 100,
              display: 'grid',
              gridTemplateColumns:'repeat(7,1fr)',
              gap: '8px',
            }}
          >
            {highlightColors.map(({ label, color }) => (
              <button
                key={color}
                onClick={() => {
                  onSelect(color);
                  setOpen(false);
                }}
                style={{
                  backgroundColor: color,
                  width: '24px',
                  height: '24px',
                  border: activeColor === color ? '2px solid black' : '1px solid #999',
                  borderRadius: '24px',
                }}
                title={label}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  