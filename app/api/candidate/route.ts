import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SHEET_URL = process.env.GOOGLE_SHEET_CSV_URL || "https://docs.google.com/spreadsheets/d/1_zKgFgEZRNAgXTg2eLRQ6XQ8skzNWi4pMeM6sj61ZQU/export?format=csv";
const REQUIRED_COLUMNS = ["code", "name", "tt_point", "tsc_point", "wwc_point", "plus_point", "minus_point", "total_point"];
let cache: { expires: number; rows: Record<string, string>[] } | null = null;

function parseCsv(csv: string) {
  const rows: string[][] = [];
  let row: string[] = [], value = "", quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    if (char === '"' && csv[i + 1] === '"' && quoted) { value += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(value); value = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) { if (char === "\r" && csv[i + 1] === "\n") i++; row.push(value); rows.push(row); row = []; value = ""; }
    else value += char;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  if (!REQUIRED_COLUMNS.every((column) => headers.includes(column))) throw new Error("Format spreadsheet tidak sesuai.");
  return rows.filter((item) => item.some(Boolean)).map((item) => Object.fromEntries(headers.map((header, index) => [header, item[index]?.trim() || ""])));
}

function normalizeCode(value: string) {
  return value.trim().replace(/\s+/g, "").toLowerCase();
}

async function getRows() {
  if (cache && cache.expires > Date.now()) return cache.rows;
  const response = await fetch(SHEET_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Spreadsheet tidak dapat diakses.");
  const rows = parseCsv(await response.text());
  cache = { rows, expires: Date.now() + 60_000 };
  return rows;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Masukkan kode kandidat terlebih dahulu." }, { status: 400 });
  try {
    const rows = await getRows();
    const index = rows.findIndex((row) => normalizeCode(row.code) === normalizeCode(code));
    if (index < 0) return NextResponse.json({ error: "Kode kandidat tidak ditemukan." }, { status: 404 });
    const row = rows[index];
    return NextResponse.json({ name: row.name, tt_point: row.tt_point, tsc_point: row.tsc_point, wwc_point: row.wwc_point, plus_point: row.plus_point, minus_point: row.minus_point, total_point: row.total_point, rank: index + 1, qualified: index < 40 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Data sedang bermasalah. Silakan coba lagi nanti." }, { status: 502 });
  }
}
