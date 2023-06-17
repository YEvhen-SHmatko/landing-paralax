import React, { useCallback } from 'react';
import s from './backgroundContainer.module.css';
import { useInViewport } from 'react-in-viewport';

interface IProps {
  delta?: number;
  backgroundImage: string;
  children: JSX.Element;
}

const BackgroundContainer: React.FC<IProps> = ({ backgroundImage, children, delta = 10 }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const backgroundRef = React.useRef<HTMLImageElement>(null);
  const viewport = useInViewport(containerRef);

  const dataRef = React.useRef<{ scrollTop: number; currentScroll: number; viewport: any }>({
    scrollTop: 0,
    currentScroll: 0,
    viewport,
  });

  dataRef.current.viewport = viewport;

  const handeTest = useCallback((e: any) => {
    const containerHeight = containerRef?.current?.clientHeight || 0;
    const backgroundHeight = backgroundRef?.current?.clientHeight || 0;
    const scrollHeight = backgroundHeight - containerHeight;

    if (scrollHeight <= 0 || !backgroundRef.current || !dataRef.current.viewport.inViewport) return;

    if (dataRef.current.scrollTop < e.target.documentElement.scrollTop) {
      dataRef.current.currentScroll -= delta;
    }

    if (dataRef.current.scrollTop > e.target.documentElement.scrollTop) {
      dataRef.current.currentScroll += delta;
    }

    if (dataRef.current.currentScroll < 0 - scrollHeight) {
      dataRef.current.currentScroll = 0 - scrollHeight;
    }

    if (dataRef.current.currentScroll > 0) {
      dataRef.current.currentScroll = 0;
    }

    dataRef.current.scrollTop = e.target.documentElement.scrollTop;
    backgroundRef.current.style.top = `${dataRef.current.currentScroll}px`;
  }, []);

  React.useEffect(() => {
    document.addEventListener('scroll', handeTest);

    return () => {
      document.removeEventListener('scroll', handeTest);
    };
  }, [handeTest]);

  return (
    <div className={s.container} ref={containerRef}>
      <img className={s.background} ref={backgroundRef} src={backgroundImage} alt="" srcSet="" />
      {children}
    </div>
  );
};

export default BackgroundContainer;
