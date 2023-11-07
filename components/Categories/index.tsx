"use client";
import { useState, useEffect, useCallback } from "react";
import { useAppContext } from '../../lib/AppContext';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import isEqual from "lodash.isequal";
import styles from "./categories.module.css";
import type { Category } from "../../types";
import {
    getCategories,
    editCategory,
    deleteCategory,
    createCategory,
} from "../../services/categories";
import AddButton from "./AddButton";
import Item from "./Item";
import ConfirmSave from "./ConfirmSave";
import ConfirmDelete from "./ConfirmDelete";

export default function Categories() {
    const { state } = useAppContext()
    const [categories, setCategories] = useState<Category[]>([]);
    const [sourceCategories, setSourceCategories] = useState<Category[]>([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(
        null
    );

    const fetchCategories = useCallback(async () => {
        const data = await getCategories(state);
        setCategories(data);
        setSourceCategories(data);
    }, [state]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleAddCategory = () => {
        const newCategories = [...categories];
        const maxOrder = categories.filter(cat => !cat.lock).sort((a, b) => b.order - a.order)[0]?.order || 0
        newCategories.push({
            name: "",
            order: maxOrder + 1,
            show: false,
            lock: false,
        });
        setCategories(newCategories);
        setOpenConfirm(true);
    };

    const handleChangeCategory = (index: number, data: Category) => {
        setCategories(
            categories.map((category, ind) => {
                if (ind === index) {
                    return {
                        ...category,
                        ...data,
                    };
                }
                return category;
            })
        );
        setOpenConfirm(true);
    };

    const handleDeleteCategory = (index: number) => {
        setCategoryToDelete(index);
    };

    const handleUpdateCategories = async () => {
        for (const cat of sourceCategories) {
            if (cat.id && !categories.some((c) => c.id === cat.id)) {
                await deleteCategory(cat.id);
            }
        }
        for (const cat of categories) {
            if (!cat.name.trim().length) {
                continue;
            }
            if (!cat.id) {
                await createCategory(cat);
            } else {
                const sourceCategory = sourceCategories.find(
                    (c) => c.id === cat.id
                );
                if (!isEqual(cat, sourceCategory)) {
                    await editCategory(cat.id, cat);
                }
            }
        }
        await fetchCategories();
    };

    const handleConfirmSave = (value: boolean) => {
        value && handleUpdateCategories();
        setOpenConfirm(false);
    };

    const handleConfirmDelete = (value: boolean) => {
        if (value) {
            setCategories(
                categories.filter((category, ind) => ind !== categoryToDelete)
            );
            setOpenConfirm(true);
        }
        setCategoryToDelete(null);
    };

    const onDragEnd = (result: any) => {
        const { destination, source } = result
        if (!destination) {
            return;
        }
        const newCategories = Array.from(categories);
        const [removed] = newCategories.splice(source.index, 1);
        newCategories.splice(destination.index, 0, removed);
      
        setCategories(newCategories.map((category, index) => ({
            ...category,
            order: category.lock ? 999 : index,
        })));
        setOpenConfirm(true);
    };

    return (
        <main className={styles.main}>
            <AddButton onAddCategory={handleAddCategory} />

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <ul
                            className={styles.list}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {categories.map((category, index) => (
                                <Draggable
                                    key={category?.id || "id" + category.order}
                                    draggableId={(
                                        category?.id || "id" + category.order
                                    ).toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Item
                                                key={
                                                    category?.id ||
                                                    "id" + category.order
                                                }
                                                category={category}
                                                handleChange={(data) =>
                                                    handleChangeCategory(
                                                        index,
                                                        data
                                                    )
                                                }
                                                handleDelete={() =>
                                                    handleDeleteCategory(index)
                                                }
                                                openConfirm={openConfirm}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            {openConfirm && <ConfirmSave onClick={handleConfirmSave} />}
            {categoryToDelete !== null && (
                <ConfirmDelete onClick={handleConfirmDelete} />
            )}
        </main>
    );
}
