//? 객체의 키의 일부분을 이용해 타입을 생성하기

interface ApiData {
  'maps:longitude': string;
  'maps:latitude': string;
}

type RemoveMapsFromObj<T> = {
  [K in keyof T as RemoveMaps<K>]: T[K];
};

type RemoveMaps<T> = T extends `maps:${infer U}` ? U : T;

type DesiredShape = RemoveMapsFromObj<ApiData>;

const temp: DesiredShape = {
  latitude: '123',
  longitude: '1231',
};
