import type ExcelJS from "exceljs";
import { findRegion1Column, readRegion1 } from "./region1.js";

export function readSurveyRows(worksheet: ExcelJS.Worksheet) {
  const rows = worksheet.getRows(2, worksheet.rowCount - 1) ?? [];
  const region1Column = findRegion1Column(worksheet);
  // Preserve the existing layout when Region 1 is inserted or appended.
  const column = (index: number) =>
    region1Column !== undefined && region1Column <= index ? index + 1 : index;

  return rows.map((row) => ({
    gender: Number(row.getCell(column(2)).value ?? 0),
    age: Number(row.getCell(column(3)).value ?? 0),
    region: Number(row.getCell(column(4)).value ?? 0),
    department: Number(row.getCell(column(5)).value ?? 0),
    empTenure: Number(row.getCell(column(6)).value ?? 0),
    region1: readRegion1(row, region1Column),
    overallExperinceSatifyQ2: Number(row.getCell(column(7)).value ?? 0),
    overallExperinceCompleteQ3: Number(row.getCell(column(8)).value ?? 0),
    overallExperinceRecommentQ4: Number(row.getCell(column(9)).value ?? 0),
  }));
}
