"use client";


import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const Map = () => {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  return (
    <ComposableMap className='w-max'>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography 
              key={geo.rsmKey} 
              geography={geo} 
              onClick={() => {
                console.log(geo.properties.name);
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default Map;