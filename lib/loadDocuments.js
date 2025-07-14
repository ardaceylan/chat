import fs from 'fs';
import path from 'path';
import { Document } from 'langchain/document';
import pdf from 'pdf-parse';

export async function loadDocuments() {
  const docDir = path.join(process.cwd(), 'documents');
  const files = ['cv.pdf', 'paper1.pdf']; // Update with your PDF files
  const documents = [];

  for (const file of files) {
    const filePath = path.join(docDir, file);
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    documents.push(new Document({
      pageContent: data.text,
      metadata: { source: file },
    }));
  }

  return documents;
}