import { Vector3, SceneLoader, Scene } from '@babylonjs/core';

const SUN_SCALE_FACTOR = 1.41; // Scale factor for the Sun to fit a 2x2x2 unit box

export const Sun = (scene: Scene) => {
  // Load Sun model
  SceneLoader.ImportMesh(
    '',
    'models/',
    'Sun.glb',
    scene,
    (meshes) => {
      meshes.forEach((mesh) => {
        mesh.position = new Vector3(0, 0, 0);
        mesh.scaling = new Vector3(
          SUN_SCALE_FACTOR,
          SUN_SCALE_FACTOR,
          SUN_SCALE_FACTOR,
        );
      });
    },
    null,
    (error) => {
      console.error('An error occurred:', error);
    },
  );
};

export default Sun;
