import { useEffect, useRef } from 'react';
import { useInView, useSpring } from 'framer-motion';

export default function Stat({ value, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const num = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[\d,]/g, '');
  const hasComma = value.includes(',');

  const spring = useSpring(0, { stiffness: 60, damping: 15 });

  useEffect(() => {
    if (isInView) {
      spring.set(num);
    }
  }, [isInView, num, spring]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        ref.current.textContent = hasComma ? rounded.toLocaleString() : rounded;
      }
    });
  }, [spring, hasComma]);

  return (
    <div className="stat">
      <div className="stat-number">
        <span ref={ref}>0</span>
        <span>{suffix}</span>
      </div>
      <div>{label}</div>
    </div>
  );
}

