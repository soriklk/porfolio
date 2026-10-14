import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import * as THREE from "three";

const journeyLength = 160;
const sceneLength = 190;

function addConnection(scene, from, to, material, radius = 0.012) {
  const start = new THREE.Vector3(...from);
  const end = new THREE.Vector3(...to);
  const direction = end.clone().sub(start);
  const connection = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, direction.length(), 5),
    material,
  );
  connection.position.copy(start).add(end).multiplyScalar(0.5);
  connection.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize(),
  );
  scene.add(connection);
}

function buildScene(scene) {
  scene.fog = new THREE.FogExp2("#100d19", 0.0035);
  scene.add(new THREE.AmbientLight("#b49bd6", 1.5));

  const violet = new THREE.MeshBasicMaterial({
    color: "#a100ff",
    toneMapped: false,
  });
  const violetSoft = new THREE.MeshBasicMaterial({
    color: "#d2a0ff",
    toneMapped: false,
  });
  const lime = new THREE.MeshBasicMaterial({
    color: "#d6ff3f",
    toneMapped: false,
  });
  const frameGeometry = new THREE.TorusGeometry(2.55, 0.055, 8, 80);
  const softFrameGeometry = new THREE.TorusGeometry(2.29, 0.028, 6, 80);
  for (let chapter = 0; chapter < 6; chapter += 1) {
    const z = -10 - chapter * 28;
    const centerX = Math.sin(chapter * 1.15) * 0.58;
    const centerY = Math.cos(chapter * 0.88) * 0.62;

    const frame = new THREE.Mesh(
      frameGeometry,
      chapter % 2 === 0 ? violet : violetSoft,
    );
    frame.position.set(centerX, centerY, z);
    frame.scale.setScalar(chapter === 5 ? 1.16 : 1);
    scene.add(frame);

    const innerFrame = new THREE.Mesh(softFrameGeometry, lime);
    innerFrame.position.set(centerX, centerY, z - 0.08);
    scene.add(innerFrame);

    const centralNode = new THREE.Mesh(
      new THREE.IcosahedronGeometry(chapter === 2 ? 0.52 : 0.35, 1),
      new THREE.MeshBasicMaterial({
        color: chapter === 4 ? "#d6ff3f" : "#c87cff",
        wireframe: true,
        toneMapped: false,
      }),
    );
    centralNode.position.set(centerX, centerY, z - 1.2);
    scene.add(centralNode);

    const count = chapter === 2 ? 24 : 12;
    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2;
      const radius = 0.82 + (index % 4) * 0.18;
      const point = [
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius,
        z - 1.3 + Math.sin(angle * 3) * 0.48,
      ];
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(index % 5 === 0 ? 0.085 : 0.042, 7, 7),
        index % 6 === 0 ? lime : violetSoft,
      );
      node.position.set(...point);
      scene.add(node);

      if (index % 2 === 0) {
        const nextAngle = angle + Math.PI / 3;
        addConnection(
          scene,
          point,
          [
            centerX + Math.cos(nextAngle) * radius,
            centerY + Math.sin(nextAngle) * radius,
            z - 1.3 + Math.sin(nextAngle * 3) * 0.48,
          ],
          violet,
          0.015,
        );
      }
    }

    for (let panel = 0; panel < 4; panel += 1) {
      const side = panel % 2 === 0 ? -1 : 1;
      const height = 0.78 + ((panel + chapter) % 3) * 0.35;
      const card = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, height, 0.045),
        panel % 3 === 0 ? lime : violet,
      );
      card.position.set(
        centerX + side * (3.45 + Math.floor(panel / 2) * 0.42),
        centerY + (panel < 2 ? 0.6 : -0.72),
        z - 0.4 - (panel % 2) * 0.5,
      );
      scene.add(card);
    }
  }

  const dustPositions = new Float32Array(900 * 3);
  for (let index = 0; index < 900; index += 1) {
    dustPositions[index * 3] = (Math.random() - 0.5) * 17;
    dustPositions[index * 3 + 1] = (Math.random() - 0.5) * 11;
    dustPositions[index * 3 + 2] = -Math.random() * sceneLength;
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(dustPositions, 3),
  );
  scene.add(
    new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: "#d1b5ff",
        size: 0.045,
        transparent: true,
        opacity: 0.58,
      }),
    ),
  );

  const glow = new THREE.PointLight("#9d38ff", 34, 30, 1.6);
  glow.position.set(0, 0, -14);
  scene.add(glow);

  return () => {
    scene.traverse((object) => {
      if (!object.isMesh && !object.isPoints) return;
      object.geometry?.dispose();
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material?.dispose();
      }
    });
  };
}

export default function ScrollWorldScene({ progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    let frameId;
    let disposed = false;
    let laneOffset = 0;
    let disposeScene = () => {};
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 260);

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setClearColor("#100d19", 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
      disposeScene = buildScene(scene);
    } catch (error) {
      console.error("Unable to initialize the 3D portfolio scene.", error);
      return undefined;
    }

    const render = () => {
      frameId = undefined;
      if (disposed) return;

      const amount = THREE.MathUtils.clamp(progress.current.value, 0, 1);
      const z = THREE.MathUtils.lerp(14, 14 - journeyLength, amount);
      const x = laneOffset * amount + Math.sin(amount * Math.PI * 3) * 0.22;
      const y = Math.sin(amount * Math.PI * 2) * 0.24;
      camera.position.set(x, y, z);
      camera.lookAt(
        x + Math.sin(amount * Math.PI * 3 + 0.4) * 0.32,
        y,
        z - 15,
      );
      renderer.render(scene, camera);
    };

    const requestRender = () => {
      if (!frameId) frameId = window.requestAnimationFrame(render);
    };
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      laneOffset = width > 760 ? 0.9 : 0;
      scene.position.x = laneOffset;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestRender();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", requestRender, { passive: true });
    resize();
    render();

    return () => {
      disposed = true;
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", requestRender);
      disposeScene();
      renderer.dispose();
    };
  }, [progress]);

  return createPortal(
    <div className="portfolio-world-layer" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>,
    document.body,
  );
}
