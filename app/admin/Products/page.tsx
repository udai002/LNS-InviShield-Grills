"use client";

import AdminLayout from "@/components/navigations/AdminLayout";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { FormEvent, useEffect, useMemo, useState } from "react";

type Product = {
    _id: string;
    title: string;
    description: string;
    label: string;
    category: string;
    imageUrl: string;
    price: string;
};

type AddProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    imageUrl: string;
    imageFile: File | null;
    price: string;
    label: string;
    category: string;
    onChangeTitle: (value: string) => void;
    onChangeDescription: (value: string) => void;
    onChangeImageUrl: (value: string) => void;
    onChangeImageFile: (file: File | null) => void;
    onChangePrice: (value: string) => void;
    onChangeLabel: (value: string) => void;
    onChangeCategory: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type ProductCardProps = {
    product: Product;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
};



;

function AddProductModal({
    isOpen,
    onClose,
    title,
    description,
    imageUrl,
    imageFile,
    price,
    label,
    category,
    onChangeTitle,
    onChangeDescription,
    onChangeImageUrl,
    onChangeImageFile,
    onChangePrice,
    onChangeLabel,
    onChangeCategory,
    onSubmit,
}: AddProductModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-900">Add a product</h3>
                        <p className="mt-1 text-sm text-slate-500">Fill in the details and submit to add a new product card.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                        Close
                    </button>
                </div>

                <form className="space-y-5 px-6 py-6" onSubmit={onSubmit}>
                    <label className="block text-sm font-medium text-slate-700">
                        Title
                        <input
                            value={title}
                            onChange={(event) => onChangeTitle(event.target.value)}
                            placeholder="e.g. Grill Master 500"
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-1 ring-transparent transition focus:border-slate-400 focus:ring-slate-300"
                        />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                        Description
                        <textarea
                            value={description}
                            onChange={(event) => onChangeDescription(event.target.value)}
                            rows={4}
                            placeholder="Short product description"
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-1 ring-transparent transition focus:border-slate-400 focus:ring-slate-300"
                        />
                    </label>

                    <label className="block text-sm font-medium text-slate-700">
                        Image File
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => onChangeImageFile(event.target.files?.[0] ?? null)}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-1 ring-transparent transition focus:border-slate-400 focus:ring-slate-300"
                        />
                    </label>
                    <div className="grid gap-5 sm:grid-cols-3">
                        <label className="block text-sm font-medium text-slate-700">
                            Price
                            <input
                                value={price}
                                onChange={(event) => onChangePrice(event.target.value)}
                                placeholder="$249"
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-1 ring-transparent transition focus:border-slate-400 focus:ring-slate-300"
                            />
                        </label>
                        <label className="block text-sm font-medium text-slate-700">
                            Label
                            <input
                                value={label}
                                onChange={(event) => onChangeLabel(event.target.value)}
                                placeholder="e.g. Copper"
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-1 ring-transparent transition focus:border-slate-400 focus:ring-slate-300"
                            />
                        </label>
                        <label className="block text-sm font-medium text-slate-700">
                            Category
                            <input
                                value={category}
                                onChange={(event) => onChangeCategory(event.target.value)}
                                placeholder="e.g. Outdoor"
                                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none ring-1 ring-transparent transition focus:border-slate-400 focus:ring-slate-300"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            Save product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function ProductCard({ product, isSelected, onSelect, onDelete }: ProductCardProps) {
    return (
        <article
            onClick={onSelect}
            className={`group cursor-pointer rounded-[2rem] border p-5 transition ${isSelected ? "border-slate-900 bg-slate-50 shadow-lg" : "border-slate-200 bg-white hover:shadow-lg"
                }`}
        >
            <img
                src={product.imageUrl}
                alt={product.title}
                className="h-40 w-full rounded-[1.5rem] object-cover"
            />
            <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Product #{product._id}</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{product.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{product.category}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    {product.label}
                </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>
            <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">{product.price}</span>
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete();
                    }}
                    className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                >
                    Delete
                </button>
            </div>
        </article>
    );
}

type ConfirmDeleteModalProps = {
    isOpen: boolean;
    productTitle?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

function ConfirmDeleteModal({ isOpen, productTitle, onCancel, onConfirm }: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
                <h3 className="text-xl font-semibold text-slate-900">Delete product</h3>
                <p className="mt-2 text-sm text-slate-600">
                    Are you sure you want to delete{productTitle ? ` "${productTitle}"` : " this product"}? This can’t be undone.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [label, setLabel] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("/api/Products");
                if (!response.ok) {
                    throw new Error(`Failed to load products (${response.status})`);
                }

                const data = await response.json();
                if (!Array.isArray(data?.data)) {
                    throw new Error("Invalid product data format");
                }

                setProducts(data.data);

            } catch (fetchError) {
                const message = fetchError instanceof Error
                    ? fetchError.message
                    : "An unknown error occurred.";

                setError(message);

            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    async function addProduct(formData: FormData) {
        setAdding(true);
        setError("");

        try {
            const response = await fetch("/api/Products", {
                method: "POST",
                body: formData,
            });

            const data = await response.json()
            console.log('this is the data while getting when we are adding proooducts', data)
            if (!response.ok) {
                throw new Error(`Failed to add product (${response.status})`);
            }
        } catch (fetchError) {
            const message = fetchError instanceof Error
                ? fetchError.message
                : "An unknown error occurred.";

            setError(message);
        } finally {
            setAdding(false);
        }
    }



    const handleAddProduct = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        const trimmedPrice = price.trim();
        const trimmedLabel = label.trim();
        const trimmedCategory = category.trim();
        const trimmedImageUrl = imageUrl.trim();

        if (!trimmedTitle || !trimmedDescription || !trimmedPrice || !trimmedLabel || !trimmedCategory || (!trimmedImageUrl && !imageFile)) {
            return;
        }

        const formData = new FormData();
        formData.append("title", trimmedTitle);
        formData.append("description", trimmedDescription);
        formData.append("price", trimmedPrice);
        formData.append("label", trimmedLabel);
        formData.append("category", trimmedCategory);


        if (imageFile) {
            formData.append("product-image", imageFile);

        } else {
            setError("Please select the image")
            return;
        }

        console.log([...formData.entries()]);

        await addProduct(formData);


        setTitle("");
        setDescription("");
        setPrice("");
        setLabel("");
        setCategory("");
        setImageUrl("");
        setImageFile(null);
        setIsAddModalOpen(false);
    };

    // 1. Fixed deleteProduct — takes id directly
async function deleteProduct(id: string) {
    try {
        const response = await fetch(`/api/Products?productId=${id}`, {
            method: "DELETE",
        });
        return response.ok;
    } catch (fetchError) {
        const message = fetchError instanceof Error
            ? fetchError.message
            : "An unknown error occurred.";
        setError(message);
        return false;
    }
}

// 2. handleDeleteProduct no longer depends on selectedId matching
const handleDeleteProduct = async (id: string) => {
    const success = await deleteProduct(id);
    if (success) {
        setProducts((current) => current.filter((product) => product._id !== id));
        if (selectedId === id) setSelectedId("");
    }
    setDeleteTargetId(null); // close confirm modal either way
};


    return (
        <AdminLayout>
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8 overflow-hidden rounded-[2rem] bg-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-900/10 sm:px-10">
                        <div className="max-w-3xl">
                            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-slate-400">Product Gallery</p>
                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Manage Products</h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                Add, delete, and view product cards in a clean gallery layout with consistent colors across the admin section.
                            </p>
                        </div>
                    </div>
                    <AddProductModal
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        title={title}
                        description={description}
                        imageUrl={imageUrl}
                        imageFile={imageFile}
                        price={price}
                        label={label}
                        category={category}
                        onChangeTitle={setTitle}
                        onChangeDescription={setDescription}
                        onChangeImageUrl={setImageUrl}
                        onChangeImageFile={setImageFile}
                        onChangePrice={setPrice}
                        onChangeLabel={setLabel}
                        onChangeCategory={setCategory}
                        onSubmit={handleAddProduct}
                    />


                    <section className="mt-8">
                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">Product gallery</h2>
                                <p className="mt-1 text-sm text-slate-500">Browse your products and keep the color palette consistent with the admin interface.</p>
                            </div>
                            <div className="flex items-center gap-12">

                                <PrimaryButton title="Add Product" onClick={() => { setIsAddModalOpen(true) }} backgroundColor="black" textColor="white" hoverBackgroundColor="gray" />
                            </div>

                        </div>

                        {error && (
                            <div className="mb-5 rounded-[2rem] border border-rose-200 bg-rose-50 p-5 text-rose-700">
                                <p className="font-semibold">Unable to load products.</p>
                                <p className="mt-1 text-sm">{error}</p>
                            </div>
                        )}

                        {loading ? (
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center text-slate-700 shadow-sm">
                                Loading products...
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        isSelected={selectedId === product._id}
                                        onSelect={() => setSelectedId(product._id)}
                                    onDelete={() => setDeleteTargetId(product._id)}
                                    />
                                ))}

                                <ConfirmDeleteModal
                                    isOpen={deleteTargetId !== null}
                                    productTitle={products.find((p) => p._id === deleteTargetId)?.title}
                                    onCancel={() => setDeleteTargetId(null)}
                                    onConfirm={() => deleteTargetId && handleDeleteProduct(deleteTargetId)}
                                />
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
