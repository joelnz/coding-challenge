import {
  MeshBuilder,
  StandardMaterial,
  CubeTexture,
  Color3,
  Texture,
  Scene,
} from '@babylonjs/core';

export const Skybox = (scene: Scene) => {
  // Load Skybox
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
};

export default Skybox