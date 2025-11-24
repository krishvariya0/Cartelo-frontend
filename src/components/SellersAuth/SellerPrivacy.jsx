import { IoMdArrowRoundBack } from "react-icons/io";

const SellerPrivacy = () => {
    return (
        <div className="max-w-4xl mx-auto mt-14 mb-24 px-4">

            {/* Back Button */}
            <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-700 mb-6 hover:text-black transition"
            >
                <IoMdArrowRoundBack size={22} /> Back
            </button>

            {/* Card */}
            <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-lg">

                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Cartelo Seller Privacy Policy
                </h1>

                <p className="text-gray-700 mb-4">
                    This Privacy Policy explains how Cartelo collects, uses, and protects seller data.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Seller name & business details</li>
                    <li>Email, phone number, and address</li>
                    <li>Bank account or UPI details for settlements</li>
                    <li>GST, PAN or ID proof information</li>
                    <li>Product & order data</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>To verify seller identity</li>
                    <li>To process orders and payments</li>
                    <li>To prevent fraud and policy violations</li>
                    <li>To improve seller performance analytics</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
                <p className="text-gray-700">
                    Cartelo does not sell seller data. We may share information with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
                    <li>Delivery partners</li>
                    <li>Payment gateways</li>
                    <li>Legal authorities (only when required)</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
                <p className="text-gray-700">
                    We use encryption and secure systems to protect seller data.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Policy Updates</h2>
                <p className="text-gray-700">
                    Cartelo may update the policy periodically. Sellers will be notified in advance.
                </p>

            </div>
        </div>
    );
};

export default SellerPrivacy;
