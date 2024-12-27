import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(null);
  const [activityFactor, setActivityFactor] = useState(1.2);
  const [tdee, setTdee] = useState(null);
  const [weightLossPerWeek, setWeightLossPerWeek] = useState('');
  const [caloricDeficit, setCaloricDeficit] = useState(null);
  const [protein, setProtein] = useState(null);
  const [fat, setFat] = useState(null);
  const [carbohydrates, setCarbohydrates] = useState(null);

  useEffect(() => {
    // Load data from localStorage
    setWeight(localStorage.getItem('weight') || '');
    setHeight(localStorage.getItem('height') || '');
    setBirthday(localStorage.getItem('birthday') || '');
    setGender(localStorage.getItem('gender') || 'male');
  }, []);

  // Helper function to calculate age from birthday
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Calculate BMR using the Harris-Benedict equation
  const calculateBMR = () => {
    const age = calculateAge(birthday);
    if (weight && height && age) {
      let calculatedBmr;
      if (gender === 'male') {
        calculatedBmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        calculatedBmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
      setBmr(calculatedBmr.toFixed(2));
    }
  };

  // Calculate TDEE
  const calculateTDEE = () => {
    if (bmr && activityFactor) {
      const calculatedTdee = (bmr * activityFactor).toFixed(2);
      setTdee(calculatedTdee);
    }
  };

  // Calculate Caloric Deficit
  const calculateCaloricDeficit = () => {
    if (tdee && weightLossPerWeek) {
      const deficitPerKg = 7700; // Approximate kcal deficit needed to lose 1 kg
      const desiredDeficit = (weightLossPerWeek * deficitPerKg) / 7; // Daily deficit
      const dailyCalories = tdee - desiredDeficit;
      setCaloricDeficit(dailyCalories.toFixed(2));
    }
  };

  // Calculate Macronutrients
  const calculateMacronutrients = () => {
    if (tdee) {
      const proteinGrams = parseFloat(weight * 2.2); // Ensure proteinGrams is a number
      const fatGrams = (0.4 * weight * 2.2); // 40% of body weight in lbs
      const carbGrams = (caloricDeficit - (proteinGrams * 4) - (fatGrams * 9)) / 4; // Remaining calories for carbs
      setProtein(proteinGrams.toFixed(0));
      setFat(fatGrams.toFixed(0));
      setCarbohydrates(carbGrams.toFixed(0));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto">
          <a href="/profile" className="text-white text-lg">Profile</a>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">BMR Calculator</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={calculateBMR}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Calculate BMR
          </button>
          {bmr && (
            <div className="mt-4 text-center">
              <p className="text-lg">Your BMR: <strong>{bmr} kcal/day</strong></p>
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">TDEE Calculator</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Activity Factor</label>
            <input
              type="number"
              value={activityFactor}
              onChange={(e) => setActivityFactor(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={calculateTDEE}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Calculate TDEE
          </button>
          {tdee && (
            <div className="mt-4 text-center">
              <p className="text-lg">Your TDEE (Total Daily Energy Expenditure): <strong>{tdee} kcal/day</strong></p>
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">Caloric Deficit for Weight Loss</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Weight Loss per Week (kg)</label>
            <input
              type="number"
              value={weightLossPerWeek}
              onChange={(e) => setWeightLossPerWeek(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            onClick={calculateCaloricDeficit}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Calculate Caloric Deficit
          </button>
          {caloricDeficit && (
            <div className="mt-4 text-center">
              <p className="text-lg">To lose {weightLossPerWeek} kg per week, consume: <strong>{caloricDeficit} kcal/day</strong></p>
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-4">Macronutrient Calculator</h2>
          <button
            onClick={calculateMacronutrients}
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            Calculate Macronutrients
          </button>
          {protein && fat && carbohydrates && (
            <div className="mt-4 text-center">
              <p className="text-lg">Protein: <strong>{protein} g</strong></p>
              <p className="text-lg">Fat: <strong>{fat} g</strong></p>
              <p className="text-lg">Carbohydrates: <strong>{carbohydrates} g</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
