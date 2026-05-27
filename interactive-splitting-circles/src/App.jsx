import { useState } from 'react';

const linearTheme = {
  background: '#09090b',       
  strokeActive: '#ffffff',     
  strokeFaded: 'rgba(255, 255, 255, 0.18)', 
  textMain: '#fafafa',         
  textMuted: '#8e9196',        
  fontHeading: '"DM Sans", "Lexend", -apple-system, sans-serif',
  fontBody: '"Lexend", -apple-system, sans-serif',
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
};

export default function LinearMethodMatrix() {
  const [circles, setCircles] = useState(() => {
    return Array.from({ length: 10 }).map((_, index) => {
      const borderTypes = ['solid', 'dashed', 'dotted'];
      const assignedStyle = borderTypes[index % borderTypes.length];
      
      return {
        id: `linear-node-${index}`,
        splitLevel: 0,
        hasSplit: false,
        borderStyle: assignedStyle, 
        children: []
      };
    });
  });

  const [hoveredCircle, setHoveredCircle] = useState(null);

  const countCirclesOnScreen = (circleList) => {
    let total = 0;
    circleList.forEach(circle => {
      if (circle.hasSplit) {
        total += countCirclesOnScreen(circle.children);
      } else {
        total += 1;
      }
    });
    return total;
  };

  const splitCircleById = (targetId, currentCircles) => {
    return currentCircles.map(circle => {
      if (circle.id === targetId) {
        if (circle.splitLevel >= 2 || circle.hasSplit) return circle;

        const miniCircles = Array.from({ length: 4 }).map((_, index) => ({
          id: `${circle.id}-quad-${index}`,
          splitLevel: circle.splitLevel + 1,
          hasSplit: false,
          borderStyle: circle.borderStyle,
          children: []
        }));

        return { ...circle, hasSplit: true, children: miniCircles };
      } else if (circle.hasSplit) {
        return { ...circle, children: splitCircleById(targetId, circle.children) };
      }
      return circle;
    });
  };

  const handleCircleClick = (id, isMaxDepth) => {
    if (isMaxDepth) return;
    setCircles(prev => splitCircleById(id, prev));
  };

  const resetMatrix = () => {
    setCircles(Array.from({ length: 10 }).map((_, index) => {
      const borderTypes = ['solid', 'dashed', 'dotted'];
      return {
        id: `linear-node-${index}`,
        splitLevel: 0,
        hasSplit: false,
        borderStyle: borderTypes[index % borderTypes.length],
        children: []
      };
    }));
    setHoveredCircle(null);
  };

  const RenderEngravedCircle = ({ circle }) => {
    const isMaxDepth = circle.splitLevel >= 2;

    if (circle.hasSplit) {
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}>
          {circle.children.map(child => (
            <RenderEngravedCircle key={child.id} circle={child} />
          ))}
        </div>
      );
    }

    let strokeColor = linearTheme.strokeActive;
    let strokeDashArray = 'none';

    if (circle.borderStyle === 'dashed') {
      strokeColor = linearTheme.strokeFaded;
      strokeDashArray = '6, 4';
    } else if (circle.borderStyle === 'dotted') {
      strokeColor = linearTheme.strokeFaded;
      strokeDashArray = '1, 4';
    }

    const shouldHatch = circle.borderStyle === 'solid';
    const totalLines = isMaxDepth ? 3 : 7;

    return (
      <div
        onClick={() => handleCircleClick(circle.id, isMaxDepth)}
        onMouseEnter={() => setHoveredCircle(circle)}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: 'transparent',
          cursor: isMaxDepth ? 'not-allowed' : 'pointer',
          userSelect: 'none'
        }}
        className="linear-circle-trigger"
      >
        <svg 
          viewBox="0 0 100 100" 
          style={{
            width: '92%',
            height: '92%',
            transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="vector-svg-container"
        >
          <defs>
            <clipPath id={`clip-${circle.id}`}>
              <circle cx="50" cy="50" r="38" />
            </clipPath>
          </defs>

          {shouldHatch && (
            <g clipPath={`url(#clip-${circle.id})`}>
              {Array.from({ length: totalLines }).map((_, i) => {
                const offset = (i - (totalLines - 1) / 2) * (isMaxDepth ? 18 : 10);
                
                const x1 = 10 + offset;
                const y1 = 90 + offset;
                const x2 = 90 + offset;
                const y2 = 10 + offset;

                const thickness = i % 2 === 0 ? 1.5 : 0.8;

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={linearTheme.strokeActive}
                    strokeWidth={thickness}
                    opacity={isMaxDepth ? 0.35 : 0.2}
                  />
                );
              })}
            </g>
          )}

          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={circle.borderStyle === 'solid' ? 1.2 : 1.5}
            strokeDasharray={strokeDashArray}
            strokeLinecap={circle.borderStyle === 'dotted' ? 'round' : 'butt'}
          />
        </svg>
      </div>
    );
  };

  const CurvedIndicatorArrow = () => (
    <svg 
      width="28" 
      height="22" 
      viewBox="0 0 28 22" 
      fill="none" 
      style={{ 
        flexShrink: 0, 
        marginTop: '2px',
        marginRight: '12px',
        opacity: 0.35 
      }}
    >
      <path 
        d="M6 0V10C6 13.3137 8.68629 16 12 16H24M24 16L19 11M24 16L19 21" 
        stroke={linearTheme.strokeActive} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div style={{
      background: linearTheme.background,
      backgroundColor: linearTheme.background,
      minHeight: '100vh',
      width: '100%',
      color: linearTheme.textMain,
      fontFamily: linearTheme.fontBody,
      padding: '60px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@700;800&family=Lexend:wght@400;500;600&display=swap');
        
        body {
          background-color: #09090b !important;
          margin: 0;
          padding: 0;
        }
        .linear-circle-trigger:hover .vector-svg-container { 
          transform: scale(1.06); 
        }
        .linear-circle-trigger:active .vector-svg-container {
          transform: scale(0.92) !important;
        }
      `}</style>

      <div style={{
        width: '100%',
        maxWidth: '880px',
        padding: '0 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '20px',
          background: 'transparent'
        }}>
          {circles.map(item => (
            <RenderEngravedCircle key={item.id} circle={item} />
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          fontFamily: linearTheme.fontMono,
          color: linearTheme.textMuted,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '16px'
        }}>
          <div>
            <span>GRID OBJECTS: {countCirclesOnScreen(circles)}</span>
          </div>

          <button
            onClick={resetMatrix}
            style={{
              background: 'transparent',
              border: 'none',
              color: linearTheme.textMain,
              cursor: 'pointer',
              fontFamily: linearTheme.fontMono,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              opacity: 0.5,
              transition: 'opacity 0.15s ease',
              padding: 0
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.5'}
          >
            Reset Layout Canvas
          </button>
        </div>

        {/* Outer text layout container changed to make sure there is absolute left alignment across all children */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '28px',
          lineHeight: '1.6',
          maxWidth: '720px',
          width: '100%'
        }}>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <h2 style={{ 
              fontSize: '22px', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              margin: '0 0 6px 0',
              fontFamily: linearTheme.fontHeading,
              color: linearTheme.textMain 
            }}>
              UI Design Specification
            </h2>
            <p style={{ fontSize: '14px', color: linearTheme.textMuted, margin: 0, textAlign: 'justify' }}>
              A clean breakdown of the visual elements and layout rules used in this interface, inspired by the geometric style of the <a href="https://linear.app/method/write-issues-not-user-stories" target="_blank" rel="noreferrer" style={{ color: '#5c7cfa', textDecoration: 'none', fontWeight: 600 }}>Linear Method</a> page.
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            fontSize: '14px',
            width: '100%'
          }}>
            {/* Element 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: linearTheme.textMain, fontWeight: 700, marginLeft: '4px' }}>1. Border Variety (Grid Texture)</div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '4px', width: '100%' }}>
                <CurvedIndicatorArrow />
                <div style={{ color: linearTheme.textMuted, textAlign: 'justify', flexGrow: 1, marginTop: '6px', }}>
                  The initial circles are mixed between solid, dashed, and dotted outlines. This gives the grid an interesting visual texture using only pure black and white, meaning we do not need to rely on different colors to separate the shapes.
                </div>
              </div>
            </div>

            {/* Element 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: linearTheme.textMain, fontWeight: 700, marginLeft: '4px' }}>2. Visual Style Inheritance</div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '4px', width: '100%' }}>
                <CurvedIndicatorArrow />
                <div style={{ color: linearTheme.textMuted, textAlign: 'justify', flexGrow: 1, marginTop: '6px', }}>
                  When you click a circle to split it into a smaller 2x2 grid, the new mini-circles instantly inherit the exact border style of their parent. This rule keeps the layout looking clean and unified no matter how deep you click.
                </div>
              </div>
            </div>

            {/* Element 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: linearTheme.textMain, fontWeight: 700, marginLeft: '4px' }}>3. Diagonal Hatch Shading</div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '4px', width: '100%' }}>
                <CurvedIndicatorArrow />
                <div style={{ color: linearTheme.textMuted, textAlign: 'justify', flexGrow: 1, marginTop: '6px', }}>
                  Only the circles with solid borders get internal shading lines. By alternating between slightly thick (1.5px) and thin (0.8px) diagonal lines, the UI gains a beautiful, physical "sketch on paper" depth without using heavy digital gradients.
                </div>
              </div>
            </div>

            {/* Element 4 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: linearTheme.textMain, fontWeight: 700, marginLeft: '4px' }}>4. Internal Line Padding</div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '4px', width: '100%' }}>
                <CurvedIndicatorArrow />
                <div style={{ color: linearTheme.textMuted, textAlign: 'justify', flexGrow: 1, marginTop: '6px',}}>
                  An invisible mask cuts off the diagonal lines right before they reach the edge of the circle. This creates a clean cushion of blank space between the inner shading lines and the outer border, keeping the design crisp and uncrowded.
                </div>
              </div>
            </div>

            {/* Element 5 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ color: linearTheme.textMain, fontWeight: 700, marginLeft: '4px' }}>5. Smart Density Control</div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: '4px', width: '100%' }}>
                <CurvedIndicatorArrow />
                <div style={{ color: linearTheme.textMuted, textAlign: 'justify', flexGrow: 1, marginTop: '6px', }}>
                  To make sure the layout stays readable when circles get tiny, the shading automatically simplifies at the deepest level. It switches from seven thin lines down to exactly three spaced, thicker lines so the smallest nodes never bleed into some-what messy ink blurs.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}