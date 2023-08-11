import {
  Vector3,
  SceneLoader,
  Animation,
  Scene,
  Mesh,
  StandardMaterial,
  Color3,
} from '@babylonjs/core';

import '@babylonjs/loaders/glTF';
import constants from '../constants/constants';

// Function to animate orbit
const animateOrbit = (
  pivot: Mesh,
  yearsToOrbitParent: number,
  scene: Scene,
) => {
  const animationSpeed = 1 / yearsToOrbitParent; // Invert the relationship
  const animation = new Animation(
    'orbit',
    'rotation.y',
    constants.ANIMATION_SAMPLING_RATE,
    Animation.ANIMATIONTYPE_FLOAT,
    Animation.ANIMATIONLOOPMODE_CYCLE,
  );
  // Define the keys for the animation to represent one complete 360-degree orbit
  const keys = [
    { frame: constants.START_FRAME, value: 0 },
    { frame: constants.END_FRAME, value: constants.FULL_CIRCLE_RADIANS },
  ];
  animation.setKeys(keys);
  pivot.animations.push(animation);
  scene.beginAnimation(
    pivot,
    constants.START_FRAME,
    constants.END_FRAME,
    true,
    animationSpeed,
  );
};

// Function to normalize scaling of imported meshes to 1x1x1
const normalizeScaling = (meshes: Mesh[], unitSize: number, mesh: Mesh) => {
  let min = new Vector3(
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  );
  let max = new Vector3(
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  );

  meshes.forEach((m) => {
    m.parent = mesh;
    const boundingInfo = m.getBoundingInfo();
    min = Vector3.Minimize(min, boundingInfo.minimum);
    max = Vector3.Maximize(max, boundingInfo.maximum);
  });

  const maxExtent = Math.max(max.x - min.x, max.y - min.y, max.z - min.z);

  // Normalize the scale of imported model to 1x1x1 Babylon units
  const normalizedScale = 1 / maxExtent;
  const finalScale = normalizedScale * unitSize;

  meshes.forEach((m) => {
    m.scaling = new Vector3(finalScale, finalScale, finalScale);
  });
};

// Function to create a celestial object
export const createCelestialObject = (
  scene: Scene,
  name: string,
  modelFile: string | undefined,
  unitSize: number,
  orbitDistance: number,
  yearsToOrbitParent: number,
  parentMesh?: Mesh,
): Mesh => {
  // Create pivot and parent mesh if provided
  const pivot = new Mesh(name + '_pivot', scene);
  if (parentMesh) {
    pivot.parent = parentMesh;
  }

  // Create main mesh for the celestial object
  const mesh = new Mesh(name, scene);
  mesh.parent = pivot;
  mesh.position = new Vector3(orbitDistance, 0, 0);

  let mainMesh: Mesh | null = null; // Temporary variable for the main mesh

  if (modelFile) {
    // Load model from file and normalize scale to 1x1x1 Babylon units
    SceneLoader.ImportMesh(
      '',
      'models/',
      modelFile,
      scene,
      (importedMeshes) => {
        mainMesh = mesh; // Assign the main mesh to the temporary variable
        // Cast each element to Mesh before passing to the normalizeScaling function
        const meshes = importedMeshes.map((m) => m as Mesh);
        normalizeScaling(meshes, unitSize, mainMesh);
      },
    );
  } else {
    // If no model file is provided, create a sphere
    const sphere = Mesh.CreateSphere(name + '_sphere', 16, unitSize, scene);
    sphere.parent = mesh;
    sphere.position = Vector3.Zero();

    // Create and assign material for the sphere
    const material = new StandardMaterial(name + '_material', scene);
    material.diffuseColor = new Color3(0.01, 0.01, 0.01); // Darker diffuse grey color
    material.specularColor = new Color3(0, 0, 0); // No specular reflection
    material.specularPower = 0; // Disabling specular highlight
    sphere.material = material;
  }

  // Animate orbit if orbit speed is greater than 0
  if (yearsToOrbitParent > 0) {
    animateOrbit(pivot, yearsToOrbitParent, scene);
  }
  return mesh;
};
