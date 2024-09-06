const getRentalsPosts = async () => {
  const res = await fetch("/api/hanapbahay/rent");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

const addInquiry = async (_id, inquiry) => {
  if (!inquiry) {
    throw Error("Please add inquiries");
  }

  const res = await fetch(`/api/hanapbahay/rent/inquiry/${_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inquiry }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

const addNewRentals = async (
  address1,
  address2,
  region,
  city,
  classes,
  price,
  bedrooms,
  bathrooms,
  description,
  images
) => {
  if (images.length < 4 || typeof images == "string") {
    throw Error("Image must be 4 images");
  }
  if (
    !address1 ||
    !address2 ||
    !region ||
    !city ||
    !classes ||
    !price ||
    !description
  ) {
    throw Error("All fields are required.");
  }
  if (classes != "room") {
    if (!bedrooms || !bathrooms) {
      throw Error("All fields are required.");
    }
  }

  const formData = new FormData();
  formData.append("address1", address1);
  formData.append("address2", address2);
  formData.append("region", region);
  formData.append("city", city);
  formData.append("price", price);
  formData.append("classes", classes);
  formData.append("bedrooms", bedrooms);
  formData.append("bathrooms", bathrooms);
  formData.append("description", description);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  const res = await fetch("/api/hanapbahay/rent/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const getUserRentals = async () => {
  const res = await fetch("/api/hanapbahay/rent/rents", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

const deleteRental = async (id) => {
  const res = await fetch(`/api/hanapbahay/rent/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const getRegions = async () => {
  const res = await fetch("https://psgc.gitlab.io/api/regions/", {
    method: "GET",
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const getCity = async (regionCode) => {
  const res = await fetch(
    `https://psgc.gitlab.io/api/regions/${regionCode}/cities/`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

const updateIfRented = async (id) => {
  const res = await fetch(`/api/hanapbahay/rent/rented/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const updateRental = async (
  id,
  address1,
  address2,
  region,
  city,
  classes,
  price,
  bedrooms,
  bathrooms,
  description,
  images
) => {
  if (!address1 || !address2 || !region || !city || !classes || !price) {
    throw Error("All fields are required except on description");
  }
  if (price <= 0) {
    throw Error("Price cannot be 0");
  }

  if (classes != "room") {
    if (!bedrooms || !bathrooms) {
      throw Error("All fields are required except on description");
    }
    if (bedrooms <= 0 || bathrooms <= 0) {
      throw Error(
        "Price can`t be 0 or bedrooms can`t be 0 or bathrooms can`t be 0"
      );
    }
  }

  if (images.length !== 4 && images.length !== 0) {
    throw Error(
      "Please add exacly 4 images or do not add images to set value from previous images."
    );
  }
  const formData = new FormData();
  formData.append("address1", address1);
  formData.append("address2", address2);
  formData.append("region", region);
  formData.append("city", city);
  formData.append("price", price);
  formData.append("classes", classes);
  formData.append("bedrooms", bedrooms);
  formData.append("bathrooms", bathrooms);
  formData.append("description", description);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  const res = await fetch(`/api/hanapbahay/rent/update/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const newMessage = async (name, email, message) => {
  if (!name || !email || !message) {
    throw Error("All fields are required!");
  }

  const res = await fetch("/api/hanapbahay/rent/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

export {
  updateRental,
  getRentalsPosts,
  addInquiry,
  addNewRentals,
  getUserRentals,
  deleteRental,
  getRegions,
  getCity,
  updateIfRented,
  newMessage,
};
