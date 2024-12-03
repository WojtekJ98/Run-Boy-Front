"use client";
import useForm from "@/app/lib/useForm";
import Form from "./styles/Form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "CredentialsSignin":
        return "Invalid email or password. Please try again.";
      default:
        return "Failed to sign in. Please check your credentials.";
    }
  };

  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = inputs;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.ok) {
        toast.success("You are sign in!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/");
      } else {
        const errorMessage = getErrorMessage(result?.error);

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("An unexpected error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      resetForm();
    }
  }
  if (session) {
    return <p>Already signed in</p>;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
}
