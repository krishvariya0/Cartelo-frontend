import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    // Load user details from localStorage on mount
    useEffect(() => {
        // Try to get user from carteloUser (array), fallback to signUp (array), fallback to loggedUser (object)
        let user = null;
        const carteloUser = localStorage.getItem("carteloUser");
        if (carteloUser) {
            try {
                const arr = JSON.parse(carteloUser);
                if (Array.isArray(arr) && arr.length > 0) user = arr[0];
            } catch { }
        }
        if (!user) {
            const signUp = localStorage.getItem("signUp");
            if (signUp) {
                try {
                    const arr = JSON.parse(signUp);
                    if (Array.isArray(arr) && arr.length > 0) user = arr[0];
                } catch { }
            }
        }
        if (!user) {
            const loggedUser = localStorage.getItem("loggedUser");
            if (loggedUser) {
                try {
                    const obj = JSON.parse(loggedUser);
                    if (obj) user = obj;
                } catch { }
            }
        }
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPassword(user.password || user.confirmPassword || "");
        }
    }, []);

    // Update details in localStorage
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill all fields");
            return;
        }
        const updatedUser = { name, email, password, confirmPassword: password };
        let carteloUser = localStorage.getItem("carteloUser");
        if (carteloUser) {
            try {
                let arr = JSON.parse(carteloUser);
                if (Array.isArray(arr) && arr.length > 0) {
                    arr[0] = { ...arr[0], ...updatedUser };
                    localStorage.setItem("carteloUser", JSON.stringify(arr));
                }
            } catch { }
        }
        let signUp = localStorage.getItem("signUp");
        if (signUp) {
            try {
                let arr = JSON.parse(signUp);
                if (Array.isArray(arr) && arr.length > 0) {
                    arr[0] = { ...arr[0], ...updatedUser };
                    localStorage.setItem("signUp", JSON.stringify(arr));
                }
            } catch { }
        }
        localStorage.setItem("loggedUser", JSON.stringify({ name, email, password }));
        toast.success("Your information has been updated!");
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
            navigate("/ProfilePage");
        }, 1000);
    };

    return (
        <div className="w-full flex flex-col items-center mt-14 mb-24 px-4">
            <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Edit Profile
                </h1>
                <form onSubmit={handleUpdate} className="space-y-5">
                    {/* NAME */}
                    <div>
                        <label className="text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    {/* EMAIL */}
                    <div>
                        <label className="text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    {/* PASSWORD */}
                    <div>
                        <label className="text-gray-700 font-medium">Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    {/* UPDATE BUTTON */}
                    <button
                        type="submit"
                        className={`w-full bg-gray-700 text-white py-3 rounded-md font-semibold hover:bg-gray-600 transition${disabled ? ' opacity-50 cursor-not-allowed' : ''}`}
                        disabled={disabled}
                    >
                        Update Details
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditProfile;

