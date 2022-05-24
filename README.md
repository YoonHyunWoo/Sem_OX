# SemOX

## npm

---

Node version은 **16.13.0**을 사용하고 있으며, `Dockerfile` 이미지 버전도 꼭 맞추어 주길 바란다.

아래는 typescript config파일인 `tsconfig.json`이다

`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",                          
    "module": "commonjs",                     
    "strict": true,                           
    "noImplicitAny": false,                 
    "esModuleInterop": true,                
    "skipLibCheck": true,                   
    "forceConsistentCasingInFileNames": true
  }
}
```

## Container

---

CodeDeploy all containers remove

`docker container rm -f $(docker container ls -aq)`

CodeDeploy all images remove

`docker image rm -f $(docker image ls -q)`

CodeDeploy Docker image pull & run code

`docker run -p 3000:3000 -d 593634833876.dkr.ecr.ap-northeast-2.amazonaws.com/semox_repo:latest`

SemOX의 컨테이너 관리는, AWS의 이미지 저장소인 ECR의 semox_repo라는 repository에 `20$(date -d "+9 hour" +%y-%m-%d-%H-%M-%S)` 와 같은 형식의 docker image tag로 들어간다.

최신 버전은 역시 `latest`라는 태그로 관리되고 있다.

## Web

---

현재까지 웹은 두 종류로, StaticWeb안에 있는 `index.html` 과 `room.html` 이다. 둘은 S3에서 정적 웹으로 존재하며, Sem_OX라는 github repository의 main branch에 커밋하였을 때, AWS codepipe에서 이들을 업데이트 해 준다.