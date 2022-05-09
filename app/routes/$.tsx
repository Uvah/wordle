import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  return redirect("/");
};

export default function PostRoute() {
  return null;
}
