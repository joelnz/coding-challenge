import {
  ArcRotateCamera,
  Color4,
  PointLight,
  Scene,
  Vector3,
  Mesh,
} from '@babylonjs/core';

import {
  AsteroidShower,
  updateAsteroidShower,
} from './scene-components/AsteroidShower';
import Skybox from './scene-components/Skybox';
import { createCelestialObject } from './scene-components/CelestialObject';

import { solarSystemData } from './scene-data/SolarSystemData';
import constants from './constants/constants';

interface CelestialObjectData {
  name: string;
  modelFile?: string; // Optional if some objects don't have a model file
  unitSize: number;
  orbitDistance: number;
  yearsToOrbitParent: number;
  children?: CelestialObjectData[]; // Optional if some objects don't have children
}

const createSolarSystem = (
  data: CelestialObjectData,
  scene: Scene,
  parentMesh?: Mesh,
) => {
  /* Recursively creates a solar system by rendering celestial objects and their children.
   * Takes in data representing the properties of celestial objects such as name, model file, size, and orbit details.
   * It utilizes recursion to handle celestial objects that have child objects, like planets with moons.
   */
  const celestialObject = createCelestialObject(
    scene,
    data.name,
    data.modelFile,
    data.unitSize,
    data.orbitDistance,
    data.yearsToOrbitParent,
    parentMesh,
  );
  if (data.children) {
    data.children.forEach((child: any) =>
      createSolarSystem(child, scene, celestialObject),
    );
  }
};

export const onSceneReady = (scene: Scene) => {
  scene.clearColor = new Color4(0, 0, 0, 1);
  const canvas = scene.getEngine().getRenderingCanvas(); // Set up canvas
  const camera = new ArcRotateCamera( // Set up camera
    'camera',
    constants.CAMERA_STARTING_ANGLE,
    Math.PI / 2,
    constants.CAMERA_STARTING_RADIUS,
    new Vector3(0, 0, 0),
    scene,
  );
  camera.attachControl(canvas, true);
  camera.setTarget(Vector3.Zero());
  camera.lowerRadiusLimit = constants.CAMERA_LOWER_RADIUS_LIMIT;
  camera.upperRadiusLimit = constants.CAMERA_UPPER_RADIUS_LIMIT;
  // Create PointLight at the position of sun
  const light = new PointLight('light', new Vector3(0, 0, 0), scene);
  light.diffuse = constants.LIGHT_COLOR;
  light.intensity = constants.LIGHT_INTENSITY;
  Skybox(scene);
  const asteroids = AsteroidShower(scene, 1000); // Add 1000 asteroids
  createSolarSystem(solarSystemData, scene);

  scene.registerBeforeRender(() => {
    // Slowly orbit camera
    const CameraOrbitSpeed = 0.00015;
    camera.alpha += CameraOrbitSpeed;
    updateAsteroidShower(asteroids);
  });
};
