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

function AdminManageProduct() {
    const [products, setProducts] = useState([]);
    const [productForm, setProductForm] = useState({
        category: "",
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        tags: [],
        variances: [{ color: "", image: [], stock: 0, price: 0 }],
    });

    const [editProductId, setEditProductId] = useState(null);
    const [editProductForm, setEditProductForm] = useState(productForm);

    const fetchProducts = async () => {
        try {
            const { products } = await getAllProducts();
            setProducts(products);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    // --- Handlers ---
    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleVarianceChange = (index, e) => {
        const { name, value } = e.target;
        const newVariances = [...productForm.variances];
        newVariances[index][name] = value;
        setProductForm({ ...productForm, variances: newVariances });
    };

    const handleAddVariance = () => {
        setProductForm({
            ...productForm,
            variances: [
                ...productForm.variances,
                { color: "", image: [], stock: 0, price: 0 },
            ],
        });
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(productForm);
            await fetchProducts();
            setProductForm({
                category: "",
                productname: "",
                description: "",
                brand: "",
                modelname: "",
                warrantyinfo: "",
                relatedproduct: [],
                features: [],
                variances: [{ color: "", image: [], stock: 0, price: 0 }],
            });
        } catch (error) {
            console.error("❌ Error creating product:", error);
        }
    };

    const handleProductDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        await deleteProduct(id);
        await fetchProducts();
    };

    const handleProductEdit = (product) => {
        setEditProductId(product._id); // NOTE: ใช้ `_id` แทน `id` สำหรับ MongoDB
        setEditProductForm(product);
    };

    const handleProductEditSave = async (id) => {
        try {
            await updateProduct(id, editProductForm);
            await fetchProducts();
            setEditProductId(null);
        } catch (error) {
            console.error("❌ Error updating product:", error);
        }
    };

    const handleProductEditCancel = () => setEditProductId(null);

    const handleProductEditChange = (e) => {
        setEditProductForm({
            ...editProductForm,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🔻 ส่วน return ด้านล่างนี้ ใช้ของเดิมจากกอล์ฟ 100% ตามคำขอ
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
                                value={productForm.tags}
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
                                        value={v.image}
                                        onChange={(e) => handleVarianceChange(i, e)}
                                        placeholder="Image URL"
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                onClick={handleAddVariance}
                                variant="outline"
                            >
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
                                    <TableRow key={product.id}>
                                        {editProductId === product.id ? (
                                            <>
                                                <TableCell>
                                                    <select
                                                        value={editProductForm.category}
                                                        onChange={(e) =>
                                                            setEditProductForm({
                                                                ...productForm,
                                                                category: e.target.value,
                                                            })
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
                                                        value={editProductForm.features}
                                                        onChange={handleProductEditChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        value={editProductForm.variances[0]?.color || ""}
                                                        onChange={(e) => {
                                                            const newVar = [...editProductForm.variances];
                                                            newVar[0].color = e.target.value;
                                                            setEditProductForm({
                                                                ...editProductForm,
                                                                variances: newVar,
                                                            });
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={editProductForm.variances[0]?.stock || 0}
                                                        onChange={(e) => {
                                                            const newVar = [...editProductForm.variances];
                                                            newVar[0].stock = e.target.value;
                                                            setEditProductForm({
                                                                ...editProductForm,
                                                                variances: newVar,
                                                            });
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleProductEditSave(product.id)}
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
                                                <TableCell>{product.productname}</TableCell>
                                                <TableCell>
                                                    {Array.isArray(product.features)
                                                        ? product.features.join(", ")
                                                        : product.features}
                                                </TableCell>
                                                <TableCell>
                                                    {product.variances?.[0]?.color || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {product.variances?.[0]?.stock || 0}
                                                </TableCell>
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
                                                        onClick={() => handleProductDelete(product.id)}
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
