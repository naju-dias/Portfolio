/* eslint-disable react/no-unknown-property */

"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";

import {
  MeshLineGeometry,
  MeshLineMaterial,
} from "meshline";

import * as THREE from "three";

/* ────────────────────────────────────────────────────────────── */
/* ASSETS                                                        */
/* ────────────────────────────────────────────────────────────── */

const cardGLB = "/card.glb";
const lanyard = "/lanyard.png";

/*
 * Não usamos:
 *
 * useGLTF.preload(cardGLB)
 * useTexture.preload(lanyard)
 *
 * Assim o browser não começa a puxar os assets 3D
 * antes do componente realmente ser necessário.
 */

extend({
  MeshLineGeometry,
  MeshLineMaterial,
});

/* ────────────────────────────────────────────────────────────── */
/* JSX TYPES                                                     */
/* ────────────────────────────────────────────────────────────── */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}

/* ────────────────────────────────────────────────────────────── */
/* LANYARD                                                       */
/* ────────────────────────────────────────────────────────────── */

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  gravity = [0, -40, 0],
  transparent = true,
}: LanyardProps) {
  const wrapperRef =
    useRef<HTMLDivElement | null>(null);

  /*
   * Começa true porque o Lanyard só deve ser montado
   * quando estivermos no desktop/Hero.
   */
  const [isVisible, setIsVisible] =
    useState(true);

  /*
   * Pausa a física quando o Hero sai da viewport.
   *
   * Isso preserva o Canvas/estado do cartão,
   * mas impede Rapier de continuar simulando
   * enquanto o usuário está em Projects/About/etc.
   */
  useEffect(() => {
    const element =
      wrapperRef.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setIsVisible(
            entry.isIntersecting
          );
        },
        {
          threshold: 0,

          /*
           * Pequena margem para a física acordar
           * antes de o Hero voltar completamente
           * para a tela.
           */
          rootMargin: "150px 0px",
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 13],
          fov: 20,
        }}
        gl={{
          alpha: transparent,
        }}
        dpr={[1, 1.5]}
        frameloop="demand"
        onCreated={({ gl }) => {
          gl.setClearColor(
            new THREE.Color(0x000000),
            transparent ? 0 : 1
          );
        }}
      >
        {/* Luz ambiente */}
        <ambientLight
          intensity={Math.PI}
        />

        {/* Física */}
        <Physics
          paused={!isVisible}
          gravity={gravity}
          timeStep={1 / 60}
          interpolate
          updateLoop="independent"
        >
          <Band />
        </Physics>

        {/* Iluminação original */}
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[
              0,
              0,
              Math.PI / 3,
            ]}
            scale={[
              100,
              0.1,
              1,
            ]}
          />

          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[
              0,
              0,
              Math.PI / 3,
            ]}
            scale={[
              100,
              0.1,
              1,
            ]}
          />

          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[
              0,
              0,
              Math.PI / 3,
            ]}
            scale={[
              100,
              0.1,
              1,
            ]}
          />

          <Lightformer
            intensity={10}
            color="white"
            position={[
              -10,
              0,
              14,
            ]}
            rotation={[
              0,
              Math.PI / 2,
              Math.PI / 3,
            ]}
            scale={[
              100,
              10,
              1,
            ]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* BAND                                                          */
/* ────────────────────────────────────────────────────────────── */

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
}: BandProps) {
  /* ── Refs ── */

  const band =
    useRef<any>(null);

  const fixed =
    useRef<any>(null);

  const j1 =
    useRef<any>(null);

  const j2 =
    useRef<any>(null);

  const j3 =
    useRef<any>(null);

  const card =
    useRef<any>(null);

  /* ── R3F ── */

  const {
    width,
    height,
  } = useThree(
    (state) => state.size
  );

  const invalidate =
    useThree(
      (state) => state.invalidate
    );

  /* ── Vetores reaproveitados ── */

  /*
   * Antes esses Vector3 eram recriados sempre que
   * Band renderizava.
   *
   * Agora cada um existe uma única vez.
   */
  const vec = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const ang = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const rot = useMemo(
    () => new THREE.Vector3(),
    []
  );

  const dir = useMemo(
    () => new THREE.Vector3(),
    []
  );

  /* ── Props compartilhadas dos RigidBodies ── */

  /*
   * IMPORTANTE:
   *
   * "type" NÃO fica aqui.
   *
   * Cada RigidBody recebe seu próprio type
   * explicitamente abaixo.
   *
   * Isso corrige o erro de TypeScript que estava
   * aparecendo nos componentes RigidBody.
   */
  const segmentProps =
    useMemo<
      Omit<
        RigidBodyProps,
        "type"
      >
    >(
      () => ({
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4,
      }),
      []
    );

  /* ── Assets ── */

  const {
    nodes,
    materials,
  } = useGLTF(
    cardGLB
  ) as any;

  const texture =
    useTexture(lanyard);

  /* ── Curva da corda ── */

  const [curve] =
    useState(
      () =>
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ])
    );

  /* ── Interação ── */

  const [
    dragged,
    drag,
  ] = useState<
    false | THREE.Vector3
  >(false);

  const [
    hovered,
    hover,
  ] = useState(false);

  /* ──────────────────────────────────────────────────────────── */
  /* JOINTS                                                      */
  /* ──────────────────────────────────────────────────────────── */

  useRopeJoint(
    fixed,
    j1,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );

  useRopeJoint(
    j1,
    j2,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );

  useRopeJoint(
    j2,
    j3,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );

  useSphericalJoint(
    j3,
    card,
    [
      [0, 0, 0],
      [0, 1.45, 0],
    ]
  );

  /* ──────────────────────────────────────────────────────────── */
  /* CURSOR                                                      */
  /* ──────────────────────────────────────────────────────────── */

  useEffect(() => {
    if (!hovered) return;

    document.body.style.cursor =
      dragged
        ? "grabbing"
        : "grab";

    return () => {
      document.body.style.cursor =
        "auto";
    };
  }, [
    hovered,
    dragged,
  ]);

  /* ──────────────────────────────────────────────────────────── */
  /* FRAME                                                       */
  /* ──────────────────────────────────────────────────────────── */

  useFrame(
    (
      state,
      delta
    ) => {
      /*
       * Impede delta enorme caso o browser pule frames
       * ou a física tenha acabado de voltar da pausa.
       */
      const dt =
        Math.min(
          delta,
          1 / 30
        );

      /* ── Drag ── */

      if (
        dragged &&
        typeof dragged !==
          "boolean"
      ) {
        vec
          .set(
            state.pointer.x,
            state.pointer.y,
            0.5
          )
          .unproject(
            state.camera
          );

        dir
          .copy(vec)
          .sub(
            state.camera.position
          )
          .normalize();

        vec.add(
          dir.multiplyScalar(
            state.camera.position.length()
          )
        );

        /*
         * Acorda todos os corpos quando
         * o usuário começa a arrastar.
         */
        [
          card,
          j1,
          j2,
          j3,
          fixed,
        ].forEach(
          (ref) => {
            ref.current?.wakeUp();
          }
        );

        card.current?.setNextKinematicTranslation(
          {
            x:
              vec.x -
              dragged.x,

            y:
              vec.y -
              dragged.y,

            z:
              vec.z -
              dragged.z,
          }
        );
      }

      /* ── Cordão ── */

      if (
        fixed.current &&
        j1.current &&
        j2.current &&
        j3.current &&
        card.current
      ) {
        [
          j1,
          j2,
        ].forEach(
          (ref) => {
            if (
              !ref.current
                .lerped
            ) {
              ref.current.lerped =
                new THREE.Vector3().copy(
                  ref.current.translation()
                );
            }

            const distance =
              ref.current.lerped.distanceTo(
                ref.current.translation()
              );

            const clampedDistance =
              Math.max(
                0.1,
                Math.min(
                  1,
                  distance
                )
              );

            ref.current.lerped.lerp(
              ref.current.translation(),

              dt *
                (
                  minSpeed +
                  clampedDistance *
                    (
                      maxSpeed -
                      minSpeed
                    )
                )
            );
          }
        );

        curve.points[0].copy(
          j3.current.translation()
        );

        curve.points[1].copy(
          j2.current.lerped
        );

        curve.points[2].copy(
          j1.current.lerped
        );

        curve.points[3].copy(
          fixed.current.translation()
        );

        /*
         * Mantemos 32 pontos.
         *
         * Diminuir isso poderia melhorar um pouco
         * performance, mas também alteraria a
         * suavidade visual da corda.
         */
        if (
          band.current
        ) {
          band.current.geometry.setPoints(
            curve.getPoints(32)
          );
        }

        /* ── Rotação do cartão ── */

        ang.copy(
          card.current.angvel()
        );

        rot.copy(
          card.current.rotation()
        );

        card.current.setAngvel({
          x: ang.x,

          y:
            ang.y -
            rot.y * 0.25,

          z: ang.z,
        });
      }

      /* ── Render sob demanda ── */

      const stillMoving =
        Boolean(dragged) ||
        !card.current?.isSleeping?.() ||
        !j1.current?.isSleeping?.() ||
        !j2.current?.isSleeping?.() ||
        !j3.current?.isSleeping?.();

      /*
       * Só pede outro frame enquanto a física
       * realmente estiver em movimento.
       */
      if (
        stillMoving
      ) {
        invalidate();
      }
    }
  );

  /* ──────────────────────────────────────────────────────────── */
  /* TEXTURA / CURVA                                             */
  /* ──────────────────────────────────────────────────────────── */

  curve.curveType =
    "chordal";

  texture.wrapS =
    THREE.RepeatWrapping;

  texture.wrapT =
    THREE.RepeatWrapping;

  /* ──────────────────────────────────────────────────────────── */
  /* SCENE                                                       */
  /* ──────────────────────────────────────────────────────────── */

  return (
    <>
      <group
        position={[
          1.6,
          4.3,
          0,
        ]}
      >
        {/* FIXED */}

        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
        />

        {/* JOINT 1 */}

        <RigidBody
          position={[
            0.5,
            0,
            0,
          ]}
          ref={j1}
          {...segmentProps}
          type="dynamic"
        >
          <BallCollider
            args={[0.1]}
          />
        </RigidBody>

        {/* JOINT 2 */}

        <RigidBody
          position={[
            1,
            0,
            0,
          ]}
          ref={j2}
          {...segmentProps}
          type="dynamic"
        >
          <BallCollider
            args={[0.1]}
          />
        </RigidBody>

        {/* JOINT 3 */}

        <RigidBody
          position={[
            1.5,
            0,
            0,
          ]}
          ref={j3}
          {...segmentProps}
          type="dynamic"
        >
          <BallCollider
            args={[0.1]}
          />
        </RigidBody>

        {/* CARD */}

        <RigidBody
          position={[
            2,
            0,
            0,
          ]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? "kinematicPosition"
              : "dynamic"
          }
        >
          <CuboidCollider
            args={[
              0.8,
              1.125,
              0.01,
            ]}
          />

          <group
            scale={2.25}
            position={[
              0,
              -1.2,
              -0.05,
            ]}
            onPointerOver={() => {
              hover(true);
            }}
            onPointerOut={() => {
              hover(false);
            }}
            onPointerUp={(
              e: any
            ) => {
              e.target.releasePointerCapture(
                e.pointerId
              );

              drag(false);
            }}
            onPointerDown={(
              e: any
            ) => {
              e.target.setPointerCapture(
                e.pointerId
              );

              drag(
                new THREE.Vector3()
                  .copy(
                    e.point
                  )
                  .sub(
                    vec.copy(
                      card.current.translation()
                    )
                  )
              );
            }}
          >
            {/* CARD BASE */}

            <mesh
              geometry={
                nodes.card
                  .geometry
              }
              frustumCulled={
                false
              }
            >
              <meshPhysicalMaterial
                map={
                  materials.base
                    .map
                }
                map-anisotropy={
                  16
                }
                clearcoat={1}
                clearcoatRoughness={
                  0.15
                }
                roughness={
                  0.9
                }
                metalness={
                  0.8
                }
              />
            </mesh>

            {/* CLIP */}

            <mesh
              geometry={
                nodes.clip
                  .geometry
              }
              material={
                materials.metal
              }
              material-roughness={
                0.3
              }
            />

            {/* CLAMP */}

            <mesh
              geometry={
                nodes.clamp
                  .geometry
              }
              material={
                materials.metal
              }
            />
          </group>
        </RigidBody>
      </group>

      {/* LANYARD / CORDA */}

      <mesh
        ref={band}
        frustumCulled={
          false
        }
      >
        {/* @ts-ignore */}
        <meshLineGeometry />

        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[
            width,
            height,
          ]}
          useMap
          map={texture}
          repeat={[
            -4,
            1,
          ]}
          lineWidth={
            0.65
          }
        />
      </mesh>
    </>
  );
}