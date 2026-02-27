import { useContext, useEffect, useState } from "react";
import { axiosClient, resourceUrl } from "../../services/axios-client";
import { extractErrorMessage, formatDate, FormatPrice } from "../../utils/formmaters";
import { field_sections1, field_sections2 } from "../../utils/constants";
import { AuthContext } from "../../context/AuthContex";
import FeedbackModal from "../modal/FeedbackModal";
import { onFailure } from "../../utils/notifications/OnFailure";

const ApplicantProfileCard = ({ userData }) => {
  const { authDetails } = useContext(AuthContext);
  const isArtisan = userData?.staff_category === "artisan";
  const fieldSections = isArtisan ? field_sections2 : field_sections1;

  const client = axiosClient(authDetails.token);
  const image = userData?.profile_image
    ? `${resourceUrl}/${userData?.profile_image}`
    : "/placeolder2.png";

  // Rating & Reviews State
  const [hasReviewed, setHasReviewed] = useState(false);
  const [existingReview, setExistingReview] = useState(null);
  const [ratingStats, setRatingStats] = useState(null);
  const [loadingRating, setLoadingRating] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (userData) {
      getRating();
      checkIfUserReviewed();
    }
  }, []);

  // Render star rating
  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  const submitReview = async ({ rating, comment }) => {
    try {
      setSubmittingReview(true);

      const payload = {
        user_id: userData?.domestic_staff_id,
        user_type:
          userData?.staff_category?.toLowerCase() === "artisan"
            ? "Artisan"
            : "domestic",
        rate_by: authDetails?.user?.id,
        rate_by_type: authDetails?.user?.role,
        rating,
        comment: comment || "No comment provided.",
      };

      await client.post(`/ratings`, payload);
      toast.success("Thank you for your feedback!");

      await getRating(); // refresh stats
      await checkIfUserReviewed();
      setShowFeedbackModal(false);
    } catch (error) {
      onFailure({
        message: "Submission Error",
        error: extractErrorMessage(error) || "Failed to submit feedback."
      })
    } finally {
      setSubmittingReview(false);
    }
  };

  const checkIfUserReviewed = async () => {
    try {
      const { data } = await client.post("/ratings/by-user", {
        user_id: userData?.domestic_staff_id,
        user_type: userData?.staff_category?.toLowerCase() === "artisan"
          ? "Artisan"
          : "domestic",
        rate_by: authDetails?.user?.id,
        rate_by_type: authDetails?.user?.role,
      });

      setHasReviewed(data?.has_reviewed);
      setExistingReview(data?.rating || null);

    } catch (error) {
      console.error("Check review error", error);
    }
  };
  // Fetch rating statistics
  const getRating = async () => {
    try {
      setLoadingRating(true);
      const { data } = await client.post(`/ratings/stats`, {
        user_id: userData?.domestic_staff_id,
        user_type: userData?.staff_category?.toLowerCase() === "artisan"
          ? "Artisan"
          : "domestic",
      });
      setRatingStats(data?.data);
    } catch (error) {
      console.error("Rating fetch error", error);
    } finally {
      setLoadingRating(false);
    }
  };

  const renderValue = (fieldName) => {
    const value = userData?.[fieldName];
    if (fieldName.includes("salary") && value) {
      return FormatPrice(Number(value));
    }
    return value ?? "N/A";
  };

  return (
    <aside className="w-full h-fit lg:w-1/4 md:min-w-80 bg-white p-6 shadow-[0_0_2px_#999] mb-4 lg:mb-0">
      {/* Profile Header */}
      <div className="text-center flex flex-wrap gap-3 justify-around">
        <img
          src={image}
          className="bg-gray-300 object-contain h-24 w-24 rounded-full"
        />
        <section>
          <h3 className="text-xl font-bold mt-4">
            {userData?.first_name} {userData?.surname}
          </h3>
          <p className="text-gray-600">{userData?.subcategory}</p>

          {/* Rating Display */}
          <div className="flex flex-wrap justify-center items-center mt-3 gap-2">
            {loadingRating ? (
              <span className="text-sm text-gray-400">Loading rating...</span>
            ) : ratingStats ? (
              <>
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(ratingStats.average_rating))}
                </div>

                <span className="text-gray-600 text-sm">
                  {ratingStats.average_rating.toFixed(1)} ({ratingStats.total_ratings})
                </span>

                {ratingStats.total_ratings > 0 && (
                  <button
                    onClick={() => setShowReviews(true)}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  >
                    View Reviews
                  </button>
                )}

                {hasReviewed ? (
                  <button
                    onClick={() => {
                      setSelectedRating(existingReview?.rating);
                      setComment(existingReview?.comment);
                      setShowFeedbackModal(true);
                    }}
                    className="px-3 py-1 text-xs bg-gray-800 text-white rounded"
                  >
                    Edit Review
                  </button>
                ) : (
                  <button
                    onClick={() => setShowFeedbackModal(true)}
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded"
                  >
                    Add Review
                  </button>
                )}
              </>
            ) : (
              <>
                <span className="text-sm text-gray-400">No reviews yet</span>
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition shadow-sm"
                >
                  Be First to Review
                </button>
              </>
            )}
          </div>
        </section>
      </div>

      {/* Membership Info */}
      <div className="mt-4 bg-gray-100 p-2">
        <div className="flex justify-between gap-2 items-center p-2 border-b ">
          <h4 className="font-bold text-gray-800">Member Since</h4>
          <p className="text-gray-500 text-sm">{formatDate(userData?.created_at)}</p>
        </div>
        <div className="p-3 mt-2 rounded-lg">
          <p className="font-semibold uppercase">{userData?.staff_category}</p>
          <p className="text-gray-500 text-sm uppercase">{userData?.subcategory}</p>
        </div>
      </div>

      {/* Primary Info */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Primary Info</h4>
        <ul className="text-gray-600 space-y-3 mt-2 break-all">
          {fieldSections.primary.map((field) => (
            <li key={field.field_name}>
              {field.name}: {renderValue(field.field_name)}
            </li>
          ))}
        </ul>
      </div>

      {/* Professional Info */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Professional Info</h4>
        <ul className="text-gray-600 space-y-3 mt-2">
          {fieldSections.professional.map((field) => (
            <li key={field.field_name}>
              {field.name}: {renderValue(field.field_name)}
            </li>
          ))}
        </ul>
      </div>

      {/* Secondary Info */}
      {fieldSections.secondary?.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-gray-800">Other Info</h4>
          <ul className="text-gray-600 space-y-3 mt-2">
            {fieldSections.secondary.map((field) => (
              <li key={field.field_name}>
                {field.name}: {renderValue(field.field_name)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Languages</h4>
        <ul className="text-gray-600 mt-2 grid grid-cols-2 gap-1">
          {JSON.parse(String(userData?.languages_spoken) || "[]")?.map(
            (lang, index) => (
              <li key={index} className="py-1 px-2 bg-yellow-400">
                {lang}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800">Contact</h4>
        <ul className="text-gray-600 space-y-2 mt-2">
          <li className="flex gap-2 items-center">
            Email: <span className="break-all">{userData?.email}</span>
          </li>
        </ul>
      </div>

      {/* Reviews Modal */}
      {showReviews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[95%] max-w-lg rounded-lg shadow-xl p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowReviews(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Reviews ({ratingStats?.total_ratings})
            </h3>

            <div className="space-y-4">
              {ratingStats?.recent_ratings?.map((review) => (
                <div key={review.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-xs text-gray-500">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {review.comment || "No comment provided."}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Rated by {review.rate_by_type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={submitReview}
        loading={submittingReview}
        title="Rate This Professional"
        description="Share your experience working with this professional."
        submitLabel="Submit Review"
        placeholder="Write your review here..."
      />
    </aside>
  );
};

export default ApplicantProfileCard;