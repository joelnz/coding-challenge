import React, { useState } from 'react';
import Babylon from './babylon';
import { GLTF2Export } from '@babylonjs/serializers/glTF';
import { Scene } from '@babylonjs/core';

import './App.css';

function App() {
  const [scene, setScene] = useState<Scene | null>(null);

  const downloadScene = () => {
    if (scene) {
      GLTF2Export.GLBAsync(scene, 'scene').then((glb) => {
        glb.downloadFiles();
      });
    }
  };

  return (
    <div className="App">
      <button className="DownloadBtn" onClick={downloadScene}>
          Download Scene as .glb<i className="material-icons">download</i>
      </button>
      <Babylon setScene={setScene}></Babylon>
      <footer>Left-click & drag to rotate / scroll to zoom / middle-click to pan</footer>
    </div>

  );
}

export default App;
