# React Native Template
A Starter template for React Native projects.

## Usage
 Create a new project passing a template:
 ```
 react-native init [ProjectName] --template vitorverasm-starter
 ```
 Wait for it to install...

## Additional steps for configuration

### Package.json
Add this to your package.json to finish the new project configuration(overwrite the existing setup).
```json
  "scripts": {
    "release": "node node_modules/react-native/local-cli/cli.js run-android --variant=release",
    "debug": "node node_modules/react-native/local-cli/cli.js run-android",
    "clean": "cd android && gradlew clean && cd ..",
    "build:dev": "npm run clean && npm run debug",
    "build:release": "npm run clean && npm run release",
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "test:snap": "npm run test -- -u",
    "test:watch": "npm test -- --watch",
    "test:coverage": "npm test -- --coverage",
    "lint": "eslint src/**/*.js",
    "lint:fix": "npm run lint -- --fix"
  },
  "nyc": {
    "functions": 80,
    "lines": 80,
    "check-coverage": true,
    "reporter": [
      "lcov"
    ],
    "include": [
      "src/**/*.js"
    ],
    "exclude": [
      "**/*.test.js",
      "build",
      "src/store.js",
      "src/utils/*",
      "src/assets/*"
    ]
  },
  "jest": {
    "preset": "react-native",
    "setupFilesAfterEnv": [
      "<rootDir>/jestSetup.js"
    ],
    "transform": {
      "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    },
    "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|react-navigation|@react-navigation)"
    ],
    "collectCoverageFrom": [
      "src/**/*.{js,jsx}",
      "!<rootDir>/node_modules/",
      "!<rootDir>/src/assets/",
      "!<rootDir>/src/utils/*",
      "!<rootDir>/src/store.js"
    ]
  },
```

### .gitignore
Add this to your .gitignore file
```
/coverage
```

### Tests
`Remove file App-test.js`

## Scripts

Este projeto possui diversos scripts para ajudar nos processos de build, test e lint. Aqui estão listados alguns deles e suas respectivas funções.

|Script|Função|
|--|-|
| release | Gera versão de release do app que ficará em `/android/app/build/outputs/apk/release` .|
| debug | Gera versão de debug do app que ficará em `/android/app/build/outputs/apk/debug` .|
| clean | Realiza limpeza dos arquivos gerados automaticamente pelo gradle. |
| build:dev | Utiliza `clean` e `debug ` para executar o aplicativo no emulador em modo debug.|
| build:release | Utiliza `clean` e `release` para executar o aplicativo no emulador em modo release.|
| start | Inicia o servidor de desenvolvimento(*metro bundler*).|
| test | Executa todos os testes. |
| test:snap | Executa todos os testes e atualiza as [snapshots](https://jestjs.io/docs/en/snapshot-testing) caso necessário. |
| test:watch | Executa os testes do arquivo aberto atualmente no editor(também aceita passando o nome do arquivo). |
| test:coverage | Executa os testes e calcula a cobertura de código(a saída pode ser encontrada em: `/coverage/lcov-report/index.html` ). |
| lint | Executa o [linting](https://eslint.org/) em todos os arquivos da pasta `src`. |
| lint:fix | Executa o linting em todos os arquivos da pasta `src` e corrige caso existam erros marcados como *autofix*. |

## Git hooks e coverage

Para este projeto temos a presença dos [git hooks](https://github.com/typicode/husky) e [coverage checker](https://github.com/istanbuljs/nyc), para manter a qualidade do código fonte. Os hooks estão presentes no arquivo `.huskyrc` e as configurações do nyc estão no `package.json`.

| Hook | Descrição |
|--|--|
| pre-commit | Antes dos commits executa o comando de lint. |
| pre-push| Antes dos push's executa o comando de lint e o de coverage(é necessário tem 80% em *lines* e *functions* para que o push seja bem sucedido).|

## Problemas comuns

Este projeto possui diversas bibliotecas que foram adicionadas nativamente, por causa disso podem aparecer bugs após a instalação(mais comuns na plataforma iOS). Os bugs mais comuns possuem correções descritas nesta seção.

### Third party

Estes bugs estão relacionados com bibliotecas de terceiros(provavelmente relacionado a biblioteca glog).
```bash
$ cd node_modules/react-native
$ scripts/ios-install-third-party.sh
$ cd third-party/glog-0.3.5/
$ ../../scripts/ios-configure-glog.sh
```

### Firebase

É necessário adicionar uma Podfile ao projeto:

```
cd ios && pod init
```
E depois adicione as seguintes linhas no arquivo:

```
  # Pods for APP
  pod 'Firebase'
  pod 'Firebase/Messaging'
```

Feito isso execute `pod install`. Pronto! basta re-buildar o projeto no XCode.

## Authors
 * **Vitor Veras** - [Github](https://github.com/vitorverasm)
