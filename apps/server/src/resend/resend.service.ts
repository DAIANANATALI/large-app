import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { marked } from 'marked';
import path from 'path';
import { CreateEmailOptions, Resend } from 'resend';

type CreateEmailOptionsExtended = {
  template?: string;
  templateData?: Record<string, string>;
} & CreateEmailOptions;

@Injectable()
export class ResendService {
  client: Resend;
  from = 'Large App <large-app@aydinthefirst.com>';

  constructor() {
    this.client = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(options: CreateEmailOptionsExtended) {
    const { template, templateData, ...rest } = options;

    if (template) {
      const templatePath = path.join(
        process.cwd(),
        'src',
        'emails',
        `${template}.md`,
      );

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template ${template} not found at ${templatePath}`);
      }

      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      let compiledTemplate = templateContent;

      if (templateData) {
        for (const [key, value] of Object.entries(templateData)) {
          const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
          compiledTemplate = compiledTemplate.replace(regex, value);
        }
      }

      rest.html = await marked(compiledTemplate);
    }

    const { data, error } = await this.client.emails.send(rest);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
