import React from 'react';
import { QuestionDiagram } from '../types';

interface DiagramRendererProps {
  diagram?: QuestionDiagram;
  className?: string;
}

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({ diagram, className = '' }) => {
  if (!diagram || diagram.type === 'none') return null;

  if (diagram.type === 'custom_url' && diagram.imageUrl) {
    return (
      <div className={`my-3 p-3 bg-neutral-900/90 rounded-xl border border-white/10 flex flex-col items-center ${className}`}>
        <img
          src={diagram.imageUrl}
          alt={diagram.title || 'Question Diagram'}
          className="max-h-64 rounded-lg object-contain"
          referrerPolicy="no-referrer"
        />
        {diagram.title && (
          <span className="text-[11px] text-neutral-400 font-medium mt-2">
            Figure: {diagram.title}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`my-3 p-3.5 bg-neutral-900/90 rounded-xl border border-white/10 flex flex-col items-center ${className}`}>
      {/* 1. Right Triangle with Incircle */}
      {diagram.type === 'geometry_triangle_circle' && (
        <svg viewBox="0 0 320 200" className="w-full max-w-[280px] h-auto drop-shadow">
          {/* Triangle ABC: C is at (50, 160), B is at (250, 160), A is at (50, 40) */}
          <polygon
            points="50,160 250,160 50,40"
            fill="#171717"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Right Angle Box at C(50, 160) */}
          <polyline points="50,146 64,146 64,160" fill="none" stroke="#737373" strokeWidth="1.5" />

          {/* Incircle: center (50+r, 160-r). For AC=120, BC=200, hypotenuse=233.2 => r ≈ 43.4 */}
          {/* Using scaled coords: C=(60,150), A=(60,50), B=(240,150). a=100, b=180, c=205.9, r ≈ 37 */}
          <circle cx="100" cy="120" r="40" fill="#f59e0b" fillOpacity="0.1" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="100" cy="120" r="2.5" fill="#f59e0b" />

          {/* Inradius indicator line */}
          <line x1="100" y1="120" x2="100" y2="160" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="106" y="145" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
            r = ?
          </text>

          {/* Vertex Labels */}
          <text x="42" y="32" fill="#ffffff" fontSize="13" fontWeight="bold">A</text>
          <text x="32" y="172" fill="#ffffff" fontSize="13" fontWeight="bold">C</text>
          <text x="256" y="165" fill="#ffffff" fontSize="13" fontWeight="bold">B</text>

          {/* Dimension Labels */}
          <text x="22" y="105" fill="#d4d4d4" fontSize="11" fontFamily="sans-serif">6 cm</text>
          <text x="145" y="180" fill="#d4d4d4" fontSize="11" fontFamily="sans-serif">8 cm</text>
          <text x="165" y="90" fill="#a3a3a3" fontSize="11" fontFamily="sans-serif">10 cm</text>
        </svg>
      )}

      {/* 2. Trapezoid with Intersecting Diagonals */}
      {diagram.type === 'geometry_trapezoid' && (
        <svg viewBox="0 0 320 200" className="w-full max-w-[280px] h-auto drop-shadow">
          {/* Trapezoid vertices: A(90, 45), B(230, 45), D(40, 165), C(280, 165) */}
          {/* Diagonals: A to C, B to D. Intersection P is at (160, 93) */}
          <polygon
            points="90,45 230,45 280,165 40,165"
            fill="#171717"
            stroke="#e5e5e5"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Diagonals */}
          <line x1="90" y1="45" x2="280" y2="165" stroke="#737373" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="230" y1="45" x2="40" y2="165" stroke="#737373" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* Shaded Triangle APB (top) */}
          <polygon points="90,45 230,45 160,93" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Shaded Triangle CPD (bottom) */}
          <polygon points="40,165 280,165 160,93" fill="#3b82f6" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="1.5" />

          {/* Labels inside regions */}
          <text x="143" y="70" fill="#fcd34d" fontSize="11" fontWeight="bold">16 cm²</text>
          <text x="143" y="145" fill="#93c5fd" fontSize="11" fontWeight="bold">36 cm²</text>
          <text x="82" y="112" fill="#737373" fontSize="10">?</text>
          <text x="228" y="112" fill="#737373" fontSize="10">?</text>

          {/* Corner points */}
          <text x="75" y="42" fill="#ffffff" fontSize="12" fontWeight="bold">A</text>
          <text x="238" y="42" fill="#ffffff" fontSize="12" fontWeight="bold">B</text>
          <text x="286" y="172" fill="#ffffff" fontSize="12" fontWeight="bold">C</text>
          <text x="26" y="172" fill="#ffffff" fontSize="12" fontWeight="bold">D</text>
          <text x="165" y="100" fill="#e5e5e5" fontSize="11" fontWeight="bold">P</text>
        </svg>
      )}

      {/* 3. 3x3 Matrix Logic Pattern */}
      {diagram.type === 'pattern_matrix' && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-3 gap-2 bg-neutral-950 p-2.5 rounded-xl border border-white/10 w-64 h-64">
            {/* Cell 1: 0 deg, 1 dot */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-amber-400 rounded-sm transform rotate-0 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">1</span>
            </div>

            {/* Cell 2: 45 deg, 1 dot */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-amber-400 rounded-sm transform rotate-45 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">2</span>
            </div>

            {/* Cell 3: 90 deg, 1 dot */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-amber-400 rounded-sm transform rotate-90 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">3</span>
            </div>

            {/* Cell 4: 45 deg, 2 dots */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-blue-400 rounded-sm transform rotate-45 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">4</span>
            </div>

            {/* Cell 5: 90 deg, 2 dots */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-blue-400 rounded-sm transform rotate-90 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">5</span>
            </div>

            {/* Cell 6: 135 deg, 2 dots */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-blue-400 rounded-sm transform rotate-[135deg] flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">6</span>
            </div>

            {/* Cell 7: 90 deg, 3 dots */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-emerald-400 rounded-sm transform rotate-90 flex items-center justify-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">7</span>
            </div>

            {/* Cell 8: 135 deg, 3 dots */}
            <div className="bg-neutral-900 border border-white/10 rounded-lg flex flex-col items-center justify-center relative">
              <div className="w-8 h-8 border-2 border-emerald-400 rounded-sm transform rotate-[135deg] flex items-center justify-center gap-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              </div>
              <span className="absolute bottom-1 right-1 text-[9px] text-neutral-600">8</span>
            </div>

            {/* Cell 9: TARGET ? */}
            <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/60 rounded-lg flex flex-col items-center justify-center relative">
              <span className="text-2xl font-black text-amber-400 animate-pulse">?</span>
              <span className="absolute bottom-1 right-1 text-[9px] text-amber-400 font-mono">cell (3,3)</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. 4x4 Mini-Sudoku Grid */}
      {diagram.type === 'sudoku_grid' && (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-4 border-2 border-white/40 rounded-lg overflow-hidden w-56 h-56 bg-neutral-950">
            {/* Row 1 */}
            <div className="flex items-center justify-center border-r border-b border-white/20 text-lg font-bold text-neutral-200">1</div>
            <div className="flex items-center justify-center border-r-2 border-b border-white/40 text-lg font-bold text-neutral-200">?</div>
            <div className="flex items-center justify-center border-r border-b border-white/20 text-lg font-bold text-neutral-200">4</div>
            <div className="flex items-center justify-center border-b border-white/20 text-lg font-bold text-neutral-200">2</div>

            {/* Row 2 */}
            <div className="flex items-center justify-center border-r border-b-2 border-white/40 text-lg font-bold text-neutral-200">?</div>
            <div className="flex items-center justify-center border-r-2 border-b-2 border-white/40 text-lg font-bold text-neutral-200">4</div>
            <div className="flex items-center justify-center border-r border-b-2 border-white/40 text-lg font-bold text-neutral-200">1</div>
            <div className="flex items-center justify-center border-b-2 border-white/40 text-lg font-bold text-neutral-200">?</div>

            {/* Row 3 */}
            <div className="flex items-center justify-center border-r border-b border-white/20 text-lg font-bold text-neutral-200">4</div>
            <div className="flex items-center justify-center border-r-2 border-b border-white/40 text-lg font-bold text-neutral-200">1</div>
            <div className="flex items-center justify-center border-r border-b border-white/20 text-lg font-bold text-neutral-200">2</div>
            <div className="flex items-center justify-center border-b border-white/20 text-xl font-black text-amber-400 bg-amber-500/20">X</div>

            {/* Row 4 */}
            <div className="flex items-center justify-center border-r border-white/20 text-lg font-bold text-neutral-200">2</div>
            <div className="flex items-center justify-center border-r-2 border-white/40 text-lg font-bold text-neutral-200">?</div>
            <div className="flex items-center justify-center border-r border-white/20 text-lg font-bold text-neutral-200">?</div>
            <div className="flex items-center justify-center text-lg font-bold text-neutral-200">1</div>
          </div>
          <span className="text-[11px] text-neutral-400 mt-2 font-mono">
            Outlined 2×2 subgrids contain 1, 2, 3, 4
          </span>
        </div>
      )}

      {/* 5. Clock Angle Alignment */}
      {diagram.type === 'clock_angle' && (
        <svg viewBox="0 0 220 220" className="w-full max-w-[200px] h-auto drop-shadow">
          {/* Clock circle */}
          <circle cx="110" cy="110" r="95" fill="#171717" stroke="#525252" strokeWidth="3" />
          <circle cx="110" cy="110" r="4" fill="#f59e0b" />

          {/* Hour tick marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 110 + 82 * Math.sin(angle);
            const y1 = 110 - 82 * Math.cos(angle);
            const x2 = 110 + 90 * Math.sin(angle);
            const y2 = 110 - 90 * Math.cos(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 3 === 0 ? '#fbbf24' : '#737373'}
                strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
              />
            );
          })}

          {/* Numbers 12, 3, 6, 9 */}
          <text x="110" y="38" fill="#d4d4d4" fontSize="12" fontWeight="bold" textAnchor="middle">12</text>
          <text x="185" y="114" fill="#d4d4d4" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
          <text x="110" y="190" fill="#d4d4d4" fontSize="12" fontWeight="bold" textAnchor="middle">6</text>
          <text x="35" y="114" fill="#d4d4d4" fontSize="12" fontWeight="bold" textAnchor="middle">9</text>

          {/* Hour Hand at ~4:54.6: angle = 4 * 30 + 54.55 * 0.5 = 120 + 27.3 = 147.3° */}
          <line
            x1="110"
            y1="110"
            x2={110 + 52 * Math.sin((147.3 * Math.PI) / 180)}
            y2={110 - 52 * Math.cos((147.3 * Math.PI) / 180)}
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Minute Hand at ~54.55 mins: angle = 54.55 * 6 = 327.3° (Opposite to 147.3°) */}
          <line
            x1="110"
            y1="110"
            x2={110 + 78 * Math.sin((327.3 * Math.PI) / 180)}
            y2={110 - 78 * Math.cos((327.3 * Math.PI) / 180)}
            stroke="#60a5fa"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Straight line indicator */}
          <line
            x1={110 - 80 * Math.sin((147.3 * Math.PI) / 180)}
            y1={110 + 80 * Math.cos((147.3 * Math.PI) / 180)}
            x2={110 + 80 * Math.sin((147.3 * Math.PI) / 180)}
            y2={110 - 80 * Math.cos((147.3 * Math.PI) / 180)}
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
        </svg>
      )}

      {/* 6. Planar Network Graph */}
      {diagram.type === 'maze_graph' && (
        <svg viewBox="0 0 300 180" className="w-full max-w-[280px] h-auto drop-shadow">
          {/* Edges */}
          <g stroke="#737373" strokeWidth="1.5">
            <line x1="60" y1="40" x2="150" y2="30" />
            <line x1="150" y1="30" x2="240" y2="40" />
            <line x1="240" y1="40" x2="260" y2="120" />
            <line x1="260" y1="120" x2="190" y2="150" />
            <line x1="190" y1="150" x2="110" y2="150" />
            <line x1="110" y1="150" x2="40" y2="120" />
            <line x1="40" y1="120" x2="60" y2="40" />

            {/* Interior chords */}
            <line x1="150" y1="30" x2="150" y2="90" />
            <line x1="60" y1="40" x2="150" y2="90" />
            <line x1="240" y1="40" x2="150" y2="90" />
            <line x1="40" y1="120" x2="110" y2="90" />
            <line x1="110" y1="90" x2="150" y2="90" />
            <line x1="150" y1="90" x2="190" y2="90" />
            <line x1="190" y1="90" x2="260" y2="120" />
            <line x1="110" y1="90" x2="110" y2="150" />
          </g>

          {/* Face labels */}
          <text x="110" y="55" fill="#f59e0b" fontSize="11" fontWeight="bold">F₁</text>
          <text x="180" y="55" fill="#f59e0b" fontSize="11" fontWeight="bold">F₂</text>
          <text x="85" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold">F₃</text>
          <text x="145" y="125" fill="#f59e0b" fontSize="11" fontWeight="bold">F₄</text>
          <text x="210" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold">F₅</text>

          {/* Vertices (10 vertices) */}
          {[
            [60, 40], [150, 30], [240, 40],
            [40, 120], [110, 90], [150, 90], [190, 90], [260, 120],
            [110, 150], [190, 150]
          ].map(([x, y], idx) => (
            <circle key={idx} cx={x} cy={y} r="4.5" fill="#60a5fa" stroke="#ffffff" strokeWidth="1.5" />
          ))}
        </svg>
      )}

      {/* Caption */}
      {diagram.title && (
        <span className="text-[11px] text-neutral-400 font-medium mt-2 tracking-wide">
          Figure: {diagram.title}
        </span>
      )}
    </div>
  );
};
