import {
  AnimationGroup,
  Animation,
  Color3,
  Color4,
  CubeTexture,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
  SceneLoader,
} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

const SUN_SCALE_FACTOR = 1.41; // Scale factor for the Sun to fit a 2x2x2 unit box
const EARTH_SCALE_FACTOR = 0.0317; // Scale factor for the Earth to fit a 1x1x1 unit box

export const onSceneReady = (scene: Scene) => {
  scene.clearColor = Color4.FromHexString('#ffffff');
  const camera = new FreeCamera('camera', new Vector3(0, 0, -7), scene);
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.groundColor = Color3.White();
  light.intensity = 0.7;

  // Skybox
  const skyboxTexturePath = 'textures/';
  const skyboxTextureExtension = '.jpg';
  const skybox = MeshBuilder.CreateBox('skyBox', { size: 1000.0 }, scene);
  const skyboxMaterial = new StandardMaterial('skyBox', scene);
  skyboxMaterial.reflectionTexture = new CubeTexture(
    skyboxTexturePath,
    scene,
    [
      'px' + skyboxTextureExtension,
      'py' + skyboxTextureExtension,
      'pz' + skyboxTextureExtension,
      'nx' + skyboxTextureExtension,
      'ny' + skyboxTextureExtension,
      'nz' + skyboxTextureExtension,
    ],
  );
  skyboxMaterial.reflectionTexture.level = 0.3;
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

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
