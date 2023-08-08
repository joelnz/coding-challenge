import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import { onSceneReady } from "./setup-scene";

function Babylon() {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, []);

  return (
    <canvas
      style={{
        width: "100%",
        height: "100%",
        outline: "none",
        borderRadius: "8px"
      }}
      ref={reactCanvas}
    />
  );
}

export default Babylon;
