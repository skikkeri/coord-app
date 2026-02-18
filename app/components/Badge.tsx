import clsx from 'clsx';

type BadgeVariant = 'green' | 'amber' | 'blue' | 'gray' | 'red' | 'purple';

const variants: Record<BadgeVariant, string> = {
  green: 'bg-emerald-100 text-emerald-800',
  amber: 'bg-amber-100 text-amber-800',
  blue: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-600',
  red: 'bg-red-100 text-red-800',
  purple: 'bg-purple-100 text-purple-700',
};

export function Badge({ children, variant = 'gray' }: { children: React.ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={clsx('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold', variants[variant])}>
      {children}
    </span>
  );
}
