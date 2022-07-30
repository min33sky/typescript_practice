/**
 ** Parameters<Type>
 *? 함수의 파라미터들의 타입을 반환
 */
async function createUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return { username, password };
}

type CreateUserInput = Parameters<typeof createUser>[number];
const nData: CreateUserInput = { username: 'tom', password: '123' };
createUser(nData);

/**
 ** ReturnType<Type>
 */

//? 비동기 함수는 Awaitted를 사용하면 타입을 가져올 수 있다.
type CreateUserResult = Awaited<ReturnType<typeof createUser>>;
