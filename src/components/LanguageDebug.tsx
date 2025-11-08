import { useTranslation } from "../contexts/LanguageContext";
import { Language } from "../locales";

export function LanguageDebug() {
  const { language, setLanguage, t } = useTranslation();

  const testKeys = [
    'header.about',
    'header.services',
    'hero.title',
    'hero.bookingButton'
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      background: 'white',
      border: '2px solid #333',
      padding: '15px',
      borderRadius: '8px',
      zIndex: 9999,
      maxWidth: '400px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
        🌍 Language Debug Panel
      </h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Current Language:</strong> {language}
      </div>

      <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
        <button 
          onClick={() => setLanguage('ru' as Language)}
          style={{
            padding: '5px 10px',
            background: language === 'ru' ? '#4CAF50' : '#ddd',
            color: language === 'ru' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🇷🇺 RU
        </button>
        <button 
          onClick={() => setLanguage('en' as Language)}
          style={{
            padding: '5px 10px',
            background: language === 'en' ? '#4CAF50' : '#ddd',
            color: language === 'en' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🇬🇧 EN
        </button>
        <button 
          onClick={() => setLanguage('be' as Language)}
          style={{
            padding: '5px 10px',
            background: language === 'be' ? '#4CAF50' : '#ddd',
            color: language === 'be' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🇧🇾 BE
        </button>
      </div>

      <div style={{ fontSize: '12px', background: '#f0f0f0', padding: '8px', borderRadius: '4px' }}>
        <strong>Test Translations:</strong>
        {testKeys.map(key => (
          <div key={key} style={{ marginTop: '5px' }}>
            <code style={{ fontSize: '10px', color: '#666' }}>{key}:</code>
            <br />
            <span style={{ fontSize: '11px' }}>{t(key)}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '10px', fontSize: '11px', color: '#666' }}>
        localStorage: {typeof window !== 'undefined' ? localStorage.getItem('weddingtravel_language') : 'N/A'}
      </div>
    </div>
  );
}