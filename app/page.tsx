import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F0F2F5' }}>
      <div className="text-center max-w-lg px-6">
        {/* Logo */}
        <div className="text-3xl font-black mb-2">
          ⚡ <span className="text-blue-600">Coord</span>
        </div>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The scheduling layer built for complex B2B sales —<br />
          so both sides of a deal show up prepared, coordinated, and ready to move.
        </p>

        {/* Role selector */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Choose your view</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold flex-shrink-0">M</div>
              <div>
                <div className="font-bold text-sm">Marcus — Account Executive</div>
                <div className="text-blue-200 text-xs">Book demos · manage pipeline · share links</div>
              </div>
            </Link>
            <Link
              href="/se/availability"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold flex-shrink-0">P</div>
              <div>
                <div className="font-bold text-sm">Priya — Sales Engineer</div>
                <div className="text-purple-200 text-xs">Set availability · view upcoming demos</div>
              </div>
            </Link>
            <Link
              href="/buyer/book/marcus-veritas-cloud"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold flex-shrink-0">D</div>
              <div>
                <div className="font-bold text-sm">Derek — Buyer</div>
                <div className="text-emerald-200 text-xs">Pick a time · add colleagues</div>
              </div>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4">MVP · P0 flows only · Google Calendar integration ready</p>
      </div>
    </div>
  );
}
