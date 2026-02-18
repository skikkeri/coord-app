import { Sidebar } from '../components/Sidebar';

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="ae" />
      <main className="flex-1 overflow-y-auto flex flex-col" style={{ background: '#F8FAFC' }}>
        {children}
      </main>
    </div>
  );
}
