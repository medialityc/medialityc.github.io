"use client";
import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { Effects } from "@react-three/drei";

/**
 * GLNodes / NodeNetwork
 * Escena de nodos (puntos) conectados por líneas dinámicas.
 * - Los nodos se mueven suavemente con un drift pseudo aleatorio.
 * - Las conexiones se recalculan cada cierto intervalo según distancia.
 * - Bloom para resaltar brillo de los puntos.
 * Pensado para rendimiento decente con < ~400 nodos.
 */

interface NodeNetworkProps {
  /** Opcional: si quieres controlar desde fuera (ej. pausar) */
  paused?: boolean;
}

const NodeNetworkInner: React.FC<NodeNetworkProps> = ({ paused = false }) => {
  // Controles via Leva
  const {
    nodeCount,
    linkDistance,
    speed,
    driftAmplitude,
    pointSize,
    glowColor,
    glowIntensity,
    lineOpacity,
    maxLines,
    radius,
    recomputeInterval,
    bloomStrength,
    bloomThreshold,
    bloomRadius,
  } = useControls("Nodos", {
    nodeCount: { value: 160, min: 20, max: 400, step: 10 },
    linkDistance: { value: 1.8, min: 0.5, max: 4, step: 0.1 },
    speed: { value: 0.6, min: 0.05, max: 3, step: 0.05 },
    driftAmplitude: { value: 0.25, min: 0.05, max: 1.5, step: 0.05 },
    pointSize: { value: 4.0, min: 1, max: 12, step: 0.1 },
    glowColor: { value: "#5fb0ff" },
    glowIntensity: { value: 2.0, min: 0.5, max: 4, step: 0.1 },
    lineOpacity: { value: 0.35, min: 0.05, max: 1, step: 0.01 },
    maxLines: { value: 700, min: 50, max: 2000, step: 50 },
    radius: { value: 6.0, min: 2, max: 15, step: 0.5 },
    recomputeInterval: { value: 0.25, min: 0.05, max: 1, step: 0.05 },
    bloomStrength: { value: 0.6, min: 0, max: 2, step: 0.05 },
    bloomThreshold: { value: 0.2, min: 0, max: 1, step: 0.01 },
    bloomRadius: { value: 0.85, min: 0, max: 2, step: 0.05 },
  });

  // Referencias de geometría
  const pointsRef = useRef<THREE.Points>(null); // referencia al objeto Points
  const pointsGeomRef = useRef<THREE.BufferGeometry>(
    new THREE.BufferGeometry()
  ); // geometría estable
  const linesGeomRef = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry()); // geometría estable para conexiones

  // Arreglos de datos base
  const positionsRef = useRef<Float32Array>(new Float32Array(nodeCount * 3));
  const velocitiesRef = useRef<Float32Array>(new Float32Array(nodeCount * 3));

  // Si cambia nodeCount recreamos buffers
  useEffect(() => {
    positionsRef.current = new Float32Array(nodeCount * 3);
    velocitiesRef.current = new Float32Array(nodeCount * 3);
  }, [nodeCount]);

  // Inicialización de nodos y velocidades
  useEffect(() => {
    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      velocities[i3] = (Math.random() * 2 - 1) * driftAmplitude;
      velocities[i3 + 1] = (Math.random() * 2 - 1) * driftAmplitude;
      velocities[i3 + 2] = (Math.random() * 2 - 1) * driftAmplitude;
    }
    // Actualizamos atributo de geometría inicial
    pointsGeomRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positionsRef.current, 3)
    );
    pointsGeomRef.current.computeBoundingSphere();
  }, [nodeCount, driftAmplitude, radius]);

  // Helpers para líneas dinámicas
  const linePositionsRef = useRef<Float32Array>(new Float32Array(0));
  const lastRecomputeRef = useRef(0);

  // Recompute de conexiones
  const recomputeLines = (time: number) => {
    if (!linesGeomRef.current) return;
    const dtSince = time - lastRecomputeRef.current;
    if (dtSince < recomputeInterval) return;
    lastRecomputeRef.current = time;

    const maxDistSq = linkDistance * linkDistance;
    const tmp: number[] = [];
    let added = 0;

    const positions = positionsRef.current;
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < nodeCount; j++) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq <= maxDistSq) {
          tmp.push(
            positions[i3],
            positions[i3 + 1],
            positions[i3 + 2],
            positions[j3],
            positions[j3 + 1],
            positions[j3 + 2]
          );
          added++;
          if (added >= maxLines) break;
        }
      }
      if (added >= maxLines) break;
    }

    linePositionsRef.current = new Float32Array(tmp);
    const geom = linesGeomRef.current;
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositionsRef.current, 3)
    );
    geom.computeBoundingSphere();
  };

  // Animación de nodos y actualización de líneas
  useFrame((state, delta) => {
    if (paused) return;
    const t = state.clock.getElapsedTime();
    const radSq = radius * radius;
    const posAttr = pointsGeomRef.current?.getAttribute("position") as
      | THREE.BufferAttribute
      | undefined;

    const positions = positionsRef.current;
    const velocities = velocitiesRef.current;
    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      // Pequeño drift con sinusoides; se acumula con velocidad base
      positions[i3] +=
        velocities[i3] * speed * delta + Math.sin(t * 0.5 + i3) * 0.03 * delta;
      positions[i3 + 1] +=
        velocities[i3 + 1] * speed * delta +
        Math.cos(t * 0.4 + i) * 0.03 * delta;
      positions[i3 + 2] +=
        velocities[i3 + 2] * speed * delta +
        Math.sin(t * 0.6 + i * 2) * 0.02 * delta;

      // Rebote suave si sale del radio (esfera)
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      const distSq = x * x + y * y + z * z;
      if (distSq > radSq) {
        const dist = Math.sqrt(distSq);
        const nx = x / dist;
        const ny = y / dist;
        const nz = z / dist;
        // Empujar hacia adentro y invertir velocidad parcialmente
        positions[i3] = nx * radius * 0.98;
        positions[i3 + 1] = ny * radius * 0.98;
        positions[i3 + 2] = nz * radius * 0.98;
        velocities[i3] *= -0.6;
        velocities[i3 + 1] *= -0.6;
        velocities[i3 + 2] *= -0.6;
      }
    }

    if (posAttr) {
      // Reemplazar el array completo podría generar GC; actualizamos elemento a elemento si tamaños coinciden
      const arr = posAttr.array as Float32Array;
      if (arr.length === positions.length) {
        arr.set(positions);
        posAttr.needsUpdate = true;
      }
    }

    recomputeLines(t);
  });

  // Inicializar geometría de puntos una sola vez
  // Geometría ya creada vía ref; memorizamos sólo la referencia estable
  const pointsGeometry = pointsGeomRef.current;

  // Material de puntos brillante
  const pointsMaterial = useMemo(() => {
    const m = new THREE.PointsMaterial({
      size: pointSize,
      color: new THREE.Color(glowColor).multiplyScalar(glowIntensity),
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    return m;
  }, [pointSize, glowColor, glowIntensity]);

  // Material de líneas
  const lineMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(glowColor).multiplyScalar(glowIntensity * 0.5),
        transparent: true,
        opacity: lineOpacity,
        blending: THREE.NormalBlending,
        linewidth: 1, // (No todos los navegadores soportan linewidth >1)
      }),
    [glowColor, glowIntensity, lineOpacity]
  );

  return (
    <>
      <points
        ref={pointsRef}
        geometry={pointsGeometry}
        material={pointsMaterial}
      />
      <lineSegments geometry={linesGeomRef.current} material={lineMaterial} />
      <Effects disableGamma />
    </>
  );
};

// Wrapper Canvas externo para usar directamente en la app
export const GLNodes: React.FC<NodeNetworkProps> = (props) => {
  return (
    <div
      id="webgl-nodes"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // detrás del contenido
        pointerEvents: "none", // no bloquear interacciones de UI
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: false }}
      >
        <color attach="background" args={["#000000"]} />
        <NodeNetworkInner {...props} />
      </Canvas>
    </div>
  );
};

export default GLNodes;
