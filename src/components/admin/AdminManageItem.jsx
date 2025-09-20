import { useEffect, useState } from "react";
import {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from "@/apigang/adminProductService";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

/* ----------------------- helpers: mapping & normalize ---------------------- */

// แปลงข้อมูลจากฟอร์ม → payload ที่ BE ต้องการ
const normalizePayload = (form) => {
    const toArray = (v) => {
        if (Array.isArray(v)) return v;
        if (typeof v === "string") {
            return v
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean);
        }
        return [];
    };

    return {
        product_name: form.productname?.trim(),
        product_brand: form.brand?.trim(),
        product_category: form.category?.trim(),
        product_description: form.description?.trim() || "",
        product_tag: toArray(form.tags), // "a, b" -> ["a","b"]

        // ส่ง variances เป็น key ที่ BE ใช้
        variances: (form.variances || []).map((v) => ({
            product_color: v.color?.trim() || "",
            product_stock: Number(v.stock) || 0,
            product_price: Number(v.price) || 0,
            product_image: Array.isArray(v.image)
                ? v.image
                : v.image
                    ? String(v.image)
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                    : [],
        })),
    };
};

// แปลงข้อมูลจาก BE → แบบฟอร์มฝั่ง FE เพื่อใช้ตอน Edit
const toFormModel = (p) => {
    const tagsArray = Array.isArray(p.product_tag)
        ? p.product_tag
        : p.product_tag ? [p.product_tag] : [];

    // ถ้าไม่มี p.variances → ดึงค่าจาก top-level มาใส่แถวแรกให้แก้ง่าย ๆ
    const variances =
        Array.isArray(p.variances) && p.variances.length > 0
            ? p.variances.map(v => ({
                color: v.product_color || "",
                stock: v.product_stock ?? 0,
                price: v.product_price ?? 0,
                image: Array.isArray(v.product_image) ? v.product_image.join(", ") : (v.product_image || ""),
            }))
            : [{
                color: p.product_color || "",
                stock: p.product_stock ?? 0,
                price: p.product_price ?? 0,
                image: p.product_image || "",
            }];

    return {
        category: p.product_category || "",
        productname: p.product_name || "",
        description: p.product_description || "",
        brand: p.product_brand || "",
        modelname: p.modelname || "",
        warrantyinfo: p.warrantyinfo || "",
        relatedproduct: p.relatedproduct || [],
        tags: tagsArray.join(", "),
        features: tagsArray.join(", "),
        variances,
    };
};


function AdminManageProduct() {
    // ข้อมูลในตาราง
    const [products, setProducts] = useState([]);

    // แบบฟอร์มสร้างสินค้าใหม่
    const [productForm, setProductForm] = useState({
        category: "",
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        tags: "", // เก็บเป็น string ใน input แล้วค่อยแปลงเป็น array ตอนส่ง
        variances: [{ color: "", image: "", stock: 0, price: 0 }],
    });

    // โหมดแก้ไข
    const [editProductId, setEditProductId] = useState(null);
    const [editProductForm, setEditProductForm] = useState(productForm);

    /* ---------------------------------- API --------------------------------- */

    const fetchProducts = async () => {
        try {
            const { products } = await getAllProducts();
            setProducts(products || []);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    /* -------------------------------- Handlers ------------------------------- */

    // ฟอร์มสร้างใหม่ – ช่องปกติ
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProductForm((prev) => ({ ...prev, [name]: value }));
    };

    // ฟอร์มสร้างใหม่ – เปลี่ยนค่าใน variances แต่ละแถว
    const handleVarianceChange = (index, e) => {
        const { name, value } = e.target;
        setProductForm((prev) => {
            const next = structuredClone(prev);
            next.variances[index][name] = value;
            return next;
        });
    };

    // เพิ่มแถว variance
    const handleAddVariance = () => {
        setProductForm((prev) => ({
            ...prev,
            variances: [
                ...prev.variances,
                { color: "", image: "", stock: 0, price: 0 },
            ],
        }));
    };

    // submit สร้างใหม่
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = normalizePayload(productForm);
            console.log("POST /admin/products payload:", payload);
            await createProduct(payload);
            await fetchProducts();
            // reset ฟอร์ม
            setProductForm({
                category: "",
                productname: "",
                description: "",
                brand: "",
                modelname: "",
                warrantyinfo: "",
                relatedproduct: [],
                tags: "",
                variances: [{ color: "", image: "", stock: 0, price: 0 }],
            });
        } catch (error) {
            console.error(
                "❌ Error creating product:",
                error?.response?.data || error
            );
            alert(error?.response?.data?.message || "Create product failed");
        }
    };

    // ลบ
    const handleProductDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (e) {
            console.error("❌ Delete failed:", e?.response?.data || e);
        }
    };

    // เข้าโหมดแก้ไข
    const handleProductEdit = (product) => {
        setEditProductId(product._id); // ใช้ _id ของ MongoDB
        setEditProductForm(toFormModel(product));
    };

    // บันทึกแก้ไข
    const handleProductEditSave = async (id) => {
        try {
            const payload = normalizePayload(editProductForm);
            await updateProduct(id, payload);
            await fetchProducts();
            setEditProductId(null);
        } catch (error) {
            console.error("❌ Error updating product:", error?.response?.data || error);
            alert(error?.response?.data?.message || "Update product failed");
        }
    };

    const handleProductEditCancel = () => setEditProductId(null);

    // ฟอร์มแก้ไข – ช่องปกติ
    const handleProductEditChange = (e) => {
        const { name, value } = e.target;
        // รองรับเคสเดิมที่ใน UI ใช้ name="features" (เก็บเป็น string)
        if (name === "features") {
            setEditProductForm((prev) => ({ ...prev, tags: value }));
        } else {
            setEditProductForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    /* --------------------------------- UI ----------------------------------- */
    // 🔻 คืน UI “เหมือนของเดิม” (ตั้งแต่ return ลงมา)
    return (
        <div className="flex flex-col items-center p-6 space-y-6">
            {/* Form */}
            <Card className="w-full max-w-3xl">
                <CardContent className="p-6">
                    <form onSubmit={handleProductSubmit} className="space-y-4 ">
                        <div className="flex flex-col space-y-2">
                            <Label>Product Category</Label>
                            <select
                                value={productForm.category}
                                onChange={(e) =>
                                    setProductForm({ ...productForm, category: e.target.value })
                                }
                                name="category"
                            >
                                <option value="" disabled>
                                    Select an option...
                                </option>
                                <option value="Smartwatch">Smartwatch</option>
                                <option value="Earbud">Earbud</option>
                                <option value="Keyboard">Keyboard</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Product Name</Label>
                            <Input
                                name="productname"
                                value={productForm.productname}
                                onChange={handleProductChange}
                                placeholder="Product name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={productForm.description}
                                onChange={handleProductChange}
                                placeholder="Description"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Brand</Label>
                            <Input
                                name="brand"
                                value={productForm.brand}
                                onChange={handleProductChange}
                                placeholder="Brand"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Model Name</Label>
                            <Input
                                name="modelname"
                                value={productForm.modelname}
                                onChange={handleProductChange}
                                placeholder="Model name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Warranty Information</Label>
                            <Input
                                name="warrantyinfo"
                                value={productForm.warrantyinfo}
                                onChange={handleProductChange}
                                placeholder="Warranty"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Related Product</Label>
                            <Input
                                name="relatedproduct"
                                value={productForm.relatedproduct}
                                onChange={handleProductChange}
                                placeholder="Related"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Tags</Label>
                            <Input
                                name="tags"
                                value={
                                    Array.isArray(productForm.tags)
                                        ? productForm.tags.join(", ")
                                        : productForm.tags || ""
                                }
                                onChange={handleProductChange}
                                placeholder="Tags"
                            />
                        </div>

                        {/* Variances */}
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-bold">Variances</h3>
                            {productForm.variances.map((v, i) => (
                                <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                                    <Label>Color</Label>
                                    <Input
                                        name="color"
                                        value={v.color}
                                        onChange={(e) => handleVarianceChange(i, e)}
                                        placeholder="Color"
                                    />
                                    <Label>Stock</Label>
                                    <Input
                                        name="stock"
                                        type="number"
                                        value={v.stock}
                                        onChange={(e) => handleVarianceChange(i, e)}
                                        placeholder="Stock"
                                    />
                                    <Label>Price</Label>
                                    <Input
                                        name="price"
                                        type="number"
                                        value={v.price}
                                        onChange={(e) => handleVarianceChange(i, e)}
                                        placeholder="Price"
                                    />
                                    <Label>Product pic</Label>
                                    <Input
                                        name="image"
                                        value={Array.isArray(v.image) ? v.image.join(", ") : v.image}
                                        onChange={(e) => handleVarianceChange(i, e)}
                                        placeholder="Image URL"
                                    />
                                </div>
                            ))}
                            <Button type="button" onClick={handleAddVariance} variant="outline">
                                + Add Variance
                            </Button>
                        </div>

                        <Button type="submit">Save new product</Button>
                    </form>
                </CardContent>
            </Card>

            {/* Table */}
            <Card className="w-full max-w-4xl">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Features</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <TableRow key={product._id}>
                                        {editProductId === product._id ? (
                                            <>
                                                <TableCell>
                                                    <select
                                                        value={editProductForm.category}
                                                        onChange={(e) =>
                                                            setEditProductForm((prev) => ({
                                                                ...prev,
                                                                category: e.target.value,
                                                            }))
                                                        }
                                                        name="category"
                                                    >
                                                        <option value="" disabled>
                                                            Select an option...
                                                        </option>
                                                        <option value="Smartwatch">Smartwatch</option>
                                                        <option value="Earbud">Earbud</option>
                                                        <option value="Keyboard">Keyboard</option>
                                                    </select>
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        name="productname"
                                                        value={editProductForm.productname}
                                                        onChange={handleProductEditChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        name="features"
                                                        value={editProductForm.features || ""}
                                                        onChange={handleProductEditChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        value={editProductForm.variances?.[0]?.color || ""}
                                                        onChange={(e) => {
                                                            const newVar = [...(editProductForm.variances || [{ color: "", stock: 0, price: 0, image: "" }])];
                                                            if (!newVar[0]) newVar[0] = { color: "", stock: 0, price: 0, image: "" };
                                                            newVar[0].color = e.target.value;
                                                            setEditProductForm((prev) => ({
                                                                ...prev,
                                                                variances: newVar,
                                                            }));
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={editProductForm.variances?.[0]?.stock ?? 0}
                                                        onChange={(e) => {
                                                            const newVar = [...(editProductForm.variances || [{ color: "", stock: 0, price: 0, image: "" }])];
                                                            if (!newVar[0]) newVar[0] = { color: "", stock: 0, price: 0, image: "" };
                                                            newVar[0].stock = e.target.value;
                                                            setEditProductForm((prev) => ({
                                                                ...prev,
                                                                variances: newVar,
                                                            }));
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleProductEditSave(product._id)}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={handleProductEditCancel}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{product.product_name}</TableCell>
                                                <TableCell>
                                                    {Array.isArray(product.product_tag)
                                                        ? product.product_tag.join(", ")
                                                        : product.product_tag}
                                                </TableCell>
                                                <TableCell>{product.product_color || "-"}</TableCell>
                                                <TableCell>{product.product_stock ?? 0}</TableCell>

                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleProductEdit(product)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleProductDelete(product._id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="5" className="text-center p-4">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminManageProduct;
