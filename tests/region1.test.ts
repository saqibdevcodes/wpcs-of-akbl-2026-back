import assert from "node:assert/strict";
import { test } from "node:test";
import ExcelJS from "exceljs";
import { filter, tabulation } from "../src/data/index.js";
import { region1Where } from "../src/lib/region1.js";
import { readSurveyRows } from "../src/lib/importSurvey.js";

test("backend provides every Region 1 code plus a distinct blank option", () => {
  assert.equal(filter.region1.length, 21);
  assert.deepEqual(filter.region1[0], { label: "blank", value: "-" });
  assert.deepEqual(filter.region1.slice(1).map(({ value }) => value),
    Array.from({ length: 20 }, (_, index) => String(index + 1)));
  assert.equal(tabulation.region1[11], "Karachi North");
  assert.equal(tabulation.region1[13], "Khi North");
  assert.equal(tabulation.region1[20], "Sahiwal");
});

test("multiple selections use OR within Region 1 and combine with existing filters", () => {
  assert.deepEqual({ gender: 1, region: 2, ...region1Where(["1", "20", "1"]) }, {
    gender: 1, region: 2, region1: { in: [1, 20] },
  });
  assert.deepEqual(region1Where("8"), { region1: { in: [8] } });
  assert.deepEqual(region1Where(undefined), {});
  assert.deepEqual(region1Where(""), {});
});

test("blank can be selected alone or together with named regions", () => {
  assert.deepEqual(region1Where("-"), { region1: null });
  assert.deepEqual(region1Where(["-", "6"]), {
    OR: [{ region1: { in: [6] } }, { region1: null }],
  });
});

test("invalid query codes and nested query objects are rejected", () => {
  for (const value of ["0", "21", "NaN", "1.5", "1,2", {}, ["1", ""], ["1", {}]]) {
    assert.throws(() => region1Where(value));
  }
});

const headers = ["ID", "Gender", "Age", "Region", "Department", "Tenure", "Q2", "Q3", "Q4"];
const values = [1, 2, 3, 4, 5, 6, 4, 5, 10];
const expected = {
  gender: 2, age: 3, region: 4, department: 5, empTenure: 6,
  overallExperinceSatifyQ2: 4, overallExperinceCompleteQ3: 5,
  overallExperinceRecommentQ4: 10,
};

test("imports Region 1 inserted after Tenure, after Region, or appended", () => {
  for (const index of [4, 6, 9]) {
    const worksheet = new ExcelJS.Workbook().addWorksheet("Survey");
    const withHeader = [...headers];
    const withRegion: (string | number)[] = [...values];
    withHeader.splice(index, 0, "Region 1");
    withRegion.splice(index, 0, 18);
    worksheet.addRow(withHeader);
    worksheet.addRow(withRegion);
    assert.deepEqual(readSurveyRows(worksheet), [{ ...expected, region1: 18 }]);
  }
});

test("legacy uploads and blank or dash cells keep Region 1 null", () => {
  const worksheet = new ExcelJS.Workbook().addWorksheet("Survey");
  worksheet.addRow(headers);
  worksheet.addRow(values);
  assert.deepEqual(readSurveyRows(worksheet), [{ ...expected, region1: null }]);
  worksheet.getRow(1).getCell(10).value = "region1";
  for (const value of [null, "", "-", "  -  "]) {
    worksheet.getRow(2).getCell(10).value = value;
    assert.deepEqual(readSurveyRows(worksheet), [{ ...expected, region1: null }]);
  }
  worksheet.getRow(2).getCell(10).value = 21;
  assert.throws(() => readSurveyRows(worksheet), /Invalid Region 1 code at row 2/);
});
