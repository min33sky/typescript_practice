import { Streamer } from './streamer';

/**
 ** Partial
 *? 해당 타입의 모든 프로퍼티를 옵셔널 프로퍼티로 변환한다.
 */
type StreamerPartial = Partial<Streamer> & { name: string }; //? name 프로퍼티는 필수 프로퍼티로 설정

const streamer: StreamerPartial = {
  name: 'faker',
};

/**
 ** Required
 *? 모든 프로퍼티를 필수 프로퍼티로 변환한다.
 */
type StreamerRequired = Required<Streamer> & { city?: string };
