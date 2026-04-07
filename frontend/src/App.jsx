import { useState, useRef } from 'react';
import { bloodTypeData } from './data/bloodTypes';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'scan', 'results'
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleNav = (view) => {
    setCurrentView(view);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    
    // Switch to scan view while simulating/uploading
    setCurrentView('scan');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.error) {
        alert(data.error);
        setUploading(false);
        return;
      }

      setResult({
        bloodGroup: data.blood_group,
        confidence: data.confidence,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      
      setCurrentView('results');
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to connect to the backend API.");
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          {/* A simple inline SVG logo placeholder */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.5C12 21.5 20.5 15.5 20.5 8.5C20.5 4.5 17 2.5 14 2.5C12.5 2.5 12 3.5 12 3.5C12 3.5 11.5 2.5 10 2.5C7 2.5 3.5 4.5 3.5 8.5C3.5 15.5 12 21.5 12 21.5Z" stroke="#ea3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 8.5C9.5 7.5 10 6 12 6C14 6 14.5 7.5 14.5 8.5" stroke="#ea3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          BloodScan
        </div>
        <nav>
          <a href="#" className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNav('home'); }}>HOME</a>
          <a href="#" className={`nav-link ${currentView === 'scan' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNav('scan'); }}>SCAN</a>
          <a href="#" className={`nav-link ${currentView === 'results' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); handleNav('results'); }}>RESULTS</a>
        </nav>
        <button className="red-btn go-btn" onClick={() => handleNav('scan')}>GET STARTED</button>
      </header>

      <main>
        {currentView === 'home' && (
          <div className="hero-section fade-in">
            <button className="glow-btn" style={{ marginBottom: '40px' }} onClick={() => handleNav('scan')}>
              Try It Now — It's Free &rarr;
            </button>
            <div className="hero-subtitle">B L O O D &nbsp; T Y P E &nbsp; E N C Y C L O P E D I A</div>
            <h1 className="hero-title">Which type are <span className="italic-serif">you?</span></h1>
            <p className="hero-desc">
              There are 8 main blood groups. BloodScan detects all of them. 
              Understanding your type helps in emergencies, donations, and health planning.
            </p>
          </div>
        )}

        {currentView === 'scan' && (
          <div className="upload-section fade-in">
            <h1 className="upload-title">Upload your <span className="italic-serif">fingerprint</span></h1>
            <p className="upload-desc">Select an existing fingerprint photo from your device for analysis.</p>
            
            <div className="upload-card-container">
              <div className="upload-card">
                <div className="icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h3 className="upload-card-title">Upload Image</h3>
                <p className="upload-card-desc">Select an existing fingerprint photo from your device gallery or files.</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload} 
                />
                <button className="upload-input-label" onClick={triggerFileInput} style={{ background: 'none', border: 'none' }}>
                  {uploading ? 'Analyzing...' : 'Browse Files \u2192'}
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'results' && result && (
          <div className="results-section fade-in">
            <div className="status-badge">&#x2713; ANALYSIS COMPLETE</div>
            <h1 className="results-title">Your blood group is</h1>
            
            <div className="result-card">
              <div className="blood-circle">
                <h2>{result.bloodGroup}</h2>
                <span>BLOOD TYPE</span>
              </div>
              
              <div className="result-details">
                <h2 className="result-name">Type {result.bloodGroup.replace('+', ' Positive (+)').replace('-', ' Negative (-)')}</h2>
                <div className="result-stats">Found in our global dataset</div>
                
                <div className="confidence-meter">
                  <div className="confidence-header">
                    <span>AI PREDICTION CONFIDENCE</span>
                    <span className="confidence-perc">{result.confidence.toFixed(0)}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${result.confidence}%` }}></div>
                  </div>
                  <div className="confidence-labels">
                    <span>Low</span>
                    <span style={{ color: '#22c55e' }}>High confidence</span>
                  </div>
                </div>

                <div className="info-cards">
                  <div className="info-card">
                    <div className="info-card-title">DONOR TYPE</div>
                    <div className="info-card-val">{result.bloodGroup} Donor</div>
                  </div>
                  <div className="info-card">
                    <div className="info-card-title">RH FACTOR</div>
                    <div className="info-card-val" style={{ color: result.bloodGroup.includes('+') ? '#22c55e' : '#ea3333' }}>
                      {result.bloodGroup.includes('+') ? 'Positive' : 'Negative'}
                    </div>
                  </div>
                  <div className="info-card">
                    <div className="info-card-title">SCANNED</div>
                    <div className="info-card-val">{result.date}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="glow-btn" style={{ marginTop: '40px' }} onClick={() => handleNav('blood-details')}>
              Learn more about Type {result.bloodGroup} &rarr;
            </button>
          </div>
        )}

        {currentView === 'blood-details' && result && bloodTypeData[result.bloodGroup] && (
          <div className="details-section fade-in">
            <button className="nav-link" style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-dark)' }} onClick={() => handleNav('results')}>
              &larr; Back to Results
            </button>
            <h1 className="results-title">About <span className="italic-serif">{result.bloodGroup}</span></h1>
            
            <div className="details-container">
              <div className="details-header">
                <h2>{bloodTypeData[result.bloodGroup].name}</h2>
                <div className="prevalence-badge">{bloodTypeData[result.bloodGroup].prevalence} of population</div>
              </div>
              
              <p className="details-desc">{bloodTypeData[result.bloodGroup].description}</p>
              
              <div className="compatibility-grid">
                <div className="compat-card">
                  <h3>Can Donate To</h3>
                  <div className="blood-tags">
                    {bloodTypeData[result.bloodGroup].canDonateTo.map(bt => (
                      <span key={bt} className="blood-tag donate">{bt}</span>
                    ))}
                  </div>
                </div>
                <div className="compat-card">
                  <h3>Can Receive From</h3>
                  <div className="blood-tags">
                    {bloodTypeData[result.bloodGroup].canReceiveFrom.map(bt => (
                      <span key={bt} className="blood-tag receive">{bt}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="traits-section">
                <h3>Key Characteristics</h3>
                <ul className="traits-list">
                  {bloodTypeData[result.bloodGroup].traits.map((trait, index) => (
                    <li key={index}>
                      <span className="check-icon">&#x2713;</span> {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="health-insights-section details-container" style={{ marginTop: '24px' }}>
              <div className="insights-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div className="info-icon" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '1px solid rgba(234, 179, 8, 0.3)' }}>i</div>
                <div className="insights-header-text">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Health Insights for {bloodTypeData[result.bloodGroup].name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Research-based notes — consult your doctor for medical advice</p>
                </div>
              </div>
              <div className="insights-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {bloodTypeData[result.bloodGroup].healthInsights && bloodTypeData[result.bloodGroup].healthInsights.map((insight, index) => (
                  <div key={index} className="insight-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-dark)', borderRadius: '12px' }}>
                    <div className="insight-check-wrapper" style={{ flexShrink: 0, backgroundColor: 'rgba(234, 179, 8, 0.1)', color: '#eab308', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                      <span className="insight-check">&#x2713;</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.4' }}>{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="medical-disclaimer details-container" style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div className="disclaimer-icon" style={{ color: 'var(--primary-red)', flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                <span className="disclaimer-title" style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>Medical Disclaimer:</span> BloodScan is an AI-powered screening tool for educational purposes only. Results are predictions based on dermatoglyphic pattern analysis and are <strong style={{ color: 'var(--text-main)' }}>not a substitute for clinical blood typing</strong>. Always confirm your blood group with a certified laboratory test before medical procedures or blood donation.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
