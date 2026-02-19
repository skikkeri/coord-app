import { Text } from '@salt-ds/core';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  return (
    <div
      className={clsx('overflow-hidden', className)}
      style={{
        background: '#ffffff',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div
      className={clsx('flex items-center gap-2.5 px-4 py-3', className)}
      style={{ borderBottom: '1px solid #F1F5F9' }}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <Text
      styleAs="h4"
      as="h3"
      className={clsx('flex-1', className)}
      style={{ margin: 0, fontWeight: 700, fontSize: 14, ...style }}
    >
      {children}
    </Text>
  );
}

export function CardBody({ children, className }: CardProps) {
  return <div className={clsx('p-4', className)}>{children}</div>;
}
