"use client";
import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  Environment,
  useGLTF,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";

function Model({
  children,
  scale = 1,
  screenWidth = 480,
  screenHeight = 300,
  viewportWidth = 1280,
  viewportHeight = 800,
  ...props
}) {
  const group = useRef();
  // Cargar modelo GLTF
  const { nodes, materials } = useGLTF("/mac-draco.glb");
  // Animación de flotación ligera
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.cos(t / 2) / 20 + 0.25,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 4) / 20,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 8) / 20,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      (-2 + Math.sin(t / 2)) / 2,
      0.1
    );
  });
  // Escala para que el contenido grande (viewport) quepa en la pantalla pequeña del modelo
  const scaleFactor = Math.min(
    screenWidth / viewportWidth,
    screenHeight / viewportHeight
  );

  return (
    <group ref={group} {...props} scale={scale} dispose={null}>
      <group rotation-x={-0.425} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh geometry={nodes["Cube008_2"].geometry}>
            <Html
              className="content"
              rotation-x={-Math.PI / 2}
              position={[0, 0.05, -0.09]}
              transform
              occlude
            >
              <div
                className="wrapper relative overflow-hidden rounded-md bg-black/80 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                style={{ width: screenWidth, height: screenHeight }}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div
                  className="inner relative"
                  style={{
                    width: viewportWidth,
                    height: viewportHeight,
                    transform: `scale(${scaleFactor})`,
                    transformOrigin: "top left",
                  }}
                >
                  {children || (
                    <div className="flex h-full items-center justify-center text-xs opacity-60">
                      Placeholder pantalla
                    </div>
                  )}
                </div>
              </div>
            </Html>
          </mesh>
        </group>
      </group>
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

// Precargar el modelo para mejorar performance
useGLTF.preload("/mac-draco.glb");

export default function LaptopComponente({
  children,
  scale = 1.15,
  screenWidth = 560,
  screenHeight = 360,
  viewportWidth = 1280,
  viewportHeight = 800,
}) {
  return (
    <Canvas
      camera={{ position: [-5, 0, -15], fov: 55 }}
      dpr={[1, 1.5]}
      style={{ overflow: "visible" }}
    >
      <pointLight position={[10, 10, 10]} intensity={1.4} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
          <Model
            scale={scale}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            viewportWidth={viewportWidth}
            viewportHeight={viewportHeight}
          >
            {children}
          </Model>
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={22} blur={2.2} far={4.5} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.15}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}

export { Model };
