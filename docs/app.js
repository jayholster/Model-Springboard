const { useEffect, useMemo, useRef, useState } = React;

const quickPrompts = [
  'Neon city in the rain, holographic mist',
  'Martian desert at sunset with crystalline storms',
  'Underwater cathedral of bioluminescent coral',
  'Aurora borealis over a glass canyon',
];

const modeDetails = {
  traveler: {
    name: 'The Traveler',
    description:
      'One hand steers the camera (pitch/yaw), the other hand modulates velocity through depth. Fly through the soundscape and sculpt the wind of reverb trails.',
    controls: [
      'Left hand: yaw + pitch vector',
      'Right hand: throttle + depth (Z-axis push)',
      'Thumb/forefinger pinch: warp to next audio shrine',
    ],
  },
  weaver: {
    name: 'The Weaver',
    description:
      'Touch the terrain to trigger harmonics. Color channels map to timbre. Peaks emit granular pads while valleys whisper sub-bass drones.',
    controls: [
      'Index fingertip: strike heightmap peaks',
      'Palm hover: sustain pad bloom',
      'Hand spread: widen spectral shimmer',
    ],
  },
};

const synthPresets = [
  { name: 'Prismatic Clouds', notes: 'Dorian · 96 BPM · granular shimmer', color: '#7c89ff' },
  { name: 'Liquid Neon', notes: 'Harmonic minor · 78 BPM · modulated reverb', color: '#39f5c7' },
  { name: 'Red Dust Choir', notes: 'Phrygian · 70 BPM · tape bloom', color: '#ff7369' },
];

const keyPresets = [
  { label: 'Use window.aistudio key', value: 'aistudio' },
  { label: 'Paste key manually', value: 'manual' },
];

const fingerSystems = [
  {
    name: '5-Finger Harmonic Lattice',
    description:
      'Each fingertip anchors a chord tone. Spread distance controls chord voicing, while Z-depth shifts harmonic tension.',
  },
  {
    name: 'Ribbon Constellations',
    description:
      'Swipe arcs create ribbon synths that lock to the generated scale. Velocity becomes grain density.',
  },
  {
    name: 'Pulse Weaving',
    description:
      'Index + thumb pinch captures a pulse loop. Move your palm to scatter echoes across the terrain.',
  },
];

const SynesthesiaApp = () => {
  const canvasRef = useRef(null);
  const [activeMode, setActiveMode] = useState('traveler');
  const [prompt, setPrompt] = useState(quickPrompts[0]);
  const [dreamStatus, setDreamStatus] = useState('Idle');
  const [dreamProgress, setDreamProgress] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(synthPresets[0]);
  const [audioReactivity, setAudioReactivity] = useState(0.6);
  const [depthBoost, setDepthBoost] = useState(0.45);
  const [keyMode, setKeyMode] = useState(keyPresets[0].value);
  const [apiKey, setApiKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [neuralStatus, setNeuralStatus] = useState('Awaiting authentication');
  const [cameraStatus, setCameraStatus] = useState('Camera offline');
  const [handStatus, setHandStatus] = useState('Hand tracking idle');

  const skyGradient = useMemo(
    () => ({
      start: '#050312',
      end: '#16072e',
      glow: '#4d88ff',
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let animationFrame = null;

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 900;
      canvas.height = canvas.parentElement?.clientHeight || 480;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const drawTerrain = () => {
      if (!ctx) return;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, skyGradient.start);
      gradient.addColorStop(0.5, skyGradient.end);
      gradient.addColorStop(1, '#02010a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = `${skyGradient.glow}44`;
      ctx.beginPath();
      ctx.arc(width * 0.78, height * 0.2, width * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const layers = 38;
      for (let i = 0; i < layers; i += 1) {
        const depth = i / layers;
        const amplitude = 25 + depth * 120 * audioReactivity;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(80, ${140 + i * 3}, ${255 - i * 2}, ${0.35 - depth * 0.25})`;
        ctx.lineWidth = 1;
        for (let x = 0; x <= width; x += 14) {
          const wave =
            Math.sin((x + frame * 4) * 0.01 + depth * 6) *
            amplitude *
            (0.4 + depthBoost);
          const y = height * (0.4 + depth * 0.65) + wave;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      ctx.save();
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < 180; i += 1) {
        const x = (i * 57 + frame * 2) % width;
        const y = (i * 19 + frame * 0.6) % height;
        const radius = 1 + ((i + frame) % 8) * 0.15;
        ctx.fillStyle = `rgba(120, 220, 255, ${0.35 + (i % 5) * 0.05})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      frame += 1;
      animationFrame = requestAnimationFrame(drawTerrain);
    };

    drawTerrain();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [audioReactivity, depthBoost, skyGradient]);

  useEffect(() => {
    if (dreamStatus !== 'Synthesizing') return undefined;
    let progress = 0;
    setDreamProgress(0);
    const interval = setInterval(() => {
      progress += 12;
      if (progress >= 100) {
        setDreamProgress(100);
        setDreamStatus('World formed');
        clearInterval(interval);
      } else {
        setDreamProgress(progress);
      }
    }, 240);
    return () => clearInterval(interval);
  }, [dreamStatus]);

  const handleDreamSubmit = (event) => {
    event.preventDefault();
    setDreamStatus('Synthesizing');
  };

  const handleUnlock = () => {
    let finalKey = apiKey;
    if (keyMode === 'aistudio') {
      const candidateKey = window?.aistudio?.apiKey || window?.aistudio?.key || '';
      setApiKey(candidateKey);
      finalKey = candidateKey;
    }
    if (finalKey) {
      setNeuralStatus('Neural interface synchronized');
      setIsUnlocked(true);
    } else {
      setNeuralStatus('Key required to open neural interface');
    }
  };

  const handleCameraAccess = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraStatus('Camera API unavailable in this browser');
      return;
    }
    try {
      setCameraStatus('Requesting camera access...');
      await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setCameraStatus('Camera streaming to MediaPipe rig');
      setHandStatus('Hand tracking calibrated');
    } catch (error) {
      setCameraStatus('Camera access denied');
      setHandStatus('Hand tracking paused');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #1b1238 0%, #07030f 45%, #020107 100%)',
        color: '#e5e7ff',
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        padding: '32px 28px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!isUnlocked && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(12px)',
            background: 'rgba(3, 1, 10, 0.92)',
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '640px',
              width: '100%',
              border: '1px solid rgba(120, 150, 255, 0.3)',
              borderRadius: '20px',
              padding: '28px',
              background: 'rgba(10, 8, 24, 0.9)',
              boxShadow: '0 40px 120px rgba(22, 16, 60, 0.6)',
            }}
          >
            <p style={{ letterSpacing: '0.32em', textTransform: 'uppercase', fontSize: '12px', color: '#7fb0ff' }}>
              Neural Interface Lock
            </p>
            <h1 style={{ fontSize: '28px', margin: '12px 0 6px' }}>SYNESTHESIA Core</h1>
            <p style={{ color: '#9fb0ff', marginBottom: '20px' }}>
              Imagen requires a paid key. Authenticate with window.aistudio or manually paste your Gemini key to
              activate the dream engine.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {keyPresets.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setKeyMode(option.value)}
                  style={{
                    flex: '1 1 200px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: `1px solid ${keyMode === option.value ? '#8aa5ff' : 'rgba(120,140,255,0.35)'}`,
                    background: keyMode === option.value ? 'rgba(90,110,255,0.25)' : 'transparent',
                    color: '#dfe5ff',
                    cursor: 'pointer',
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {keyMode === 'manual' && (
              <input
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="Paste Gemini key"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(120,140,255,0.4)',
                  background: 'rgba(6, 5, 18, 0.9)',
                  color: '#f4f6ff',
                  marginBottom: '16px',
                }}
              />
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={handleUnlock}
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(120deg, #4e7bff, #9a6bff)',
                  color: '#0b0b18',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                type="button"
              >
                Sync Neural Interface
              </button>
              <span style={{ fontSize: '13px', color: '#8fa2ff' }}>{neuralStatus}</span>
            </div>
          </div>
        </div>
      )}

      <header style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
        <div>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9db7ff', fontSize: '12px' }}>
            SYNESTHESIA: The AR Sound-Scaper
          </p>
          <h1 style={{ fontSize: '34px', margin: '10px 0 8px' }}>Dream the world. Conduct the light.</h1>
          <p style={{ maxWidth: '520px', color: '#a8b2ff' }}>
            You are the architect of an audiovisual universe. Speak or type an idea, summon a 3D terrain from Imagen,
            and sculpt music with your hands inside a living point-cloud cathedral.
          </p>
        </div>
        <div
          style={{
            background: 'rgba(16, 14, 38, 0.7)',
            border: '1px solid rgba(90, 110, 255, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            minWidth: '260px',
          }}
        >
          <p style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#7f95ff', textTransform: 'uppercase' }}>
            Live Engine
          </p>
          <h2 style={{ margin: '8px 0' }}>p5.js WebGL + MediaPipe</h2>
          <p style={{ color: '#b8c3ff', fontSize: '14px' }}>
            Full 3D tracking mapped to Z-space. Push your hands toward the lens to plunge deep into the soundscape.
          </p>
          <button
            type="button"
            onClick={handleCameraAccess}
            style={{
              marginTop: '12px',
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1px solid rgba(120, 150, 255, 0.45)',
              background: 'rgba(30, 40, 90, 0.6)',
              color: '#dfe6ff',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 600,
            }}
          >
            Enable Camera + Hand Rig
          </button>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#9fb0ff' }}>
            <p style={{ margin: '2px 0' }}>Camera: {cameraStatus}</p>
            <p style={{ margin: '2px 0' }}>Hands: {handStatus}</p>
          </div>
        </div>
      </header>

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: '24px',
          marginTop: '28px',
        }}
      >
        <section
          style={{
            background: 'rgba(10, 8, 26, 0.72)',
            borderRadius: '24px',
            border: '1px solid rgba(120, 150, 255, 0.2)',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ margin: 0 }}>3D Soundscape Chamber</h2>
              <p style={{ margin: '6px 0 0', color: '#a8b2ff', fontSize: '14px' }}>
                Generative terrain and point-cloud mesh reacting to spatial audio.
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Status</p>
              <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{dreamStatus}</p>
            </div>
          </div>

          <div style={{ position: 'relative', height: '420px', borderRadius: '18px', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background:
                  'linear-gradient(120deg, rgba(80,120,255,0.18), rgba(255,120,220,0.08), rgba(90,255,210,0.14))',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: '14%',
                top: '52%',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '1px solid rgba(120, 200, 255, 0.5)',
                background: 'radial-gradient(circle, rgba(120,220,255,0.4), transparent 70%)',
                boxShadow: '0 0 24px rgba(120,220,255,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '12%',
                top: '36%',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 140, 200, 0.5)',
                background: 'radial-gradient(circle, rgba(255,130,200,0.45), transparent 70%)',
                boxShadow: '0 0 30px rgba(255,130,200,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '14%',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '10px 16px',
                borderRadius: '999px',
                background: 'rgba(10, 6, 24, 0.8)',
                border: '1px solid rgba(120, 150, 255, 0.25)',
                fontSize: '12px',
                color: '#a8b2ff',
              }}
            >
              Hand orbs = tracked palms · Ghost trails = finger velocity
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div
              style={{
                marginTop: '16px',
                background: 'rgba(15, 12, 32, 0.6)',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1px solid rgba(90, 110, 255, 0.3)',
              }}
            >
              <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Heightmap</p>
              <p style={{ margin: '6px 0 0', color: '#cbd3ff' }}>
                Imagen → pixel depth fields → mesh displacement
              </p>
            </div>
            <div
              style={{
                marginTop: '16px',
                background: 'rgba(15, 12, 32, 0.6)',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1px solid rgba(90, 110, 255, 0.3)',
              }}
            >
              <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Point Cloud</p>
              <p style={{ margin: '6px 0 0', color: '#cbd3ff' }}>
                Audio FFT drives vertex brightness and terrain lift
              </p>
            </div>
            <div
              style={{
                marginTop: '16px',
                background: 'rgba(15, 12, 32, 0.6)',
                borderRadius: '16px',
                padding: '12px 14px',
                border: '1px solid rgba(90, 110, 255, 0.3)',
              }}
            >
              <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Spatial Audio</p>
              <p style={{ margin: '6px 0 0', color: '#cbd3ff' }}>Binaural panning tied to fly-through vectors</p>
            </div>
          </div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <form
            onSubmit={handleDreamSubmit}
            style={{
              background: 'rgba(10, 8, 26, 0.72)',
              borderRadius: '20px',
              border: '1px solid rgba(120, 150, 255, 0.2)',
              padding: '18px',
            }}
          >
            <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Dream the World</p>
            <h3 style={{ margin: '8px 0 12px' }}>Imagen + Gemini 2.5 Flash</h3>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid rgba(120, 150, 255, 0.25)',
                background: 'rgba(6, 4, 16, 0.8)',
                color: '#f4f6ff',
                marginBottom: '12px',
              }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {quickPrompts.map((item) => (
                <button
                  key={item}
                  onClick={() => setPrompt(item)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(120, 150, 255, 0.25)',
                    background: 'rgba(20, 18, 40, 0.7)',
                    color: '#c7d0ff',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(120deg, #45e2ff, #8e6bff)',
                color: '#090816',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Generate Soundscape
            </button>
            <div style={{ marginTop: '14px' }}>
              <div
                style={{
                  height: '8px',
                  borderRadius: '999px',
                  background: 'rgba(100, 120, 255, 0.2)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${dreamProgress}%`,
                    background: 'linear-gradient(90deg, #63f3ff, #8e6bff)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#9bb0ff', marginTop: '8px' }}>
                {dreamStatus === 'Synthesizing'
                  ? 'Parsing pixels → heightmap mesh → harmony map'
                  : 'Ready for the next dream.'}
              </p>
            </div>
          </form>

          <div
            style={{
              background: 'rgba(10, 8, 26, 0.72)',
              borderRadius: '20px',
              border: '1px solid rgba(120, 150, 255, 0.2)',
              padding: '18px',
            }}
          >
            <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Audio Engine</p>
            <h3 style={{ margin: '8px 0 12px' }}>Granular Atmospheres</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {synthPresets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => setSelectedPreset(preset)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: '14px',
                    border:
                      selectedPreset.name === preset.name
                        ? `1px solid ${preset.color}`
                        : '1px solid rgba(120, 150, 255, 0.2)',
                    background:
                      selectedPreset.name === preset.name ? 'rgba(40, 32, 80, 0.8)' : 'rgba(18, 16, 34, 0.6)',
                    color: '#dfe6ff',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{preset.name}</strong>
                    <span style={{ color: preset.color }}>●</span>
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#a8b2ff' }}>{preset.notes}</p>
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: 'rgba(10, 8, 26, 0.72)',
              borderRadius: '20px',
              border: '1px solid rgba(120, 150, 255, 0.2)',
              padding: '18px',
            }}
          >
            <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Reactive Controls</p>
            <div style={{ marginTop: '8px' }}>
              <label style={{ fontSize: '13px', color: '#b4c2ff' }} htmlFor="reactivity">
                Audio Reactivity
              </label>
              <input
                id="reactivity"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioReactivity}
                onChange={(event) => setAudioReactivity(Number(event.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '13px', color: '#b4c2ff' }} htmlFor="depth">
                Z-Depth Push
              </label>
              <input
                id="depth"
                type="range"
                min="0.1"
                max="1.2"
                step="0.05"
                value={depthBoost}
                onChange={(event) => setDepthBoost(Number(event.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </aside>
      </main>

      <section style={{ marginTop: '28px', display: 'grid', gap: '18px' }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {Object.keys(modeDetails).map((modeKey) => (
            <button
              key={modeKey}
              type="button"
              onClick={() => setActiveMode(modeKey)}
              style={{
                padding: '10px 16px',
                borderRadius: '999px',
                border: activeMode === modeKey ? '1px solid #7fb0ff' : '1px solid rgba(120, 150, 255, 0.3)',
                background: activeMode === modeKey ? 'rgba(60, 90, 255, 0.3)' : 'transparent',
                color: '#dbe4ff',
                cursor: 'pointer',
              }}
            >
              {modeDetails[modeKey].name}
            </button>
          ))}
        </div>
        <div
          style={{
            background: 'rgba(10, 8, 26, 0.72)',
            borderRadius: '20px',
            border: '1px solid rgba(120, 150, 255, 0.2)',
            padding: '18px',
          }}
        >
          <h3 style={{ margin: '4px 0' }}>{modeDetails[activeMode].name}</h3>
          <p style={{ color: '#a8b2ff', marginBottom: '12px' }}>{modeDetails[activeMode].description}</p>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd3ff' }}>
            {modeDetails[activeMode].controls.map((control) => (
              <li key={control} style={{ marginBottom: '6px' }}>
                {control}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        style={{
          marginTop: '28px',
          padding: '18px',
          borderRadius: '22px',
          border: '1px solid rgba(120, 150, 255, 0.2)',
          background: 'linear-gradient(120deg, rgba(30, 24, 60, 0.8), rgba(12, 8, 28, 0.9))',
        }}
      >
        <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>Particle Physics</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <h4>Harmonic Ripples</h4>
            <p style={{ color: '#b8c3ff' }}>
              Each touch detonates a chromatic ripple. The mesh glows and sends a wave of particles that carries the
              frequency through space.
            </p>
          </div>
          <div>
            <h4>Ghost Trails</h4>
            <p style={{ color: '#b8c3ff' }}>
              Finger velocity spawns translucent trails that slowly decay into stardust, leaving spectral paths of
              motion.
            </p>
          </div>
          <div>
            <h4>Light Bloom</h4>
            <p style={{ color: '#b8c3ff' }}>
              Terrain peaks saturate into neon bloom. Color temperature sets the harmonic weight and the timbre hue.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          marginTop: '28px',
          padding: '18px',
          borderRadius: '22px',
          border: '1px solid rgba(120, 150, 255, 0.2)',
          background: 'rgba(10, 8, 26, 0.72)',
        }}
      >
        <p style={{ fontSize: '12px', color: '#7f95ff', textTransform: 'uppercase' }}>
          Natural AR Instrument System
        </p>
        <h3 style={{ margin: '8px 0 14px' }}>A hand language built for performance</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {fingerSystems.map((system) => (
            <div
              key={system.name}
              style={{
                padding: '12px',
                borderRadius: '16px',
                border: '1px solid rgba(120, 150, 255, 0.2)',
                background: 'rgba(18, 14, 36, 0.6)',
              }}
            >
              <h4 style={{ margin: '0 0 8px' }}>{system.name}</h4>
              <p style={{ color: '#b8c3ff', margin: 0 }}>{system.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SynesthesiaApp />);
