// Thin wrapper using Salt DS status colour tokens
type BadgeVariant = 'green' | 'amber' | 'blue' | 'gray' | 'red' | 'purple';

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  green:  { bg: '#DCFCE7', color: '#166534' },
  amber:  { bg: '#FEF3C7', color: '#92400E' },
  blue:   { bg: '#DBEAFE', color: '#1E40AF' },
  gray:   { bg: '#F1F5F9', color: '#475569' },
  red:    { bg: '#FEE2E2', color: '#991B1B' },
  purple: { bg: '#EDE9FE', color: '#5B21B6' },
};

export function Badge({ children, variant = 'gray' }: { children: React.ReactNode; variant?: BadgeVariant }) {
  const { bg, color } = variantStyles[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 8px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        background: bg,
        color,
        fontFamily: 'var(--salt-typography-fontFamily-openSans, Open Sans, sans-serif)',
      }}
    >
      {children}
    </span>
  );
}
