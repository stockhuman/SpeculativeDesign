import React, { useCallback } from 'react'

import {
	Vector3,
	LatheGeometry,
	MeshPhongMaterial,
	Mesh,
	Matrix4,
	CatmullRomCurve3,
	ExtrudeGeometry,
	IcosahedronGeometry,
	CubeGeometry,
	CylinderGeometry,
	TorusGeometry,
	Shape,
	Object3D,
	DoubleSide
} from 'three'

export default function Sculpture({ seed = 'default' }) {

	// const fn = useCallback(() => {
	// 	return Nexus()
	// }, []);

	return (
		<mesh
			position={[0, 1, 0]}
			geometry={Spring(Math.random(), Math.random() * 2, 11)}
		>
			<meshPhongMaterial flatShading={false} shininess={1} color='blue' attach="material" side={DoubleSide} castShadows={true} flatShading={false} />
		</mesh>
	)
}

// Useful inspiration
// http://www.smartjava.org/ltjs3/src/chapter-10/22-canvas-texture.html
// https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations
// https://machines.chromeexperiments.com/

//	Each component is a thing like a turbine or
//	a screw or wire. These generally have a start
//	position and some properties that can be assigned.
//	Some components will include other components.

//	makes a circle three.js shape
function makeCircleShape(radius, segments) {
	var s = new Shape();
	var p = segments;
	var d = 360 / p;
	var r = radius;

	s.moveTo(r, 0);
	for (var a = d; a < 360; a += d) {
		var ang = a * 0.0174532925;
		var x = Math.cos(ang) * r;
		var y = Math.sin(ang) * r;
		s.lineTo(x, y);
	}
	return s;
}


function Cannister(radius, height, capHeight, detail) {
	let _height = height ? height : 20;
	let _capHeight = capHeight ? capHeight : 10;
	let _radius = radius ? radius : 10;
	let _detail = detail ? detail : 16;

	let points = [];
	points.push(new Vector3(0.00001, 0, -_capHeight));
	points.push(new Vector3(_radius * 0.4, 0, - _capHeight * 0.9));
	points.push(new Vector3(_radius * 0.7, 0, - _capHeight * 0.7));
	points.push(new Vector3(_radius * 0.9, 0, - _capHeight * 0.3));
	points.push(new Vector3(_radius, 0, 0));
	points.push(new Vector3(_radius, 0, _height));
	points.push(new Vector3(_radius * 0.9, 0, _height + _capHeight * 0.3));
	points.push(new Vector3(_radius * 0.7, 0, _height + _capHeight * 0.7));
	points.push(new Vector3(_radius * 0.4, 0, _height + _capHeight * 0.9));
	points.push(new Vector3(0, 0, _height + _capHeight));

	let geo = new LatheGeometry(points, _detail, Math.PI * 2);
	geo.computeVertexNormals();
	geo.computeFaceNormals();
	let mat = new MeshPhongMaterial({ color: componentColor['cannister'], shininess: shininess['cannister'], specular: specular['cannister'], metal: true, ambient: ambientColor, wireframe: false, shading: FlatShading });
	let mesh = new Mesh(geo, mat);

	mesh.generatedPath = points;

	attachLabel(mesh, "A", 1.0);

	return mesh;
}


function Ribbon(path, shape, steps) {
	let _steps = steps ? steps : 32;
	let splineCurve = new CatmullRomCurve3(path);
	let extrudeSettings = {
		bevelEnabled: false,
		steps: _steps,
		extrudePath: splineCurve,
	}
	let geometry = new ExtrudeGeometry([shape], extrudeSettings);

	return geometry;
}

function Nexus(radius = 1) {
	return new IcosahedronGeometry(radius, 1)
}

function Pin(size) {

	let geo = new CubeGeometry(1 * size, 1 * size, 3 * size, 1, 1, 1);
	let mat = new MeshPhongMaterial({ color: componentColor['pin'], shininess: shininess['pin'], ambient: ambientColor, specular: specular['pin'], shading: FlatShading });
	let mesh = new Mesh(geo, mat);

	let capGeo = new CylinderGeometry(2 * size, 2 * size, size, 6, 1, false);
	let capMesh = new Mesh(capGeo, mat);
	capMesh.rotation.x = Math.PI / 2;
	capMesh.position.z = -size;
	mesh.add(capMesh);

	return mesh;
}

function Armature(size, length, detail) {

	let geo = new CylinderGeometry(size * 6, size * 6, length, detail, 1, false);
	let material = new MeshPhongMaterial({ color: componentColor['armature'], shininess: shininess['armature'], ambient: ambientColor, specular: specular['armature'], shading: FlatShading });
	let mesh = new Mesh(geo, material);
	mesh.rotation.x = Math.PI / 2;
	mesh.position.z += length / 2;
	return mesh;
}

function GasCan(size) {
	let container = new Object3D();

	let _size = size ? size : 1;
	let can = new Cannister(_size * 2, _size * 6, _size, 8);
	can.position.z += _size * 2;
	container.add(can);

	let connectorGeo = new CylinderGeometry(_size, _size, _size * 2, 8, 1, false);
	let connectorMesh = new Mesh(connectorGeo, can.material);
	connectorMesh.material = can.material;
	connectorMesh.rotation.x += Math.PI / 2;
	connectorMesh.position.z += _size;
	container.add(connectorMesh);

	let ring = new SecureRing(size * 0.5);
	ring.material = can.material;
	ring.position.z += _size * 0.7;
	container.add(ring);
	return container;
}

function SecureRing(size, thicknessRatio, detail) {
	let _size = size ? size : 1;
	let _thicknessRatio = thicknessRatio ? thicknessRatio : _size;
	let _detail = detail ? detail : 8;
	let ringGeo = new TorusGeometry(_size, _size * _thicknessRatio, 6, _detail, Math.PI * 2);
	let material = new MeshPhongMaterial({ color: componentColor['securering'], shininess: shininess['securering'], ambient: ambientColor, specular: specular['securering'], shading: FlatShading });
	let ringMesh = new Mesh(ringGeo, material);

	let pinCount = Math.floor(detail * 0.25);

	for (let i = 0; i < pinCount; i++) {
		let ang = i / pinCount * Math.PI * 2;
		let xs = Math.cos(ang) * _size * 1.0;
		let ys = Math.sin(ang) * _size * 1.0;
		let pin = new Pin(_size * 0.08);
		pin.position.x = xs;
		pin.position.y = ys;
		pin.position.z = - Math.pow(_size, 2) * 0.015;
		pin.start = pin.position.z * 10;
		pin.end = pin.position.z;
		pin.update = function (percentage) {
			this.position.z = this.start + (this.end - this.start) * percentage;
			this.rotation.z = Math.PI * 6 * percentage;
		};
		// pin.lookAt(new Vector3(0,0,pin.position.z));
		ringMesh.add(pin);
	}

	SceneUtils.traverseHierarchy(ringMesh, getSetMaterial(material));

	attachLabel(ringMesh, "G", 1.0);
	return ringMesh;
}

function GasArray(size, count, spacing) {
	let _size = size ? size : 1;
	let _count = count ? count : 4;
	let _spacing = spacing ? spacing : 6;

	let container = new Object3D();

	for (let i = 0; i < _count; i++) {
		let can = new GasCan(_size);
		can.position.z = i * _spacing * _size;
		can.rotation.y = Math.PI / 2;
		can.update = function (percentage) {
			this.position.x = (1 - percentage) * 20;
			this.rotation.z = Math.PI * (1 - percentage);
		};
		container.add(can);
	}

	// SceneUtils.traverseHierarchy( container, getSetMaterial(material) );

	return container;
}

function Wheel(size = 1, innerRatio = 0.6, spokes = 3, detail = 30) {
	let _spokes = spokes ? (spokes + 1) : 3
	let points = []

	let radOut = size
	let radIn = size * 0.85
	let radCore = innerRatio * size
	let len = 0
	let lenSpace = size * 0.1

	points.push(new Vector3(radCore, 0, len))

	for (let i = 0; i < _spokes; i++) {
		points.push(new Vector3(radOut, 0, len))
		points.push(new Vector3(radOut, 0, len += lenSpace))
		points.push(new Vector3(radIn, 0, len))
		points.push(new Vector3(radIn, 0, len += lenSpace))
	}

	points.push(new Vector3(radOut, 0, len))
	points.push(new Vector3(radOut, 0, len += lenSpace))

	points.push(new Vector3(radCore, 0, len))
	points.push(new Vector3(radCore, 0, 0))

	return new LatheGeometry(points, detail, Math.PI * 2)
}

function Spring(size, height, iterations) {
	let _size = size ? size : 1;
	let _height = height ? height : 1;
	let path = [];
	let len = 0;
	let radius = _size;
	let _iterations = iterations ? iterations : 6;
	let detail = 8;
	let lenSpace = _height / _iterations / detail;
	for (let t = 0; t < _iterations; t++) {
		for (let i = 0; i < detail; i++) {
			let ang = i / detail * Math.PI * 2;
			let x = Math.cos(ang) * radius;
			let y = Math.sin(ang) * radius;
			let z = len;
			len += lenSpace;
			path.push(new Vector3(x, y, z));
		}
	}
	let shape = makeCircleShape(1, 4);
	let ribbon = new Ribbon(path, shape, _iterations * (detail * detail) * 0.5);
	return ribbon;
}

function Turbine(size, height, shellCount, margin) {

	let _size = size ? size : 1;
	if (_size < 1)
		_size = 1;

	let _height = height ? height : 10

	let _shellCount = shellCount ? shellCount : 12;

	let waistCount = 5;

	let _margin = margin ? margin : 20;

	let points = [];
	let spacing = _height / waistCount;
	let geoWide = _size;


	let zpos = 0;
	let w = _size;
	let u = 0;
	for (let i = 0; i < waistCount; i++) {
		zpos -= spacing;
		points.push(new Vector3(w, u, zpos));
		w -= Math.random() * _size * .4;
		u += spacing * 0.2;
	}

	//	make the material and the geometry
	let mat = new MeshPhongMaterial({ color: componentColor['turbine'], shininess: shininess['turbine'], ambient: ambientColor, specular: specular['turbine'], wireframe: false, shading: SmoothShading });

	let sliceAngle = Math.PI / 6 + Math.PI / 10 * Math.random();

	let smoothing = 3 + Math.floor(Math.random() * 2)
	let geo = new LatheGeometry(points, smoothing, sliceAngle);

	let matrix = new Matrix4();
	matrix.rotateX(Math.random() * Math.PI * 2 * 0.1);
	geo.applyMatrix(matrix);
	geo.autoSmoothFaceNormals(0.0);

	this.containingMesh = new Object3D();

	//	generate a bunch of them in a ring
	let dupeCount = _shellCount;
	for (let i = 0; i < dupeCount; i++) {
		let g = GeometryUtils.clone(geo);
		let m = new Mesh(g, mat);
		m.doubleSided = true;
		m.castShadow = true;
		m.receiveShadow = true;

		let ang = (i) / dupeCount * Math.PI * 2;
		m.position.x = Math.cos(ang) * _margin;
		m.position.y = Math.sin(ang) * _margin;

		m.start = _margin;
		m.end = 0;
		m.ang = ang;
		m.update = function (percentage) {

			let rad = this.start + (this.end - this.start) * percentage;
			let ang = this.ang;
			this.position.x = Math.cos(ang) * rad;
			this.position.y = Math.sin(ang) * rad;
		};

		m.rotation.z = ang;
		this.containingMesh.add(m);
		m.margin = _margin;
	}

	this.containingMesh.generatedPath = points;

	attachLabel(this.containingMesh, "I", 1.0);
	return this.containingMesh;
}

function ArmFan(size, count) {
	let _size = size ? size : 1;
	let _count = count ? count : 16;
	let arms = new Object3D();
	for (let i = 0; i < _count; i++) {

		let arm = new Armature(.2, _size, 4);
		arm.rotation.x = Math.PI + Math.random() * 0.1;
		arm.start = _size * 2;
		arm.end = _size * 0.75;;

		arm.update = function (percentage) {
			this.position.y = this.start + (this.end - this.start) * percentage;
		};

		let armContainer = new Object3D();
		armContainer.add(arm);

		let ang = i / _count * Math.PI * 2;
		armContainer.rotation.z = ang;
		arms.add(armContainer);
	}

	attachLabel(arms, "J", 1.0);
	return arms;
}
