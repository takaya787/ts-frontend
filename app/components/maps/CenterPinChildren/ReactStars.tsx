import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
type parentFunc = (a: number) => Dispatch<number>;

type ReactStarsProps = {
  parentscoreChange: Dispatch<number>,
  size: number,
  isEdit?: boolean,
  DefaultValue?: number
}

export const ReactStars: React.FC<ReactStarsProps> = ({ parentscoreChange, size, isEdit = true, DefaultValue = 3.0 }) => {
  const [value, setValue] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  const onChange = (value: number) => {
    setValue(value);
    setSelectedValue(value);
    // console.log(value);
    //propsで受け取ってなくてもerrorにならいために
    if (parentscoreChange) {
      parentscoreChange(value);
    }
  }

  useEffect(function () {
    //propsで指定したら初期値を設定
    setValue(DefaultValue);
    setSelectedValue(DefaultValue);
  }, []);

  return (
    <section style={{ cursor: 'pointer' }}>
      <ReactStarsRating
        onChange={onChange}
        // isEdit={isEdit} isEditは結果を見せる時だけfalseにする
        isEdit={isEdit}
        value={value}
        selectedValue={selectedValue}
        size={size}
      />
    </section>
  )
}
