import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import { tabulation, filter } from "../data/index.js";

const TOTAL = 9311;

const getStats = (data: any[], key: keyof typeof tabulation) => {
  const total = data.length;

  return data.reduce((acc: any, curr: any) => {
    const value = curr[key];

    const label =
      tabulation[key]?.[value as keyof (typeof tabulation)[typeof key]] ??
      String(value);

    if (!acc[label]) {
      acc[label] = {
        count: 0,
        percentage: 0,
      };
    }

    acc[label].count += 1;
    acc[label].percentage = Number(
      ((acc[label].count / total) * 100).toFixed(2),
    );

    return acc;
  }, {});
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

export const uploadDataToDb = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const filePath = path.resolve(req.file.path);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0];

    if (!worksheet) {
      return res.status(400).json({
        success: false,
        message: "Worksheet not found",
      });
    }

    const rows = worksheet.getRows(2, worksheet.rowCount - 1) ?? [];
    console.log(rows);

    const data = rows.map((row) => ({
      gender: Number(row.getCell(2).value ?? 0),
      age: Number(row.getCell(3).value ?? 0),
      region: Number(row.getCell(4).value ?? 0),
      department: Number(row.getCell(5).value ?? 0),
      empTenure: Number(row.getCell(6).value ?? 0),
      overallExperinceSatifyQ2: Number(row.getCell(7).value ?? 0),
      overallExperinceCompleteQ3: Number(row.getCell(8).value ?? 0),
      overallExperinceRecommentQ4: Number(row.getCell(9).value ?? 0),
    }));

    await prisma.excel.deleteMany({});

    await prisma.excel.createMany({
      data,
    });

    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: "Data uploaded successfully",
      count: data.length,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const dashboardData = async (req: Request, res: Response) => {
  try {
    const { gender, age, region, department, tenure } = req.query;

    const where: any = {};

    if (gender !== undefined && gender !== "") {
      where.gender = Number(gender);
    }
    if (age !== undefined && age !== "") {
      where.age = Number(age);
    }
    if (region !== undefined && region !== "") {
      where.region = Number(region);
    }
    if (department !== undefined && department !== "") {
      where.department = Number(department);
    }
    if (tenure !== undefined && tenure !== "") {
      where.empTenure = Number(tenure);
    }

    const data = await prisma.excel.findMany({
      where,
      select: {
        gender: true,
        age: true,
        region: true,
        department: true,
        empTenure: true,
        overallExperinceSatifyQ2: true,
        overallExperinceCompleteQ3: true,
        overallExperinceRecommentQ4: true,
      },
    });

    //////////////////////////////////////////////////////////

    const q2 = data
      .map((item: any) => item.overallExperinceSatifyQ2)
      .filter((item: any) => item === 5 || item === 4);

    const q2Count5 = q2.filter((item: any) => item === 5).length;
    const q2Count4 = q2.filter((item: any) => item === 4).length;

    const q2TotalCount = q2Count5 + q2Count4;

    const q2TotalCountPercentage = Number(
      ((q2TotalCount / data.length) * 100).toFixed(2),
    );

    const q3 = data
      .map((item: any) => item.overallExperinceCompleteQ3)
      .filter((item: any) => item === 5 || item === 6 || item === 7);

    const q3Count5 = q3.filter((item: any) => item === 5).length;
    const q3Count6 = q3.filter((item: any) => item === 6).length;
    const q3Count7 = q3.filter((item: any) => item === 7).length;

    const q3TotalCount = q3Count5 + q3Count6 + q3Count7;

    const q3TotalCountPercentage = Number(
      ((q3TotalCount / data.length) * 100).toFixed(2),
    );

    const q4 = data
      .map((item: any) => item.overallExperinceRecommentQ4)
      .filter((item: any) => item >= 0 && item <= 6);

    const q4Count0 = q4.filter((item: any) => item === 0).length;
    const q4Count1 = q4.filter((item: any) => item === 1).length;
    const q4Count2 = q4.filter((item: any) => item === 2).length;
    const q4Count3 = q4.filter((item: any) => item === 3).length;
    const q4Count4 = q4.filter((item: any) => item === 4).length;
    const q4Count5 = q4.filter((item: any) => item === 5).length;
    const q4Count6 = q4.filter((item: any) => item === 6).length;

    const q4Percentage0 = Number(((q4Count0 / data.length) * 100).toFixed(2));
    const q4Percentage1 = Number(((q4Count1 / data.length) * 100).toFixed(2));
    const q4Percentage2 = Number(((q4Count2 / data.length) * 100).toFixed(2));
    const q4Percentage3 = Number(((q4Count3 / data.length) * 100).toFixed(2));
    const q4Percentage4 = Number(((q4Count4 / data.length) * 100).toFixed(2));
    const q4Percentage5 = Number(((q4Count5 / data.length) * 100).toFixed(2));
    const q4Percentage6 = Number(((q4Count6 / data.length) * 100).toFixed(2));

    const detractor =
      q4Percentage0 +
      q4Percentage1 +
      q4Percentage2 +
      q4Percentage3 +
      q4Percentage4 +
      q4Percentage5 +
      q4Percentage6;

    const q4N = data
      .map((item: any) => item.overallExperinceRecommentQ4)
      .filter((item: any) => item === 9 || item === 10);

    const q4Count9 = q4N.filter((item: any) => item === 9).length;
    const q4Count10 = q4N.filter((item: any) => item === 10).length;

    const q4Percentage9 = Number(((q4Count9 / data.length) * 100).toFixed(2));
    const q4Percentage10 = Number(((q4Count10 / data.length) * 100).toFixed(2));

    const promoters = q4Percentage9 + q4Percentage10;

    const q4Nps = Number(promoters - detractor);

    const q4P = data
      .map((item: any) => item.overallExperinceRecommentQ4)
      .filter((item: any) => item === 7 || item === 8);

    const q4Count7 = q4P.filter((item: any) => item === 7).length;
    const q4Count8 = q4P.filter((item: any) => item === 8).length;

    const q4Percentage7 = Number(((q4Count7 / data.length) * 100).toFixed(2));
    const q4Percentage8 = Number(((q4Count8 / data.length) * 100).toFixed(2));

    const passives = q4Percentage7 + q4Percentage8;

    //////////////////////////////////////////////////////////
    const filters = filter;

    return res.status(200).json({
      success: true,
      count: data.length,
      total: TOTAL,
      filters: filters,
      tabulations: tabulation,
      questionStats: {
        q2: {
          q2Count5,
          q2Count4,
          q2TotalCount,
          q2TotalCountPercentage,
        },
        q3: {
          q3Count5,
          q3Count6,
          q3Count7,
          q3TotalCount,
          q3TotalCountPercentage,
        },
        q4: {
          detractor,
          promoters,
          nps: q4Nps,
          passives,
        },
      },
      stats: {
        gender: getStats(data, "gender"),
        age: getStats(data, "age"),
        region: getStats(data, "region"),
        department: getStats(data, "department"),
        empTenure: getStats(data, "empTenure"),
      },
      message: "Data fetched successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and password are required",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        fullName: name,
        email: email,
        password: password,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
