(() => {
  const defaultScale = ['C', 'D', 'E', 'G', 'A'];

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const mapHandMetricsToHarmony = (metrics = {}) => {
    const {
      fingerSpread = 0.5,
      depth = 0.5,
      velocity = 0.5,
      pinch = 0,
      scale = defaultScale,
    } = metrics;

    const tensionIndex = Math.round(clamp(depth, 0, 1) * 4);
    const voicingIndex = Math.round(clamp(fingerSpread, 0, 1) * 4);
    const grainDensity = clamp(velocity, 0, 1);
    const loopCapture = pinch > 0.7;

    return {
      tensionProfile: ['suspended', 'add9', 'minor7', 'dominant', 'altered'][tensionIndex],
      voicing: ['open', 'spread', 'clustered', 'tight', 'wide'][voicingIndex],
      grainDensity,
      loopCapture,
      scale,
    };
  };

  window.GestureEngine = {
    mapHandMetricsToHarmony,
  };
})();
