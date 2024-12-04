"use client";

import { useRive } from '@rive-app/react-canvas';

type AnimatedLogoProps = {
    size: number
}

export default function AnimatedLogo(props: AnimatedLogoProps) {
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