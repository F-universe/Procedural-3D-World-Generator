Procedural 3D World Generator is a self-contained WebGL application that creates rolling landscapes
and fractal trees entirely in the browser. The only requirements are a modern browser and any static
HTTP server to serve the project folder.

The index.html file pulls in Three.js and a Perlin-style noise library from CDNs, then loads 
src/main.js as an ES module. In main.js,
a PerspectiveCamera and WebGLRenderer are created and attached to the document.
A PlaneGeometry mesh is generated with a grid of vertices; each vertex’s height is displaced by sampling 
noise.perlin(x, 0, z) and rounding to an integer, producing varied hills and valleys.

Fractal trees are produced by an L-system in src/lsystem.js. You create a new LSystem with an
axiom, substitution rules, and iteration count; its generate() method returns a string of commands.
Passing that string to interpretTurtle(scene, commands, length, angle) draws a series of small cylinder
segments (‘F’) whose orientation is controlled by quaternion rotations (‘+’, ‘−’) and by pushing/popping 
state (‘[’, ‘]’).

After terrain and trees are placed, the scene is lit with both ambient and directional lights.
A continuous render loop calls requestAnimationFrame to redraw the camera’s view on each frame.
For interactivity, you can include Three.js’s OrbitControls (or modify the camera directly) so
that left-drag orbits around the scene, scroll zooms in and out, and right-drag pans across the landscape.

To run, point any static server at the project root and open your browser to the server’s
address (for example, http://localhost:8000). The project structure is minimal:

index.html loads the libraries and entry script

src/noise.js wraps the global Noise object to expose perlin(x,y,z)

src/lsystem.js implements the string-rewriting L-system and turtle interpreter

src/main.js ties everything together: scene setup, terrain generation, tree placement, lighting, and animation

Open the page, and your procedurally generated world will appear under your cursor—ready to explore.
