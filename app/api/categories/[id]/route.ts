import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import type { Category } from "../../../../types";
import { dataFilePath } from "../route";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    const jsonData = await fsPromises.readFile(dataFilePath);
    let currentCategories: Category[] = JSON.parse(jsonData.toString());

    try {
        await fsPromises.writeFile(
            dataFilePath,
            JSON.stringify(
                currentCategories.filter((category) => category.id !== +id)
            )
        );
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }

    return NextResponse.json({ id });
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const body = await req.json()

    const jsonData = await fsPromises.readFile(dataFilePath);
    let currentCategories: Category[] = JSON.parse(jsonData.toString());

    try {
        await fsPromises.writeFile(
            dataFilePath,
            JSON.stringify(
                currentCategories.map((category) => {
                    if (category.id === +id) {
                        return {
                            ...category,
                            ...body,
                        }
                    }
                    return category
                })
            )
        );
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }

    return NextResponse.json({ id });
}
