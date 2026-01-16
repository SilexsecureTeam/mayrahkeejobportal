import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { set, get } from "idb-keyval";
import { AuthContext } from "../context/AuthContex";
import { CompanyRouteContext } from "../context/CompanyRouteContext";
import { onFailure } from "../utils/notifications/OnFailure";
import { onSuccess } from "../utils/notifications/OnSuccess";
import { retrievalState } from "../utils/formmaters";

export const COMPANY_PROFILE_Key = "Company Profile Database";

function useCompanyProfile() {
  const { authDetails } = useContext(AuthContext);
  const { setGlobalDetails = () => {} } = useContext(CompanyRouteContext) ?? {};

  const client = axiosClient(authDetails?.token, true);

  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
    employer_id: authDetails?.user?.id,
    beenRetreived: retrievalState.loading,
  });

  /* ----------------------------------
   * FETCH PROFILE
   * ---------------------------------- */
  const getProfileInfo = async () => {
    setLoading(true);

    try {
      const response = await client.get(
        `/employer/getEmployer/${authDetails?.user.id}`
      );

      const profile = response?.data?.details;

      // PROFILE DOES NOT EXIST YET
      if (!profile) {
        setDetails((prev) => ({
          ...prev,
          beenRetreived: retrievalState.init,
        }));
        return;
      }

      // PROFILE EXISTS
      await set(COMPANY_PROFILE_Key, profile);

      setDetails({
        ...profile,
        beenRetreived: retrievalState.retrieved,
      });

      setGlobalDetails(profile);
    } catch (error) {
      setDetails((prev) => ({
        ...prev,
        beenRetreived: retrievalState.init,
      }));
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
   * UPDATE / CREATE PROFILE
   * ---------------------------------- */
  const mapToFormData = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, val]) => {
      if (!val) return;

      if (Array.isArray(val)) {
        val.forEach((item) => {
          if (item instanceof File || typeof item === "string") {
            formData.append(`${key}[]`, item);
          }
        });
      } else {
        if (key === "logo_image" && typeof val === "string") return;
        formData.append(key, val);
      }
    });

    return formData;
  };

  const updateCompanyProfile = async (newDetails, onDone) => {
    setLoading(true);

    try {
      const data = mapToFormData(newDetails);

      const response = await client.post(
        `/employer/UpdateEmployer/${details.employer_id}`,
        data
      );

      const employer = response?.data?.employer;

      setDetails({
        ...employer,
        beenRetreived: retrievalState.retrieved,
      });

      setGlobalDetails(employer);
      await set(COMPANY_PROFILE_Key, employer);

      onSuccess({
        message: "Profile Updated",
        success: "Company profile saved successfully",
      });

      onDone?.();
    } catch (error) {
      onFailure({
        message: "Profile Error",
        error:
          JSON.stringify(error?.response?.data?.message) ||
          "Unable to save company profile",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------------------
   * BOOTSTRAP FROM INDEXED DB
   * ---------------------------------- */
  useEffect(() => {
    const init = async () => {
      try {
        const cached = await get(COMPANY_PROFILE_Key);

        if (cached) {
          setDetails({
            ...cached,
            beenRetreived: retrievalState.retrieved,
          });
          setGlobalDetails(cached);
        } else {
          await getProfileInfo();
        }
      } catch {
        await getProfileInfo();
      }
    };

    init();
  }, []);

  return {
    loading,
    details,
    setDetails,
    updateCompanyProfile,
    retrievalState,
  };
}

export default useCompanyProfile;
