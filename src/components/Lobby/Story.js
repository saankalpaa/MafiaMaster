import React from "react";
import { Positions, Sizes, TextToSpeech } from "tts-react";

export const Story = () => {
  return (
    <TextToSpeech
      markTextAsSpoken
      align="vertical"
      size={Sizes.SMALL}
      position={Positions.TL}
      rate={0.8}
    >
      <p>
        Welcome, campers! I'm your AI Game Master, here to guide you through an
        unforgettable game of Mafia. You and your friends have decided to spend
        a weekend camping in the mysterious Whispering Woods. But beware! Among
        you lurks a secret group of Mafia members, ready to strike in the dead
        of night. Let's see if you can catch them before it's too late. Ready?
        Let's begin
      </p>
    </TextToSpeech>
  );
};
