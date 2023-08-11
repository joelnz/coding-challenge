import { Color3 } from '@babylonjs/core';

const constants = {
  // Camera Constants
  CAMERA_STARTING_ANGLE: -Math.PI / 2, // Initial angle of the camera in the scene
  CAMERA_STARTING_RADIUS: 10, // Initial distance from the target of the camera
  CAMERA_LOWER_RADIUS_LIMIT: 3, // Minimum distance from the target the camera can be
  CAMERA_UPPER_RADIUS_LIMIT: 50, // Maximum distance from the target the camera can be

  // Light Constants
  LIGHT_INTENSITY: 100, // Intensity of the light source in the scene
  LIGHT_COLOR: new Color3(1, 0.85, 0.6), // Color of the light source in the scene

  // Asteroid Constants
  ASTEROID_COUNT: 1000, // Number of asteroids in the asteroid shower

  // Camera Orbit Constants
  CAMERA_ORBIT_SPEED: 0.00015, // Speed at which the camera orbits around the target

  // Celestial Object Constants
  ANIMATION_SAMPLING_RATE: 60, // Number of times per second the animation value is calculated
  START_FRAME: 0, // Starting frame for the animation
  END_FRAME: 1000, // Ending frame for the animation
  FULL_CIRCLE_RADIANS: 2 * Math.PI, // 360 degrees in radians, for full circular motion calculations
};

export default constants;
