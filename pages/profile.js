import { useState, useEffect } from 'react';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load data from localStorage
    setUsername(localStorage.getItem('username') || '');
    setNickname(localStorage.getItem('nickname') || '');
    setBirthday(localStorage.getItem('birthday') || '');
    setHeight(localStorage.getItem('height') || '');
    setGender(localStorage.getItem('gender') || 'male');
  }, []);

  const handleSave = () => {
    try {
      localStorage.setItem('username', username);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('birthday', birthday);
      localStorage.setItem('height', height);
      localStorage.setItem('gender', gender);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto">
          <a href="/dashboard" className="text-white text-lg">Dashboard</a>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nickname</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Birthday</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          {message && (
            <div className="mt-4 text-center">
              <p className="text-lg">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
