"use server";

import { connectToDatabase } from "@/config/db";
import { B5Error, type DbResult } from "../types/survey-type";
import { ObjectId } from "mongodb";
import { api } from "@/config/api";

import generateResult, { getInfo } from "@bigfive-org/results";
import calculateScore from "@bigfive-org/score";

import type { Report } from "../types/survey-type";
import type { PersonalityAnalysisResponse } from "../types/analysis-type";
import { N8NBaseError, N8NPayloadError } from "../types/n8n-type";

const collectionName = process.env.DB_COLLECTION || "results";
const resultLanguages = getInfo().languages;

export async function saveTest(testResult: DbResult) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(testResult);
    return { id: result.insertedId.toString() };
  } catch (error) {
    console.error(error);
    throw new B5Error({
      name: "SavingError",
      message: "Failed to save test result!",
    });
  }
}

export async function getTestResult(
  id: string,
  language?: string,
): Promise<Report | undefined> {
  "use server";
  try {
    const query = { _id: new ObjectId(id) };
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const report = await collection.findOne(query);
    if (!report) {
      console.error(`The test results with id ${id} are not found!`);
      throw new B5Error({
        name: "NotFoundError",
        message: `The test results with id ${id} is not found in the database!`,
      });
    }
    const selectedLanguage =
      language ||
      (!!resultLanguages.find((l) => l.id == report.lang) ? report.lang : "en");
    const scores = calculateScore({ answers: report.answers });
    const results = generateResult({ lang: selectedLanguage, scores });
    return {
      id: report._id.toString(),
      timestamp: report.dateStamp,
      availableLanguages: selectedLanguage,
      language: selectedLanguage,
      results,
    };
  } catch (error) {
    if (error instanceof B5Error) {
      throw error;
    }
    throw new Error("Something wrong happend. Failed to get test result!");
  }
}

export async function analyzeResults(id: string) {
  try {
    const { data } = await api.post<PersonalityAnalysisResponse>(
      "/webhook/analyze",
      { id },
    );
    if ("reason" in data.data) throw data.data;

    return { analyses: data.data.analyses };
  } catch (error) {
    if ("code" in (error as N8NBaseError)) return { error };
    if ("reason" in (error as N8NPayloadError))
      return {
        error: {
          code: 400,
          message: (error as N8NPayloadError).reason,
        },
      };

    return {
      error: {
        code: 500,
        message: "Unknown Error",
      },
    };
  }
}
