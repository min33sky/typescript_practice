ERROR in [at-loader] ./node_modules/mobx-react/dist/Provider.d.ts:1:8
TS1259: Module '"C:/git/Typescript/ts-mobx-practice/node_modules/@types/react/index"' can only be default-imported using the 'esModuleInterop' flag

ERROR in [at-loader] ./node_modules/mobx-react/dist/disposeOnUnmount.d.ts:1:8
TS1259: Module '"C:/git/Typescript/ts-mobx-practice/node_modules/@types/react/index"' can only be default-imported using the 'esModuleInterop' flag

## mobx-redux 6버젼에서 위와 같은 에러가 발생.

- tsconfig의 esModuleInterop값을 true로 변경
