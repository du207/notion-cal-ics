# Notion 캘린더 데이터베이스에서 ICS 파일 생성

[Notion API 통합](https://www.notion.so/my-integrations)에서 API Key를 생성합니다.

.env에

```
NOTION_KEY=(Notion api key 입력)
DATABASE_ID=(캘린더 데이터베이스 ID)
```

를 입력하고

Vercel에 디플로이하여 https://(vercel url)/api/notion.ics에 접속하여 ICS 파일을 가져올 수 있습니다.
