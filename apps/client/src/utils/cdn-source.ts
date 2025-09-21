import { S3_URL } from "~/config";

export default function cdnSource(path: string) {
  return new URL(path, S3_URL).toString();
}
