import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
    return (
      <div>
        <h1>UH OH...</h1>
        <i>{error.statusText || error.message}</i>
      </div>
    );
}