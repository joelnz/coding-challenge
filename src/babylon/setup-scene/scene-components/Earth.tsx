import {
  SceneLoader,
  Vector3,
  AnimationGroup,
  Animation,
  Scene,
} from '@babylonjs/core';

const EARTH_SCALE_FACTOR = 0.0317; // Scale factor for the Earth to fit a 1x1x1 unit box

export const Earth = (scene: Scene) => {
  // Load Earth model
  SceneLoader.ImportMesh(
    '',
    'models/',
    'Earth.glb',
    scene,
    (meshes) => {
      // Create an animation group
      const animationGroup = new AnimationGroup('EarthOrbit');
      meshes.forEach((mesh) => {
        mesh.scaling = new Vector3(
          EARTH_SCALE_FACTOR,
          EARTH_SCALE_FACTOR,
          EARTH_SCALE_FACTOR,
        );
        // Create Earth's orbit animation
        const orbitAnimation = new Animation(
          'orbit',
          'position',
          60,
          Animation.ANIMATIONTYPE_VECTOR3,
          Animation.ANIMATIONLOOPMODE_CYCLE,
        );
        // Animation keys
        const keys = [];
        for (let frame = 0; frame <= 360; frame += 10) {
          const angle = frame * (Math.PI / 180);
          const x = 4 * Math.cos(angle);
          const z = 4 * Math.sin(angle);
          keys.push({ frame, value: new Vector3(x, 0, z) });
        }
        orbitAnimation.setKeys(keys);
        // Add orbit animation to the mesh and the animation group
        mesh.animations.push(orbitAnimation);
        animationGroup.addTargetedAnimation(orbitAnimation, mesh);
      });
      // Play animation group in a loop
      animationGroup.play(true);
    },
    null,
    (error) => {
      console.error('An error occurred:', error);
    },
  );
};

export default Earth
