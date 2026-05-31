import { useNavigate } from 'react-router-dom'

const MOCK_MOVIES = [
  {
    id: 1,
    title: 'Cosmic Drift',
    genre: 'Sci-Fi',
    rating: 'PG-13',
    year: 2024,
    color: 'from-blue-900 to-blue-600',
  },
  {
    id: 2,
    title: 'Shadow Protocol',
    genre: 'Thriller',
    rating: 'R',
    year: 2023,
    color: 'from-zinc-900 to-zinc-600',
  },
  {
    id: 3,
    title: 'Ember Falls',
    genre: 'Drama',
    rating: 'PG',
    year: 2024,
    color: 'from-orange-900 to-orange-600',
  },
  {
    id: 4,
    title: 'Neon Requiem',
    genre: 'Action',
    rating: 'R',
    year: 2023,
    color: 'from-purple-900 to-purple-600',
  },
  {
    id: 5,
    title: 'The Last Tide',
    genre: 'Adventure',
    rating: 'PG-13',
    year: 2024,
    color: 'from-teal-900 to-teal-600',
  },
  {
    id: 6,
    title: 'Silent Frequency',
    genre: 'Mystery',
    rating: 'PG-13',
    year: 2023,
    color: 'from-red-900 to-red-700',
  },
]

function MovieCard({ title, genre, rating, year, color }) {
  return (
    <div className="group cursor-pointer flex-shrink-0 w-48">
      {/* Thumbnail */}
      <div
        className={`w-full h-28 rounded-lg bg-gradient-to-br ${color}
          flex items-end p-3 group-hover:scale-105 transition-transform duration-200`}
      >
        <span className="text-white/60 text-xs border border-white/30 px-1 rounded">
          {rating}
        </span>
      </div>
      {/* Info */}
      <div className="mt-2 px-1">
        <p className="text-white text-sm font-medium truncate">{title}</p>
        <p className="text-zinc-400 text-xs mt-0.5">
          {genre} · {year}
        </p>
      </div>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-black/80 sticky top-0 z-50">
        <h1 className="text-red-600 text-3xl font-extrabold tracking-widest">
          Nova<span className="text-white">Cine</span>
        </h1>
        <div className="flex items-center gap-6">
          <span className="text-zinc-300 text-sm hidden md:block">Home</span>
          <span className="text-zinc-300 text-sm hidden md:block">Movies</span>
          <span className="text-zinc-300 text-sm hidden md:block">My List</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded transition-colors"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative w-full h-72 md:h-96 bg-gradient-to-r from-black via-zinc-900 to-transparent flex items-center px-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-1b4e360ec43d/a1181d97-3b71-4b5f-8f71-70a3a6e2bc35/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_small.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-lg">
          <p className="text-red-500 text-sm font-semibold uppercase tracking-widest mb-2">
            🎬 Featured Today
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Cosmic Drift
          </h2>
          <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
            A lone astronaut drifts through an uncharted galaxy, uncovering a signal
            that could change humanity forever.
          </p>
          <div className="flex gap-3 mt-5">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-zinc-200 transition-colors text-sm">
              ▶ Play
            </button>
            <button className="bg-zinc-700/80 text-white font-semibold px-6 py-2 rounded hover:bg-zinc-600 transition-colors text-sm">
              + My List
            </button>
          </div>
        </div>
      </div>

      {/* Movie Rows */}
      <div className="px-10 py-8 flex flex-col gap-10">

        {/* Trending */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-zinc-100">
            🔥 Trending Now
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {MOCK_MOVIES.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-zinc-100">
            ▶ Continue Watching
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[...MOCK_MOVIES].reverse().map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="text-center text-zinc-600 text-xs py-8 border-t border-zinc-800 mt-4">
        © 2024 NovaCine · Built as a student project · All content is fictional
      </footer>

    </div>
  )
}

export default Dashboard