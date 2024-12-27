export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto">
          <a href="/dashboard" className="text-white text-lg">Dashboard</a>
        </div>
      </nav>
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to HealthTracker</h1>
      </div>
    </div>
  );
}
