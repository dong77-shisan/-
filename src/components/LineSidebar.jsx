import { useRef, useState, useCallback, useEffect } from 'react';
import './LineSidebar.css';

const LineSidebar = ({
  items,
  accentColor = '#c8ff19',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  maxShift = 18,
  markerLength = 38,
  markerGap = 0,
  tickScale = 0.42,
  scaleTick = true,
  itemGap = 18,
  fontSize = 0.72,
  smoothing = 100,
  defaultActive = 0,
  activeIndex: controlledActiveIndex,
  onItemClick,
  className = '',
}) => {
  const itemRefs = useRef([]);
  const targetsRef = useRef([]);
  const currentRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const smoothingRef = useRef(smoothing);
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActive);
  const activeIndex = controlledActiveIndex ?? internalActiveIndex;
  const activeRef = useRef(activeIndex);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback(now => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);
    let moving = false;

    for (let i = 0; i < itemRefs.current.length; i += 1) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const current = currentRef.current[i] || 0;
      const next = current + (target - current) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handleItemEnter = useCallback(index => {
    targetsRef.current = itemRefs.current.map((_, itemIndex) => (itemIndex === index ? 1 : 0));
    startLoop();
  }, [startLoop]);

  const handleItemLeave = useCallback(index => {
    targetsRef.current[index] = 0;
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback((index, label) => {
    if (controlledActiveIndex == null) setInternalActiveIndex(index);
    onItemClick?.(index, label);
  }, [controlledActiveIndex, onItemClick]);

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <nav
      className={`line-sidebar${showMarker ? ' line-sidebar--markers' : ''}${scaleTick ? ' line-sidebar--scale-tick' : ''}${className ? ` ${className}` : ''}`}
      aria-label="页面区块导航"
      style={{
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': `${markerLength}px`,
        '--marker-gap': `${markerGap}px`,
        '--tick-scale': tickScale,
        '--max-shift': `${maxShift}px`,
        '--item-gap': `${itemGap}px`,
        '--font-size': `${fontSize}rem`,
        '--smoothing': `${smoothing}ms`,
      }}
    >
      <ul className="line-sidebar__list">
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={el => { itemRefs.current[index] = el; }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? 'true' : undefined}
            tabIndex={0}
            onPointerEnter={() => handleItemEnter(index)}
            onPointerLeave={() => handleItemLeave(index)}
            onClick={() => handleClick(index, label)}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleClick(index, label);
              }
            }}
          >
            {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
            <span className="line-sidebar__label">
              {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>}
              <span className="line-sidebar__text">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
