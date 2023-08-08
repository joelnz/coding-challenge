import {
  Color3,
  Color4,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
  SceneLoader,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

export const onSceneReady = (scene: Scene) => {
  scene.clearColor = Color4.FromHexString("#010b19");
  const camera = new FreeCamera('camera', new Vector3(0, 0, -8), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.groundColor = Color3.White();
  light.intensity = 0.7;

  // Load Sun model
  SceneLoader.ImportMesh(
    '',
    'models/',
    'Sun.glb',
    scene,
    (meshes) => {
      meshes.forEach((mesh) => {
        mesh.position = new Vector3(0, 0, 0);
        mesh.scaling = new Vector3(2, 2, 2);
      });
    },
    null,
    (error) => {
      console.error('An error occurred:', error);
    },
  );

  SceneLoader.ImportMesh(
    '',
    'models/',
    'Earth.glb',
    scene,
    (meshes) => {
      meshes.forEach((mesh) => {
        mesh.position = new Vector3(4, 0, 0);
        mesh.scaling = new Vector3(0.02, 0.02, 0.02);
      });
    },
    null,
    (error) => {
      console.error('An error occurred:', error);
    },
  );
};
