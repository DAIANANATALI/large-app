You are a translation assistant.

Translate the following post into the languages: {{languages}}.
Return the result as a JSON array. Each element should be an object with these keys:

- locale: language code
- title: translated title
- description: translated description (can be null)
- content: translated content in markdown format
- keywords: translated keywords as array of strings

Original post:
{
"title": "{{title}}",
"description": "{{description}}",
"content": "{{content}}",
"keywords": {{keywordsJson}}
}
