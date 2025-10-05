
import { Outlet } from "react-router-dom";
import ProgressBar from "./ProgresBar";

// Form layout component to add Progressbar to group of routes.
export default function FormLayout() {
  return (
    <>
      <ProgressBar />
      <Outlet /> 
    </>
  );
}
