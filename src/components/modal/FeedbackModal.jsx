import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiSpinnerGap } from "react-icons/pi";

const FeedbackModal = ({ isOpen, onClose, onSubmit, loading }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl text-gray-800">
                <h3 className="text-xl font-bold mb-2">Contract Terminated</h3>
                <p className="text-sm text-gray-600 mb-4">
                    We're sorry to see this contract end. How would you rate your experience?
                </p>

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-4">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    className="hidden"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    className="cursor-pointer transition-colors"
                                    size={32}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                />
                            </label>
                        );
                    })}
                </div>

                <textarea
                    className="w-full border rounded p-2 text-sm mb-4 outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Optional: Share more details about the termination..."
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border rounded hover:bg-gray-50 transition-colors"
                    >
                        Skip
                    </button>
                    <button
                        onClick={() => onSubmit({ rating, comment })}
                        disabled={loading || rating === 0}
                        className="flex-1 py-2 bg-blue-900 text-white rounded disabled:bg-gray-400 flex items-center justify-center gap-2"
                    >
                        {loading && <PiSpinnerGap className="animate-spin" />}
                        Submit Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;