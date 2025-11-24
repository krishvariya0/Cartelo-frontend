import { IoMdArrowRoundBack } from "react-icons/io";

const SellerTerms = () => {
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
                    Cartelo Seller Terms & Conditions
                </h1>

                <p className="text-gray-700 mb-4">
                    Welcome to the <strong>Cartelo Seller Program</strong>. By registering as a seller,
                    you agree to follow all policies, terms, and rules listed below.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">1. Seller Eligibility</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>You must provide valid business or personal information.</li>
                    <li>You must comply with all applicable Indian laws.</li>
                    <li>You must be at least 18 years old.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">2. Product Listing Rules</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Products must be accurately described.</li>
                    <li>Fake, illegal, or duplicate products are strictly prohibited.</li>
                    <li>Listing with misleading titles or attributes is not allowed.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">3. Order Fulfillment</h2>
                <p className="text-gray-700">
                    Sellers must ensure timely shipping, safe packaging, and accurate order handling.
                    Repeated delays may lead to account suspension.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">4. Returns & Refunds</h2>
                <p className="text-gray-700">
                    You must honour Cartelo’s return policies. If a customer receives damaged or incorrect items,
                    the seller must compensate or replace the item.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Fees & Payments</h2>
                <p className="text-gray-700">
                    Cartelo may charge commissions, service fees, or penalties for violations.
                    All payments will be settled weekly or monthly.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">6. Account Suspension</h2>
                <p className="text-gray-700">
                    Cartelo may suspend or terminate accounts for policy violations, fraud, late shipments,
                    or seller inactivity.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">7. Agreement</h2>
                <p className="text-gray-700">
                    By using Cartelo Seller Services, you automatically accept all the above terms.
                </p>

            </div>
        </div>
    );
};

export default SellerTerms;
