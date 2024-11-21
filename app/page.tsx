import dynamic from 'next/dynamic';
import React, { createContext } from 'react'; // This is the standard import


const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return <>
    <h1>World Happiness Explorer</h1>
    <Map />
  </>;
}
