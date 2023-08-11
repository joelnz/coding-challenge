export const solarSystemData = {
  name: 'Sun',
  modelFile: 'Sun.glb',
  unitSize: 2,
  orbitDistance: 0,
  yearsToOrbitParent: 0,
  children: [
    {
      name: 'Mercury',
      unitSize: 0.16,
      orbitDistance: 1.2,
      yearsToOrbitParent: 0.24,
    },
    {
      name: 'Venus',
      unitSize: 0.4,
      orbitDistance: 2.2,
      yearsToOrbitParent: 0.62,
    },
    {
      name: 'Earth',
      modelFile: 'Earth.glb',
      unitSize: 1,
      orbitDistance: 3,
      yearsToOrbitParent: 1,
      children: [
        {
          name: 'Moon',
          unitSize: 0.12,
          orbitDistance: 0.7,
          yearsToOrbitParent: 0.07,
        },
      ],
    },
    {
      name: 'Mars',
      unitSize: 0.5,
      orbitDistance: 4,
      yearsToOrbitParent: 1.88,
      children: [
        {
          name: 'Phobos',
          unitSize: 0.02,
          orbitDistance: 0.06,
          yearsToOrbitParent: 0.32,
        },
        {
          name: 'Deimos',
          unitSize: 0.01,
          orbitDistance: 0.12,
          yearsToOrbitParent: 1.26,
        },
      ],
    },
    {
      name: 'Jupiter',
      unitSize: 1.5,
      orbitDistance: 6,
      yearsToOrbitParent: 11.86,
      children: [
        // Major Galilean moons
        {
          name: 'Io',
          unitSize: 0.18,
          orbitDistance: 0.28,
          yearsToOrbitParent: 1.77,
        },
        {
          name: 'Europa',
          unitSize: 0.16,
          orbitDistance: 0.36,
          yearsToOrbitParent: 3.55,
        },
        {
          name: 'Ganymede',
          unitSize: 0.2,
          orbitDistance: 0.5,
          yearsToOrbitParent: 7.15,
        },
        {
          name: 'Callisto',
          unitSize: 0.18,
          orbitDistance: 0.82,
          yearsToOrbitParent: 16.7,
        },
      ],
    },
    {
      name: 'Saturn',
      unitSize: 1.2,
      orbitDistance: 8,
      yearsToOrbitParent: 29.46,
      children: [
        // Major moons
        {
          name: 'Titan',
          unitSize: 0.16,
          orbitDistance: 1.2,
          yearsToOrbitParent: 15.95,
        },
        {
          name: 'Rhea',
          unitSize: 0.08,
          orbitDistance: 0.5,
          yearsToOrbitParent: 4.52,
        },
        // Other moons can be added
      ],
    },
    {
      name: 'Uranus',
      unitSize: 0.8,
      orbitDistance: 10,
      yearsToOrbitParent: 84.01,
      children: [
        {
          name: 'Titania',
          unitSize: 0.08,
          orbitDistance: 0.43,
          yearsToOrbitParent: 8.7,
        },
        {
          name: 'Oberon',
          unitSize: 0.07,
          orbitDistance: 0.58,
          yearsToOrbitParent: 13.46,
        },
      ],
    },
    {
      name: 'Neptune',
      unitSize: 0.77,
      orbitDistance: 12,
      yearsToOrbitParent: 164.8,
      children: [
        {
          name: 'Triton',
          unitSize: 0.11,
          orbitDistance: 0.35,
          yearsToOrbitParent: 5.88,
        },
      ],
    },
  ],
};
