# Notion 캘린더 데이터베이스에서 ICS 파일 생성

[Notion API 통합](https://www.notion.so/my-integrations)에서 API Key를 생성합니다.

.env에

```
NOTION_KEY=(Notion api key 입력)
DATABASE_ID=(캘린더 데이터베이스 ID)
```

를 입력하고

```shell
yarn build // 빌드
yarn start // 실행
```

로 실행합니다.

systemd 서비스 형태로 만들어 주기적으로 실행할 수도 있습니다.

참고: ICS 파일과 Notion 데이터베이스를 양방향 동기화하는 것이 아닌 Notion에서 ICS 파일로 **단방향** 동기화입니다
