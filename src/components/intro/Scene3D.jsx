import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { INTRO } from '../../config/introConfig'

/**
 * Scene3D — the optional futuristic launch animation.
 * Abstract wireframe cube + orbiting particle nodes + subtle light drift,
 * resolving into a scale-up "morph" toward the Hero.
 *
 * This component is lazy-loaded and completely self-contained:
 * it can be replaced or removed without affecting the rest of the portfolio.
 */
export default function Scene3D({ accent, ink, onReady, onFinish }) {
  // Signal successful mount so the intro's load-guard stands down.
  useEffect(() => {
    onReady?.()
  }, [onReady])

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <SceneContent accent={accent} ink={ink} onFinish={onFinish} />
    </Canvas>
  )
}

function SceneContent({ accent, ink, onFinish }) {
  const cubeRef = useRef()
  const innerCubeRef = useRef()
  const particlesRef = useRef()
  const lightRef = useRef()
  const groupRef = useRef()
  const finishedRef = useRef(false)
  const clock = useRef(0)

  // Orbiting node positions on a spherical shell
  const particlePositions = useMemo(() => {
    const count = 140
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const r = 2.9 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (!cubeRef.current) return
    clock.current += delta
    const t = clock.current

    // Ambient rotation
    cubeRef.current.rotation.x += delta * 0.35
    cubeRef.current.rotation.y += delta * 0.5
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.x -= delta * 0.6
      innerCubeRef.current.rotation.y -= delta * 0.45
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.22
      particlesRef.current.rotation.z += delta * 0.08
    }

    // Subtle light movement
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 1.1) * 5
      lightRef.current.position.y = Math.cos(t * 0.8) * 4
    }

    // Fade in during the first moments
    const intro = Math.min(1, t / 0.6)
    cubeRef.current.material.opacity = 0.9 * intro

    // Timeline → morph out into the Hero
    const morphStart = INTRO.duration / 1000 - 0.65
    if (t > morphStart && groupRef.current) {
      const k = Math.min(1, (t - morphStart) / 0.65)
      const eased = 1 - Math.pow(1 - k, 3)
      groupRef.current.scale.setScalar(1 + eased * 1.8)
      groupRef.current.traverse((obj) => {
        if (obj.material) obj.material.opacity = Math.max(0, (1 - eased) * (obj.userData.baseOpacity ?? 1))
      })
      if (k >= 1 && !finishedRef.current) {
        finishedRef.current = true
        onFinish?.()
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer wireframe cube */}
      <mesh ref={cubeRef} userData={{ baseOpacity: 0.9 }}>
        <boxGeometry args={[2.6, 2.6, 2.6]} />
        <meshBasicMaterial color={ink} wireframe transparent opacity={0} />
      </mesh>

      {/* Inner counter-rotating cube — depth accent */}
      <mesh ref={innerCubeRef} userData={{ baseOpacity: 0.35 }} scale={0.55}>
        <boxGeometry args={[2.6, 2.6, 2.6]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.35} />
      </mesh>

      {/* Vertex nodes on the outer cube */}
      {CUBE_CORNERS.map((corner, i) => (
        <CubeNode key={i} position={corner} color={accent} />
      ))}

      {/* Orbiting particles */}
      <points ref={particlesRef} userData={{ baseOpacity: 0.75 }}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={ink}
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Drifting light */}
      <directionalLight ref={lightRef} position={[4, 3, 5]} intensity={1.2} />
      <ambientLight intensity={0.5} />
    </group>
  )
}

const CUBE_CORNERS = [
  [-1.3, -1.3, -1.3],
  [1.3, -1.3, -1.3],
  [-1.3, 1.3, -1.3],
  [1.3, 1.3, -1.3],
  [-1.3, -1.3, 1.3],
  [1.3, -1.3, 1.3],
  [-1.3, 1.3, 1.3],
  [1.3, 1.3, 1.3],
]

function CubeNode({ position, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 3 + position[0] * 4) * 0.25
      ref.current.scale.setScalar(s)
    }
  })
  return (
    <mesh ref={ref} position={position} userData={{ baseOpacity: 1 }}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshBasicMaterial color={accent} transparent />
    </mesh>
  )
}
