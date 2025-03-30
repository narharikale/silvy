"use client";

import { useEffect, useRef } from "react";
import styles from "../../styles/home.module.css";

export default function WebGLCanvas() {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      if (glRef.current) {
        glRef.current.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    // Initialize WebGL
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = gl;

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      
      varying highp vec2 vTextureCoord;
      
      void main() {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader program
    const fsSource = `
      precision mediump float;
      
      varying highp vec2 vTextureCoord;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMousePos;
      
      // 2D Noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      // Simplex-like 2D noise (faster and cleaner than Perlin)
      vec2 hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      
      float noise(vec2 p) {
        const float K1 = 0.366025404; // (sqrt(3)-1)/2
        const float K2 = 0.211324865; // (3-sqrt(3))/6
        
        vec2 i = floor(p + (p.x + p.y) * K1);
        vec2 a = p - i + (i.x + i.y) * K2;
        vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec2 b = a - o + K2;
        vec2 c = a - 1.0 + 2.0 * K2;
        
        vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
        vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), 
                                       dot(b, hash(i + o)), 
                                       dot(c, hash(i + 1.0)));
        
        return dot(n, vec3(70.0));
      }
      
      // Fractal Brownian Motion
      float fbm(vec2 p) {
        float sum = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        
        for(int i = 0; i < 6; i++) {
          sum += amp * noise(p * freq);
          amp *= 0.5;
          freq *= 2.0;
        }
        
        return sum;
      }
      
      // Function to get color from the provided gradient
      vec3 getGradientColor(float t) {
        // Convert hex colors to RGB
        vec3 color1 = vec3(254.0/255.0, 84.0/255.0, 48.0/255.0);  // #fe5430
        vec3 color2 = vec3(255.0/255.0, 79.0/255.0, 40.0/255.0);  // #ff4f28
        vec3 color3 = vec3(255.0/255.0, 80.0/255.0, 42.0/255.0);  // #ff502a
        vec3 color4 = vec3(244.0/255.0, 109.0/255.0, 78.0/255.0); // #f46d4e
        vec3 color5 = vec3(255.0/255.0, 79.0/255.0, 41.0/255.0);  // #ff4f29
        
        // 5-color gradient
        if (t < 0.25) {
          return mix(color1, color2, t * 4.0);
        } else if (t < 0.5) {
          return mix(color2, color3, (t - 0.25) * 4.0);
        } else if (t < 0.75) {
          return mix(color3, color4, (t - 0.5) * 4.0);
        } else {
          return mix(color4, color5, (t - 0.75) * 4.0);
        }
      }
      
      // Function to create circular wave pattern
      float circularWave(vec2 uv, vec2 center, float time) {
        float dist = distance(uv, center);
        
        // Create multiple waves with different frequencies and phases
        float wave1 = sin(dist * 20.0 - time * 2.0) * 0.5 + 0.5;
        float wave2 = sin(dist * 15.0 - time * 1.5) * 0.5 + 0.5;
        float wave3 = sin(dist * 10.0 - time * 1.0) * 0.5 + 0.5;
        
        // Combine waves with different weights
        float combinedWave = wave1 * 0.5 + wave2 * 0.3 + wave3 * 0.2;
        
        // Add falloff based on distance
        float falloff = 1.0 - smoothstep(0.0, 0.5, dist);
        
        return combinedWave * falloff;
      }
      
      void main() {
        // Calculate distance from mouse position
        vec2 uv = vTextureCoord;
        vec2 mousePos = uMousePos;
        float dist = distance(uv, mousePos);
        
        // Add noise effect
        float noiseValue = fbm(uv * 10.0 + uTime * 0.1) * 0.2;
        float animatedNoise = fbm((uv + vec2(noiseValue)) * 8.0 + uTime * 0.05);
        
        // Light bulb effect with noise
        float bulbRadius = 0.01; // Tiny bulb
        float glowRadius = 0.5;
        
        // Distort the distance with noise for a more organic light spread
        float distortedDist = dist * (1.0 + animatedNoise * 0.3);
        
        // Create bright bulb center
        float bulb = smoothstep(bulbRadius, bulbRadius * 0.5, distortedDist);
        
        // Create light falloff with inverse square law and noise
        float light = 1.0 / (1.0 + 15.0 * distortedDist * distortedDist);
        
        // Add subtle flickering
        float flicker = 1.0 + 0.05 * sin(uTime * 10.0) + 0.03 * noise(vec2(uTime * 5.0, 0.0));
        
        // Combine with noise variations
        float finalLight = max(bulb, light) * flicker;
        finalLight *= (1.0 + animatedNoise * 0.15); // Add noise variation to light intensity
        
        // Use the normalized distance for gradient mapping
        float gradientPos = clamp(distortedDist * 2.0, 0.0, 1.0);
        
        // Get color from the gradient
        vec3 gradientColor = getGradientColor(gradientPos);
        
        // Add subtle color variation with noise
        gradientColor += vec3(animatedNoise * 0.05, animatedNoise * 0.03, animatedNoise * 0.02);
        
        // Apply light intensity
        vec3 finalColor = gradientColor * finalLight;
        
        // Add circular wave bindings
        vec2 waveCenter = vec2(1.0, 0.0); // Bottom right corner
        float wave = circularWave(uv, waveCenter, uTime);
        
        // Create a second wave center that moves diagonally
        vec2 movingCenter = vec2(1.0 - uTime * 0.2, uTime * 0.2);
        float movingWave = circularWave(uv, movingCenter, uTime);
        
        // Combine waves with the existing effect
        vec3 waveColor = vec3(1.0, 0.8, 0.6); // Warm color for the waves
        finalColor = mix(finalColor, waveColor, (wave + movingWave) * 0.3);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Initialize shaders
    function initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(
          "Unable to initialize shader program: " +
            gl.getProgramInfoLog(shaderProgram)
        );
        return null;
      }

      return shaderProgram;
    }

    function loadShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          "An error occurred compiling the shaders: " +
            gl.getShaderInfoLog(shader)
        );
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    // Initialize shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    // Collect all shader information
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "uResolution"),
        time: gl.getUniformLocation(shaderProgram, "uTime"),
        mousePos: gl.getUniformLocation(shaderProgram, "uMousePos"),
      },
    };

    // Create buffers for the quad
    function initBuffers(gl) {
      // Create vertex position buffer
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // Create a square
      const positions = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0];

      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      // Create texture coordinate buffer
      const textureCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

      const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0];

      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(textureCoordinates),
        gl.STATIC_DRAW
      );

      return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
      };
    }

    // Draw the scene
    function drawScene(gl, programInfo, buffers, time) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set up vertex position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2, // 2 components per vertex
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      // Set up texture coordinate attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
      gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        2, // 2 components per coordinate
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

      // Use our shader program
      gl.useProgram(programInfo.program);

      // Set shader uniforms
      gl.uniform2f(
        programInfo.uniformLocations.resolution,
        canvas.width,
        canvas.height
      );
      gl.uniform1f(programInfo.uniformLocations.time, time);
      gl.uniform2f(
        programInfo.uniformLocations.mousePos,
        mousePosRef.current.x,
        mousePosRef.current.y
      );

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    // Initialize buffers
    const buffers = initBuffers(gl);

    // Handle mouse movement
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current.x = (event.clientX - rect.left) / rect.width;
      mousePosRef.current.y = 1.0 - (event.clientY - rect.top) / rect.height;
    };

    // Animation loop
    function render() {
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      drawScene(gl, programInfo, buffers, currentTime);
      requestAnimationFrame(render);
    }

    // Event listeners
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    // Initial setup
    resizeCanvas();
    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(shaderProgram);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.heroCanvas} />;
}
