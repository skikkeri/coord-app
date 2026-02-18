import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('bg-white border border-gray-200 rounded-xl overflow-hidden', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={clsx('px-4 py-3 border-b border-gray-100 flex items-center gap-2.5', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={clsx('text-[13.5px] font-bold text-gray-900 flex-1', className)}>{children}</h3>;
}

export function CardBody({ children, className }: CardProps) {
  return <div className={clsx('p-4', className)}>{children}</div>;
}
