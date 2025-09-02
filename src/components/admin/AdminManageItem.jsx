import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

//const API = "https://68996ee5fed141b96b9f7a90.mockapi.io/gameak/products";


function AdminAddItem({ items, setItems, fetchItems, API }) {
    const [itemForm, setItemForm] = useState({
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        features: [],
        variances: [
            {
                color: "",
                image: [],
                stock: 0,
                price: 0,
            },
        ],
    }, { timestamps: true }
    );

    const [editItemId, setEditItemId] = useState(null);
    const [editItemForm, setEditItemForm] = useState({
        productname: "",
        description: "",
        brand: "",
        modelname: "",
        warrantyinfo: "",
        relatedproduct: [],
        features: [],
        variances: [
            {
                color: "",
                image: [],
                stock: 0,
                price: 0,
            },
        ],
    });

};

const handleItemChange = (e) => {
    setItemForm({
        ...editItemForm,
        [e.target.name]: e.target.value
    });
};

const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(API, itemForm);
        await fetchItems();
        // Reset item form
        setItemForm({
            productname: "",
            description: "",
            brand: "",
            modelname: "",
            warrantyinfo: "",
            relatedproduct: [],
            features: [],
            variances: [
                {
                    color: "",
                    image: [],
                    stock: 0,
                    price: 0,
                },
            ],
        }, { timestamps: true }
        );
    } catch (error) {
        console.error("❌Error creating new item:", error);
    }
};

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
        variances: [
            {
                color: item.variances.color,
                image: item.variances.image,
                stock: item.variances.stock,
                price: item.variances.price,
            },
        ],
    });
}

const handleItemEditSave = async (id) => {
    try {
        await axios.put(`${API}/${id}`, editItemForm)
        await fetchItems();
        setEditItemId(null);
    } catch (error) {
        console.error("❌Error updating item:", error);
    }
};

const handleEditCancel = () => {
    setEditItemId(null);
};



//     return (
//         <div className="flex flex-col items-center">
//             <form onSubmit={handleItemSubmit} className="pb-3">
//                 <input
//                     onChange={handleChange}
//                     value={form.name}
//                     name="name"
//                     className="bg-white mx-1 w-32 px-2 rounded border"
//                     placeholder="Name"
//                 />
//                 <input
//                     onChange={handleChange}
//                     value={form.lastname}
//                     name="lastname"
//                     className="bg-white mx-1 w-32 px-2 rounded border"
//                     placeholder="Last name"
//                 />
//                 <input
//                     onChange={handleChange}
//                     value={form.position}
//                     name="position"
//                     className="bg-white mx-1 w-32 px-2 rounded border"
//                     placeholder="Position"
//                 />
//                 <button
//                     type="submit"
//                     className="cursor-pointer bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 mx-1 rounded-4xl"
//                 >
//                     Save new user
//                 </button>
//             </form>
//             <table className="w-full border-separate">
//                 <thead>
//                     <tr className="text-center font-bold bg-gray-200">
//                         <th className="border rounded-tl-lg p-2">Name</th>
//                         <th className="border p-2">Last name</th>
//                         <th className="border p-2">Position</th>
//                         <th className="border rounded-tr-lg p-2">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.id} className="bg-white">
//                             {editId === user.id ? (
//                                 <>
//                                     <td className="border p-2 ">
//                                         <input
//                                             value={editForm.name}
//                                             onChange={""}
//                                             name="name"
//                                             className="bg-white mx-1 w-32 px-2 rounded border"
//                                         />
//                                     </td>
//                                     <td className="border p-2 ">
//                                         <input
//                                             value={editForm.lastname}
//                                             onChange={""}
//                                             name="lastname"
//                                             className="bg-white mx-1 w-32 px-2 rounded border"
//                                         />
//                                     </td>
//                                     <td className="border p-2 ">
//                                         <input
//                                             value={editForm.position}
//                                             onChange={""}
//                                             name="position"
//                                             className="bg-white mx-1 w-32 px-2 rounded border"
//                                         />
//                                     </td>
//                                     <td className="border p-2 ">
//                                         <button
//                                             onClick={() => handleEditSave(user.id)}
//                                             className="cursor-pointer bg-teal-300 hover:bg-rose-500 text-white px-2 rounded-xl"
//                                         >
//                                             Save
//                                         </button>
//                                         <button
//                                             onClick={handleEditCancel}
//                                             className="cursor-pointer bg-gray-400 hover:bg-rose-500 text-white px-2 rounded-xl"
//                                         >
//                                             Cancel
//                                         </button>
//                                         <handleEditChange />
//                                     </td>
//                                 </>
//                             ) : (
//                                 <>
//                                     <td className="border p-2 ">{user.name}</td>
//                                     <td className="border p-2 ">{user.lastname}</td>
//                                     <td className="border p-2 ">{user.position}</td>
//                                     <td className="border p-2 ">
//                                         <button
//                                             onClick={() => handleEdit(user)}
//                                             className="cursor-pointer bg-yellow-300 hover:bg-rose-500 text-white px-2 rounded-xl"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(user.id)}
//                                             className="cursor-pointer bg-rose-400 hover:bg-rose-500 text-white px-2 rounded-xl"
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </>
//                             )}

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
