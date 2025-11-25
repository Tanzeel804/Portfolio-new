// Three.js 3D Animation Initialization
let scene, camera, renderer, geometry, material, mesh;
let animationId;

document.addEventListener("DOMContentLoaded", function () {
  initializeThreeJS();
});

function initializeThreeJS() {
  const canvasContainer = document.getElementById("heroCanvas");

  if (!canvasContainer) return;

  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.clientWidth / canvasContainer.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setClearColor(0x000000, 0);
  canvasContainer.appendChild(renderer.domElement);

  // Create geometry - using a torus knot for visual interest
  geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);

  // Create material with gradient colors
  material = new THREE.MeshPhongMaterial({
    color: 0x0d6efd,
    shininess: 100,
    transparent: true,
    opacity: 0.8,
  });

  // Create mesh
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x0d6efd, 0.5);
  pointLight.position.set(-5, -5, -5);
  scene.add(pointLight);

  // Handle window resize
  window.addEventListener("resize", handleResize);

  // Start animation
  animate();

  // Add mouse interaction
  addMouseInteraction();
}

function animate() {
  animationId = requestAnimationFrame(animate);

  // Rotate mesh
  if (mesh) {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    // Pulsating scale effect
    mesh.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    mesh.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    mesh.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.1;
  }

  renderer.render(scene, camera);
}

function handleResize() {
  const canvasContainer = document.getElementById("heroCanvas");
  if (!canvasContainer || !camera || !renderer) return;

  camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
}

function addMouseInteraction() {
  const canvas = renderer.domElement;
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (event) => {
    // Calculate mouse position in normalized device coordinates
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Add interaction to animation loop
  const originalAnimate = animate;
  animate = function () {
    originalAnimate();

    if (mesh) {
      // Smoothly rotate mesh based on mouse position
      mesh.rotation.y += mouseX * 0.01;
      mesh.rotation.x += mouseY * 0.01;
    }
  };
}

// Advanced Three.js effects
const threeEffects = {
  // Change geometry
  changeGeometry: function (type) {
    if (!mesh) return;

    scene.remove(mesh);

    switch (type) {
      case "sphere":
        geometry = new THREE.SphereGeometry(1.5, 32, 32);
        break;
      case "torus":
        geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
        break;
      case "box":
        geometry = new THREE.BoxGeometry(2, 2, 2);
        break;
      case "knot":
      default:
        geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    }

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  },

  // Change material color
  changeColor: function (color) {
    if (material) {
      material.color.set(color);
    }
  },

  // Add particles
  addParticles: function () {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );

    scene.add(particlesMesh);

    // Animate particles
    function animateParticles() {
      if (particlesMesh) {
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
      }
    }

    // Add to main animation loop
    const originalAnimate = animate;
    animate = function () {
      originalAnimate();
      animateParticles();
    };
  },

  // Wireframe mode
  toggleWireframe: function () {
    if (material) {
      material.wireframe = !material.wireframe;
    }
  },
};

// Clean up Three.js resources
function cleanupThreeJS() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  if (geometry) {
    geometry.dispose();
  }

  if (material) {
    material.dispose();
  }

  if (renderer) {
    renderer.dispose();
  }

  // Remove canvas from DOM
  const canvas = document.querySelector("#heroCanvas canvas");
  if (canvas) {
    canvas.remove();
  }
}

// Reinitialize on page visibility change
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  } else {
    if (renderer && scene && camera) {
      animate();
    }
  }
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializeThreeJS,
    threeEffects,
    cleanupThreeJS,
  };
}
