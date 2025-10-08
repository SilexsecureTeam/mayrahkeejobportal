import { useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { onFailure } from "../utils/notifications/OnFailure";
import StaffCard from "./StaffCard";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import Advert from "../components/Landing/Advert";
import Footer from "../components/Landing/Footer";
import { Helmet } from "react-helmet";

const ITEMS_PER_PAGE = 6; // Number of staff per page

function FindStaff() {
  const { id } = useParams();
  const client = axiosClient();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await client.get("/staff-categories");
        setCategories(data?.data || []);
      } catch (error) {
        onFailure({
          message: "Category Error",
          error: "Failed to retrieve staff categories.",
        });
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && id) {
      const matchedCategory = categories.find((category) =>
        category.name.toLowerCase().includes(id.toLowerCase())
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.name);
      } else {
        navigate("/not-found");
      }
    }
  }, [categories, id]);

  useEffect(() => {
    const selectedCategoryData = categories.find(
      (category) => category.name === selectedCategory
    );
    setSubCategories(selectedCategoryData?.subcategories || []);
    setSelectedSubcategory("");
  }, [categories, selectedCategory]);

  const handleQuerySubmit = async (queryParams) => {
    if (!queryParams?.staff_category) return;
    setLoading(true);
    try {
      const query = new URLSearchParams(queryParams).toString();
      const { data } = await client.get(`/domesticStaff/staff-type?${query}`);

      const staffList = data?.domesticStaff || [];

      // ✅ Sort staff with profile_image first
      const sortedStaff = staffList.sort((a, b) => {
        const hasImageA = a.profile_image ? 1 : 0;
        const hasImageB = b.profile_image ? 1 : 0;
        return hasImageB - hasImageA; // Descending: true first
      });

      setSearchResult(sortedStaff);
      setCurrentPage(1);
    } catch (error) {
      onFailure({
        message: `${id} Search Error`,
        error: "Failed to retrieve search results.",
      });
      setSearchResult([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = async () => {
    if (!selectedCategory) return;

    const validSubcategories =
      categories
        .find((category) => category.name === selectedCategory)
        ?.subcategories.map((sub) => sub.name) || [];

    if (!validSubcategories.includes(selectedSubcategory)) {
      setSelectedSubcategory("");
    }

    const queryParams = {
      staff_category:
        selectedCategory?.toLowerCase() === "domestic staff"
          ? "staff"
          : selectedCategory?.toLowerCase(),
      ...(validSubcategories.includes(selectedSubcategory) && {
        subcategory: selectedSubcategory,
      }),
      ...(ageRange && { age_range: ageRange }),
      ...(gender && { gender }),
      ...(educationalLevel && { education_level: educationalLevel }),
    };

    await handleQuerySubmit(queryParams);
  };

  useEffect(() => {
    handleSearchClick();
  }, [selectedCategory]);

  const filteredSearchResult = searchInput
    ? searchResult.filter(
        (staff) =>
          staff.first_name?.toLowerCase().includes(searchInput.toLowerCase()) ||
          staff.surname?.toLowerCase().includes(searchInput.toLowerCase())
      )
    : searchResult;

  const totalPages = Math.ceil(filteredSearchResult.length / ITEMS_PER_PAGE);
  const currentItems = filteredSearchResult.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  window.scrollTo(0, 0);

  return (
    categories &&
    searchResult && (
      <>
        <Helmet>
          <title>Mayrahkee | {selectedCategory}</title>
        </Helmet>
        <div className="relative max-w-[1400px] w-full mx-auto">
          <Navbar />
          <main className="relative my-20 px-5 h-full">
            <Hero
              shrink={true}
              title={
                selectedCategory?.toLowerCase() !== "domestic staff"
                  ? "Connect with skilled artisans in your area. Quality craftsmanship and expertise, just a step away!"
                  : "Discover reliable domestic staff near you. Experience peace of mind with trusted professionals for your home!"
              }
            />

            {/* Filter Section */}
            <div className="w-full px-6 bg-[#AFB6AE1A] rounded-lg shadow-md h-fit flex flex-col gap-6">
              <h2 className="text-lg font-semibold text-gray-800 mt-1">
                Find {selectedCategory}
              </h2>
              <div className="h-full w-full flex flex-col bg-transparent">
                {/* Search Bar */}
                <div className="flex flex-wrap rounded-md mb-3">
                  <input
                    type="text"
                    value={searchInput}
                    onInput={(e) => setSearchInput(e.target.value)}
                    placeholder={`Search ${selectedCategory} by name e,g Ben`}
                    className="p-3 py-2 border border-gray-300 rounded-lg flex-1 focus:outline-primaryColor"
                  />
                </div>
                {/* Filter Options */}
                <div className="grid grid-cols-responsive3 gap-3 justify-center">
                  {/* Category Dropdown */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-600 mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      disabled
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent disabled:opacity-50"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subcategory Dropdown */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="subcategory"
                      className="text-sm font-medium text-gray-600 mb-2"
                    >
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                    >
                      <option value="">Select Subcategory</option>
                      {subcategories?.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.name}>
                          {subcategory.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gender Dropdown */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium text-gray-600 mb-2"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  {/* Educational Level Dropdown */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="education_level"
                      className="text-sm font-medium text-gray-600 mb-2"
                    >
                      Education Level
                    </label>
                    <select
                      id="education_level"
                      value={educationalLevel}
                      onChange={(e) => setEducationalLevel(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent"
                    >
                      <option value="">Select Education Level</option>
                      {[
                        "Primary School Certificate",
                        "Secondary School Certificate",
                        "Diploma",
                        "Degree",
                      ].map((current) => (
                        <option key={current}>{current}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center my-3">
                  <button
                    onClick={handleSearchClick}
                    className="w-full md:w-60 px-6 py-3 bg-primaryColor text-white rounded-lg hover:bg-primaryHover transition-all shadow-lg text-center font-semibold"
                  >
                    Filter
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="mt-5 bg-gray-100 flex flex-col justify-center items-center min-h-60">
                {loading ? (
                  <div className="flex justify-center items-center mt-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
                  </div>
                ) : filteredSearchResult?.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                      {currentItems.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-6">
                        <button
                          onClick={handlePreviousPage}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <span>
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="font-medium text-xl self-start">
                    No {selectedCategory} found matching your criteria.
                  </p>
                )}
              </div>
            </div>
            <Advert />
          </main>
        </div>
        <Footer />
      </>
    )
  );
}

export default FindStaff;
