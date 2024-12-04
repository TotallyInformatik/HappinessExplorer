"use client";

import { useRive } from '@rive-app/react-canvas';

type AnimatedGlobeProps = {
    size: number
}

export default function AnimatedGlobe(props: AnimatedGlobeProps) {
    const { RiveComponent } = useRive({
        src: "/animations/animation_mainpage.riv",
        stateMachines: "Main",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
    });

    return (
        <RiveComponent style={{ maxWidth: `${props.size}px` }} />
    );
}