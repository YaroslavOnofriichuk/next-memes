import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
import type { Category } from "../../../types";

export const dataFilePath = path.join(process.cwd(), "./public/categories.json");

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search");

    const jsonData = await fsPromises.readFile(dataFilePath);
    let currentCategories: Category[] = JSON.parse(jsonData.toString());
    currentCategories = currentCategories.sort((a, b) => a.order - b.order)

    if (query) {
        currentCategories = currentCategories.filter((category) =>
            category.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    return NextResponse.json(currentCategories);
}

export async function POST(req: Request, res: Response) {
    const body: Category = await req.json();

    const jsonData = await fsPromises.readFile(dataFilePath);
    let currentCategories: Category[] = JSON.parse(jsonData.toString());
    currentCategories.push({
        ...body,
        id: Date.now(),
    });

    try {
        await fsPromises.writeFile(dataFilePath, JSON.stringify(currentCategories));
    } catch (error) {
        console.error(error);
        return NextResponse.error()
    }

    return NextResponse.json({ body });
}
