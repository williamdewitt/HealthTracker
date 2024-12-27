import { useState } from 'react';

export default function Profile() {
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(null);
  const [activityFactor, setActivityFactor] = useState(1.2);
  const [tdee, setTdee] = useState(null);
  const [weightLossPerWeek, setWeightLossPerWeek] = useState('');
  const [caloricDeficit, setCaloricDeficit] = useState(null);
  const [protein, setProtein] = useState(null);
  const [fat, setFat] = useState(null);
  const [carbohydrates, setCarbohydrates] = useState(null);

  // using the Harris-Benedict equation
  const calculateBMR = () => {
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

  const calculateTDEE = () => {
    if (bmr && activityFactor) {
      const calculatedTdee = (bmr * activityFactor).toFixed(2);
      setTdee(calculatedTdee);
    }
  };

  const calculateCaloricDeficit = () => {
    if (tdee && weightLossPerWeek) {
      const deficitPerKg = 7700; // Approximate kcal deficit needed to lose 1 kg
      const desiredDeficit = (weightLossPerWeek * deficitPerKg) / 7; // Daily deficit
      const dailyCalories = tdee - desiredDeficit;
      setCaloricDeficit(dailyCalories.toFixed(2));
    }
  };

  const calculateMacronutrients = () => {
    if (tdee) {
      const proteinGrams = parseFloat(weight * 2.2); // Ensure proteinGrams is a number
      // const fatGrams = (0.35 * tdee) / 9; // 35% of TDEE divided by 9
      const fatGrams = (0.4 * weight * 2.2); // 40% of body weight in lbs
      const carbGrams = (caloricDeficit - (proteinGrams * 4) - (fatGrams * 9)) / 4; // Remaining calories for carbs
      setProtein(proteinGrams.toFixed(0));
      setFat(fatGrams.toFixed(0));
      setCarbohydrates(carbGrams.toFixed(0));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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
          <label className="block text-gray-700">Basal Metabolic Rate (BMR)</label>
          <input
            type="number"
            value={bmr || ''}
            onChange={(e) => setBmr(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            readOnly
          />
        </div>
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
  );
}
