import { useEffect, useRef } from "react";
import {
  DirectionalLight,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Timer,
  TorusGeometry,
  Vector2,
  WebGLRenderer,
} from "three";

function HeroScene() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const host = sceneRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch (error) {
      host.dataset.scene = "fallback";
      console.error("No se pudo iniciar la escena 3D del portfolio.", error);
      return undefined;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 100);
    const timer = new Timer();
    const orbit = new Group();
    const pointer = new Vector2();
    const geometries = new Set();
    const materials = new Set();

    camera.position.set(0, 0, 9.2);
    timer.connect(document);
    scene.add(orbit);
    scene.add(new HemisphereLight(0xc9e3ff, 0x160b43, 2.1));

    const keyLight = new DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(3, 5, 6);
    scene.add(keyLight);

    const glowLight = new PointLight(0x7048ff, 30, 12);
    glowLight.position.set(-3, -1, 3);
    scene.add(glowLight);

    const addMesh = (geometry, material, parent = orbit) => {
      geometries.add(geometry);
      materials.add(material);
      const mesh = new Mesh(geometry, material);
      parent.add(mesh);
      return mesh;
    };

    const coreMaterial = new MeshPhysicalMaterial({
      color: 0x286bff,
      emissive: 0x071f72,
      emissiveIntensity: 0.9,
      metalness: 0.58,
      roughness: 0.24,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
    });
    const core = addMesh(
      new IcosahedronGeometry(1.48, 4),
      coreMaterial,
    );
    core.rotation.set(0.35, -0.5, 0.18);

    const wireMaterial = new MeshBasicMaterial({
      color: 0xb7a2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    addMesh(new IcosahedronGeometry(1.7, 2), wireMaterial);

    const rings = [
      { rotation: [0.85, 0.2, -0.3], color: 0x77b5ff },
      { rotation: [1.35, 0.9, 0.4], color: 0xbc71ff },
      { rotation: [0.3, -0.7, 1.05], color: 0x5588ff },
    ];

    rings.forEach(({ rotation, color }, index) => {
      const ringMaterial = new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: index === 1 ? 0.82 : 0.66,
      });
      const ring = addMesh(
        new TorusGeometry(index === 1 ? 2.2 : 1.98, 0.02, 8, 160),
        ringMaterial,
      );
      ring.rotation.set(...rotation);
    });

    const nodeMaterial = new MeshStandardMaterial({
      color: 0xe7eeff,
      emissive: 0x536dff,
      emissiveIntensity: 1.7,
      metalness: 0.25,
      roughness: 0.28,
    });
    const nodeGeometry = new SphereGeometry(0.055, 12, 12);
    for (let index = 0; index < 18; index += 1) {
      const angle = index * 2.39996;
      const height = 1 - (index / 17) * 2;
      const radius = Math.sqrt(1 - height * height);
      const node = addMesh(nodeGeometry, nodeMaterial);
      node.position.set(
        Math.cos(angle) * radius * 2.14,
        height * 2.14,
        Math.sin(angle) * radius * 2.14,
      );
      node.scale.setScalar(index % 5 === 0 ? 1.5 : 1);
    }

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.6),
    );
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    host.dataset.scene = "ready";

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reducedMotion) renderer.render(scene, camera);
    };

    const render = () => {
      timer.update();
      const elapsed = timer.getElapsed();
      if (!reducedMotion) {
        orbit.rotation.y += (pointer.x * 0.16 - orbit.rotation.y) * 0.018;
        orbit.rotation.x += (pointer.y * 0.1 - orbit.rotation.x) * 0.018;
        core.rotation.y += 0.0012;
        core.rotation.x += 0.0004;
        glowLight.intensity = 27 + Math.sin(elapsed * 1.1) * 5;
      }
      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        renderer.setAnimationLoop(null);
        timer.dispose();
        return;
      }
      if (reducedMotion) render();
      else renderer.setAnimationLoop(render);
    });

    const onPointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      pointer.set(
        (event.clientX - bounds.left) / bounds.width - 0.5,
        (event.clientY - bounds.top) / bounds.height - 0.5,
      );
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    observer.observe(host);
    if (!reducedMotion) host.addEventListener("pointermove", onPointerMove);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      renderer.setAnimationLoop(null);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="hero-scene" ref={sceneRef} aria-hidden="true">
      <div className="scene-fallback" />
      <div className="scene-crosshair scene-crosshair--one" />
      <div className="scene-crosshair scene-crosshair--two" />
      <span className="scene-coordinate scene-coordinate--one">40°25′ N</span>
      <span className="scene-coordinate scene-coordinate--two">SYSTEM 01 / 03</span>
    </div>
  );
}

export default HeroScene;
