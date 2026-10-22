import type { Prisma } from "../../generated/prisma/client.js";
import type ExcelJS from "exceljs";
import { tabulation } from "../data/index.js";

// A dash explicitly selects blank records; an omitted filter selects all records.
export function parseRegion1Code(value: string): number | null {
  if (value === "" || value === "-") return null;
  if (!/^\d+$/.test(value) || !(Number(value) in tabulation.region1)) {
    throw new Error("Region 1 must contain codes 1 through 20 or '-' for blank.");
  }
  return Number(value);
}

export function region1Where(value: unknown): Prisma.ExcelWhereInput {
  if (value === undefined || value === "") return {};
  const values = Array.isArray(value) ? value : [value];
  const codes: number[] = [];
  let includeBlank = false;
  for (const item of values) {
    if (typeof item !== "string" || item.trim() === "") {
      throw new Error("Invalid Region 1 filter.");
    }
    const code = parseRegion1Code(item.trim());
    if (code === null) includeBlank = true;
    else codes.push(code);
  }

  const regions: Prisma.ExcelWhereInput = {
    region1: { in: [...new Set(codes)] },
  };
  if (includeBlank && codes.length > 0) {
    return { OR: [regions, { region1: null }] };
  }
  return includeBlank ? { region1: null } : regions;
}

export function findRegion1Column(worksheet: ExcelJS.Worksheet): number | undefined {
  let column: number | undefined;
  worksheet.getRow(1).eachCell((cell, index) => {
    if (cell.text.toLowerCase().replace(/[\s_-]/g, "") === "region1") {
      column = index;
    }
  });
  return column;
}

export function readRegion1(row: ExcelJS.Row, column: number | undefined): number | null {
  if (column === undefined) return null;
  try {
    return parseRegion1Code(row.getCell(column).text.trim());
  } catch {
    throw new Error(`Invalid Region 1 code at row ${row.number}. Use 1 through 20 or leave blank.`);
  }
}
