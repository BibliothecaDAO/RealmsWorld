"use client";
import React, { useRef } from "react";
import useAdventurerStore, { Character } from "@/app/lib/adventurerStore";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { objects } from "@/app/lib/adventurerData";
import { Button } from "@/app/components/ui/button";

const CharacterCreation = () => {
  const ref = useRef<HTMLFormElement>(null);

  const { character, setCharacter, resetCharacter } = useAdventurerStore();
  const resetForm = () => {
    ref.current?.reset();
    resetCharacter;
  };
  return (
    <form ref={ref}>
      <div>
        {Object.keys(character).map(
          (key) =>
            character[key as keyof Character] && (
              <span key={key} className="mr-4 border rounded px-2">
                {key} : {character[key as keyof Character]}
              </span>
            )
        )}
      </div>
      {Object.keys(objects).map((object) => (
        <div key={object}>
          <h3>{object}</h3>
          <RadioGroup
            onValueChange={(e) => setCharacter(object as keyof Character, e)}
            className="flex my-4"
          >
            {objects[object as keyof typeof objects].map((race) => (
              <React.Fragment key={object + race.value}>
                <RadioGroupItem
                  className="RadioGroupItem"
                  value={race.value}
                  id={race.value}
                />
                <label className="Label" htmlFor={race.value}>
                  {race.content}
                </label>
              </React.Fragment>
            ))}
          </RadioGroup>
        </div>
      ))}

      <Button variant={"outline"} onClick={resetForm}>
        Reset
      </Button>
    </form>
  );
};

export default CharacterCreation;
