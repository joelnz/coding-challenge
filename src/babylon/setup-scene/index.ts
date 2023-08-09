import {
  ArcRotateCamera,
  Color3,
  PointLight,
  Scene,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import Earth from './scene-components/Earth';
import Skybox from './scene-components/Skybox';
import Sun from './scene-components/Sun';

export const onSceneReady = (scene: Scene) => {
  // Set up canvas
  const canvas = scene.getEngine().getRenderingCanvas();
  // Set up camera
  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2,
    7,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl(canvas, true);
  camera.setTarget(Vector3.Zero());

  // Create PointLight at the position of sun
  const light = new PointLight('light', new Vector3(0, 0, 0), scene);
  light.diffuse = new Color3(1, 0.85, 0.6);
  light.intensity = 50;

  // Add scene components
  Skybox(scene);
  Sun(scene);
  Earth(scene);
};
