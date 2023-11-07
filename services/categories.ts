import type { Category } from "../types"

export async function getCategories(search?: string) {
    return fetch(`/api/categories${search?.trim() ? "?search=" + search : ""}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error.message);
            return [];
        });
}

export async function editCategory(id: number, body: Category) {
    return fetch("/api/categories/" + id, { method: "PATCH", body: JSON.stringify(body) })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to update data");
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error.message);
            return {};
        });
}

export async function deleteCategory(id: number) {
    return fetch("/api/categories/" + id, { method: "DELETE" })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to delete data");
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error.message);
            return {};
        });
}

export async function createCategory(body: Category) {
    return fetch("/api/categories", { method: "POST", body: JSON.stringify(body) })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to create data");
            }
            return res.json();
        })
        .catch((error) => {
            console.error(error.message);
            return {};
        });
}
