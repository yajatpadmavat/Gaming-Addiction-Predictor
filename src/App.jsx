import React, { useState } from 'react';

export default function Predictor() {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    years_gaming: '',
    daily_playtime_hours: '',
    weekly_play_sessions: '',
    late_night_sessions_hours: '',
    weekend_playtime_hours: '',
    consecutive_hours_max: '',
    monthly_spending_usd: '',
    stress_score: '',
    loneliness_score: '',
    dopamine_dependency_index: '',
    self_control_score: '',
    anxiety_level: '',
    sleep_hours: '',
    screen_time_total_hours: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Prepare payload: convert filled text to numbers, leave empty fields as null
    const payload = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'gender') {
        payload[key] = formData[key];
      } else {
        payload[key] = formData[key] === '' ? null : parseFloat(formData[key]);
      }
    });

    try {
      const response = await fetch('https://gaming-addiction-backend.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '30px', fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ textAlign: 'center' }}>🎮 Comprehensive Gaming Health Assessment</h2>
      <p style={{ color: '#666', textAlign: 'center' }}>Fill out as much as you can. Unsure answers will be filled with typical baseline metrics.</p>
      
      <form onSubmit={handleSubmit}>
        {/* SECTION 1: Demographics */}
        <h3>📋 Profile & Demographics</h3>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} required />
          </div>
          <div style={{ flex: 1 }}>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>
        </div>

        {/* SECTION 2: Gaming Habits */}
        <h3>🕹️ Gaming Habits</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
          <div>
            <label>Years Gaming:</label>
            <input type="number" name="years_gaming" value={formData.years_gaming} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Daily Playtime (Hours):</label>
            <input type="number" step="0.1" name="daily_playtime_hours" value={formData.daily_playtime_hours} onChange={handleChange} style={{ width: '100%', padding: '8px' }} required />
          </div>
          <div>
            <label>Weekly Sessions:</label>
            <input type="number" name="weekly_play_sessions" value={formData.weekly_play_sessions} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Max Consecutive Hours:</label>
            <input type="number" step="0.1" name="consecutive_hours_max" value={formData.consecutive_hours_max} onChange={handleChange} style={{ width: '100%', padding: '8px' }} required />
          </div>
          <div>
            <label>Late Night Hours (Past Midnight):</label>
            <input type="number" step="0.1" name="late_night_sessions_hours" value={formData.late_night_sessions_hours} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Monthly Spending (USD):</label>
            <input type="number" step="0.1" name="monthly_spending_usd" value={formData.monthly_spending_usd} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
        </div>

        {/* SECTION 3: Psychological & Lifestyle */}
        <h3>🧠 Psychological & Lifestyle Indicators</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div>
            <label>Sleep Hours:</label>
            <input type="number" step="0.1" name="sleep_hours" value={formData.sleep_hours} onChange={handleChange} style={{ width: '100%', padding: '8px' }} required />
          </div>
          <div>
            <label>Total Screen Time (Hours):</label>
            <input type="number" step="0.1" name="screen_time_total_hours" value={formData.screen_time_total_hours} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Stress Score (1-10):</label>
            <input type="number" min="1" max="10" name="stress_score" value={formData.stress_score} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Anxiety Level (1-10):</label>
            <input type="number" min="1" max="10" name="anxiety_level" value={formData.anxiety_level} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Loneliness Score (1-10):</label>
            <input type="number" min="1" max="10" name="loneliness_score" value={formData.loneliness_score} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
          <div>
            <label>Self Control Score (1-10):</label>
            <input type="number" min="1" max="10" name="self_control_score" value={formData.self_control_score} onChange={handleChange} style={{ width: '100%', padding: '8px' }} placeholder="Optional" />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}>
          {loading ? 'Processing Assessment...' : 'Submit Assessment'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', borderRadius: '6px', textAlign: 'center', fontWeight: 'bold', backgroundColor: result.risk_level === 'High Risk' ? '#F8D7DA' : '#D1E7DD', color: result.risk_level === 'High Risk' ? '#842029' : '#0F5132' }}>
          <h3>Result: {result.risk_level}</h3>
          <p>Confidence: {result.confidence.toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}