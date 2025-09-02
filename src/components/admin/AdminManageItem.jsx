import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://68b70b2a73b3ec66cec3999a.mockapi.io/api/mockitem/items";

function AdminAddItem({ items, setItems, fetchItems }) {
    const [itemForm, setItemForm] = useState({
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        features: [],
        variances: [{ color: "", image: [], stock: 0, price: 0 }],
    });

    const [editItemId, setEditItemId] = useState(null);
    const [editItemForm, setEditItemForm] = useState({
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        features: [],
        variances: [{ color: "", image: [], stock: 0, price: 0 }],
    });

    //  Handle Form
    const handleItemChange = (e) => {
        setItemForm({ ...itemForm, [e.target.name]: e.target.value });
    };

    const handleVarianceChange = (index, e) => {
        const { name, value } = e.target;
        const newVariances = [...itemForm.variances];
        newVariances[index][name] = value;
        setItemForm({ ...itemForm, variances: newVariances });
    };

    const handleAddVariance = () => {
        setItemForm({
            ...itemForm,
            variances: [...itemForm.variances, { color: "", image: [], stock: 0, price: 0 }],
        });
    };

    const handleItemSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API, itemForm);
            await fetchItems();
            setItemForm({
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
            console.error("❌ Error creating item:", error);
        }
    };

    // Edit & Delete
    const handleItemDelete = async (id) => {
        if (!window.confirm("Delete this item?")) return;
        await axios.delete(`${API}/${id}`);
        setItems(items.filter((item) => item.id !== id));
    };

    const handleItemEdit = (item) => {
        setEditItemId(item.id);
        setEditItemForm({
            productname: item.productname,
            description: item.description,
            brand: item.brand,
            modelname: item.modelname,
            warrantyinfo: item.warrantyinfo,
            relatedproduct: item.relatedproduct,
            features: item.features,
            variances: item.variances || [{ color: "", image: [], stock: 0, price: 0 }],
        });
    };

    const handleItemEditSave = async (id) => {
        try {
            await axios.put(`${API}/${id}`, editItemForm);
            await fetchItems();
            setEditItemId(null);
        } catch (error) {
            console.error("❌ Error updating item:", error);
        }
    };

    const handleItemEditCancel = () => setEditItemId(null);

    const handleItemEditChange = (e) => {
        setEditItemForm({ ...editItemForm, [e.target.name]: e.target.value });
    };

    useEffect(() => { }, []);


    return (
        <div className="flex flex-col items-center">
            {/* Form */}
            <form onSubmit={handleItemSubmit} className="pb-3">
                <input name="productname" value={itemForm.productname} onChange={handleItemChange} placeholder="Product name" />
                <input name="description" value={itemForm.description} onChange={handleItemChange} placeholder="Description" />
                <input name="brand" value={itemForm.brand} onChange={handleItemChange} placeholder="Brand" />
                <input name="modelname" value={itemForm.modelname} onChange={handleItemChange} placeholder="Model name" />
                <input name="warrantyinfo" value={itemForm.warrantyinfo} onChange={handleItemChange} placeholder="Warranty" />
                <input name="relatedproduct" value={itemForm.relatedproduct} onChange={handleItemChange} placeholder="Related" />
                <input name="features" value={itemForm.features} onChange={handleItemChange} placeholder="Features" />

                {/* Variances */}
                <div>
                    <h3 className="font-bold">Variances</h3>
                    {itemForm.variances.map((v, i) => (
                        <div key={i}>
                            <input name="color" value={v.color} onChange={(e) => handleVarianceChange(i, e)} placeholder="Color" />
                            <input name="stock" type="number" value={v.stock} onChange={(e) => handleVarianceChange(i, e)} placeholder="Stock" />
                            <input name="price" type="number" value={v.price} onChange={(e) => handleVarianceChange(i, e)} placeholder="Price" />
                            <input name="image" value={v.image} onChange={(e) => handleVarianceChange(i, e)} placeholder="Image URL" />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddVariance}>+ Add Variance</button>
                </div>

                <button type="submit">Save new item</button>
            </form>

            {/* Table */}
            <table className="w-full border-separate">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Features</th>
                        <th>Color</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.id}>
                                {editItemId === item.id ? (
                                    <>
                                        <td><input name="productname" value={editItemForm.productname} onChange={handleItemEditChange} /></td>
                                        <td><input name="features" value={editItemForm.features} onChange={handleItemEditChange} /></td>
                                        <td><input value={editItemForm.variances[0]?.color || ""} onChange={(e) => {
                                            const newVar = [...editItemForm.variances];
                                            newVar[0].color = e.target.value;
                                            setEditItemForm({ ...editItemForm, variances: newVar });
                                        }} /></td>
                                        <td><input type="number" value={editItemForm.variances[0]?.stock || 0} onChange={(e) => {
                                            const newVar = [...editItemForm.variances];
                                            newVar[0].stock = e.target.value;
                                            setEditItemForm({ ...editItemForm, variances: newVar });
                                        }} /></td>
                                        <td>
                                            <button onClick={() => handleItemEditSave(item.id)}>Save</button>
                                            <button onClick={handleItemEditCancel}>Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td>{item.productname}</td>
                                        <td>{Array.isArray(item.features) ? item.features.join(", ") : item.features}</td>
                                        <td>{item.variances?.[0]?.color || "-"}</td>
                                        <td>{item.variances?.[0]?.stock || 0}</td>
                                        <td>
                                            <button onClick={() => handleItemEdit(item)}>Edit</button>
                                            <button onClick={() => handleItemDelete(item.id)}>Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) :
                        (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No products found.</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAddItem;
