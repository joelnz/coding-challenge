import {
  Color3,
  Color4,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "@babylonjs/core";

export const onSceneReady = (scene: Scene) => {
  scene.clearColor = Color4.FromHexString("#010b19");
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.groundColor = Color3.White();
  light.intensity = 0.7;

  //TODO: delete this once you import your models
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
};
