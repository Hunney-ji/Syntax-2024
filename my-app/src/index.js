import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Scene } from "./Scene" ;
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { FollowCamera } from './followcamera';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Canvas style={{ width: '100%',height :"100vh"}}>
  <Physics
    broadphase='SAP'
    gravity={[0,-5.8,0]}>
    <Scene />

  </Physics>
  </Canvas>
);
