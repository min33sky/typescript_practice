import { Streamer } from './streamer';

/**
 ** OMIT
 *? 해당 타입의 프로퍼티들 중에서 필요없는 프로퍼티를 제거한 타입을 반환한다.
 */
type StreamerProfile = Omit<Streamer, 'password' | 'phone'>;

interface IStreamerProfile extends StreamerProfile {}

/**
 ** PICK
 *? 해당 타입에서 지정한 프로퍼티만을 가져온다.
 */
type StreamerProfilePick = Pick<Streamer, 'name' | 'email'>;
