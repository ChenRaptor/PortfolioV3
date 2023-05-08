"use client"

import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls, Environment } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'


const vertexShader = `
precision mediump float;
//
// GLSL textureless classic 4D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 fade(vec4 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec4 P)
{
    vec4 Pi0 = floor(P); // Integer part for indexing
    vec4 Pi1 = Pi0 + 1.0; // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec4 Pf0 = fract(P); // Fractional part for interpolation
    vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 * (1.0 / 7.0);
    vec4 gy00 = floor(gx00) * (1.0 / 7.0);
    vec4 gz00 = floor(gy00) * (1.0 / 6.0);
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 * (1.0 / 7.0);
    vec4 gy01 = floor(gx01) * (1.0 / 7.0);
    vec4 gz01 = floor(gy01) * (1.0 / 6.0);
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 * (1.0 / 7.0);
    vec4 gy10 = floor(gx10) * (1.0 / 7.0);
    vec4 gz10 = floor(gy10) * (1.0 / 6.0);
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 * (1.0 / 7.0);
    vec4 gy11 = floor(gx11) * (1.0 / 7.0);
    vec4 gz11 = floor(gy11) * (1.0 / 6.0);
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
    g0000 *= norm00.x;
    g0100 *= norm00.y;
    g1000 *= norm00.z;
    g1100 *= norm00.w;

    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
    g0001 *= norm01.x;
    g0101 *= norm01.y;
    g1001 *= norm01.z;
    g1101 *= norm01.w;

    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
    g0010 *= norm10.x;
    g0110 *= norm10.y;
    g1010 *= norm10.z;
    g1110 *= norm10.w;

    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
    g0011 *= norm11.x;
    g0111 *= norm11.y;
    g1011 *= norm11.z;
    g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = fade(Pf0);
    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
}

uniform samplerCube texCube;
uniform float uTime;
uniform float time_multiplier;
uniform vec3 color_step_1;
uniform vec3 color_step_2;
uniform vec3 color_step_3;
uniform vec3 color_step_4;
uniform float ratio_step_1;
uniform float ratio_step_2;
uniform float displacement;
uniform float factorAltitudeNotColor;
uniform float factorAltitude;
varying vec3 v_position;
varying vec4 t_position;
varying float v_intensity;

uniform float octaveFrequency1;
uniform float octaveFrequency2;


vec3 get_position(vec3 position)
{
    vec3 new_position = position;

    // Set up
    float value       = 0.0;
    float speed_1     = 0.1;
    float speed_2     = 0.2;

    // First global perlin (from 0 to 1)
    float perlin_1 = (cnoise(vec4(octaveFrequency1 * position,uTime *time_multiplier * 0.6)) + 1.0) / 2.0;
    float perlin_2 = (cnoise(vec4(octaveFrequency2 * position,uTime *time_multiplier * 0.8)) + 1.0) / 2.0;

    float value_1 = clamp(perlin_1,0.4,0.5) - 0.35;
    float value_2 = perlin_2;

    value = value_1 * value_2 * factorAltitude;

    new_position += normal * value;

    return new_position;
}

float get_intensity(vec3 position,float angle)
{
    // Perlins
    float value = 0.0;

    //                            | frequency                                | speed
    float perlin_1 = (cnoise(vec4(4.0   * position,uTime * time_multiplier * 0.2)) + 1.0) / 2.0;
    float perlin_2 = (cnoise(vec4(12.0   * position,uTime * time_multiplier * 0.3)) + 1.0) / 2.0;
    float perlin_3 = (cnoise(vec4(24.0  * position,uTime * time_multiplier * 0.5)) + 1.0) / 2.0;

    float value_1 = clamp(perlin_1,0.4,0.5) - 0.20;
    float value_2 = perlin_2;
    float value_3 = perlin_3;

    // Final value
    value = value_1 * perlin_2 * 8.0 * value_3 * 0.4;
    value += clamp(angle - 1.0,0.0,1.0);

    return value;
}

void main()
{
    vec3 new_position = get_position(position);

    v_position  = new_position;
    v_intensity = get_intensity(v_position,0.0);

    t_position = projectionMatrix * modelViewMatrix * vec4(new_position,1.0);

    gl_Position = t_position;
}
`

const fragmentShader = `

precision mediump float;

uniform float uTime;
uniform float time_multiplier;
uniform vec3 color_step_1;
uniform vec3 color_step_2;
uniform vec3 color_step_3;
uniform vec3 color_step_4;
uniform float ratio_step_1;
uniform float ratio_step_2;
uniform float displacement;
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform float factorAltitude;

varying float v_angle;
varying vec3 v_position;
varying vec4 t_position;
varying float v_intensity;

vec4 mod289(vec4 x)
{
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 fade(vec4 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec4 P)
{
    vec4 Pi0 = floor(P); // Integer part for indexing
    vec4 Pi1 = Pi0 + 1.0; // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec4 Pf0 = fract(P); // Fractional part for interpolation
    vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 * (1.0 / 7.0);
    vec4 gy00 = floor(gx00) * (1.0 / 7.0);
    vec4 gz00 = floor(gy00) * (1.0 / 6.0);
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 * (1.0 / 7.0);
    vec4 gy01 = floor(gx01) * (1.0 / 7.0);
    vec4 gz01 = floor(gy01) * (1.0 / 6.0);
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 * (1.0 / 7.0);
    vec4 gy10 = floor(gx10) * (1.0 / 7.0);
    vec4 gz10 = floor(gy10) * (1.0 / 6.0);
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 * (1.0 / 7.0);
    vec4 gy11 = floor(gx11) * (1.0 / 7.0);
    vec4 gz11 = floor(gy11) * (1.0 / 6.0);
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
    g0000 *= norm00.x;
    g0100 *= norm00.y;
    g1000 *= norm00.z;
    g1100 *= norm00.w;

    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
    g0001 *= norm01.x;
    g0101 *= norm01.y;
    g1001 *= norm01.z;
    g1101 *= norm01.w;

    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
    g0010 *= norm10.x;
    g0110 *= norm10.y;
    g1010 *= norm10.z;
    g1110 *= norm10.w;

    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
    g0011 *= norm11.x;
    g0111 *= norm11.y;
    g1011 *= norm11.z;
    g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = fade(Pf0);
    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
}

vec3 get_color_from_gradient(float value)
{
    vec3 color;

    if(value < ratio_step_1)
    {
        value = smoothstep(0.0,ratio_step_1,value);
        color = mix( color_step_1, color_step_2, vec3(value,value,value));
        // color = vec3(1.0,0.0,0.0);
    }
    else if(value < ratio_step_2)
    {
        value = smoothstep(ratio_step_1,ratio_step_2,value);
        color = mix( color_step_2, color_step_3, vec3(value,value,value));
        // color = vec3(0.0,1.0,0.0);
    }
    else
    {
        value = smoothstep(ratio_step_2,1.0,value);
        color = mix( color_step_3, color_step_4, vec3(value,value,value));
        // color = vec3(0.0,0.0,1.0);
    }

    return color;
}

float get_intensity(vec3 position)
{
    vec3 new_position = position;

    // Perlins
    float value = 1.0;

    //                            | frequency                                | speed
    float perlin_4 = (cnoise(vec4(100.0 * new_position,uTime * time_multiplier * 1.0)) + 1.0) / 2.0;
    float perlin_5 = (cnoise(vec4(200.0 * new_position,uTime * time_multiplier * 1.0)) + 1.0) / 2.0;

    float value_4 = 1.0 - clamp(perlin_4,0.0,0.3) * 3.0;
    float value_5 = perlin_5;

    // Final value
    value *= value_4;
    value *= value_5;
    value *= 14.0;

    return value;
}

vec4 getColor(vec3 new_position) {

    vec3 rbg0 = vec3(11./255., 9./255., 10./255.);
    vec3 rbg1 = vec3(148./255., 136./255., 255./255.);
    vec3 rbg2 = vec3(148./255., 136./255., 255./255.);
    vec4 borneOcean1 = vec4(rbg0, 0.);
    vec4 borneOcean2 = vec4(rbg0, 0.);

    vec4 borneSea =   vec4(rbg0, 0.);

    vec4 borneBeach = vec4(rbg0, 0.);

    vec4 borne2 =     vec4(rbg1, 1.);

    vec4 borne3 =     vec4(rbg2, 1.);

    float value1;
    float value2;
    float value3;
    float value4;

    if (new_position.z < 0.07 ) {
        value1 = borneOcean2.x + (borneOcean1.x - borneOcean2.x) * (new_position.z / 0.03);
        value2 = borneOcean2.y + (borneOcean1.y - borneOcean2.y) * (new_position.z / 0.03);
        value3 = borneOcean2.z + (borneOcean1.z - borneOcean2.z) * (new_position.z / 0.03);
        value4 = borneOcean2.w + (borneOcean1.w - borneOcean2.w) * (new_position.z / 0.03);
    }
    if (new_position.z < 0.08 ) {
        value1 = borneOcean2.x + (borneSea.x - borneOcean2.x) * (new_position.z - 0.07) / 0.01;
        value2 = borneOcean2.y + (borneSea.y - borneOcean2.y) * (new_position.z - 0.07) / 0.01;
        value3 = borneOcean2.z + (borneSea.z - borneOcean2.z) * (new_position.z - 0.07) / 0.01;
        value4 = borneOcean2.w + (borneSea.w - borneOcean2.w) * (new_position.z - 0.07) / 0.01;
    }
    else if (new_position.z < 0.09 ) {
        value1 = borneSea.x + (borneBeach.x - borneSea.x) * (new_position.z - 0.08) / 0.01;
        value2 = borneSea.y + (borneBeach.y - borneSea.y) * (new_position.z - 0.08) / 0.01;
        value3 = borneSea.z + (borneBeach.z - borneSea.z) * (new_position.z - 0.08) / 0.01;
        value4 = borneSea.w + (borneBeach.w - borneSea.w) * (new_position.z - 0.08) / 0.01;
    }
    else if (new_position.z < 0.15 ) {
        value1 = borneBeach.x + (borne2.x - borneBeach.x) * (new_position.z - 0.09) / 0.06;
        value2 = borneBeach.y + (borne2.y - borneBeach.y) * (new_position.z - 0.09) / 0.06;
        value3 = borneBeach.z + (borne2.z - borneBeach.z) * (new_position.z - 0.09) / 0.06;
        value4 = borneBeach.w + (borne2.w - borneBeach.w) * (new_position.z - 0.09) / 0.06;
    }
    else {
        value1 = borne2.x + (borne3.x - borne2.x) * (new_position.z - 0.15) / 0.15;
        value2 = borne2.y + (borne3.y - borne2.y) * (new_position.z - 0.15) / 0.15;
        value3 = borne2.z + (borne3.z - borne2.z) * (new_position.z - 0.15) / 0.15;
        value4 = borne2.w + (borne3.w - borne2.w) * (new_position.z - 0.15) / 0.15;
    }

    return vec4(value1,value2,value3,value4);

}

void main()
{
    vec3 new_position = v_position;
    float new_displacement = v_intensity * 6.0 * displacement;
    gl_FragColor = vec4(getColor(new_position)) * 3.0;


}
`

export function Planet() {
    const meshRef = useRef<any>();
    const clock = new THREE.Clock;
    const animate = () => {
        meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
        requestAnimationFrame( animate );
    }

    useEffect(() => {
        animate()
    },[])

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[20, 20, 250, 250]}/>
            <shaderMaterial 
                wireframe={true}
                transparent={true}
                side= {THREE.DoubleSide}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    time_multiplier: { value: 0.4 },
                    displacement: { value: 1 },
                    factorAltitude: { value: 1.0 },
                    octaveFrequency1: { value: 0.1 },
                    octaveFrequency2: { value: 0.5 }
                }}
            />
        </mesh>
    )

}


export default function Scene3D() {
    return (
        <>
        <Canvas gl={{ logarithmicDepthBuffer: true }} shadows camera={{ position: [0, 0, 20], fov: 25 }}>
            <color attach="background" args={['#161a1d']} />
           {
            useMemo(() => <Planet/> , [])
           }
        <pointLight position={[-100, -100, -50]} intensity={1} />
        <OrbitControls autoRotate={false} autoRotateSpeed={0.5} enablePan={false} enableZoom={true} />
        {/*<Environment background preset='night' blur={1} />*/}
        </Canvas>
        </>
    )
}