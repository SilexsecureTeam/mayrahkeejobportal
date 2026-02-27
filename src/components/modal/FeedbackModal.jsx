import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { PiSpinnerGap } from "react-icons/pi";

const FeedbackModal = ({
    isOpen,
    onClose,
    onSubmit,
    loading,
    title = "Leave a Review",
    description = "How would you rate your experience?",
    submitLabel = "Submit Review",
    placeholder = "Share your experience (optional)...",
}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setRating(0);
            setHover(0);
            setComment("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl text-gray-800 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                    {description}
                </p>

                {/* Star Rating */}
                <div className="flex justify-center gap-3 mb-5">
                    {[...Array(5)].map((_, index) => {
                        const value = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    className="hidden"
                                    value={value}
                                    onClick={() => setRating(value)}
                                />
                                <FaStar
                                    size={34}
                                    className="cursor-pointer transition-transform duration-150 hover:scale-110"
                                    onMouseEnter={() => setHover(value)}
                                    onMouseLeave={() => setHover(0)}
                                    color={value <= (hover || rating) ? "#facc15" : "#e5e7eb"}
                                />
                            </label>
                        );
                    })}
                </div>

                {/* Comment */}
                <textarea
                    className="w-full border border-gray-200 rounded-lg p-3 text-sm mb-5 outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder={placeholder}
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSubmit({ rating, comment })}
                        disabled={loading || rating === 0}
                        className="flex-1 py-2.5 bg-blue-900 text-white rounded-lg disabled:bg-gray-400 flex items-center justify-center gap-2 font-medium transition"
                    >
                        {loading && <PiSpinnerGap className="animate-spin" />}
                        {submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;