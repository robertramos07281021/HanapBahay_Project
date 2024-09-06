const registerUser = async (email, password, passwordConfirm) => {
  if (!email || !password || !passwordConfirm) {
    throw Error("All fields are required.");
  }

  if (password.length < 8 || password.length > 16) {
    throw Error("Password must be 8-16 characters.");
  }

  if (password !== passwordConfirm) {
    throw Error("Passwords do not match.");
  }

  const res = await fetch("/api/hanapbahay/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, passwordConfirm }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  return data;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("Invalid Credentials");
  }

  const res = await fetch("/api/hanapbahay/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("email", data.email);
  localStorage.setItem("token", data.token);
  return data;
};

const loggedOut = async (email) => {
  if (!email) {
    throw Error("Add email");
  }
  const res = await fetch(`/api/hanapbahay/user/logout?email=${email}`, {
    method: "PATCH",
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};
export { registerUser, loginUser, loggedOut };
