//? 아래 주어진 타입에 string 타입을 추가하면
//? string이 기존 문자열 타입을 다 포함하기 때문에
//? autocomplete을 사용할 수가 없다.
//? Omit 유틸리티 타입을 사용해수 string에서 주어진 타입을 제외시키면
//? autocomplete을 사용할 수 있게된다.

type IconSize = LooseAutocomplete<'sm' | 'md' | 'lg'>;

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

export const iconSize: IconSize = 'sm';
