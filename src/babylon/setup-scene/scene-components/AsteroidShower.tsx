import {
  MeshBuilder,
  StandardMaterial,
  Scene,
  Vector3,
  Color3,
  InstancedMesh,
} from '@babylonjs/core';

// Define Asteroid type
interface Asteroid {
  mesh: InstancedMesh;
  direction: Vector3;
}

// Constants for adjustments
const ASTEROID_SIZE = 0.02;
const ASTEROID_SPEED_RANGE = 0.005;
const ASTEROID_POSITION_RANGE = 20;
const ASTEROID_START_Z = -50;

// Helper to get random number within range
const randomInRange = (range: number) => Math.random() * range - range / 2;

// Create Asteroids function
export const AsteroidShower = (scene: Scene, count: number): Asteroid[] => {
  const asteroids: Asteroid[] = [];
  const asteroidTemplate = MeshBuilder.CreateSphere(
    'asteroidTemplate',
    { diameter: ASTEROID_SIZE },
    scene,
  );
  const material = new StandardMaterial('asteroidMaterial', scene);
  material.diffuseColor = new Color3(0.5, 0.5, 0.5);
  asteroidTemplate.material = material;

  for (let i = 0; i < count; i++) {
    const mesh = asteroidTemplate.createInstance(`asteroid${i}`);
    const direction = new Vector3(
      randomInRange(ASTEROID_SPEED_RANGE),
      randomInRange(ASTEROID_SPEED_RANGE),
      randomInRange(ASTEROID_SPEED_RANGE),
    );
    mesh.position = new Vector3(
      randomInRange(ASTEROID_POSITION_RANGE),
      randomInRange(ASTEROID_POSITION_RANGE),
      randomInRange(ASTEROID_START_Z),
    );
    asteroids.push({ mesh, direction });
  }

  asteroidTemplate.setEnabled(false); // Don't render the template
  return asteroids;
};

// Update Asteroids function
export const updateAsteroidShower = (asteroids: Asteroid[]) => {
  asteroids.forEach((asteroid) => {
    asteroid.mesh.position.addInPlace(asteroid.direction);
    if (asteroid.mesh.position.z > 10) {
      asteroid.mesh.position.z = randomInRange(ASTEROID_START_Z);
    }
  });
};
