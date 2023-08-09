import {
  AnimationGroup,
  Animation,
  Color3,
  Color4,
  CubeTexture,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
  SceneLoader,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

import Earth from './scene-components/Earth'
import Skybox from './scene-components/Skybox'
import Sun from './scene-components/Sun'


export const onSceneReady = (scene: Scene) => {
  scene.clearColor = Color4.FromHexString('#ffffff');
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 7, new Vector3(0, 0, 0), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.groundColor = Color3.White();
  light.intensity = 0.7;

  Skybox(scene);
  Sun(scene);
  Earth(scene);

  
};
