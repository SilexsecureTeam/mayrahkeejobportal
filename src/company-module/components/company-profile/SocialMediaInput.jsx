import { useState } from "react";

/**
 * Base URL validation
 */
const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Platform-specific domain patterns
 */
const PLATFORM_RULES = {
  1: {
    name: "Facebook",
    pattern: /facebook\.com/i,
  },
  2: {
    name: "Twitter / X",
    pattern: /(twitter\.com|x\.com)/i,
  },
  3: {
    name: "LinkedIn",
    pattern: /linkedin\.com/i,
  },
  4: {
    name: "Instagram",
    pattern: /instagram\.com/i,
  },
};

function SocialMediaInput({ data, socials, setSocials }) {
  const [error, setError] = useState("");

  const updateSocials = (val) => {
    const socialsUpdate = Array.isArray(socials)
      ? [...socials]
      : ["", "", "", ""];

    switch (data?.id) {
      case 1:
        socialsUpdate[0] = val;
        break;
      case 2:
        socialsUpdate[1] = val;
        break;
      case 3:
        socialsUpdate[2] = val;
        break;
      case 4:
        socialsUpdate[3] = val;
        break;
      default:
        break;
    }

    setSocials((prev) => ({
      ...prev,
      social_media: socialsUpdate,
    }));
  };

  /**
   * Allow free typing (no validation here)
   */
  const handleChange = (e) => {
    const val = e.target.value;

    if (!val) {
      setError("");
      updateSocials("");
      return;
    }

    updateSocials(val);
  };

  /**
   * Validate & normalize on blur
   */
  const handleBlur = (e) => {
    let val = e.target.value.trim();
    if (!val) return;

    // Normalize protocol
    if (!/^https?:\/\//i.test(val)) {
      val = `https://${val}`;
    }

    // Base URL validation
    if (!isValidUrl(val)) {
      setError("Please enter a valid link");
      return;
    }

    // Platform validation
    const rule = PLATFORM_RULES[data?.id];
    if (rule && !rule.pattern.test(val)) {
      setError(`Please enter a valid ${rule.name} link`);
      return;
    }

    setError("");
    updateSocials(val);
  };

  const defaultCurrentVal = () => {
    if (!Array.isArray(socials)) return "";
    switch (data?.id) {
      case 1:
        return socials[0] || "";
      case 2:
        return socials[1] || "";
      case 3:
        return socials[2] || "";
      case 4:
        return socials[3] || "";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div
        className={`p-1 flex items-center gap-[5px] border rounded ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <data.icon className="text-lg" />
        <input
          type="url"
          value={defaultCurrentVal()}
          placeholder={data.placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-[95%] focus:outline-none"
        />
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default SocialMediaInput;
