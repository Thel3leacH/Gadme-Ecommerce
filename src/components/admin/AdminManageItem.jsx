import { useEffect, useState } from "react"
import axios from "axios"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"

const API = "https://68b70b2a73b3ec66cec3999a.mockapi.io/api/mockitem/items"

function AdminManageItem({ items, setItems, fetchItems }) {
    const [itemForm, setItemForm] = useState({
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        features: [],
        variances: [{ color: "", image: [], stock: 0, price: 0 }],
    })

    const [editItemId, setEditItemId] = useState(null)
    const [editItemForm, setEditItemForm] = useState(itemForm)

    // --- Handlers ---
    const handleItemChange = (e) => {
        setItemForm({ ...itemForm, [e.target.name]: e.target.value })
    }

    const handleVarianceChange = (index, e) => {
        const { name, value } = e.target
        const newVariances = [...itemForm.variances]
        newVariances[index][name] = value
        setItemForm({ ...itemForm, variances: newVariances })
    }

    const handleAddVariance = () => {
        setItemForm({
            ...itemForm,
            variances: [
                ...itemForm.variances,
                { color: "", image: [], stock: 0, price: 0 },
            ],
        })
    }

    const handleItemSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(API, itemForm)
            await fetchItems()
            setItemForm({
                productname: "",
                description: "",
                brand: "",
                modelname: "",
                warrantyinfo: "",
                relatedproduct: [],
                features: [],
                variances: [{ color: "", image: [], stock: 0, price: 0 }],
            })
        } catch (error) {
            console.error("❌ Error creating item:", error)
        }
    }

    const handleItemDelete = async (id) => {
        if (!window.confirm("Delete this item?")) return
        await axios.delete(`${API}/${id}`)
        setItems(items.filter((item) => item.id !== id))
    }

    const handleItemEdit = (item) => {
        setEditItemId(item.id)
        setEditItemForm(item)
    }

    const handleItemEditSave = async (id) => {
        try {
            await axios.put(`${API}/${id}`, editItemForm)
            await fetchItems()
            setEditItemId(null)
        } catch (error) {
            console.error("❌ Error updating item:", error)
        }
    }

    const handleItemEditCancel = () => setEditItemId(null)

    const handleItemEditChange = (e) => {
        setEditItemForm({ ...editItemForm, [e.target.name]: e.target.value })
    }

    useEffect(() => { }, [])

    return (
        <div className="flex flex-col items-center p-6 space-y-6">
            {/* Form */}
            <Card className="w-full max-w-3xl">
                <CardContent className="p-6">
                    <form onSubmit={handleItemSubmit} className="space-y-4 ">
                        <div className="flex flex-col space-y-2">
                            <Label>Product Name</Label>
                            <Input
                                name="productname"
                                value={itemForm.productname}
                                onChange={handleItemChange}
                                placeholder="Product name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={itemForm.description}
                                onChange={handleItemChange}
                                placeholder="Description"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Brand</Label>
                            <Input
                                name="brand"
                                value={itemForm.brand}
                                onChange={handleItemChange}
                                placeholder="Brand"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Model Name</Label>
                            <Input
                                name="modelname"
                                value={itemForm.modelname}
                                onChange={handleItemChange}
                                placeholder="Model name"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Warranty Information</Label>
                            <Input
                                name="warrantyinfo"
                                value={itemForm.warrantyinfo}
                                onChange={handleItemChange}
                                placeholder="Warranty"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Related Product</Label>
                            <Input
                                name="relatedproduct"
                                value={itemForm.relatedproduct}
                                onChange={handleItemChange}
                                placeholder="Related"
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label>Features</Label>
                            <Input
                                name="features"
                                value={itemForm.features}
                                onChange={handleItemChange}
                                placeholder="Features"
                            />
                        </div>

                        {/* Variances */}
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-bold">Variances</h3>
                            {itemForm.variances.map((v, i) => (
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
                            <Button type="button" onClick={handleAddVariance} variant="outline">
                                + Add Variance
                            </Button>
                        </div>

                        <Button type="submit">Save new item</Button>
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
                            {items && items.length > 0 ? (
                                items.map((item) => (
                                    <TableRow key={item.id}>
                                        {editItemId === item.id ? (
                                            <>
                                                <TableCell>
                                                    <Input
                                                        name="productname"
                                                        value={editItemForm.productname}
                                                        onChange={handleItemEditChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        name="features"
                                                        value={editItemForm.features}
                                                        onChange={handleItemEditChange}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        value={editItemForm.variances[0]?.color || ""}
                                                        onChange={(e) => {
                                                            const newVar = [...editItemForm.variances]
                                                            newVar[0].color = e.target.value
                                                            setEditItemForm({
                                                                ...editItemForm,
                                                                variances: newVar,
                                                            })
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        type="number"
                                                        value={editItemForm.variances[0]?.stock || 0}
                                                        onChange={(e) => {
                                                            const newVar = [...editItemForm.variances]
                                                            newVar[0].stock = e.target.value
                                                            setEditItemForm({
                                                                ...editItemForm,
                                                                variances: newVar,
                                                            })
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleItemEditSave(item.id)}
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={handleItemEditCancel}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell>{item.productname}</TableCell>
                                                <TableCell>
                                                    {Array.isArray(item.features)
                                                        ? item.features.join(", ")
                                                        : item.features}
                                                </TableCell>
                                                <TableCell>{item.variances?.[0]?.color || "-"}</TableCell>
                                                <TableCell>{item.variances?.[0]?.stock || 0}</TableCell>
                                                <TableCell className="space-x-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleItemEdit(item)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleItemDelete(item.id)}
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
    )
}

export default AdminManageItem
