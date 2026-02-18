import { Sidebar } from '../components/Sidebar';

export default function SELayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="se" />
      <main className="flex-1 overflow-y-auto flex flex-col" style={{ background: '#F8FAFC' }}>
        {children}
      </main>
    </div>
  );
}
