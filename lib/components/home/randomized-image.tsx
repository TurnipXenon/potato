import Image, {StaticImageData} from "next/image";
import React from "react";

export interface RandomizedImageProps {
    src: StaticImageData;
}

export const RandomizedImage = (props: RandomizedImageProps) => {
    const paddingLeft = 1 + Math.random()*5;
    const paddingRight = 1 + Math.random()*5;
    const paddingTop = 1 + Math.random()*7;
    // const paddingBottom = 1 + Math.random()*5;
    const rotateRandom = Math.random()*90  - 45;

    return <div style={{
        paddingTop: `${paddingTop}em`,
        paddingLeft: `${paddingLeft}em`,
        paddingRight: `${paddingRight}em`
    }}>
        <Image src={props.src} alt="background image"
               placeholder="blur" width={75}
                style={{transform: `rotate(${rotateRandom}deg)`}}/>
    </div>;
};
