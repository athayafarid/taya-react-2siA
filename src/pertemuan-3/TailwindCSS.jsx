export default function TailwindCSS() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-12 font-sans text-gray-900">
      {/* Header Section */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">
          Tailwind CSS 4 Workshop
        </h1>
        <button className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-red-200 transition-all active:scale-95">
          Get Started
        </button>
      </header>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Spacing title="Premium Card" content="Aplikasi modern kini jauh lebih mudah dibangun dengan komposisi utility class." />
        <BackgroundColors />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        <Typography />
        <div className="flex flex-wrap items-center justify-center gap-4">
            <BorderRadius />
        </div>
        <ShadowEffects />
      </div>

      <footer className="pt-12">
        <FlexboxGrid />
      </footer>
    </div>
  )
}

function Spacing({ title, content }) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm p-8 rounded-3xl transition-hover hover:border-blue-200">
      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mb-4">
         <span className="text-amber-600 text-xl font-bold">★</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mt-3 text-gray-500 leading-relaxed">{content}</p>
    </div>
  )
}

function Typography() {
  return (
    <div className="bg-blue-600 p-10 rounded-3xl text-white overflow-hidden relative">
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold italic uppercase tracking-widest">Mastering Type</h1>
        <p className="text-blue-100 text-xl mt-4 max-w-xl italic">
          "Desain bukan hanya apa yang terlihat, tapi bagaimana cara kerjanya."
        </p>
      </div>
      {/* Dekorasi Abstract */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
    </div>
  )
}

function BorderRadius() {
  return (
    <div className="inline-flex p-1 bg-gray-200 rounded-2xl">
      <button className="cursor-pointer bg-white px-6 py-3 rounded-xl font-semibold shadow-sm text-blue-600 hover:bg-blue-50 transition">
        Tab Active
      </button>
      <button className="cursor-pointer px-6 py-3 rounded-xl font-semibold text-gray-500 hover:text-gray-700 transition">
        Inactive
      </button>
    </div>
  )
}

function BackgroundColors() {
  return (
    <div className="bg-linear-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-2">Vibrant Gradients</h3>
        <p className="text-indigo-100 opacity-90">Menggunakan v4 `bg-linear-to-br` untuk warna yang lebih halus.</p>
      </div>
      <div className="mt-6 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30"></div>
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20"></div>
      </div>
    </div>
  )
}

function FlexboxGrid() {
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-black text-gray-900 tracking-tighter">STUDIO<span className="text-blue-600">.</span></h1>
      <ul className="flex items-center space-x-8 mt-4 sm:mt-0 font-medium text-gray-600">
        <li><a href="#" className="hover:text-blue-600 transition">Works</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">Service</a></li>
        <li><button className="bg-black text-white px-5 py-2 rounded-full text-sm">Contact</button></li>
      </ul>
    </nav>
  )
}

function ShadowEffects() {
  return (
    <div className="group relative bg-white p-10 rounded-3xl border border-gray-100 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)]">
      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">Hover Animation</h3>
      <p className="text-gray-500 mt-4">Elemen ini akan terangkat dan bayangannya akan melembut saat disentuh kursor.</p>
    </div>
  )
}