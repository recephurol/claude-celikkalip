import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

export async function readData<T>(filename: string): Promise<T[]> {
  try {
    const filepath = path.join(DATA_DIR, filename);
    const raw = await readFile(filepath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeData<T>(filename: string, data: T[]): Promise<void> {
  await ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  await writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
}

export function nextId<T extends { id: number }>(items: T[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((i) => i.id)) + 1;
}
