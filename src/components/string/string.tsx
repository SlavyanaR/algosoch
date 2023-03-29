import React, { useState, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import StringStyles from "./string.module.css"
import { swap, maxLEN, stateCircle } from "./utils-string";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [reversArray, setReversArray] = useState<Array<string>>([]);

  const reversString = async (string: string): Promise<string[]> => {
    const arrayOfLetters = string.split('');
    let end = arrayOfLetters.length;

    setCurrentIndex(0);
    setIsLoader(true);
    setReversArray([...arrayOfLetters]);
    await delay(DELAY_IN_MS);

    for (let i = 0; i < Math.floor(end / 2); i++) {
      swap(arrayOfLetters, i, end - 1);
      setCurrentIndex(i => i + 1);
      setReversArray([...arrayOfLetters]);
      await delay(DELAY_IN_MS);
    }

    setCurrentIndex(i => i + 1);
    setIsLoader(false);

    return arrayOfLetters;
  }

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const string = e.currentTarget.value.trim();
    setInputValue(string);
  }

  const onClickRevers = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    reversString(inputValue);
    setInputValue('');
  }

  return (
    <SolutionLayout title="Строка">
      <form className={StringStyles.form} onSubmit={onClickRevers} data-cy="form">
        <Input
          data-cy="input"
          extraClass="mr-6"
          isLimitText={true}
          maxLength={maxLEN}
          value={inputValue}
          onChange={onChange}
          disabled={isLoader}
        />
        <Button
          text="Развернуть"
          isLoader={isLoader}
          data-cy='submit'
          disabled={!inputValue}
          onClick={onClickRevers}
        />
      </form>
      <ul className={StringStyles.list}>
        {reversArray.map((letter: string, index: number) => {
          return (
            <Circle
              key={index}
              letter={letter}
              index={index + 1}
              state={stateCircle(currentIndex, index, reversArray)}
            />)
        })}
      </ul>
    </SolutionLayout>
  );
};