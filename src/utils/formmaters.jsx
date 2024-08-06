export const handleOnChange = (e, setDetails) => {
  const { name, value } = e.target;

  setDetails((prev) => {
    return { ...prev, [name]: value };
  });
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`; // Add leading zero for single-digit seconds
};

export const highlightKeyword = (sentence, keyword) => {
  const regex = new RegExp(`\\b${keyword.name}\\b`, "gi");

  return sentence.replace(
    regex,
    `<span class="${keyword.color} font-bold cursor-pointer hover:underline ">${keyword.name}</span>`
  );
};

export const FormatPrice = (price) => {
  return `N${price.toLocaleString(navigator.language, {
    minmumFractionDigits: 0,
  })}`;
};
export const FormatNumber = (price) => {
  return `${price.toLocaleString(navigator.language, {
    minmumFractionDigits: 0,
  })}`;
};

export const FormatPriceInUsd = (price) => {
  return `USD ${price.toLocaleString(navigator.language, {
    minmumFractionDigits: 0,
  })}`;
};

export const FormatError = (error, setError, message) => {
  console.log(error);
  if (error instanceof Error && !error?.response?.data) {
    setError({
      message: message,
      error: error.message,
    });
    console.log("normal erro");
  } else if (error?.response?.data) {
    const errorsFromResponse = error?.response?.data?.errors;
    let errorMessage = "";
    if (errorsFromResponse) {
      Object.keys(errorsFromResponse).map((currentErrorKey) => {
        const currentError = errorsFromResponse[currentErrorKey];
        errorMessage = errorMessage + currentError[0] + "\n";
      });
      console.log("api error");
    } else if (error?.response?.data?.response) {
      console.log("axios erro");
      errorMessage = error?.response?.data?.response;
    } else if(error?.response?.data?.message && !error?.response?.data?.errors) {
      errorMessage = error?.response?.data?.message;
    } else {
      errorMessage = "Something went wrong";
    }

    setError({
      message: message,
      error: errorMessage,
    });
  } else {
    setError({
      message: "Unknown",
      error: "Something went wrong",
    });
  }
};

export const formatResponse = (response, setDatum, responseType) => {
  const key = Object.keys(responseKeys).find(
    (current) => responseKeys[current] === responseType
  );

  return setDatum(response.data[key]);
};

export const setSelectedData = (dataList, setData, value) => {
  if (!value) {
    setData(dataList[0]);
    return;
  } else if (value) {
    const newData = dataList.find((currentData) => (currentData.name = value));
    if (newData) {
      setData(newData);
      return;
    } else {
      setData(dataList[0]);
      return;
    }
  }
};


export const getImageURL = (e, setStateFunctionUrl) => {
  const { name } = e.target;
  const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    // You can also perform additional actions with the valid file
    const generatedUrl = URL.createObjectURL(file);
    setStateFunctionUrl(generatedUrl);
    setDetails((prev) => { return {...prev, [name]: file}})
  } else {
    // Handle invalid file type
    alert("Please select a valid JPEG or PNG file.");
  }
};


export const onTextChange = (e, details, setDetails) => {
  const { name, value } = e.target;
  setDetails({ ...details, [name]: value });
};