import { useEffect, useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';
import { onSceneReady } from './setup-scene';

type BabylonProps = {
  setScene: (scene: Scene | null) => void;
};

function Babylon({ setScene }: BabylonProps) {
  const reactCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);
    setScene(scene); // Pass scene back to parent

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
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [setScene]);

  return (
    <canvas
      style={{
        width: '100%',
        height: '100%',
        outline: 'none',
        borderRadius: '8px',
      }}
      ref={reactCanvas}
    />
  );
}

export default Babylon;
