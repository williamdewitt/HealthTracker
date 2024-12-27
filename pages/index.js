export default function Home() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to HealthTracker</h1>
        <a href="/profile" className="text-lg text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          Go to Profile
      </a>
      </div>
    )
  }
