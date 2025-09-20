import { Injectable } from '@nestjs/common';
import { PostTranslation } from '@repo/db';
import fs from 'fs';
import OpenAI from 'openai';
import path from 'path';

interface TranslatedPost {
  content: string; // markdown formatında
  description: null | string;
  keywords: string[];
  locale: string;
  title: string;
}

@Injectable()
export class AiService {
  client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateTranslation(post: PostTranslation, to: string[]) {
    const promptTemplate = fs.readFileSync(
      path.join(process.cwd(), 'src', 'prompts', 'translation.md'),
      'utf-8',
    );

    const prompt = promptTemplate
      .replace('{{languages}}', to.join(', '))
      .replace('{{title}}', post.title)
      .replace('{{description}}', post.description || '')
      .replace('{{content}}', post.content)
      .replace('{{keywordsJson}}', JSON.stringify(post.keywords));

    const response = await this.client.chat.completions.create({
      messages: [{ content: prompt, role: 'user' }],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message?.content || '[]';

    console.log('AI Response:', content);
    try {
      const result: TranslatedPost[] = JSON.parse(content).translations;
      return result;
    } catch {
      throw new Error('OpenAI returned invalid JSON: ' + content);
    }
  }
}
